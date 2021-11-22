import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({ text }) => {
	return <span className={classes.button}>{text}</span>;
};

Button.propTypes = {
	text: PropTypes.string.isRequired
};

export default Button;
