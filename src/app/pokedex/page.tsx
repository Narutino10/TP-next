import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/api";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/types";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons(50, offset);
      setPokemons((prev) => [...prev, ...data]);
    };
    loadPokemons();
  }, [offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setOffset((prev) => prev + 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
