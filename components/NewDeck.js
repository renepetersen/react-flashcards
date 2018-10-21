import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { 
	View, 
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity} from 'react-native'
import { purple, white, gray } from '../constants/colors'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions, StackActions } from 'react-navigation'

// 4. New Deck View
// An option to enter in the title for the new deck
// An option to submit the new deck title


class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
		}
	}
	handleChange = (inputText) => {
		this.setState(() => ({
			inputText
		}))
	}
	handleSaveButton = () => {
		return saveDeckTitle(this.state.inputText)
			.then(this.goToDeckDetail(this.state.inputText))
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
		navigate( 'DeckDetail', { deckId: deckId })
	}

	render() {
		const { inputText } = this.state

		return (
			<KeyboardAvoidingView behavior='padding' style={styles.center}>
				<Text style={[styles.header]}>What is the title of your new deck?</Text>

				<TextInput
					onChangeText={this.handleChange}
					value={inputText}
					placeholder={'Deck Title'}
					style={styles.input}
				/>

				<TouchableOpacity 
					onPress={this.handleSaveButton}
					disabled={this.state.inputText === '' ? true : false }>
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

export default NewDeck