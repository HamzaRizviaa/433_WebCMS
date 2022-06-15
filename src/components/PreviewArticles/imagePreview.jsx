import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
const ImagePreview = ({ data }) => {
	const classes = useStyles();
	console.log('data image ====== ', data);
	return (
		<div>
			{data.map((item, index) => {
				console.log(item, 'dataaaaaaaa===========');
				return item.data ? (
					<div key={index} className={classes.imageDraggableData}>
						<img src={item?.data[0]?.media_url} alt='' />
					</div>
				) : (
					<></>
				);
			})}
		</div>
	);
};
ImagePreview.propTypes = {
	data: PropTypes.string.isRequired
};
export default ImagePreview;
