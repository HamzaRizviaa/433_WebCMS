import React from 'react';
import PropTypes from 'prop-types';
import { useToggleSwitchStyles } from './index.style';
import { useInputsStyles } from '../inputs.style';

const ToggleSwitchField = ({
	name,
	checked,
	disabled,
	id,
	onBlur,
	onChange,
	onInputChange,
	error
}) => {
	const classes = useToggleSwitchStyles();
	const inputClasses = useInputsStyles();

	function handleKeyPress(e) {
		if (e.keyCode !== 32) return;

		e.preventDefault();
		onChange(!checked);
	}

	const handleInputChange = (value) => {
		if (onChange) {
			onChange(value);
		}
		onInputChange(value);
	};
	return (
		<div>
			<div className={classes.toggleSwitch}>
				<input
					type='checkbox'
					name={name}
					onBlur={onBlur}
					className={classes.toggleSwitchCheckbox}
					id={id}
					checked={checked}
					onChange={(e) => handleInputChange(e.target.checked)}
					disabled={disabled}
				/>
				{id ? (
					<label
						className={classes.toggleSwitchLabel}
						htmlFor={id}
						tabIndex={disabled ? -1 : 1}
						onKeyDown={(e) => {
							handleKeyPress(e);
						}}
					>
						<span
							className={
								disabled
									? `${classes.toggleSwitchInner} ${classes.toggleSwitchDisabled}`
									: `${classes.toggleSwitchInner}`
							}
							tabIndex={-1}
						/>
						<span
							className={
								disabled
									? `${classes.toggleSwitch2} ${classes.toggleSwitchDisabled}`
									: `${classes.toggleSwitch2}`
							}
							tabIndex={-1}
						/>
					</label>
				) : null}
			</div>
			<span className={inputClasses.errorText}>{error}</span>
		</div>
	);
};

ToggleSwitchField.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	checked: PropTypes.bool.isRequired,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onInputChange: PropTypes.func,
	error: PropTypes.string
};

export default ToggleSwitchField;
