"use client";

import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/api";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/types";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMorePokemons, setNoMorePokemons] = useState(false);

  useEffect(() => {
    const loadPokemons = async () => {
      if (loading || noMorePokemons) return;

      try {
        setLoading(true);
        console.log("Fetching Pokémon with offset:", offset); // Debug
        const data = await fetchPokemons(50, offset);
        console.log("Fetched Pokémon data:", data); // Debug

        setPokemons((prev) => {
          const existingIds = new Set(prev.map((pokemon) => pokemon.id));
          const newPokemons = data.filter((pokemon: Pokemon) => !existingIds.has(pokemon.id));
          console.log("New Pokémon to add:", newPokemons); // Debug

          if (newPokemons.length === 0) {
            setNoMorePokemons(true); // Si aucun nouveau Pokémon n'est ajouté
          }

          return [...prev, ...newPokemons];
        });
      } catch (error) {
        console.error("Failed to fetch Pokémons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      !noMorePokemons
    ) {
      setOffset((prev) => prev + 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, noMorePokemons]);

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "" || pokemon.types.some((type) => type.name === typeFilter);
    return matchesSearch && matchesType;
  });

  const uniqueTypes = Array.from(
    new Set(pokemons.flatMap((pokemon: Pokemon) => pokemon.types.map((type) => type.name)))
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Barre de recherche */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar p-2 border border-gray-300 rounded flex-1"
        />

        {/* Filtre par type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type, index) => (
            <option key={`${type}-${index}`} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des Pokémon */}
      <div className="pokemon-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Aucun Pokémon */}
      {filteredPokemons.length === 0 && (
        <div className="text-center text-gray-500">Aucun Pokémon trouvé.</div>
      )}

      {/* Chargement ou fin */}
      {loading && <p className="text-center mt-6 text-gray-500">Chargement...</p>}
      {noMorePokemons && !loading && (
        <p className="text-center mt-6 text-gray-500">Tous les Pokémon ont été chargés.</p>
      )}
    </div>
  );
}
