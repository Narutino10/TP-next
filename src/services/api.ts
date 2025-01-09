import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nestjs-pokedex-api.vercel.app/pokemons";

export const fetchPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchPokemonById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
