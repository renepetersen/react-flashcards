import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
const NOTIFICATION_KEY = 'Flashcards:notifications'

export function objectSort( src ) {
	const keys = Object.keys( src );
	keys.sort();
	return keys.reduce(( target, key ) => {
		target[ key ] = src[ key ];
		return target;
	}, {});
};

export function getDailyReminderValue () {
	return {
		today: "Don't forget to study !"
	}
}

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
	return {
		title: 'Flexcards',
			body: "Hello, this is a reminder...",
			ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then((data) => {
		if (data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS)
			.then(({status}) => {
				
				if (status === 'granted') {
					Notifications.cancelAllScheduledNotificationsAsync()

					let NotificationDate  = new Date(Date.now() + ((24 * 3600) * 1000)) //24 hours

					Notifications.scheduleLocalNotificationAsync(
						createNotification(),
						{
							time: NotificationDate,
							repeat: 'day'
						}
					)

					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
				}
			})
		}
	})
}