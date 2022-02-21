import React, { useState, useEffect } from 'react';
import classes from './_signIn.module.scss';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Logo2 } from '../../assets/Logo2.svg';
import { ReactComponent as BGImage } from '../../assets/BG.svg';
//import { ReactComponent as BGImage } from '../../assets/BG (1).png';
import { ReactComponent as DeniedError } from '../../assets/AccesDenied.svg';

const SignIn = () => {
	const [signInError, setSignInError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			setSignInError(false);
		};
	}, []);

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

	const responseGoogleSuccess = (res) => {
		setSignInError(false);
		console.log('Login Success: currentUser:', res.profileObj);
		alert(`Logged in successfully!  Welcome ${res.profileObj.name} 😍.`);

		navigate('/post-library');
		refreshTokenSetup(res);
	};

	const responseGoogleFailure = (res) => {
		setSignInError(true);
		console.log('Login failed: res:', res);
		alert(`Failed to login. 😢`);
	};

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
										onSuccess={responseGoogleSuccess}
										onFailure={responseGoogleFailure}
										hostedDomain={'by433.com'}
										isSignedIn={false}
										cookiePolicy={'single_host_origin'}
									/>
								</div>
								<div className={classes.helpText}>
									Need help signing in? Please write an email to
									<a
										href={'https://www.433football.com/'}
										target='_blank'
										rel='noopener noreferrer'
										style={{ color: '#ffff00' }}
									>
										cms@by433.com
									</a>
								</div>
							</div>
						</div>
					</div>
					{/* <div className={classes.bgImage}> */}
					<div>
						<BGImage className={classes.bgImage} />
						{/* <img
							src={require('../../assets/BG (1).png')}
							className={classes.bgImage}
							alt='logo'
						/> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default SignIn;
