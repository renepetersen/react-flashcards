import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { purple, white } from '../constants/colors'
import { Foundation } from '@expo/vector-icons'


class ResetDecks extends Component {
	clearAsyncStorage = async() => {
		AsyncStorage.clear();

		const { navigate, dispatch } = this.props.navigation

		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home'})
			]
		})
		dispatch(resetAction)
		navigate( 'Home')
	}
	render() {
		return (
			<View style={styles.center}>

				<View>
					<Text style={{textAlign:'center'}}>
						<Foundation name='alert' size={50} />
					</Text>

					<Text style={{textAlign:'center'}}>
						Attention
					</Text>				
					<Text style={[{marginBottom: 25},{textAlign:'center'}]}>
						By pressing this button will remove all your cards ! The default set will be displayed.
					</Text>
				</View>

				<TouchableOpacity onPress={this.clearAsyncStorage}>
					<Text style={styles.button}>Remove all cards</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
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

export default ResetDecks