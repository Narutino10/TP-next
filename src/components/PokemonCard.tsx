import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <div className="card">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          className="mx-auto"
        />

        <h3 className="text-lg font-bold">{pokemon.name}</h3>

        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <Image
              key={type.id} 
              src={type.image}
              alt={type.name} 
              width={16}
              height={16}
              title={type.name} 
              className="rounded-full bg-gray-100 p-1"
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
