import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, Popover } from '@material-ui/core';
import clsx from 'clsx';

import { ArrowDown } from '../../../../assets/svg-icons';
import { useStyles } from './index.styles';

const TimePickerField = ({ name, value, onChange, label = 'TIME' }) => {
	// open or close hours dropdown.
	const [open, setOpen] = useState(false);

	const anchorRef = useRef();
	const minsInputRef = useRef();

	/// state checking
	const selectedHour = value.hour;

	// toggle open
	const toggleOpen = () => {
		setOpen(!open);
	};

	// select hour
	const selectHour = (hour) => {
		onChange(name, { hour, min: value.min });
		setOpen(false);
	};

	// set mins
	const setMins = (event) => {
		let minValue = event.target.value;
		if (Number(minValue) > 60 || Number(minValue) < 0 || minValue.length > 2)
			return;
		onChange(name, { hour: value.hour, min: minValue });
	};

	// focus mins field
	const focusMinField = () => {
		minsInputRef.current && minsInputRef.current.focus();
	};

	//  generate Hours grid
	const generateHours = () =>
		new Array(24).fill(0).map((_, ind) => {
			let i = ind < 10 ? `0${ind}` : `${ind}`;
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
						<ArrowDown className={clsx('arrow', classes.arrowIcon)} />
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
							type='number'
							value={value.min}
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
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string
};
