import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';

const Button = ({
	text,
	onClick,
	disabled,
	disabledDraft,
	button2,
	button2AddSave,
	button3,
	style = {},
	active,
	published,
	bannerdisabled
}) => {
	// console.log('Active', active);
	return (
		<span
			onClick={() => {
				onClick();
			}}
			style={style}
			className={[
				classes.button,
				disabled ? classes.disabled : '',
				disabledDraft ? classes.disabledDraft : '',
				button2 ? classes.button2 : '',
				button3 ? classes.button3 : '',
				button2AddSave ? classes.button2AddSave : '',
				active === 'ACTIVE' ? classes.activebtn : '',
				active === 'CLOSED' ? classes.closedbtn : '',
				active === 'draft' ? classes.draftdbtn : '',
				bannerdisabled && classes.disabled,
				published ? classes.publishedBtn : '',
				published === false && classes.draftBtn
			].join(' ')}
		>
			{text}
		</span>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	disabledDraft: PropTypes.bool,
	button2: PropTypes.bool,
	button2AddSave: PropTypes.bool,
	button3: PropTypes.bool,
	style: PropTypes.object,
	active: PropTypes.bool,
	published: PropTypes.bool,
	bannerdisabled: PropTypes.bool
};

export default Button;
