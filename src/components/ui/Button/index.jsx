/* eslint-disable react/prop-types */
import React from 'react';
import { useButtonStyles } from './index.style';

const Button = ({
	children,
	type = 'button',
	variant = 'contained', // contained, outlined, text
	size = 'medium', // small, medium, large
	className = '',
	fullWidth = false,
	disabled,
	...rest
}) => {
	const classes = useButtonStyles({
		variant,
		state: disabled ? 'disabled' : 'active',
		size,
		fullWidth
	});

	return (
		<button
			{...rest}
			className={`${classes.btn} ${className}`}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
