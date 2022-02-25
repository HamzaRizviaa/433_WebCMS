import React, { useState } from 'react';
import classes from './_signIn.module.scss';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { ReactComponent as Logo2 } from '../../assets/Logo2.svg';
//import { ReactComponent as BGImage } from '../../assets/BG.svg';
// import { ReactComponent as BGImage } from '../../assets/GlobeBG.svg';
import { ReactComponent as DeniedError } from '../../assets/AccesDenied.svg';

const SignIn = ({ setLoginData }) => {
	const [signInError, setSignInError] = useState(false);
	// const [googleData, setGoogleData] = useState(null);
	//hamza code
	const navigate = useNavigate();

	const refreshTokenSetup = (res) => {
		// Timing to renew access token
		let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

		const refreshToken = async () => {
			const newAuthRes = await res.reloadAuthResponse();
			refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
			console.log('newAuthRes:', newAuthRes);
			// saveUserToken(newAuthRes.access_token);  <-- save new token
			localStorage.setItem('authToken', newAuthRes.id_token);

			// Setup the other timer after the first one
			setTimeout(refreshToken, refreshTiming);
		};

		// Setup first refresh timer
		setTimeout(refreshToken, refreshTiming);
	};

	// const handleFailure = (e) => {
	// 	console.log('failure', e);
	// };

	const handleLogin = async (googleData) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/cmsuser/verify-google-user`,
				{
					token: googleData.tokenId
				}
			);
			if (result?.data?.status_code === 200) {
				console.log(result?.data);
				setLoginData(
					localStorage.setItem('user_data', JSON.stringify(result?.data?.data))
				);
				navigate('/post-library');
				setSignInError(false);
			}
		} catch (e) {
			setSignInError(true);
			console.log(e, googleData.profileObj.email);
		}

		refreshTokenSetup(googleData);
	};

	// const handleLogout = () => {
	// 	console.log('logout');
	// 	localStorage.removeItem('loginData');
	// 	setLoginData(null);
	// };

	return (
		<>
			<div className={classes.root}>
				<div className={classes.signinRoot}>
					<div className={classes.panel}>
						<div className={classes.content}>
							<div className={classes.w100}>
								<div className={classes.LogoIconWrapper}>
									<Logo2 className={classes.Logo} />
								</div>
								<div className={classes.welcomeText}>
									Welcome to 433 Content Magament System
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
										//uxMode={'popup'}
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
			</div>
		</>
	);
};

SignIn.propTypes = {
	//loginData: PropTypes.object.isRequired,
	setLoginData: PropTypes.func.isRequired
};

export default SignIn;
