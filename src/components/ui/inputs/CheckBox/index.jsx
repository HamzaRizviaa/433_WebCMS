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

const CheckBox = ({ label, value, name, tooltip }) => {
	const classes = useCheckBoxStyles();

	return (
		<div className={classes.checkBoxWrapper}>
			<FormControlLabel
				name={name}
				label={label}
				classes={{ label: classes.label }}
				value={value}
				control={
					<Checkbox
						classes={{ root: classes.root, checked: classes.checked }}
						icon={<CheckBoxIcon />}
						checkedIcon={<CheckBoxCheckedIcon />}
					/>
				}
			/>
			{!!tooltip && (
				<div>
					<TextTooltip title={tooltip} checkBox placement='top-end'>
						<InfoIcon className={classes.infoIcon} />
					</TextTooltip>
				</div>
			)}
		</div>
	);
};

CheckBox.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	tooltip: PropTypes.string
};
export default CheckBox;
