import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <div className="card">
        <Image src={pokemon.image} alt={pokemon.name} width={100} height={100} />
        <h3>{pokemon.name}</h3>
        <p>{pokemon.types.join(", ")}</p>
      </div>
    </Link>
  );
}
