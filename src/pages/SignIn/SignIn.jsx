import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PrimaryLoader from '../../components/ui/loaders/PrimaryLoader';
import { Logo2, DeniedError } from '../../assets/svg-icons';
import { setAccessTokenInHeader } from '../../data/axiosInstance';
import { remoteConfig } from '../../data/integrations/firebase';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { setRemoteConfig } from '../../data/features/remoteConfigSlice';
import { getLocalStorageDetails } from '../../data/utils';
import { AuthService } from '../../data/services';
import classes from './_signIn.module.scss';
import { fetchRules } from '../../data/features/ruleLibrary/ruleLibraryActions';

const SignIn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const localStorageData = getLocalStorageDetails();

	const [signInError, setSignInError] = useState(false);
	const [isLoadingSignIn, setIsLoadingSignin] = useState(false);
	const [accessExpire, setAccessExpire] = useState(false);

	useEffect(() => {
		if (accessExpire) {
			let expiryDate = new Date(
				new Date().setHours(new Date().getHours() + 10)
			);
			AuthService.setTokenExpiryDateInLocalStorage(expiryDate);
		}

		return () => {
			setAccessExpire(false);
		};
	}, [accessExpire]);

	useEffect(() => {
		fetchAndActivate(remoteConfig)
			.then(() => {
				let configs = getAll(remoteConfig);
				dispatch(setRemoteConfig(configs));
			})
			.catch((err) => {
				console.error('Error fetch and activate', err);
				dispatch(setRemoteConfig({}));
			});
	}, []);

	const handleLogin = async (googleData) => {
		setIsLoadingSignin(true);
		try {
			const userData = await AuthService.verifyGoogleUser(googleData.tokenId);

			if (userData?.status_code === 200) {
				AuthService.setUserDataInLocalStorage(userData?.data);
				setAccessTokenInHeader(userData?.data.access_token);

				dispatch(fetchRules());

				setAccessExpire(true);
				setIsLoadingSignin(false);
				setSignInError(false);
				navigate('/news-library');
			}
		} catch (e) {
			setSignInError(true);
			setIsLoadingSignin(false);
		}

		setSignInError(true);
		setIsLoadingSignin(false);
	};

	if (localStorageData) return <Navigate to='/news-library' />;

	return (
		<>
			<div className={classes.root}>
				<PrimaryLoader loading={isLoadingSignIn} mainPage>
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
									{signInError && (
										<div className={classes.errorWrapper}>
											<DeniedError />
											<span className={classes.errorMsg}>
												<div className={classes.errorMsgTop}>Access Denied</div>
												You can only access the CMS with your 433 email account
											</span>
										</div>
									)}
									<div className={classes.googleButtonWrapper}>
										<GoogleLogin
											className={classes.googleButton}
											clientId='761006834675-0717aiakfe9at8d7jahf10hdgevu7acg.apps.googleusercontent.com'
											buttonText='Sign In with Google'
											onSuccess={handleLogin}
											prompt={'consent'}
											cookiePolicy={'single_host_origin'}
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
				</PrimaryLoader>
			</div>
		</>
	);
};

export default SignIn;
