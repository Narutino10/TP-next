"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPokemonById } from "@/services/api";
import { Pokemon } from "@/types";
import Image from "next/image";

export default function PokemonDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const router = useRouter(); // Pour les actions comme "Retour"

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      const loadPokemon = async () => {
        try {
          const data: Pokemon = await fetchPokemonById(id as string);
          console.log("Données du Pokémon :", data); // Vérifiez les données dans la console
          setPokemon(data);
        } catch (error) {
          console.error("Failed to fetch Pokémon:", error);
        }
      };
      loadPokemon();
    }
  }, [id]);

  if (!pokemon) return <div className="text-center mt-10">Chargement...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        Retour
      </button>

      {/* Image principale */}
      <div className="text-center">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Détails */}
      <h1 className="text-2xl font-bold text-center my-4">{pokemon.name}</h1>
      <ul className="text-lg text-gray-700 mb-6">
        {pokemon.stats &&
         Object.entries(pokemon.stats).map(([key, value]) => (
        <li key={key} className="mb-2">
            <strong>{key}:</strong> {value}
        </li>
        ))}
    </ul>



      {/* Évolutions */}
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Évolutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pokemon.evolutions.map((evo) => (
              <div key={evo.id} className="text-center">
                <Image
                  src={evo.image}
                  alt={evo.name}
                  width={100}
                  height={100}
                  className="mx-auto"
                />
                <p className="mt-2 font-medium">{evo.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
