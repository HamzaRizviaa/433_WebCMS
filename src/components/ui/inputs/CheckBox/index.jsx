/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { useCheckBoxStyles } from './index.style';
import {
	CheckBoxIcon,
	CheckBoxCheckedIcon,
	InfoIcon
} from '../../../../assets/svg-icons';
import TextTooltip from '../../TextTooltip';
import { useInputsStyles } from '../inputs.style';

const CheckBox = ({
	label,
	name,
	checked,
	disabled,
	onBlur,
	onChange,
	error,
	tooltip
}) => {
	const classes = useCheckBoxStyles();
	const inputClasses = useInputsStyles();

	const handleInputChange = (event) => {
		if (onChange) {
			onChange(event.target.checked);
		}
	};

	return (
		<div>
			<div className={classes.checkBoxWrapper}>
				<FormControlLabel
					name={name}
					label={label}
					classes={{ label: classes.label }}
					value={checked}
					checked={checked}
					control={
						<Checkbox
							disabled={disabled}
							onChange={handleInputChange}
							onBlur={onBlur}
							classes={{
								checked: classes.checked
							}}
							icon={<CheckBoxIcon className={classes.icon} />}
							checkedIcon={<CheckBoxCheckedIcon className={classes.icon} />}
						/>
					}
				/>
				{!!tooltip && (
					<div>
						<TextTooltip title={tooltip} secondary placement='top-end'>
							<InfoIcon className={classes.infoIcon} />
						</TextTooltip>
					</div>
				)}
			</div>
			{!!error && <span className={inputClasses.errorText}>{error}</span>}
		</div>
	);
};

CheckBox.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	tooltip: PropTypes.string,
	checked: PropTypes.bool.isRequired,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	error: PropTypes.string
};
export default CheckBox;
