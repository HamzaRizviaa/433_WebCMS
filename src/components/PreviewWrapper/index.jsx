import React from 'react';
import PropTypes from 'prop-types';
import Football from '../../assets/FootballYellow.svg';
import Share from '../../assets/shareArticle.svg';
import goBack from '../../assets/goBack.svg';
import Comments from '../../assets/Comment.svg';
import { useStyles } from './index.styles';
import Avatar from '@mui/material/Avatar';
import { formatDate2 } from '../../utils';

const PreviewWrapper = ({
	children,
	subCategory,
	title,
	// descrption,
	authorImage,
	authorName,
	backgroundImage,
	showLikes,
	showComments
}) => {
	const classes = useStyles();
	const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;
	const date = formatDate2(new Date());

	return (
		<div className={classes.previewWrapper} style={{ overflowY: 'auto' }}>
			<div
				className={classes.backgroundSet}
				style={{
					backgroundImage: `url(${backgroundImage})`
				}}
			>
				<div className={classes.topIcons}>
					<div className={classes.icons}>
						<img src={goBack} className={classes.goBackIcon} />
					</div>
					<div className={classes.icons}>
						<img src={Share} className={classes.shareIcon} />
					</div>
				</div>
				<div style={{ marginTop: '297px' }}>
					<div className={classes.subCatText}>
						{subCategory ? subCategory?.name : ''}
					</div>
					<div className={classes.mainTitle}>{title}</div>

					<div className={classes.bottomIcons}>
						{showLikes ? (
							<div className={classes.icons}>
								<img src={Football} className={classes.footballIcon} />
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
					<div className={classes.description}></div>
				</div>
			</div>
			<br />
			{children}
		</div>
	);
};

PreviewWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	subCategory: PropTypes.string,
	title: PropTypes.string,
	descrption: PropTypes.string,
	authorImage: PropTypes.string,
	authorName: PropTypes.string,
	backgroundImage: PropTypes.string,
	showLikes: PropTypes.boolean,
	showComments: PropTypes.boolean
};

export default PreviewWrapper;
