import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, PokemonsModule, UserModule, AuthModule],
})
export class AppModule {}
