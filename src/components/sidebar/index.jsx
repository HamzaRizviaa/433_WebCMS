import React, { useEffect, useState } from 'react';
import { useStyles } from './index.styles';
import { useNavigate, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as Quiz } from '../../assets/Quiz.svg';
import { ReactComponent as Banner } from '../../assets/Star.svg';
import { ReactComponent as News } from '../../assets/News.svg';
import { ReactComponent as Viral } from '../../assets/Flame.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { ReactComponent as Article } from '../../assets/ArticleIcon.svg';
// import { ReactComponent as Games } from '../../assets/Games.svg';
// import { ReactComponent as Share } from '../../assets/share.svg';
// import { ReactComponent as ArticleSelected } from '../../assets/NewsSelected.svg';
import { useGoogleLogout } from 'react-google-login';
import Tooltip from '../Tooltip';
import { remoteConfig } from '../../firebase';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { setRemoteConfig } from '../../store/remoteConfigSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [mainClass, setMainClass] = useState('main');
	const classes = useStyles({ mainClass });

	const clientId =
		'761006834675-0717aiakfe9at8d7jahf10hdgevu7acg.apps.googleusercontent.com';

	const onLogoutSuccess = (res) => {
		console.log('Logged out Success', res);
		localStorage.removeItem('user_data');
		navigate('/sign-in');
	};

	const onFailure = () => {
		console.log('Handle failure cases');
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure
	});

	const checkDomain = (href) => {
		if (href.includes('localhost')) {
			return 'dev';
		} else if (href.includes('dev')) {
			return 'dev';
		} else if (href.includes('staging')) {
			return 'staging';
		} else {
			return 'prod';
		}
	};

	useEffect(() => {
		fetchAndActivate(remoteConfig)
			.then(() => {
				let configs = getAll(remoteConfig);
				console.log('Configs getAll', configs);
				dispatch(setRemoteConfig(configs));
			})
			.catch((err) => {
				console.log('err fetch and activate', err);
				dispatch(setRemoteConfig({}));
			});
	}, []);

	useEffect(() => {
		if (window && window.location) {
			setMainClass(checkDomain(window.location.href));
		}
	}, []);

	return (
		<span className={classes[mainClass]}>
			<div className={classes.navContainer}>
				<div className={classes.logoContainer}>
					<Logo className={classes.logo} />
					<p className={classes[`${mainClass}Text`]}> {mainClass} </p>
				</div>

				<NavLink
					to='/news-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'News'} placement='right'>
						<span className={classes[`${mainClass}Article`]}>
							<News className={classes.icon} />
						</span>
					</Tooltip>
				</NavLink>

				<NavLink
					to='/media-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'Media'} placement='right'>
						<Media className={classes.icon} />
					</Tooltip>
				</NavLink>

				<NavLink
					to='/question-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'Questions'} placement='right'>
						<Quiz className={classes.icon} />
					</Tooltip>
				</NavLink>

				<NavLink
					to='/top-banner'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'Top Banners'} placement='right'>
						<Banner className={classes.icon} />
					</Tooltip>
				</NavLink>

				<NavLink
					to='/article-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'Articles'} placement='right'>
						<Article className={classes.icon} />
					</Tooltip>
				</NavLink>

				<NavLink
					to='/viral-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Tooltip title={'Virals'} placement='right'>
						<Viral className={classes.icon} />
					</Tooltip>
				</NavLink>
				{/* <NavLink
					to='/games-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					<Games className={[classes.icon, classes.gamesIcon].join(' ')} />
				</NavLink> */}
			</div>

			<div onClick={signOut} className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;

{
	/* <NavLink
					to='/post-library'
					className={({ isActive }) =>
						isActive ? classes[`${mainClass}ActiveRoute`] : classes.iconWrapper
					}
				>
					
					<span className={classes[`${mainClass}Post`]}>
						<Share className={classes.icon} />
					</span>
				</NavLink> */
}
