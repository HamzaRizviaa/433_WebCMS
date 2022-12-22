import React from 'react';
import { useButtonStyles } from './index.style';
import PropTypes from 'prop-types';

const Button = ({
	icon,
	type = 'button',
	variant = 'contained', // contained, outlined, text
	size = 'medium', // xsmall, small, medium, large, xlarge
	color = 'primary', // primary, secondary, danger
	className = '',
	fullWidth = false,
	disabled,
	customPadding,
	children,
	iconBtn = false,
	...rest
}) => {
	const classes = useButtonStyles({
		variant,
		color: disabled ? 'secondary' : color,
		size,
		fullWidth,
		icon,
		customPadding,
		isIconButton: iconBtn
	});

	return (
		<button
			{...rest}
			className={`${classes.btn} ${className}`}
			type={type}
			disabled={disabled}
		>
			<span className={classes.btnSpan}>
				{children}
				{icon}
			</span>
		</button>
	);
};

Button.propTypes = {
	icon: PropTypes.element,
	type: PropTypes.string,
	color: PropTypes.string,
	variant: PropTypes.string,
	size: PropTypes.string,
	className: PropTypes.string,
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	buttonText: PropTypes.string,
	customPadding: PropTypes.string,
	iconBtn: PropTypes.bool,
	children: PropTypes.any
};

export default Button;
