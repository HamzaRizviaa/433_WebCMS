import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
const ImagePreview = ({ data }) => {
	const classes = useStyles();
	console.log(data, 'data image');
	return (
		<div>
			{data.length > 1 &&
				data.map((item, index) => {
					return (
						<div key={index} className={classes.textDraggableData}>
							<div>
								<img src={item[0].media_url} />
							</div>
						</div>
					);
				})}
		</div>
	);
};
ImagePreview.propTypes = {
	data: PropTypes.string.isRequired
};
export default ImagePreview;
