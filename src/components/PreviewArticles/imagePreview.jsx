import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const ImagePreview = ({ data, elementWidth, elementHeight }) => {
	console.log(data, elementWidth, elementHeight, '===== data on image / video');
	const classes = useStyles();
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{data?.data ? (
					data?.data[0]?.mime_type === 'image/png' ? (
						<img src={data?.data[0]?.media_url} className={classes.images} />
					) : (
						<video
							id={'my-video'}
							poster={data?.data[0]?.media_url}
							className={classes.previewFile}
							style={{
								width: `${elementWidth}px`,
								height: `${elementHeight}px`,
								// height: 'auto',
								// width: '100%',
								objectFit: 'cover',
								objectPosition: 'center'
							}}
							controls={true}
						>
							<source src={data?.data[0]?.media_url} />
						</video>
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
	data: PropTypes.string.isRequired,
	elementWidth: PropTypes.number.isRequired,
	elementHeight: PropTypes.number.isRequired
};
