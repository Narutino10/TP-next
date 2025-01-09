export interface Stat {
    name: string;
    value: number;
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
    stats: Stat[];
    evolutions?: Evolution[]; 
    types: string[];
  }
  