import React from 'react';
import PropTypes from 'prop-types';
import { useToggleSwitchStyles } from './index.style';
import { useInputsStyles } from '../inputs.style';

const ToggleSwitchField = ({
	name,
	label,
	checked,
	disabled = false,
	onBlur,
	onChange,
	error,
	small = false
}) => {
	const classes = useToggleSwitchStyles({
		isDisabled: disabled,
		isChecked: checked,
		isSmall: small
	});

	const inputClasses = useInputsStyles();

	function handleKeyPress(e) {
		if (e.keyCode !== 32) return;

		e.preventDefault();
		onChange(!checked);
	}

	const handleInputChange = (event) => {
		if (onChange) {
			onChange(event.target.checked);
		}
	};

	return (
		<div>
			<div className={classes.toggleSwitchWrapper}>
				{!!label && <h5>{label}</h5>}
				<div className={classes.toggleSwitch}>
					<input
						type='checkbox'
						name={name} //mandatory field
						onBlur={onBlur}
						className={classes.toggleSwitchCheckbox}
						id={name}
						checked={checked}
						onChange={handleInputChange}
						disabled={disabled}
					/>
					<label
						className={classes.toggleSwitchLabel}
						htmlFor={name}
						tabIndex={disabled ? -1 : 1}
						onKeyDown={handleKeyPress}
					>
						<span className={classes.toggleSwitchInner} tabIndex={-1} />
						<span className={classes.toggleSwitchCircle} tabIndex={-1} />
					</label>
				</div>
			</div>
			<span className={inputClasses.errorText}>{error}</span>
		</div>
	);
};

ToggleSwitchField.propTypes = {
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	error: PropTypes.string,
	small: PropTypes.bool
};

export default ToggleSwitchField;
