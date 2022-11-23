import React from 'react';
import PropTypes from 'prop-types';
import classes from './_button.module.scss';
import { ReactComponent as NewsAddIcon } from '../../assets/newsAddIcon.svg';

const Button = ({
	text,
	onClick,
	disabled,
	disabledDraft,
	button2,
	button2AddSave,
	button3,
	buttonStop,
	buttonNews,
	style = {},
	active,
	published,
	bannerdisabled,
	onMouseDown,
	className
}) => {
	// console.log('Active', active);
	return (
		<span
			onClick={() => {
				onClick();
			}}
			onMouseDown={onMouseDown}
			style={style}
			className={[
				classes.button,
				disabled ? classes.disabled : '',
				disabledDraft ? classes.disabledDraft : '',
				button2 ? classes.button2 : '',
				button3 ? classes.button3 : '',
				button2AddSave ? classes.button2AddSave : '',
				buttonStop ? classes.buttonStop : '',
				buttonNews ? classes.buttonNews : '',
				active === 'ACTIVE' ? classes.activebtn : '',
				active === 'CLOSED' ? classes.closedbtn : '',
				active === 'draft' ? classes.draftdbtn : '',
				bannerdisabled && classes.disabled,
				published ? classes.publishedBtn : '',
				published === false && classes.draftBtn,
				className
			].join(' ')}
		>
			{text}
			{buttonNews ? <NewsAddIcon /> : <> </>}
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
	buttonStop: PropTypes.bool,
	buttonNews: PropTypes.bool,
	style: PropTypes.object,
	active: PropTypes.bool,
	published: PropTypes.bool,
	bannerdisabled: PropTypes.bool,
	onMouseDown: PropTypes.func,
	className: PropTypes.string
};

export default Button;
