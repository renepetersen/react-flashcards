import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { purple, white } from '../constants/colors'

class NewDeck extends Component {
	render() {
		return (
			<View style={styles.center}>
				<Text>NewDeck</Text>
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

export default NewDeck