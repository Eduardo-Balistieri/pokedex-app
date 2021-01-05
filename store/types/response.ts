export type PokemonsListResponse = {
   results: Array<{
      name: string
   }>
}

export interface PokemonDataResponse {
   name: string
   id: number
   height: number
   weight: number
   species: {
      url: string
   }
   sprites: {
      other: {
         'official-artwork': {
            front_default: string | null
         }
      }
   }
   stats: Array<{
      base_stat: number
      stat: {
         name: string
      }
   }>
   types: Array<{
      type: {
         name: string
      }
   }>
   abilities: Array<{
      ability: {
         name: string
      }
      is_hidden: boolean
   }>
   base_experience: number
}


export interface PokemonSpeciesResponse {
   color: {
      name: string
   }
   evolution_chain: {
      url: string
   }
   flavor_text_entries: Array<{
      flavor_text: string
      language: {
         name: string
      }
   }>
   growth_rate: {
      name: string
   }
   habitat: {
      name: string
   } | null
   is_legendary: boolean
   is_mythical: boolean
   egg_groups: Array<{
      name: string
   }>
   capture_rate: number
   gender_rate: number
   base_happiness: number
   names: Array<{
      language: {
         name: string
      }
      name: string
   }>
   genera: Array<{
      language: {
         name: string
      }
      genus: string
   }>
}


export interface EvolutionChainResponse {
   evolution_details: Array<{
      min_level: number | null
      trigger: {
         name: string
      }
   }> | []

   species: {
      url: string
      name: string
   }
   evolves_to: Array<EvolutionChainResponse> | []
}