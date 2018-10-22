import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { purple, white, black } from '../constants/colors'

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
				questions: []
			}
		}
	}
	componentDidMount() {
		// API In:Title Out:Object
		getDeck(this.props.navigation.state.params.deckId)
			.then(( results ) => {
				this.setState(() => ({ deck : results }))
			})
	}
	startQuiz = (deckId) => {
		const { navigate } = this.props.navigation

		return navigate('Quiz', { deckId })
	}
	handleNewCard = (deckId) => {
		const { navigate } = this.props.navigation

		return navigate('AddCard', { deckId })
	}
	render() {
		const { deck } = this.state

		if (deck) {
			return (
				<View style={styles.center}>
					<Text style={[styles.header]}>{deck.title}</Text>
					<Text style={[styles.subheader]}>{deck.questions.length} Cards</Text>

					{deck.questions.length > 0 ? ( 
						<TouchableOpacity onPress={() => this.startQuiz(deck.title)}>
							<Text style={styles.button}>Start Quiz</Text>
						</TouchableOpacity>
					) : (
						<Text style={{marginBottom: 20}}>Empty deck</Text>
					)}

					<TouchableOpacity onPress={() => this.handleNewCard(deck.title)}>
						<Text style={styles.button}>Add new card</Text>
					</TouchableOpacity>

				</View>
			)
		} 

		return null;
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
	header: {
		marginBottom: 20,
		fontSize: 30,
		color: purple,
		textAlign: 'center'
	},
	subheader: {
		marginBottom: 60,
		fontSize: 24,
		color: black,
		textAlign: 'center'
	},
	button: {
		borderRadius: 3,
		borderColor: purple,
		borderWidth: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 7,
		paddingBottom: 7,
		textAlign: 'center',
		color: purple,
		fontSize: 18,
		letterSpacing: 0.7,
		fontWeight: '500',
		marginBottom: 20,
		width: 300
	}
})

export default DeckDetail