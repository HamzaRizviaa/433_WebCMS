import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';
import { Markup } from 'interweave';

const TextElementPreviewer = ({ data }) => {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.textDraggableData}>
				<div>
					<Markup content={data?.description || ''} />
				</div>
			</div>
		</div>
	);
};
TextElementPreviewer.propTypes = {
	data: PropTypes.object
};
export default TextElementPreviewer;
