import * as mongoose from 'mongoose';

const StringAndRequired = { type: String, required: true };
const BaseStatRequirement = {
  type: Number,
  required: true,
  default: 0,
  min: 0,
  max: 15,
};

export type StatsType = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export interface PokemonDoc extends mongoose.Document {
  name: string;
  bio: string;
  height: string;
  weight: string;
  image: string;
  category: string;
  abilities: string[];
  types: string[];
  weaknesses: string[];
  // evolutions?: string[];
  stats: StatsType;
}

export const PokemonSchema = new mongoose.Schema({
  name: { ...StringAndRequired, unique: true },
  bio: StringAndRequired,
  image: StringAndRequired,
  height: StringAndRequired,
  category: StringAndRequired,
  abilities: [String],
  types: [String],
  weaknesses: [String],
  weight: StringAndRequired,
  stats: {
    hp: BaseStatRequirement,
    attack: BaseStatRequirement,
    defense: BaseStatRequirement,
    specialAttack: BaseStatRequirement,
    specialDefense: BaseStatRequirement,
    speed: BaseStatRequirement,
  },
});
