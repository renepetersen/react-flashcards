import React, { Component } from 'react'
import { View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView} from 'react-native'
import { getDecks } from '../utils/api'
import { DeckDetail } from '../components/DeckDetail'

import { purple, white } from '../constants/colors'
import { objectSort } from '../utils/helpers'

// 1.Deck List View (Default View - Dashboard)
// displays the title of each Deck
// displays the number of cards in each deck


class Decks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			decks: {}
		}
	}
	componentDidMount() {
		getDecks()
			.then(results => this.doUpdate(results))
	}
	doUpdate = (results) => {
		Object.keys(results).length > 0 && (
			results = objectSort(results)
		)
		return this.setState(
			{ decks: results }
		)
	}
	openDeckDetail (deckId) {
		const { navigate } = this.props.navigation
 
		return navigate('DeckDetail', { deckId })
	}
	render() {
		const { decks } = this.state

		return (
			<ScrollView style={styles.scrollcontainer}>
				<Text style={[styles.header]}>Your Flashcards</Text>

				{Object.keys(decks).map((item) => {
					const deckTitle = decks[item].title
					
					return (
						<View key={item}>
							<TouchableOpacity 
								onPress={() => this.openDeckDetail(deckTitle)}
								style={styles.deckitem}>
								<Text style={styles.decktitle}>{deckTitle}</Text>
								<Text style={styles.deckamount}>{decks[item].questions.length} cards</Text>
							</TouchableOpacity>
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	scrollcontainer: {
	},
	header: {
		marginTop: 25,
		fontSize: 30,
		fontWeight: '500',
		paddingBottom: 20,
		color: purple,
		textAlign: 'center'
	},
	deckitem: {
		flex: 1,
		alignItems: 'center',
		borderRadius: 3,
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 20,
		justifyContent: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOpacity: 0.8,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 3
		},
		backgroundColor: white,
	},
	decktitle: {
		fontWeight: '500',
		fontSize: 22,
	},
	deckamount: {
		fontSize: 18
	}
})

export default Decks