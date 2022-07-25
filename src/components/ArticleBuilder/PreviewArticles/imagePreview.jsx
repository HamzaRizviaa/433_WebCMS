import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const ImagePreview = ({ data, isEdit }) => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.imageDraggableData}>
				{data?.data ? (
					data?.data[0]?.type === 'image' ? (
						<img src={data?.data[0]?.media_url} className={classes.images} />
					) : data?.data[0]?.type === 'video' ? (
						<video
							id={'my-video'}
							poster={isEdit ? data?.data[0]?.thumbnail_url : null}
							className={classes.previewFile}
							style={{
								// width: `${data?.data[0]?.fileWidth}px`,
								height:
									data?.data[0]?.height < data?.data[0]?.width + 100
										? '200px'
										: `${data?.data[0]?.height}px`,
								maxHeight: '640px',
								width: '100%',
								objectFit: 'cover',
								objectPosition: 'center',
								borderRadius: '8px'
							}}
							controls={true}
						>
							<source src={data?.data[0]?.media_url} />
						</video>
					) : (
						''
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
	data: PropTypes.array.isRequired,
	isEdit: PropTypes.bool.isRequired
};
