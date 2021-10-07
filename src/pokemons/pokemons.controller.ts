import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDoc } from './model/pokemom.model';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  async create(
    @Body() createPokemonDto: CreatePokemonDto,
  ): Promise<PokemonDoc> {
    return await this.pokemonsService.create(createPokemonDto);
  }

  @Get()
  async findAll(): Promise<PokemonDoc[]> {
    return await this.pokemonsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PokemonDoc> {
    return await this.pokemonsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<PokemonDoc> {
    return await this.pokemonsService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.pokemonsService.remove(id);
  }
}
