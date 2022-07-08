import React, { useState, useEffect } from 'react';
import classes from './_signIn.module.scss';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
//import { ReactComponent as LogoSpinner } from '../../assets/logoSpinner.svg';
import Four33Loader from '../../assets/Loader_Yellow.gif';

import { ReactComponent as Logo2 } from '../../assets/Logo2.svg';
//import { ReactComponent as BGImage } from '../../assets/BG.svg';
// import { ReactComponent as BGImage } from '../../assets/GlobeBG.svg';
import { ReactComponent as DeniedError } from '../../assets/AccesDenied.svg';

const SignIn = ({ setLoginData }) => {
	const [signInError, setSignInError] = useState(false);
	const [isLoadingSignIn, setIsLoadingSignin] = useState(false);
	const [accessExpire, setAccessExpire] = useState(false);

	// useEffect(() => {
	// 	return () => {
	// 		setSignInError(false);
	// 	};
	// }, []);

	const navigate = useNavigate();

	// const refreshTokenSetup = (res) => {
	// 	// Timing to renew access token
	// 	let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

	// 	const refreshToken = async () => {
	// 		const newAuthRes = await res.reloadAuthResponse();
	// 		refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
	// 		console.log('newAuthRes:', newAuthRes);
	// 		// saveUserToken(newAuthRes.access_token);  <-- save new token
	// 		localStorage.setItem('authToken', newAuthRes.id_token);

	// 		// Setup the other timer after the first one
	// 		setTimeout(refreshToken, refreshTiming);
	// 	};

	// 	// Setup first refresh timer
	// 	setTimeout(refreshToken, refreshTiming);
	// };

	// const handleFailure = (e) => {
	// 	console.log('failure', e);
	// };

	// const checkSessionTimeout = (initialTimeVal) => {
	// 	let minutes = Math.abs((initialTimeVal - new Date()) / 1000 / 60);
	// 	// console.log('malamal');
	// 	console.log(minutes, 'm');
	// 	console.log(initialTimeVal, 'i');
	// 	console.log(new Date());
	// 	if (minutes >= 120) {
	// 		//alert('Your session has expired');
	// 		localStorage.removeItem('user_data');
	// 		setAccessExpire(false);
	// 		navigate('/sign-in');
	// 		clearInterval(setTimeOutId);
	// 	}
	// };

	// let setTimeOutId;

	// useEffect(() => {
	// 	console.log(accessExpire);
	// 	if (accessExpire) {
	// 		console.log('aE is true');
	// 		let initialTime = new Date();
	// 		setTimeOutId = setInterval(() => checkSessionTimeout(initialTime), 1000); //3600000 - 1 hour
	// 	}
	// }, [accessExpire]);

	useEffect(() => {
		console.log(accessExpire, 'ae');
		if (accessExpire) {
			let expiryDate = new Date(
				// new Date().setMinutes(new Date().getMinutes() + 2)
				new Date().setHours(new Date().getHours() + 10)
			);
			localStorage.setItem('token_expire_time', expiryDate);
		}

		return () => {
			setAccessExpire(false);
		};
	}, [accessExpire]);

	const handleLogin = async (googleData) => {
		setIsLoadingSignin(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/cmsuser/verify-google-user`,
				{
					token: googleData.tokenId
				}
			);

			if (result?.data?.status_code === 200) {
				setLoginData(
					localStorage.setItem('user_data', JSON.stringify(result?.data?.data))
				);
				// console.log(result, 'try - login result');

				// setTimeout(() => {
				// 	//remove localStorage data when token expires (12 hours) 43200000 - 12 hours , 3600000 -1 hour
				// 	alert('Your session has expired');
				// 	localStorage.removeItem('user_data');
				// 	navigate('/sign-in');
				// }, [3600000]);

				setAccessExpire(true);
				setIsLoadingSignin(false);
				//console.log(result?.data);
				navigate('/news-library');
				setSignInError(false);
			}
		} catch (e) {
			// console.log('catch - login result');
			setSignInError(true);
			setIsLoadingSignin(false);
			// setAccessExpire(false);
			// setLoginData(null);
			console.log(e, googleData.profileObj.email);
		}
		// console.log('out of catch - login result');
		setSignInError(true);
		setIsLoadingSignin(false);
		// refreshTokenSetup(googleData);
	};

	// const handleLogout = () => {
	// 	console.log('logout');
	// 	localStorage.removeItem('loginData');
	// 	setLoginData(null);
	// };

	return (
		<>
			<div className={classes.root}>
				<LoadingOverlay
					active={isLoadingSignIn}
					// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
					spinner={
						<img src={Four33Loader} className={classes.loader} alt='loader' />
					}
					//text='is loading...'
				>
					<div className={classes.signinRoot}>
						<div className={classes.panel}>
							<div className={classes.content}>
								<div className={classes.w100}>
									<div className={classes.LogoIconWrapper}>
										<Logo2 className={classes.Logo} />
									</div>
									<div className={classes.welcomeText}>
										Welcome to 433 Content Management System
									</div>
									{signInError ? (
										<div className={classes.errorWrapper}>
											<DeniedError />
											<span className={classes.errorMsg}>
												<div className={classes.errorMsgTop}>Access Denied</div>
												You can only access the CMS with your 433 email account
											</span>
										</div>
									) : (
										<></>
									)}
									<div className={classes.googleButtonWrapper}>
										<GoogleLogin
											className={classes.googleButton}
											clientId='761006834675-0717aiakfe9at8d7jahf10hdgevu7acg.apps.googleusercontent.com'
											buttonText='Sign In with Google'
											onSuccess={handleLogin}
											//onFailure={handleFailure}
											//hostedDomain={'by433.com'}
											//isSignedIn={true}
											//uxMode={'redirect'}
											prompt={'consent'}
											cookiePolicy={'single_host_origin'}
											// accessType={'offline'}
											// responseType={'code'}
										/>
									</div>
									<div className={classes.helpText}>
										<p>
											Need help signing in? Please write an email to
											<br />
											<a
												href={'https://www.433football.com/'}
												target='_blank'
												rel='noopener noreferrer'
												style={{ color: '#ffff00' }}
											>
												cms@by433.com
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className={classes.rightBGImage}></div>
					</div>
				</LoadingOverlay>
			</div>
		</>
	);
};

SignIn.propTypes = {
	//loginData: PropTypes.object.isRequired,
	setLoginData: PropTypes.func.isRequired
};

export default SignIn;
