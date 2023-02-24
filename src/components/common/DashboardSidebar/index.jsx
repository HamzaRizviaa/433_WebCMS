import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useSelector } from 'react-redux';

import {
	Logo,
	Media,
	Quiz,
	Banner,
	News,
	Viral,
	Logout,
	Article,
	RuleLibrary,
	UserManagement
} from '../../../assets/svg-icons';
import TextTooltip from '../../ui/TextTooltip';
import { AuthService, UserService } from '../../../data/services';
import { rulesLibraryFeatureFlag } from '../../../data/selectors';
import { useStyles } from './index.styles';
import { usePermissionsAccessControl } from '../../../hooks';

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

	const { permissions } = usePermissionsAccessControl();

	return (
		<span className={classes.sidebarWrapper}>
			<div className={classes.navContainer}>
				<div className={classes.logoContainer}>
					<Logo className={classes.logo} />
					<p className={classes.navText}>{env}</p>
				</div>

				{permissions?.News.hasAccess && (
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
				)}
				{permissions?.Media.hasAccess && (
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
				)}
				{permissions?.Questions.hasAccess && (
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
				)}
				{permissions?.Banners.hasAccess && (
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
				)}
				{permissions?.Articles.hasAccess && (
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
				)}
				{permissions?.Virals.hasAccess && (
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
				)}
				{isRulesLibraryEnabled && permissions?.Rules.hasAccess && (
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
			<div>
				{permissions && permissions['User Management'].hasAccess && (
					<NavLink
						to='/user-management-library'
						className={({ isActive }) =>
							isActive ? classes.rbacRoute : classes.iconWrapper
						}
					>
						<TextTooltip title='RBAC' placement='right'>
							<UserManagement className={classes.icon} />
						</TextTooltip>
					</NavLink>
				)}
				<div onClick={handleLogout} className={classes.logoutContainer}>
					<Logout className={classes.icon} />
				</div>
			</div>
		</span>
	);
};

export default Sidebar;
