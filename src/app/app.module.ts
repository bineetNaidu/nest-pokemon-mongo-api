import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
  imports: [DatabaseModule, PokemonsModule],
})
export class AppModule {}
