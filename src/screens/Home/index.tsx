import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput } from 'react-native'

import PokemonMiniature from '../../components/PokemonMiniature'
import ListHeader from '../../components/ListHeader'

import { useNavigation } from '@react-navigation/native'

import { RootState } from '../../../store/types/rootState'
import { useSelector, useDispatch } from 'react-redux'
import * as pokemonsActions from '../../../store/actions/pokemons'

import { Ionicons } from '@expo/vector-icons'


const Home = () => {
   const navigator = useNavigation()
   const dispatch = useDispatch()

   const pokemons = useSelector((state: RootState) => state.pokemons.pokemons)
   const actualOffset = useSelector((state: RootState) => state.pokemons.actualOffset)

   const [lastOffset, setLastOffset] = useState(-1)
   const [searchValue, setSearchValue] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [showError, setShowError] = useState<boolean>(false)


   const searchForPokemon = async () => {
      if (!searchValue.trim()) {
         setShowError(true)
         return
      }
      setShowError(false)
      setIsLoading(true)
      const pokemonData = await pokemonsActions.getPokemonData(
         searchValue.trim().toLowerCase().replace(' ', '-')
      )
      setIsLoading(false)
      if (pokemonData) {
         setSearchValue('')
         navigator.navigate('information', { pokemonData })
      }
      else
         setShowError(true)
   }

   const listEndReached = () => {
      if (lastOffset !== actualOffset) {
         setLastOffset(actualOffset)
         dispatch(pokemonsActions.getMorePokemons(actualOffset))
      }
   }

   if (!pokemons)
      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='small' color='#444' />
         </View>
      )

   return (
      <View>
         <FlatList
            contentContainerStyle={styles.container}
            keyExtractor={(pokemon, index) => pokemon.name + index}
            data={pokemons}
            renderItem={pokemon => <PokemonMiniature pokemon={pokemon.item} />}
            initialNumToRender={10}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            onEndReached={listEndReached}
            ListHeaderComponent={(
               <ListHeader>
                  <>
                     <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Pokédex</Text>

                        {isLoading && (
                           <View style={{ paddingRight: 10 }}>
                              <ActivityIndicator color='#FFF' />
                           </View>
                        )}

                        {showError && <Text numberOfLines={1} style={styles.warning}>Invalid name / id</Text>}
                     </View>

                     <View style={styles.inputWrapper}>
                        <Ionicons
                           name='ios-search'
                           size={20}
                           color='#FFF'
                           style={{ marginLeft: 16, marginRight: 8 }}
                        />
                        <TextInput
                           style={styles.searchInput}
                           autoCompleteType={'off'}
                           placeholder='What pokémon are you looking for?'
                           value={searchValue}
                           onChangeText={text => setSearchValue(text)}
                           returnKeyType='search'
                           placeholderTextColor='#FFF'
                           onSubmitEditing={searchForPokemon}
                           clearButtonMode='while-editing'
                           keyboardAppearance='default'
                           numberOfLines={1}
                           autoCorrect={false}
                        />
                     </View>
                  </>
               </ListHeader>
            )}
            ListFooterComponent={() => (
               <View style={styles.listFooter}>
                  <ActivityIndicator size='small' color='#444' />
               </View>
            )}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      paddingBottom: 20
   },

   titleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
      paddingBottom: 5,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      zIndex: 5
   },
   title: {
      fontFamily: 'Roboto700',
      fontSize: 45,
      color: '#FFF'
   },

   inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
      borderRadius: 50,

      height: 40,
      paddingRight: 10
   },
   searchInput: {
      fontSize: 14,
      color: '#FFF',
      flex: 1,
      fontWeight: '500'
   },

   warning: {
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: 13.5,
      textAlign: 'center',
      fontWeight: '600'
   },

   listFooter: {
      marginTop: 20,
      marginBottom: 10
   }
})

export default Home