import React, { Component } from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity} from 'react-native'
import { purple, white, gray } from '../constants/colors'
import { addCardToDeck } from '../utils/api'

// 5. New Question View
// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question


class AddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			question: '',
			answer: ''
		}
	}
	componentDidMount() {
		const { deckId } = this.props.navigation.state.params

		this.setState(() => ({
			title: deckId
		}))
	}
 	handleSaveButton = () => {
		const {title, question, answer } = this.state

		return addCardToDeck(title, {
			question: question,
			answer: answer
		}).then(() => this.goToDeckDetail(title))
	}

	goToDeckDetail = (deckId) => {
		const { navigate, dispatch } = this.props.navigation
		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home', params: { deckId }})
			]
		})

		dispatch(resetAction)
		navigate('DeckDetail', { deckId: deckId })
	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.center}>
				<Text style={[styles.header]}>Add Card</Text>

				<Text style={[styles.label]}>Your question</Text>
				<TextInput
					style={styles.input}
					onChangeText={question => this.setState({ question })}
					value={this.question}
					placeholder={'Question'}
				/>
				
				<Text style={[styles.label]}>Your Answer</Text>
				<TextInput
					style={styles.input}
					onChangeText={answer => this.setState({ answer })}
					value={this.answer}
					placeholder={'Answer'}
				/>

				<TouchableOpacity 
					onPress={this.handleSaveButton}
					disabled={(this.state.question === '' || this.state.answer === '') ? true : false }>
					<Text style={styles.button}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
	header: {
		marginBottom: 20,
		fontSize: 30,
		color: purple,
		textAlign: 'center'
	},
	label: {
		marginBottom: 10,
		fontSize: 24,
		color: purple,
		textAlign: 'center'
	},	
	input: {
		height: 40,
		width: 300,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
		borderColor: gray,
		borderWidth: 1,
		borderRadius: 3,
		marginBottom: 20,
		backgroundColor: white,
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
		fontWeight: '500'
	}
})

export default AddCard