import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PrimaryLoader from '../../components/ui/loaders/PrimaryLoader';
import { Logo2, DeniedError } from '../../assets/svg-icons';
import { setAccessTokenInHeader } from '../../data/axiosInstance';
import { remoteConfig } from '../../data/integrations/firebase';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { setRemoteConfig } from '../../data/features/remoteConfigSlice';
import { getLocalStorageDetails } from '../../data/utils';
import { AuthService } from '../../data/services';
import { fetchRules } from '../../data/features/ruleLibrary/ruleLibraryActions';
import classes from './_signIn.module.scss';

const SignIn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const localStorageData = getLocalStorageDetails();

	const [signInError, setSignInError] = useState(false);
	const [isLoadingSignIn, setIsLoadingSignin] = useState(false);

	const [searchParams] = useSearchParams();
	const session = searchParams.get('session');

	useEffect(() => {
		fetchAndActivate(remoteConfig)
			.then(() => {
				const configs = getAll(remoteConfig);
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
			const userData = await AuthService.verifyGoogleUser(
				googleData.credential
			);

			if (userData?.status_code === 200) {
				AuthService.setUserDataInLocalStorage(userData?.data);
				setAccessTokenInHeader(userData?.data.access_token);
				const expiryDate = new Date(
					new Date().setHours(new Date().getHours() + 10)
				);
				AuthService.setTokenExpiryDateInLocalStorage(expiryDate);

				dispatch(fetchRules());

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
											onSuccess={handleLogin}
											onError={() => {
												console.error('Login Failed');
											}}
											useOneTap={session === 'expired'}
											shape='circle'
											auto_select
											width='300'
										/>
									</div>
									<div className={classes.helpText}>
										<p>
											Need help signing in? Please write an email to
											<br />
											<a
												href='mailto:cms@by433.com'
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
