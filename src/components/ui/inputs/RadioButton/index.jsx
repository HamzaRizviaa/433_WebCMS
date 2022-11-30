import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio } from '@material-ui/core';
import {
	RadioBtnIcon,
	RadioBtnCheckedIcon
} from '../../../../assets/svg-icons';
import { useRadioButtonStyles } from './index.style';

const RadioButton = ({ name, value, label, helperText }) => {
	const classes = useRadioButtonStyles();

	return (
		<div>
			<FormControlLabel
				name={name}
				value={value}
				label={label}
				classes={{ label: classes.radioLabel }}
				control={
					<Radio
						classes={{ root: classes.root, checked: classes.checked }}
						icon={<RadioBtnIcon />}
						checkedIcon={<RadioBtnCheckedIcon />}
					/>
				}
			/>
			{!!helperText && <div className={classes.helperText}>{helperText}</div>}
		</div>
	);
};

RadioButton.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	helperText: PropTypes.string
};

export default RadioButton;
