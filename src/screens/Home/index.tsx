import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput } from 'react-native'

import PokemonMiniature from '../../components/PokemonMiniature'
import ListHeader from '../../components/ListHeader'

import { useNavigation } from '@react-navigation/native'

import { RootState } from '../../../store/types/rootState'
import { useSelector, useDispatch } from 'react-redux'
import * as pokemonsActions from '../../../store/actions/pokemons'

import { Ionicons } from '@expo/vector-icons'

import TransparentStatusBar from '../../components/TransparentStatusBar'
import { useSharedValue } from 'react-native-reanimated'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'


const Home = () => {
   const pokemons = useSelector((state: RootState) => state.pokemons.pokemons)
   const actualOffset = useSelector((state: RootState) => state.pokemons.actualOffset)

   const navigator = useNavigation()
   const dispatch = useDispatch()

   const screenY = useSharedValue(0)

   const [searchValue, setSearchValue] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [showError, setShowError] = useState<boolean>(false)


   const searchForPokemon = async () => {
      if (!searchValue.trim())
         return setShowError(true)

      setShowError(false)
      setIsLoading(true)
      const pokemonData = await pokemonsActions.getPokemonData(searchValue.trim().toLowerCase())
      setIsLoading(false)

      if (pokemonData) {
         setSearchValue('')
         navigator.navigate('information', { pokemonData })
      }
      else
         setShowError(true)
   }

   const listEndReached = () => {
      dispatch(pokemonsActions.getMorePokemons(actualOffset))
   }

   if (!pokemons)
      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='small' color='#444' />
         </View>
      )

   return (
      <View>
         <FocusAwareStatusBar barStyle='light-content' hidden={false} />
         <TransparentStatusBar screenY={screenY} opacityInput={[0, 150]} />

         <FlatList
            onScroll={event => {
               const y = event.nativeEvent.contentOffset.y
               screenY.value = y
            }}
            keyExtractor={(pokemon, index) => pokemon.name + index}
            data={pokemons}
            renderItem={pokemon => <PokemonMiniature pokemon={pokemon.item} />}
            initialNumToRender={10}
            bounces={false}

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
                           size={22}
                           color='#FFF'
                           style={{ marginLeft: 15, marginRight: 10 }}
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
            showsVerticalScrollIndicator={false}

            onEndReached={listEndReached}
            contentContainerStyle={styles.container}
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
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 50,

      paddingVertical: 8,
      paddingRight: 10,
      maxHeight: 60
   },
   searchInput: {
      fontSize: 16.5,
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