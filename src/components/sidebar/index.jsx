/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import classes from './_sidebar.module.scss';
import { useStyles } from './index.styles';
import {
	useNavigate,
	useLocation
	// useParams
	// useHistory
} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as Quiz } from '../../assets/Quiz.svg';
import { ReactComponent as Banner } from '../../assets/Star.svg';
import { ReactComponent as Article } from '../../assets/News.svg';
import { ReactComponent as Viral } from '../../assets/Flame.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { ReactComponent as Games } from '../../assets/Games.svg';
import { useGoogleLogout } from 'react-google-login';

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const classes = useStyles();
	const [mainClass, setMainClass] = useState('main');

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
		} else if (href.includes('production')) {
			return 'prod';
		}
	};

	useEffect(() => {
		if (window && window.location) {
			setMainClass(checkDomain(window.location.href));
		}
	}, []);
	// console.log(urlParams, 'urlParams');
	// console.log(history, 'history');
	//<span className={[classes.mainClass,classes.abc2,classes.abc3]}>
	//<span className={[classes.mainClass,classes.abc2,classes.abc3].join(" ")}>

	return (
		<span className={classes[mainClass]}>
			<div className={classes.navContainer}>
				<div className={classes.logoContainer}>
					<Logo className={classes.logo} />
					<div className={classes.text}>{mainClass}</div>
				</div>

				<div
					onClick={() => {
						navigate('/media-library');
					}}
					className={classes.iconWrapper}
					style={
						location.pathname.includes('media-library')
							? {
									border: '2px solid black'
							  }
							: {}
					}
				>
					<Media className={classes.icon} />
				</div>
				<div
					onClick={() => {
						navigate('/question-library');
					}}
					className={classes.iconWrapper}
					style={
						location.pathname.includes('question-library')
							? { border: '2px solid black' }
							: {}
					}
				>
					<Quiz className={classes.icon} />
				</div>
				<div
					onClick={() => {
						navigate('/top-banner');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('top-banner')
							? { border: '2px solid black' }
							: {}
					}
				>
					<Banner className={classes.icon} />
				</div>
				<div
					onClick={() => {
						navigate('/article-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('article-library')
							? { border: '2px solid black' }
							: {}
					}
				>
					<span className={classes[`${mainClass}Article`]}>
						<Article className={classes.icon} />
					</span>
				</div>
				<div
					onClick={() => {
						navigate('/viral-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('viral-library')
							? { border: '2px solid black' }
							: {}
					}
				>
					<Viral className={classes.icon} />
				</div>
				<div
					onClick={() => {
						navigate('/games-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('games-library')
							? { border: '2px solid black' }
							: {}
					}
				>
					<Games className={classes.icon} />
				</div>
				{/* <div
					onClick={() => {
						navigate('/post-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('post-library')
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{location?.pathname.includes('post-library') ? (
						<ShareSelected className={classes.icon} />
					) : (
						<Share className={classes.icon} />
					)}
				</div> */}
			</div>

			<div onClick={signOut} className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;
