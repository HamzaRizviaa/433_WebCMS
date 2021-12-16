import React, {useState} from 'react';
import classes from './_sidebar.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as ShareSelected } from '../../assets/share_selected.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { ReactComponent as MediaSelected } from '../../assets/media_selected.svg';

const Sidebar = () => {
	//const selectedRoute = 'post-library';
	const [selectedRoute, setSelectedRoute] = useState('post-library')

	return (
		<span className={classes.main}>
			<div className={classes.navContainer}>
				<Logo className={classes.logo} />
				<div
					onClick={()=>setSelectedRoute('post-library')}
					className={classes.iconWrapper}
					style={
						selectedRoute === 'post-library'
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{selectedRoute === 'post-library' ? (
						<ShareSelected className={classes.icon} />
					) : (
						<Share className={classes.icon} />
					)}
				</div>
				<div
					onClick={()=>setSelectedRoute('media-library')}
					className={classes.iconWrapper}
					style={
						selectedRoute === 'media-library'
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{selectedRoute === 'media-library' ? (
						<MediaSelected className={classes.icon} />
					) : (
						<Media className={classes.icon} />
					)}
				</div>
			</div>

			<div className={classes.logoutContainer}>
				<Logout className={classes.icon} />
			</div>
		</span>
	);
};

export default Sidebar;
