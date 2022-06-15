import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
const TextPreview = ({ data }) => {
	const classes = useStyles();

	return (
		<div>
			{data.length > 1 &&
				data.map((item, index) => {
					return (
						<div key={index} className={classes.textDraggableData}>
							<div>{item[0].description}</div>
						</div>
					);
				})}
		</div>
	);
};
TextPreview.propTypes = {
	data: PropTypes.element
};
export default TextPreview;
