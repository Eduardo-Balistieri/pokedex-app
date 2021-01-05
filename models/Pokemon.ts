type PokemonEvolutionChain = Array<
   Array<{
      name: string
      pokemonSprite: string | null
      minLevel: number | null
      trigger: string
      pokemonId: number
   }>
> | []


interface PokemonSpecies {
   color: string
   evolutionChainId: number
   textEntries: Array<string>
   growthRate: string
   habitat: string
   isLegendary: boolean
   isMythical: boolean
   eggGroups: Array<string>
   captureRate: number
   femaleRate: number
   baseHappiness: number
   japaneseName: string
   genera: string
}

interface Pokemon extends PokemonSpecies {
   id: number
   name: string
   height: number
   weight: number
   sprite: string | null
   stats: Array<{
      base: number
      name: string
   }>
   types: Array<string>
   speciesId: number
   abilities: Array<{
      name: string
      isHidden: boolean
   }>
   evolutionChain: PokemonEvolutionChain
   baseExperience: number
}

class Pokemon {
   constructor(
      id: number,
      name: string,
      height: number,
      weight: number,
      sprite: string | null,
      stats: Array<{
         base: number
         name: string
      }>,
      types: Array<string>,
      speciesId: number,
      abilities: Array<{
         name: string
         isHidden: boolean
      }>,

      color: string,
      textEntries: Array<string>,
      growthRate: string,
      habitat: string,
      isLegendary: boolean,
      isMythical: boolean,
      eggGroups: Array<string>,
      captureRate: number,
      femaleRate: number,
      baseHappiness: number,
      evolutionChain: PokemonEvolutionChain,
      baseExperience: number,
      japaneseName: string,
      genera: string
   ) {
      this.id = id
      this.name = name
      this.height = height
      this.weight = weight
      this.sprite = sprite
      this.stats = stats
      this.types = types
      this.speciesId = speciesId
      this.abilities = abilities

      this.color = color
      this.textEntries = textEntries
      this.growthRate = growthRate
      this.habitat = habitat
      this.isLegendary = isLegendary
      this.isMythical = isMythical
      this.eggGroups = eggGroups
      this.captureRate = captureRate
      this.femaleRate = femaleRate
      this.baseHappiness = baseHappiness
      this.evolutionChain = evolutionChain
      this.baseExperience = baseExperience
      this.japaneseName = japaneseName
      this.genera = genera
   }
}

export { Pokemon, PokemonSpecies, PokemonEvolutionChain }