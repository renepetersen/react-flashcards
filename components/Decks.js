import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api'

import { purple, white } from '../constants/colors'

class Decks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			decks: {}
		}
	}
	componentDidMount() {
		getDecks()
			.then(results => { this.setState(() => ({ decks: results })) })
	}
	render() {
		const { decks } = this.state
		
		return (
			<View style={styles.center}>
				{Object.keys(decks).map((item) => {
					return (
						<View key={item}>
							<Text>{item}</Text>
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