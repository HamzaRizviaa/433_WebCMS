import React from 'react';
import PropTypes from 'prop-types';
import Heart from '../../assets/Heart.svg';
import Share from '../../assets/shareArticle.svg';
import goBack from '../../assets/goBack.svg';
import Comments from '../../assets/Comment.svg';
import { useStyles } from './index.styles';
import Avatar from '@mui/material/Avatar';
import { formatDate2 } from '../../utils';
import WiFi from '../../assets/Wifi.svg';
import Battery from '../../assets/Rectangle.svg';
import Signals from '../../assets/MobileSignal.svg';
const PreviewWrapper = ({
	children,
	subCategory,
	title,
	authorImage,
	authorName,
	backgroundImage,
	showLikes,
	showComments,
	height // to set height of background image
}) => {
	console.log(height, 'height');
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
				overflowY: 'auto'
			}}
		>
			<div
				className={classes.backgroundSet}
				style={{
					// height: `${height}px`, linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
					maxHeight: '812px',
					backgroundImage: `linear-gradient(0deg, #000000 -12.5%, rgba(0, 0, 0, 0) 19.68%, rgba(0, 0, 0, 0) 57.99%, #000000 100%),
					url(${backgroundImage})`
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
							{subCategory ? subCategory?.name : ''}
						</div>
						<div className={classes.mainTitle}>{title}</div>

						<div className={classes.bottomIcons}>
							{showLikes ? (
								<div className={classes.icons}>
									<img src={Heart} className={classes.footballIcon} />
								</div>
							) : (
								''
							)}
							{showComments ? (
								<div className={[classes.icons, classes.commentbox].join(' ')}>
									<img src={Comments} className={classes.commentIcon} />
								</div>
							) : (
								''
							)}
						</div>

						<div className={classes.authordetails}>
							<div>
								<Avatar src={authorImage ? authorImage : Profile433} />
							</div>
							<div className={classes.authorSection}>
								<div className={classes.authorname}>
									{authorName ? authorName : '-'}
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
	subCategory: PropTypes.string,
	title: PropTypes.string,
	authorImage: PropTypes.string,
	authorName: PropTypes.string,
	backgroundImage: PropTypes.string,
	showLikes: PropTypes.boolean,
	showComments: PropTypes.boolean,
	height: PropTypes.integer
};

export default PreviewWrapper;
