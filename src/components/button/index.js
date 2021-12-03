import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({ text, onClick }) => {
	return <span onClick={onClick} className={classes.button}>{text}</span>;
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;
