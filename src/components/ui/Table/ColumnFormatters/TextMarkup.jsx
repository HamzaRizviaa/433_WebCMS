import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { useStyles } from './index.style';

const TextMarkup = ({ content }) => {
	const classes = useStyles();
	return <Markup className={classes.tableCell} content={content} />;
};

TextMarkup.propTypes = {
	content: PropTypes.string.isRequired
};

export default TextMarkup;
