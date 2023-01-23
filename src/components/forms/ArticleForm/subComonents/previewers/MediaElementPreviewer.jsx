import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';
import ReactPlayer from 'react-player';

const MediaElementPreviewer = ({ data, isEdit }) => {
	//type of element
	let type = data?.uploadedFiles?.[0]?.type;

	// return if data not found
	if (!type) return null;

	// styles => passing required params for conditional stylings.
	const classes = useStyles({
		height: data?.uploadedFiles?.[0]?.height,
		width: data?.uploadedFiles?.[0]?.width
	});
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{/* Image Element */}
				{type === 'image' && (
					<img
						src={data?.uploadedFiles[0]?.media_url}
						className={classes.images}
					/>
				)}

				{/* Video Element */}
				{type === 'video' && (
					// <video
					// 	id={'my-video'}
					// 	poster={isEdit ? data?.uploadedFiles[0]?.thumbnail_url : null}
					// 	className={classes.videoElement}
					// 	controls={true}
					// >
					// 	<source src={data?.uploadedFiles[0]?.media_url} />
					// </video>
					<ReactPlayer
						width={'100%'}
						height={'32rem'}
						config={{
							file: {
								attributes: {
									poster: isEdit ? data?.uploadedFiles[0]?.thumbnail_url : null
								}
							}
						}}
						controls
						url={data?.uploadedFiles[0]?.media_url}
					/>
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
