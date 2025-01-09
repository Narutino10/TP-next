export interface Stat {
    name: string;
    value: number;
  }


  export interface PokemonType {
    id: number; 
    name: string; 
    image: string; 
  }
  
  export interface Evolution {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: PokemonType[]; 
    stats: Record<string, number>; 
    evolutions?: Evolution[];
  }
  