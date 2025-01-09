import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <div className="relative card border rounded-lg shadow-md p-4 bg-white">
        {/* ID en haut à droite */}
        <span className="absolute top-2 right-2 text-gray-500 text-xs font-bold">
          #{pokemon.id}
        </span>

        {/* Image du Pokémon */}
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          className="mx-auto"
        />

        {/* Nom du Pokémon */}
        <h3 className="text-lg font-bold text-center mt-2">{pokemon.name}</h3>

        {/* Types du Pokémon */}
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <Image
              key={type.id}
              src={type.image}
              alt={type.name}
              width={24}
              height={24}
              title={type.name}
              className="rounded-full bg-gray-100 p-1"
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
