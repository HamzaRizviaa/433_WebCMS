import React from 'react';
import PropTypes from 'prop-types';
import { getArticleDates } from '../../../../data/utils';
import { Markup } from 'interweave';
import { Box, Avatar } from '@material-ui/core';
import { useStyles } from './subComponents.styles';
import Heart from '../../../../assets/Heart.svg';
import Share from '../../../../assets/shareArticle.svg';
import goBack from '../../../../assets/goBack.svg';
import Comments from '../../../../assets/Comment.svg';
import WiFi from '../../../../assets/Wifi.svg';
import Battery from '../../../../assets/Rectangle.svg';
import Signals from '../../../../assets/MobileSignal.svg';
import { Profile433 } from '../../../../data/helpers/articleHelpers';
import StatusBadge from '../../../ui/StatusBadge';

const ArticlePreviewWrapper = ({ children, form }) => {
	// Get Cover Url From data
	const getUrl = () =>
		form.uploadedFiles.length > 0 && form?.uploadedFiles[0]?.media_url;

	// Stylings
	const classes = useStyles({ url: getUrl() });

	/**
	 * Date & Est time
	 */
	const { date, time } = getArticleDates();

	return (
		// Main Container
		<div className={classes.previewWrapper}>
			{/* Cover contaier */}
			<div className={classes.backgroundSet}>
				<div className={classes.topMobileIcons}>
					{/* Status Bar */}
					<div className={classes.timeCon}>{time}</div>
					<div className={classes.mobileTopBars}>
						<img src={Signals} className={classes.mobileIcons} />
						<img src={WiFi} className={classes.mobileIcons} />
						<img src={Battery} className={classes.mobileIcons} />
					</div>
				</div>

				<Box py={'5px'} px={'10px'}>
					{/* Header bar icons */}
					<div className={classes.topIcons}>
						<div className={classes.navIcons}></div>
						<img src={goBack} className={classes.goBackIcon} />
					</div>

					{/*  Title & Content Container */}
					<Box mt={'440px'} className={classes.mainContent}>
						<Box>
							{form?.subCategoryName ? (
								<StatusBadge status={form?.subCategoryName} />
							) : (
								<></>
							)}
							<div className={classes.mainTitle}>
								<Markup content={form.title} />
							</div>

							{/* Author Container */}
							<div className={classes.authordetails}>
								<div>
									<Avatar
										src={
											form?.author_image[0]
												? form.author_image[0].media_url
												: Profile433
										}
										classes={{ root: classes.avatarRoot }}
									/>
								</div>
								<div className={classes.authorSection}>
									<div className={classes.authorname}>
										{form?.author_text || '-'}
									</div>
									{/* 433 Content Team */}
									<div className={classes.postDateDetails}>{date}</div>
								</div>
							</div>
						</Box>

						<Box className={classes.rightContent}>
							<div className={classes.icons}>
								<img src={Share} className={classes.shareIcon} />
							</div>
							{form.show_likes && (
								<div className={classes.icons}>
									<img src={Heart} className={classes.footballIcon} />
								</div>
							)}
							{form.show_comments && (
								<div className={[classes.icons, classes.commentbox].join(' ')}>
									<img src={Comments} className={classes.commentIcon} />
								</div>
							)}
						</Box>
					</Box>
				</Box>

				{/* Elements Container */}
				<Box py={'40px'} px={'10px'}>
					{children}
				</Box>
			</div>
		</div>
	);
};

ArticlePreviewWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	form: PropTypes.object
};

export default ArticlePreviewWrapper;
