import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { useStyles } from './index.style';

const TextWithIcon = ({ content, Icon }) => {
	const classes = useStyles();

	return (
		<div className={classes.textWithIconWrapper}>
			{!!Icon && (
				<div className={classes.iconWrapper}>
					<Icon />
				</div>
			)}
			<Markup content={`${content}`} />
		</div>
	);
};

TextWithIcon.propTypes = {
	content: PropTypes.string.isRequired,
	Icon: PropTypes.element
};

export default TextWithIcon;
