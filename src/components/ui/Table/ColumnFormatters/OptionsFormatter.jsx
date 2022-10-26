import React from 'react';
import PropTypes from 'prop-types';
import TextTooltip from '../../TextTooltip';
import { Edit } from '../../../../assets/svg-icons';
import { useStyles } from './index.style';

const OptionsFormatter = ({ title, styledClass }) => {
	const classes = useStyles();

	return (
		<div className={styledClass}>
			<TextTooltip title={title} placement='bottom'>
				<Edit className={classes.editIcon} />
			</TextTooltip>
		</div>
	);
};

OptionsFormatter.propTypes = {
	title: PropTypes.string.isRequired,
	styledClass: PropTypes.string
};

export default OptionsFormatter;
