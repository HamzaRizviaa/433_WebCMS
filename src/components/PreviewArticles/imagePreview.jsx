import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const ImagePreview = ({ data }) => {
	// console.log(data, elementWidth, elementHeight, '===== data on image / video');
	console.log(data, 'kaka');
	const classes = useStyles();
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{data?.data ? (
					data?.data[0]?.mime_type === 'image/png' ||
					data?.data[0]?.mime_type === 'image/jpeg' ? (
						<img src={data?.data[0]?.media_url} className={classes.images} />
					) : (
						<video
							id={'my-video'}
							// poster={data?.data[0]?.media_url}
							className={classes.previewFile}
							style={{
								width: `${data?.data[0]?.fileWidth}px`,
								height: `${data?.data[0]?.fileHeight}px`,
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
