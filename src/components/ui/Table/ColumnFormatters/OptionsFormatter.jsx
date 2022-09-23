import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useStyles } from './index.style';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import { ReactComponent as Edit } from '../../../../assets/edit.svg';

const OptionsFormatter = ({ params, styledClass }) => {
    const classes = useStyles()
	return (
		<div className={styledClass}>
			<Tooltip
				TransitionComponent={Fade}
				TransitionProps={{ timeout: 700 }}
				title={params}
				arrow
				componentsProps={{
					tooltip: { className: classes.libraryToolTip },
					arrow: { className: classes.libraryToolTipArrow }
				}}
			>
				<Edit className={classes.editIcon} />
			</Tooltip>
		</div>
	);
};

OptionsFormatter.propTypes = {
	styledClass: PropTypes.string.isRequired,
	params: PropTypes.string.isRequired
}

export default OptionsFormatter;
