import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/poke-db';
export const POKEMON_MODEL_NAME = 'Pokemon';
