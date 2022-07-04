import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import { Markup } from 'interweave';
const TextPreview = ({ data }) => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.textDraggableData}>
				<div>
					<Markup content={data?.data ? data?.data[0].description : ''} />
				</div>
			</div>
		</div>
	);
};
TextPreview.propTypes = {
	data: PropTypes.array
};
export default TextPreview;
