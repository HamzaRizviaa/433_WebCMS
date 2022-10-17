import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { MenuIcon } from '../../../../assets/svg-icons';
import { useStyles } from './index.style';

const TextWithMultiIcon = ({ content, showIcon }) => {
	const classes = useStyles();

	return (
		<div className={classes.textWithIconWrapper}>
			<div className={classes.iconWrapper}>{showIcon && <MenuIcon />}</div>
			<Markup content={`${content}`} />
		</div>
	);
};

TextWithMultiIcon.propTypes = {
	content: PropTypes.string.isRequired,
	showIcon: PropTypes.bool.isRequired
};

export default TextWithMultiIcon;
