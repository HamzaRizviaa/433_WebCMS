/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB05TkfDSdfr7rXKTwXLbbVAhWnkyw9Crs',
	authDomain: 'cms--433.firebaseapp.com',
	projectId: 'cms--433',
	storageBucket: 'cms--433.appspot.com',
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig();

remoteConfig.settings.minimumFetchIntervalMillis = 30;

export { remoteConfig };
