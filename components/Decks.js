import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { getDecks } from '../utils/api'
import { DeckDetail } from '../components/DeckDetail'

import { purple, white } from '../constants/colors'

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
			.then(results => { 
				this.setState(
					{ decks: results }
				)
			})
	}

	openDeckDetail (deckId) {
		const { navigate } = this.props.navigation
 
		return navigate('DeckDetail', { deckId })
	}
	render() {
		const { decks } = this.state

		return (
			<View style={styles.center}>
				{Object.keys(decks).map((item) => {
					const deckTitle = decks[item].title
					
					return (
						<View key={item}>
							<TouchableOpacity onPress={() => this.openDeckDetail(deckTitle)}>
								<Text>{deckTitle}</Text>
							</TouchableOpacity>
						</View>
					)
				})}
			</View>
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
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
	},
})

export default Decks