import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { purple, white } from '../constants/colors'

import { getDeck } from '../utils/api'

// 2. Individual Deck View
// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck


class DeckDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: {
				title: '',
				questions: ''
			}
		}
	}

	componentDidMount() {
		getDeck(this.props.navigation.state.params.deckId)
			.then(items => 
				this.setState(
					{ deck: items }
				)
			)
	}

	render() {
		const { deck } = this.state

		return (
			<View style={styles.center}>
				<Text >{deck.title}</Text>
				<Text>{deck.questions.length}</Text>
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

export default DeckDetail