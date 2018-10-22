import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { purple, white, black } from '../constants/colors'
import { getDeck } from '../utils/api'
import { Feather } from '@expo/vector-icons'

// 3. Quiz View
// displays a card question
// an option to view the answer (flips the card)
// a "Correct" button
// an "Incorrect" button
// the number of cards left in the quiz
// Displays the percentage correct once the quiz is complete


class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: {
				questions: [
					{
						question: '',
						answer: '',
					}
				]
			},
			questionIndex: 0,
			totalCorrect: 0,
			flipCard: false,
			showResult: false
		}
	}
	componentDidMount() {
		getDeck(this.props.navigation.state.params.deckId)
			.then(( results ) => {
				this.setState(() => (
					{ deck: results }
				))
			})
	}
	goToNextQuestion = (questionIndex, deck) => {
		questionIndex++

		(questionIndex >= deck.questions.length)
			?	this.setState(() => (
					{ showResult: true }
				))
			: 	this.setState(() => (
					{ questionIndex: questionIndex }
				))
	}
	handleCorrectAnswer = (questionIndex, deck) => {
		this.setState(() => (
			{ totalCorrect: this.state.totalCorrect + 1 }
		))

		this.goToNextQuestion(questionIndex, deck)
	}
	flipCard = (flipCard) => 
		this.setState(() => (
			{ flipCard: !flipCard }
		)
	)
	goToHome = (item) => {
		return this.props.navigation.navigate('Home')
	}
	restartQuiz = () => {
		this.setState(() => ({
			showResult: false,
			totalCorrect: 0,
			questionIndex: 0
		}))
	}
	static navigationOptions = ({ navigation }) => ({
		title: 'Quiz ' + navigation.state.params.deckId
	})
	render() {
		const { deck, questionIndex, totalCorrect, showResult, flipCard } = this.state

		return showResult 
		? (
			<View style={styles.center}>
				<Text style={[styles.header]}>
					You got {totalCorrect} out of {deck.questions.length}
				</Text>

				<Text style={[styles.header]}>
					Score: {(totalCorrect / deck.questions.length * 100).toFixed(0)}%
				</Text>

				<TouchableOpacity onPress={() => this.goToHome(deck.title)}>
					<Text style={styles.button}>Back to decks</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => this.restartQuiz()}>
					<Text style={styles.button}>Restart quiz</Text>
				</TouchableOpacity>
			</View>
		) : (
			// Flatlist
			<ScrollView>
				<View style={styles.center}>
					<View style={styles.card}>
						<Text style={[styles.header]}>
							{flipCard
								? deck.questions[questionIndex].answer
								: deck.questions[questionIndex].question
							}
						</Text>
						
						<TouchableOpacity onPress={() => this.flipCard(flipCard)}>
							<Text style={styles.button}>
								{!flipCard 
									? 'Answer ' 
									: 'Question '}
									<Feather name='refresh-cw' size={14} style={{marginLeft: 10}} />
								</Text>
						</TouchableOpacity>
	
						<View style={styles.answercontainer}>
							<TouchableOpacity 
								onPress={() => this.goToNextQuestion(questionIndex, deck)}
								style={[styles.buttonansw, {flex: 1, backgroundColor: '#e3bab4'}]}>
								<Text style={[styles.buttonanswText, {color: '#be5d53'}]}>Incorrect</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => this.handleCorrectAnswer(questionIndex, deck)}
								style={[styles.buttonansw, {flex: 1, backgroundColor: '#cbd38a'}]}>
								<Text style={[styles.buttonanswText, {color: '#95a25a'}]}>Correct</Text>
							</TouchableOpacity>
						</View>
					</View>

					<Text style={{color: '#cccccc'}}>
						{questionIndex + 1} of {deck.questions.length}
					</Text>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
	},
	card: {
		flex: 1,
		alignItems: 'center',
		borderRadius: 3,
		paddingTop: 40,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 40,
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
	header: {
		marginBottom: 40,
		fontSize: 30,
		color: purple,
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
		marginBottom: 40,
		width: 200
	},
	buttonansw: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 7,
		paddingBottom: 7,
	},	
	buttonanswText: {
		textAlign: 'center',
		color: purple,
		fontSize: 18,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
	answercontainer: {
		flexDirection: 'row',
		alignContent: 'stretch',
	}
})

export default Quiz