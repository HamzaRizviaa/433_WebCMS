import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({ text, onClick, disabled }) => {
	return (
		<span
			onClick={() => {
				onClick();
			}}
			className={`${classes.button} ${disabled ? classes.disabled : ''}`}
		>
			{text}
		</span>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

export default Button;
