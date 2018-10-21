import { AsyncStorage } from 'react-native'
import { initDecks } from './_DATA';

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

export function checkItems(items) {
	return items !== null ? JSON.parse(items) : setFirstDeck() 
}


//GetDecks: return all of the decks along with their titles, questions, and answers. 
export function getDecks() {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(checkItems)
}

function setFirstDeck() {
	AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initDecks))

	return initDecks
}


//GetDeck: take in a single id argument and return the deck associated with that id. 
export function getDeck(id) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(checkItems)
		.then(function(items) {
			return items[id]
		})
}


//SaveDeckTitle: take in a single title argument and add it to the decks. 
export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}})
	)
}

//AddCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, inputs) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(data => {
			decks = JSON.parse(data)
			decks[title].questions.push(inputs)
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
		})
}