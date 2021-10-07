import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from './model/pokemom.model';
import { POKEMON_MODEL_NAME } from 'src/shared/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: POKEMON_MODEL_NAME, schema: PokemonSchema },
    ]),
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
