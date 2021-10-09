import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, PokemonsModule, UserModule],
})
export class AppModule {}
