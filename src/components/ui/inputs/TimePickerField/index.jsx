import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.styles';
import clsx from 'clsx';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { ReactComponent as ArrowDown } from '../../../../assets/Down.svg';
import { useState } from 'react';
import { ClickAwayListener, Popover } from '@material-ui/core';
import { useRef } from 'react';

const TimePickerField = ({ value, onSelect, label = 'TIME' }) => {
	// open or close hours dropdown.
	const [open, setOpen] = useState(false);
	// selected Hour
	const [selectedHourDefault, setSelectedHourDefault] = useState(null);
	// selected Mins
	const [selectedMins, setSelectedMins] = useState('00');

	const anchorRef = useRef();
	const minsInputRef = useRef();

	/// state checking
	let selectedHour = value || selectedHourDefault;
	let setSelectedHour = onSelect || setSelectedHourDefault;
	//label checking
	label = label || 'TIME';

	// toggle open
	const toggleOpen = () => {
		setOpen(!open);
	};

	// select hour
	const selectHour = (hour) => {
		setSelectedHour(hour);
		setOpen(false)
	};

	// set mins
	const setMins = (event) => {
		let value = event.target.value;
		if (Number(value) > 60 || Number(value) < 0 || value.length > 2) return;
		setSelectedMins(value);
	};

	// focus mins field
	const focusMinField = () => {
		minsInputRef.current && minsInputRef.current.focus();
	};

	//  generate Hours grid
	const generateHours = () =>
		new Array(24).fill(0).map((_, ind) => {
			let i = ind < 10 ? `0${ind}` : ind;
			return (
				<div
					onClick={() => selectHour(i)}
					className={clsx(
						'hourNumber',
						i === selectedHour ? 'selectedHour' : ''
					)}
					key={i}
				>
					{i}
				</div>
			);
		});

	// Check if given time is from past
	/**
	 *
	 * @param {number} hours
	 * @param {number} mins
	 * @param {number} futureDifference
	 * @returns {boolean}
	 */
	// const isPastTime = (hours, mins, futureDifference = 15) => {
	// 	const date = new Date();
	// 	const currentHours = date.getHours();
	// 	const currentMins = date.getMinutes() + futureDifference;
	// 	if (hours < currentHours) return true;
	// 	if (hours === currentHours && mins < currentMins) return true;
	// 	return false;
	// };

	// styles
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{/* Label */}
			<div className={classes.label}>{label}</div>

			{/* Hours & Mins Container  */}
			<div className={classes.timeFieldContainer}>
				{/* Hours Selector */}
				<div className={clsx('hoursField', 'subField')} onClick={toggleOpen}>
					{/* hours display  */}
					<div>
						{selectedHour || '00'} <span className='greydText'>Hrs</span>
					</div>

					{/* dropwdown arrow  */}
					<div className='arrowCon'>
						<ArrowDown
							className={clsx('arrow', classes.arrowIcon)}
						/>
						{/* anchor element for dropwdown */}
						<div ref={anchorRef} className='anchorEle' />
					</div>
				</div>

				{/* Mins Selector */}
				<div className={clsx('minsField', 'subField')} onClick={focusMinField}>
					{/* Mins text :Input field since it's editable */}
					<div>
						<input
							className='minsInput'
							ref={minsInputRef}
							type={'number'}
							value={selectedMins}
							onChange={setMins}
						/>
						<span className='greydText'>Mins</span>
					</div>
				</div>
			</div>

			{/* Popover for hours card */}
			<Popover
				open={open}
				anchorEl={anchorRef.current}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				PaperProps={{ className: classes.hoursPopover }}
			>
				<ClickAwayListener onClickAway={toggleOpen}>
					<div className={classes.hoursCon}>{generateHours()}</div>
				</ClickAwayListener>
			</Popover>
		</div>
	);
};

export default TimePickerField;

TimePickerField.propTypes = {
	value: PropTypes.string,
	onSelect: PropTypes.func,
	label: PropTypes.string
};
