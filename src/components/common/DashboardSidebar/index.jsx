import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import TextTooltip from '../../ui/TextTooltip';
import { useSelector } from 'react-redux';
import { useStyles } from './index.styles';
import {
	Logo,
	Media,
	Quiz,
	Banner,
	News,
	Viral,
	Logout,
	Article,
	RuleLibrary
} from '../../../assets/svg-icons';
import { AuthService, UserService } from '../../../data/services';
import { rulesLibraryFeatureFlag } from '../../../data/selectors';

const checkDomain = (href) => {
	if (href.includes('localhost')) {
		return 'dev';
	} else if (href.includes('dev')) {
		return 'dev';
	} else if (href.includes('staging')) {
		return 'staging';
	} else if (href.includes('qa')) {
		return 'qa';
	} else {
		return 'prod';
	}
};

const Sidebar = () => {
	const navigate = useNavigate();

	const [env, setEnv] = useState('prod');

	const handleLogout = async () => {
		googleLogout();
		const response = await UserService.logout();
		if (response?.data.status_code == 200) {
			AuthService.removeTokenFromLocalStorage();
			navigate('/sign-in');
		}
	};

	useLayoutEffect(() => {
		if (window && window.location) {
			setEnv(checkDomain(window.location.href));
		}
	}, []);

	const classes = useStyles({ env });
	const rulesLibraryFeature = useSelector(rulesLibraryFeatureFlag);
	const isRulesLibraryEnabled = rulesLibraryFeature?._value === 'true';

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
				{isRulesLibraryEnabled && (
					<NavLink
						to='/rule-library'
						className={({ isActive }) =>
							isActive ? classes.activeRoute : classes.iconWrapper
						}
					>
						<TextTooltip title='Rule' placement='right'>
							<span className={classes.newsIcon}>
								<RuleLibrary className={classes.icon} />
							</span>
						</TextTooltip>
					</NavLink>
				)}
			</div>

			<div onClick={handleLogout} className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;
