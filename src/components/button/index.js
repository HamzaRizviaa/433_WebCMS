import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({
	text,
	onClick,
	disabled,
	button2,
	style = {},
	active,
	bannerdisabled
}) => {
	return (
		<span
			onClick={() => {
				onClick();
			}}
			style={style}
			className={`${classes.button}  ${disabled ? classes.disabled : ''} ${
				button2 ? classes.button2 : ''
			} ${active === true && classes.activebtn} ${
				active === false && classes.closedbtn
			} ${bannerdisabled && classes.disabled}`}
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
	style: PropTypes.object,
	active: PropTypes.bool,
	bannerdisabled: PropTypes.bool
};

export default Button;
