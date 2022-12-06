import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';

const MediaElementPreviewer = ({ data, isEdit }) => {
	//type of element
	let type = data?.data?.[0]?.type;

	// return if data not found
	if (!type) return null;

	// styles => passing required params for conditional stylings.
	const classes = useStyles({
		height: data?.data?.[0]?.height,
		width: data?.data?.[0]?.width
	});
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{/* Image Element */}
				{type === 'image' && (
					<img src={data?.data[0]?.media_url} className={classes.images} />
				)}

				{/* Video Element */}
				{type === 'video' && (
					<video
						id={'my-video'}
						poster={isEdit ? data?.data[0]?.thumbnail_url : null}
						className={classes.videoElement}
						controls={true}
					>
						<source src={data?.data[0]?.media_url} />
					</video>
				)}
			</div>
		</div>
	);
};

export default MediaElementPreviewer;
MediaElementPreviewer.propTypes = {
	data: PropTypes.array.isRequired,
	isEdit: PropTypes.bool.isRequired
};
