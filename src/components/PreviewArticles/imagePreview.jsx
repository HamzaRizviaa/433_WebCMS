import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
const ImagePreview = ({ data }) => {
	console.log(data, '===== data on oimage / video');
	const classes = useStyles();
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{data?.data ? (
					data?.data[0].mime_type === 'image/png' ? (
						<img src={data?.data[0].media_url} className={classes.images} />
					) : (
						<div>
							<PlayArrowIcon
							// className={
							// 	dimensionSelect === 'portrait'
							// 		? classes.playIconPortrait
							// 		: classes.playIcon
							// }
							/>
							<video
								id={'my-video'}
								// poster={isEdit ? file.thumbnail_url || file.img : null}
								className={classes.videos}
								// style={{
								// 	maxWidth: `${imageToResizeWidth}px`,
								// 	maxHeight: `${imageToResizeHeight}px`,
								// 	objectFit: 'cover',
								// 	objectPosition: 'center'
								// }}
								// ref={videoRef}
								// onLoadedMetadata={onLoadedVideodata}
							>
								<source src={data?.data[0].media_url} />
							</video>
						</div>
					)
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default ImagePreview;
ImagePreview.propTypes = {
	data: PropTypes.string.isRequired
};
