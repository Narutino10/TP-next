import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchPokemonById } from "@/services/api";
import { Pokemon } from "@/types";
import Image from 'next/image';

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      const loadPokemon = async () => {
        const data: Pokemon = await fetchPokemonById(id as string);
        setPokemon(data);
      };
      loadPokemon();
    }
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <Image src={pokemon.image} alt={pokemon.name} width={500} height={500} />
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.name}>
            {stat.name}: {stat.value}
          </li>
        ))}
      </ul>
      <h2>Evolutions</h2>
      <div className="evolutions">
        {pokemon.evolutions && pokemon.evolutions.map((evo) => (
          <div key={evo.id}>
            <Image src={evo.image} alt={evo.name} width={100} height={100} />
            <p>{evo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
