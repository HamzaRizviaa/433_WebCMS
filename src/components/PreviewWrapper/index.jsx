import React from 'react';
import PropTypes from 'prop-types';
import Football from '../../assets/FootballYellow.svg';
import Share from '../../assets/shareArticle.svg';
import goBack from '../../assets/goBack.svg';
import Comments from '../../assets/Comment.svg';
import { useStyles } from './index.styles';
import Avatar from '@mui/material/Avatar';
// import Close from '@material-ui/icons/Close';
// import dImage from '../../assets/defaultImage.png';

const PreviewWrapper = ({ children }) => {
	const classes = useStyles();
	const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;
	return (
		<div style={{ overflow: 'auto' }} className={classes.previewWrapper}>
			<div
				style={{
					// backgroundImage: `url('https://via.placeholder.com/298x596?text=Preview')`,
					backgroundColor: 'grey',
					width: '250px',
					height: '596px',
					padding: '10px'
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
					<div className={classes.subCatText}>Sub category</div>
					<div className={classes.mainTitle}>THE HAMZA RIZVI THE UI CHAMP</div>

					<div className={classes.bottomIcons}>
						<div className={classes.icons}>
							<img src={Football} className={classes.footballIcon} />
						</div>
						<div className={[classes.icons, classes.commentbox].join(' ')}>
							<img src={Comments} className={classes.commentIcon} />
						</div>
					</div>

					<div className={classes.authordetails}>
						<div>
							<Avatar src={Profile433} />
						</div>
						<div className={classes.authorSection}>
							<div className={classes.authorname}>433 Content Team</div>
							<div className={classes.postDateDetails}>
								31 May 2022 - 10 min read
							</div>
						</div>
					</div>
					<div className={classes.description}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
						dictum gravida molestie. Proin maximus, nisi vel accumsan convallis,
						lorem justo ultrices dui, sit amet tincidunt ipsum enim eget ante.
						Morbi enim nulla, venenatis in enim non, facilisis imperdiet sem.
					</div>
				</div>
			</div>
			<br />
			{children}
		</div>
	);
};

PreviewWrapper.propTypes = {
	children: PropTypes.element.isRequired
};

export default PreviewWrapper;
