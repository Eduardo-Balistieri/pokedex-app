import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import pokemonsReducer from './store/reducers/pokemons'
import favoritesReducer from './store/reducers/favorites'
import Routes from './src/Routes'


const rootReducer = combineReducers({
	pokemons: pokemonsReducer,
	favorites: favoritesReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))


const App = () => (
	<Provider store={store}>
		<StatusBar style='light' backgroundColor={'transparent'} animated />

		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	</Provider>
)

export default App