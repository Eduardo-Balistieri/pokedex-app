import api from "../../src/services/api"

import { ThunkDispatch, ThunkAction } from 'redux-thunk'

import { PokemonsListResponse, PokemonDataResponse, PokemonSpeciesResponse, EvolutionChainResponse } from '../types/response'
import { TypeKeys, GetPokemonsAction } from '../types/pokemonsActions'
import { Pokemon, PokemonSpecies, PokemonEvolutionChain } from '../../models/Pokemon'



const LIMIT = 10


const getPokemonSpecies = async (speciesId: string | number): Promise<PokemonSpecies> => {
   const pokemonSpecies = await api.get(`/pokemon-species/${speciesId}`)
      .then(response => response.data as PokemonSpeciesResponse)

   const { color, evolution_chain, growth_rate, flavor_text_entries, habitat, is_legendary, is_mythical, egg_groups, capture_rate, gender_rate, base_happiness, names, genera } = pokemonSpecies

   const formatedTextEntries = flavor_text_entries.filter(entry => entry.language.name === 'en').map(entry => {
      return entry.flavor_text
         .toLowerCase()
         .replace(/(^|[.!?]\s+)([a-z])/g, (_, x, y) => x + y.toUpperCase())
         .replace('\u000c', ' ')
         .replace(/\r?\n|\r/g, ' ')
   })
   const formatedEggGroups = egg_groups.map(eggGroup => eggGroup.name)
   const evolutionChainId = parseInt(evolution_chain.url.split('/').reverse()[1])

   const japaneseNameIndex = names.findIndex(name => name.language.name === 'ja')
   const enlgishGeneraIndex = genera.findIndex(genera => genera.language.name === 'en')

   return {
      color: color.name,
      evolutionChainId,
      textEntries: formatedTextEntries,
      growthRate: growth_rate.name,
      habitat: habitat !== null ? habitat.name : 'unknown',
      isLegendary: is_legendary,
      isMythical: is_mythical,
      eggGroups: formatedEggGroups,
      captureRate: capture_rate,
      femaleRate: gender_rate === 1 ? 50 : gender_rate === -1 ? -1 : (gender_rate / 8) * 100,
      baseHappiness: base_happiness,
      japaneseName: names[japaneseNameIndex].name,
      genera: genera[enlgishGeneraIndex].genus,
   }
}


const getPokemonEvolutionChain = async (evolutionChainId: number): Promise<PokemonEvolutionChain> => {
   const pokemonEvolutionChain = await api.get(`/evolution-chain/${evolutionChainId}`)
      .then(response => response.data.chain as EvolutionChainResponse)

   let evolutionList = new Array()

   const evolvesTo = (evolutionChainObj: EvolutionChainResponse, layer: number) => {
      if (!evolutionList[layer])
         evolutionList[layer] = new Array()

      const pokemonId = parseInt(evolutionChainObj.species.url.split('/').reverse()[1])
      const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

      evolutionList[layer].push({
         pokemonSprite: pokemonSprite,
         minLevel: evolutionChainObj.evolution_details[0] ? evolutionChainObj.evolution_details[0].min_level : 0,
         name: evolutionChainObj.species.name,
         trigger: evolutionChainObj.evolution_details[0] ? evolutionChainObj.evolution_details[0].trigger.name : null,
         pokemonId
      })

      evolutionChainObj.evolves_to.forEach(chainItem => {
         evolvesTo(chainItem, layer + 1)
      })
   }

   evolvesTo(pokemonEvolutionChain, 0)
   return evolutionList
}



export const getPokemonData = async (pokemonIdentifier: string | number): Promise<Pokemon | null> => {
   const pokemonData = await api.get(`/pokemon/${pokemonIdentifier}`)
      .then(response => response.data as PokemonDataResponse)
      .catch(err => null)

   if (pokemonData === null)
      return pokemonData

   const { id, name, height, weight, sprites, stats, types, species, abilities, base_experience } = pokemonData

   const formatedStats: Array<{ base: number, name: string }> = stats.map(stat => ({
      base: stat.base_stat,
      name: stat.stat.name
   }))
   const formatedTypes: Array<string> = types.map(type => type.type.name)

   const formatedAbilities: Array<{ name: string, isHidden: boolean }> = abilities.map(ability => ({
      name: ability.ability.name,
      isHidden: ability.is_hidden
   }))


   const speciesId = parseInt(species.url.split('/').reverse()[1])
   const pokemonSpecies = await getPokemonSpecies(speciesId)

   const { color, evolutionChainId, textEntries, growthRate, habitat, isLegendary, isMythical, eggGroups, captureRate, femaleRate, baseHappiness, japaneseName, genera } = pokemonSpecies
   const evolutionChain = await getPokemonEvolutionChain(evolutionChainId)


   return new Pokemon(
      id,
      name,
      height,
      weight,
      sprites.other['official-artwork'].front_default,
      formatedStats,
      formatedTypes,
      speciesId,
      formatedAbilities,
      color,
      textEntries,
      growthRate,
      habitat,
      isLegendary,
      isMythical,
      eggGroups,
      captureRate,
      femaleRate,
      baseHappiness,
      evolutionChain,
      base_experience,
      japaneseName,
      genera
   )
}


const getPokemonList = async (offset: number): Promise<Array<Pokemon>> => {
   const pokemonsList = await api.get(`/pokemon/?limit=${LIMIT}&offset=${offset}`)
      .then(response => {
         const responseData = response.data as PokemonsListResponse
         return responseData.results
      })

   let pokemons: Array<Pokemon> = []

   await Promise.all(pokemonsList.map(pokemon => getPokemonData(pokemon.name)))
      .then((values: Array<Pokemon | null>) => {
         pokemons = values.filter(pokemon => pokemon !== null) as Array<Pokemon>
      })

   return pokemons
}



/*****************/



export const getMorePokemons = (offset: number): ThunkAction<void, {}, {}, GetPokemonsAction> => {
   return async (dispatch: ThunkDispatch<{}, {}, GetPokemonsAction>) => {
      const pokemons = await getPokemonList(offset)
      return dispatch({ type: TypeKeys.GET_POKEMONS, pokemons: pokemons })
   }
}

export const getInitialPokemons = (): ThunkAction<void, {}, {}, GetPokemonsAction> => {
   return async (dispatch: ThunkDispatch<{}, {}, GetPokemonsAction>) => {
      const pokemons = await getPokemonList(0)
      return dispatch({ type: TypeKeys.GET_POKEMONS, pokemons: pokemons })
   }
}
