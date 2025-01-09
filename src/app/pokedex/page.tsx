"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchPokemons } from "@/services/api";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/types";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(50);
  const [noMorePokemons, setNoMorePokemons] = useState(false);

  // Charger les Pokémon
  const loadPokemons = useCallback(async () => {
    if (loading || noMorePokemons) return;

    setLoading(true);
    try {
      const data = await fetchPokemons(limit, offset);

      if (data.length === 0) {
        setNoMorePokemons(true); // Plus de Pokémon à charger
        return;
      }

      setPokemons((prev) => {
        const existingIds = new Set(prev.map((pokemon) => pokemon.id));
        const newPokemons = data.filter((pokemon: Pokemon) => !existingIds.has(pokemon.id));
        return [...prev, ...newPokemons];
      });

      setOffset((prev) => prev + limit); // Mise à jour du décalage
    } catch (error) {
      console.error("Erreur lors du chargement des Pokémon :", error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, loading, noMorePokemons]);

  // Gestion du scroll infini
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadPokemons();
    }
  }, [loadPokemons]);

  useEffect(() => {
    loadPokemons(); // Charger les Pokémon au chargement initial
  }, [loadPokemons]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Filtrer les Pokémon
  const filteredPokemons = pokemons.filter((pokemon: Pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "" || pokemon.types.some((type) => type.name === typeFilter);
    return matchesSearch && matchesType;
  });

  // Extraire les types uniques
  const uniqueTypes = Array.from(
    new Set(pokemons.flatMap((pokemon: Pokemon) => pokemon.types.map((type) => type.name)))
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Barre de recherche et filtres */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar p-2 border border-gray-300 rounded flex-1"
        />
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
        <select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Liste des Pokémon */}
      <div className="pokemon-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Messages de fin ou de chargement */}
      {loading && <div className="text-center text-gray-500">Chargement...</div>}
      {!loading && noMorePokemons && (
        <div className="text-center text-gray-500">Aucun Pokémon supplémentaire à afficher.</div>
      )}
    </div>
  );
}
