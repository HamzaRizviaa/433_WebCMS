import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const TextWrapper = ({ content }) => {
	const classes = useStyles();

	return <div className={classes.tableCell}>{content}</div>;
};

TextWrapper.propTypes = {
	content: PropTypes.string.isRequired
};

export default TextWrapper;
