import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { POKEMON_MODEL_NAME } from 'src/shared/constants';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDoc } from './model/pokemom.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(POKEMON_MODEL_NAME) private pokemonModel: Model<PokemonDoc>,
  ) {}

  async create(data: CreatePokemonDto): Promise<PokemonDoc> {
    try {
      const createdPokemon = new this.pokemonModel(data);
      return await createdPokemon.save();
    } catch (error) {
      const fmtErrors = {
        errors: !error.message.match(/E11000 duplicate key/gi)
          ? Object.keys(error.errors).map((key) => {
              return {
                field: key,
                message: `${key} is required!`,
              };
            })
          : [
              {
                field: 'name',
                message: 'Pokemon with this name already exists!',
              },
            ],
      };

      throw new HttpException(fmtErrors, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<PokemonDoc[]> {
    return await this.pokemonModel.find().exec();
  }

  async findOne(id: string): Promise<PokemonDoc> {
    const pokemon = await this.pokemonModel.findById(id);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  async update(id: string, updatedData: UpdatePokemonDto) {
    const pokemon = await this.pokemonModel.findById(id);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    pokemon.set(updatedData);
    return await pokemon.save();
  }

  async remove(id: string): Promise<boolean> {
    try {
      const pokemon = await this.pokemonModel.findById(id);
      if (!pokemon) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      }
      await pokemon.remove();
      return true;
    } catch (er) {
      return false;
    }
  }
}
