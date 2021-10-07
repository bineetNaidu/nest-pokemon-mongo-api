import { Module } from '@nestjs/common';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
  imports: [PokemonsModule],
})
export class AppModule {}
