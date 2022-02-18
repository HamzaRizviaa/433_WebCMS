import React from 'react';
import classes from './_sidebar.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as ShareSelected } from '../../assets/share_selected.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as MediaSelected } from '../../assets/media_selected.svg';
import { ReactComponent as Quiz } from '../../assets/Quiz.svg';
import { ReactComponent as QuizSelected } from '../../assets/QuizSelected.svg';
import { ReactComponent as Banner } from '../../assets/Star.svg';
import { ReactComponent as BannerSelected } from '../../assets/Star_Selected.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<span className={classes.main}>
			<div className={classes.navContainer}>
				<Logo className={classes.logo} />
				<div
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
				</div>
				<div
					onClick={() => {
						navigate('/media-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('media-library')
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{location?.pathname.includes('media-library') ? (
						<MediaSelected className={classes.icon} />
					) : (
						<Media className={classes.icon} />
					)}
				</div>
				<div
					onClick={() => {
						navigate('/quiz-library');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('quiz-library')
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{location?.pathname.includes('quiz-library') ? (
						<QuizSelected className={classes.icon} />
					) : (
						<Quiz className={classes.icon} />
					)}
				</div>
				<div
					onClick={() => {
						navigate('/top-banner');
					}}
					className={classes.iconWrapper}
					style={
						location?.pathname.includes('top-banner')
							? { backgroundColor: '#404040' }
							: {}
					}
				>
					{location?.pathname.includes('top-banner') ? (
						<BannerSelected className={classes.icon} />
					) : (
						<Banner className={classes.icon} />
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
