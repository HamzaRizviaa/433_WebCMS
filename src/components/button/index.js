import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({ text, onClick, disabled, button2 }) => {
	return (
		<span
			onClick={() => {
				onClick();
			}}
			className={`${classes.button} ${disabled ? classes.disabled : ''} ${button2 ? classes.button2 : ''}`}
		>
			{text}
		</span>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	button2: PropTypes.bool,
};

export default Button;
