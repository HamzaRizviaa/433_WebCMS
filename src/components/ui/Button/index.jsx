/* eslint-disable react/prop-types */
import React from 'react';
import { useButtonStyles } from './index.style';
import PropTypes from 'prop-types';
import { ReactComponent as PlusIcon } from '../../../assets/newsAddIcon.svg';

const Button = ({
	icon = false,
	type = 'button',
	variant = 'contained', // contained, outlined, text 
	size = 'medium', // small, medium, large
	className = '',
	fullWidth = false,
	disabled,
	buttonText,
	...rest
}) => {
	const classes = useButtonStyles({
		variant,
		state: disabled ? 'disabled' : 'active',
		size,
		fullWidth,
		icon
	});

	return (
		<button
			{...rest}
			className={`${classes.btn} ${className}`}
			type={type}
			disabled={disabled}
		>
			{buttonText}
			{icon ? <PlusIcon /> : <> </>}
		</button>
	);
};

Button.propTypes = {
	icon: PropTypes.bool,
	type: PropTypes.string,
	variant: PropTypes.string,
	size: PropTypes.string,
	classname: PropTypes.string,
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	buttonText: PropTypes.string
}

export default Button;
