import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation' 
import { Constants } from 'expo'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'

import { purple, white } from './constants/colors'
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons'


function FlashcardsStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.StatusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = createBottomTabNavigator({
	Decks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => <Foundation name='page-multiple' size={30} color={tintColor} />
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='new-box' size={30} color={tintColor} />
		}
	},
},
{
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: purple,
		style: {
			height: 56,
			backgroundColor:  white,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
})

export default class App extends React.Component {
	render() {
		return (
			<View style={{flex:1}}>
				<FlashcardsStatusBar backgroundColor={purple} barStyle='light-content' />
				<MainNavigator />
			</View>
		);
	}
}