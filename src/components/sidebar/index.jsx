import React from 'react';
import classes from './_sidebar.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';

const Sidebar = () => {
	const selectedRoute = 'post-library';
	return (
		<span className={classes.main}>
			<div className={classes.navContainer}>
				<Logo className={classes.logo} />
				<div
					className={classes.iconWrapper}
					style={
						selectedRoute === 'post-library'
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					<Share className={classes.icon} />
				</div>
				<div className={classes.iconWrapper}>
					<Media className={classes.icon} />
				</div>
			</div>

			<div className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;
