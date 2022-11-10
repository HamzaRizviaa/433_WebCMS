import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import TextTooltip from '../../ui/TextTooltip';
import { useStyles } from './index.styles';
import {
	Logo,
	Media,
	Quiz,
	Banner,
	News,
	Viral,
	Logout,
	Article
} from '../../../assets/svg-icons';
import { UserService } from '../../../data/services';

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

const clientId =
	'761006834675-0717aiakfe9at8d7jahf10hdgevu7acg.apps.googleusercontent.com';

const Sidebar = () => {
	const navigate = useNavigate();

	const [env, setEnv] = useState('prod');

	const onLogoutSuccess = async(res) => {
		console.log('Logged out Success', res);
		const response = await UserService.logout()
		if(response?.data.status_code == 200){
			localStorage.removeItem('user_data');
			navigate('/sign-in');
		}
	};

	const onFailure = () => {
		console.log('Handle failure cases');
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure
	});

	useLayoutEffect(() => {
		if (window && window.location) {
			setEnv(checkDomain(window.location.href));
		}
	}, []);

	const classes = useStyles({ env });

	return (
		<span className={classes.sidebarWrapper}>
			<div className={classes.navContainer}>
				<div className={classes.logoContainer}>
					<Logo className={classes.logo} />
					<p className={classes.navText}>{env}</p>
				</div>

				<NavLink
					to='/news-library'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='News' placement='right'>
						<span className={classes.newsIcon}>
							<News className={classes.icon} />
						</span>
					</TextTooltip>
				</NavLink>

				<NavLink
					to='/media-library'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='Media' placement='right'>
						<Media className={classes.icon} />
					</TextTooltip>
				</NavLink>

				<NavLink
					to='/question-library'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='Questions' placement='right'>
						<Quiz className={classes.icon} />
					</TextTooltip>
				</NavLink>

				<NavLink
					to='/top-banner'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='Top Banners' placement='right'>
						<Banner className={classes.icon} />
					</TextTooltip>
				</NavLink>

				<NavLink
					to='/article-library'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='Articles' placement='right'>
						<Article className={classes.icon} />
					</TextTooltip>
				</NavLink>

				<NavLink
					to='/viral-library'
					className={({ isActive }) =>
						isActive ? classes.activeRoute : classes.iconWrapper
					}
				>
					<TextTooltip title='Virals' placement='right'>
						<Viral className={classes.icon} />
					</TextTooltip>
				</NavLink>
			</div>

			<div onClick={signOut} className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;
