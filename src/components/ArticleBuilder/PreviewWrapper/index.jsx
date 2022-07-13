import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.styles';
import Heart from '../../../assets/Heart.svg';
import Share from '../../../assets/shareArticle.svg';
import goBack from '../../../assets/goBack.svg';
import Comments from '../../../assets/Comment.svg';
import WiFi from '../../../assets/Wifi.svg';
import Battery from '../../../assets/Rectangle.svg';
import Signals from '../../../assets/MobileSignal.svg';
import Avatar from '@mui/material/Avatar';
import { formatDate2 } from '../../utils';
import { Markup } from 'interweave';
const PreviewWrapper = ({
	children,
	form
	// subCategory,
	// title,
	// authorImage,
	// authorName,
	// backgroundImage,
	// showLikes,
	// showComments
}) => {
	const classes = useStyles();
	const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;
	const date = formatDate2(new Date());
	var today = new Date();
	var time =
		today.getHours() +
		':' +
		(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

	return (
		<div
			className={classes.previewWrapper}
			style={{
				overflowY: 'auto',
				overflowX: 'hidden',
				width: '380px'
			}}
		>
			<div
				className={classes.backgroundSet}
				style={{
					width: '380px',
					// height: `${height}px`, linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
					height: '812px',
					backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%),
					url(${form.uploadedFiles.length > 0 && form?.uploadedFiles[0]?.media_url})`
				}}
			>
				<div className={classes.topMobileIcons}>
					<div style={{ color: 'white' }}>{time}</div>
					<div className={classes.mobileTopBars}>
						<img src={Signals} className={classes.mobileIcons} />
						<img src={WiFi} className={classes.mobileIcons} />
						<img src={Battery} className={classes.mobileIcons} />
					</div>
				</div>
				<div style={{ padding: '5px 10px' }}>
					<div className={classes.topIcons}>
						<div className={classes.navIcons}>
							<img src={goBack} className={classes.goBackIcon} />
						</div>
						<div className={classes.navIcons}>
							<img src={Share} className={classes.shareIcon} />
						</div>
					</div>
					<div style={{ marginTop: '300px' }}>
						<div className={classes.subCatText}>
							{form?.subCategory ? form?.subCategory?.name : ''}
						</div>
						<div className={classes.mainTitle}>
							<Markup content={form.title} />
						</div>

						<div className={classes.bottomIcons}>
							{form.show_likes ? (
								<div className={classes.icons}>
									<img src={Heart} className={classes.footballIcon} />
								</div>
							) : (
								''
							)}
							{form.show_comments ? (
								<div className={[classes.icons, classes.commentbox].join(' ')}>
									<img src={Comments} className={classes.commentIcon} />
								</div>
							) : (
								''
							)}
						</div>

						<div className={classes.authordetails}>
							<div>
								<Avatar
									src={
										form?.author_image[0]
											? form.author_image[0].media_url
											: Profile433
									}
								/>
							</div>
							<div className={classes.authorSection}>
								<div className={classes.authorname}>
									{form.author_text ? form.author_text : '-'}
								</div>
								{/* 433 Content Team */}
								<div className={classes.postDateDetails}>
									{date} - 10 min read
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ padding: '5px 10px' }}>{children}</div>
			</div>
		</div>
	);
};

PreviewWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	form: PropTypes.object
};

export default PreviewWrapper;