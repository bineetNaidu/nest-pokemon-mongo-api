import axios from 'axios';
import * as mongoose from 'mongoose';
import { CreatePokemonDto } from '../pokemons/dto/create-pokemon.dto';
import { MONGO_URI } from '../shared/constants';

import seedsPokemons from './pokemons.seeds';

async function seedsRunner() {
  const fmtPokemons = [];
  console.log('Seeds started\n');
  console.log('Total number of seeds pokemon; ', seedsPokemons.length);

  for (const pokemon of seedsPokemons) {
    const actualId = pokemon.id;

    const res = await axios.get<any>(
      `https://pokeapi.co/api/v2/pokemon/${actualId}`,
    );

    const { height, weight, abilities } = res.data;
    const data: CreatePokemonDto = {
      name: pokemon.name.english.toLowerCase(),
      image: pokemon.image,
      types: pokemon.type.map((type) => type.toLowerCase()),
      height: height + '',
      weight: weight + ' lb',
      abilities: abilities.map((a) => a.ability.name.toLowerCase()),
      bio: 'TBD',
      category: 'TBD',
      weaknesses: [],
      stats: {
        hp: pokemon.base.HP,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        specialAttack: pokemon.base['Sp. Attack'],
        specialDefense: pokemon.base['Sp. Defense'],
        speed: pokemon.base.Speed,
      },
    };
    fmtPokemons.push(data);
    console.log('Formatted: ', actualId, pokemon.name.english);
  }

  console.log('Connecting to MongoDB');
  mongoose.connect(MONGO_URI);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected\n');
  });
  const Pokemon = db.collection('pokemons');
  await Pokemon.deleteMany({});
  Pokemon.insertMany(fmtPokemons).then(async () => {
    console.log('Seeds finished');
    await mongoose.connection.close();
    process.exit(0);
  });
}
seedsRunner();
