import { StatsType } from '../model/pokemom.model';

export class CreatePokemonDto {
  readonly name: string;
  readonly bio: string;
  readonly height: string;
  readonly weight: string;
  readonly image: string;
  readonly category: string;
  readonly abilities: string[];
  readonly types: string[];
  readonly weaknesses: string[];
  readonly stats: StatsType[];
}
