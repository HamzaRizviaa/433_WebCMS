import React from 'react';
import { useButtonStyles } from './index.style';
import PropTypes from 'prop-types';

const Button = ({
	icon,
	type = 'button',
	variant = 'contained', // contained, outlined, text
	size = 'medium', // small, medium, large
	className = '',
	fullWidth = false,
	disabled,
	children,
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
			{children}
			{icon ? icon : <></>}
		</button>
	);
};

Button.propTypes = {
	icon: PropTypes.element,
	type: PropTypes.string,
	variant: PropTypes.string,
	size: PropTypes.string,
	className: PropTypes.string,
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	buttonText: PropTypes.string,
	children: PropTypes.any
};

export default Button;
