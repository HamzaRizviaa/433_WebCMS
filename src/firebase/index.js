/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { fetchAndActivate } from 'firebase/remote-config';
import { getValue } from 'firebase/remote-config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB05TkfDSdfr7rXKTwXLbbVAhWnkyw9Crs',
	authDomain: 'cms--433.firebaseapp.com',
	projectId: 'cms--433',
	storageBucket: 'cms--433.appspot.com',
	messagingSenderId: '778398059487',
	appId: '1:778398059487:web:de5296c0b0cccef98c526a',
	measurementId: 'G-2N9B5CKG28'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig();

const initializeFB = async () => {
	return await fetchAndActivate(remoteConfig);
};

const isFetched = initializeFB();

let message = '';

if (isFetched) {
	console.log('message', 'Here');
	message = getValue(remoteConfig, 'message');
} else {
	// if not fetched
}

export { message };
