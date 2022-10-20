/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Tooltip, Fade } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { MenuIcon } from '../../../assets/svg-icons';
import DefaultImage from '../../../assets/defaultImage.png';
import { useMediaPreviewerStyle } from './index.style';

const { REACT_APP_MEDIA_ENDPOINT } = process.env;

const MediaPreviewer = ({
	thumbnailUrl,
	mediaUrl,
	fileName,
	fileHeight,
	fileWidth,
	noOfSlides = 0,
	showSlidesIcon = false
}) => {
	const isVideo = mediaUrl.includes('/vids/');

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.src = DefaultImage;
	};

	const classes = useMediaPreviewerStyle({
		isLandscape: isVideo
			? fileWidth > fileHeight + 200
			: fileWidth > fileHeight,
		isPortrait: isVideo ? fileWidth + 200 < fileHeight : fileWidth < fileHeight
	});

	const mediaTooltipTitle = isVideo ? (
		<video
			id='my-video'
			poster={thumbnailUrl}
			autoPlay
			muted
			className={classes.mediaIconPreview}
			controls={true}
		>
			<source src={`${REACT_APP_MEDIA_ENDPOINT}/${mediaUrl}`} />
		</video>
	) : (
		<img
			className={classes.mediaIconPreview}
			src={`${REACT_APP_MEDIA_ENDPOINT}/${thumbnailUrl || mediaUrl}`}
			alt='media'
			onError={handleImageError}
		/>
	);

	return (
		<div className={classes.mediaWrapper}>
			{showSlidesIcon && (
				<div className={classes.slidesIcon}>
					{noOfSlides > 1 && <MenuIcon />}
				</div>
			)}
			<Tooltip
				interactive
				title={mediaTooltipTitle}
				placement='right'
				classes={{ tooltip: classes.toolTipPreview }}
			>
				<span>
					{isVideo && <PlayArrowIcon className={classes.mediaPlayIcon} />}
					<img
						className={classes.mediaIcon}
						src={`${REACT_APP_MEDIA_ENDPOINT}/${thumbnailUrl || mediaUrl}`}
						alt='media'
						onError={handleImageError}
						loading='lazy'
					/>
				</span>
			</Tooltip>
			<Tooltip
				TransitionComponent={Fade}
				TransitionProps={{ timeout: 600 }}
				title={fileName}
				arrow
				classes={{
					tooltip: classes.fileNameToolTip,
					arrow: classes.fileNameToolTipArrow
				}}
			>
				<span className={classes.mediaFileName}>{fileName}</span>
			</Tooltip>
		</div>
	);
};

export default MediaPreviewer;
