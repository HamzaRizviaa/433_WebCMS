import React from 'react';
import { useStyles } from './index.styles';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useState } from 'react';
import { ClickAwayListener, Popover } from '@material-ui/core';
import { useRef } from 'react';

const TimePickerField = () => {
	// open or close hours dropdown.
	const [open, setOpen] = useState();
	// selected Hour
	const [selectedHour, setSelectedHour] = useState(null);
	// selected Mins
	const [selectedMins, setSelectedMins] = useState('00');

	const anchorRef = useRef();
	const minsInputRef = useRef();

	// toggle open
	const toggleOpen = () => {
		setOpen(!open);
	};

	// select hour
	const selectHour = (hour) => {
		setSelectedHour(hour);
	};

	// set mins
	const setMins = (event) => {
		let value = event.target.value;
		if (Number(value) > 60 || Number(value) < 0) return;
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

	// styles
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{/* Label */}
			<div className={classes.label}>TIME</div>

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
						<KeyboardArrowDownIcon
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

					<KeyboardArrowDownIcon className={classes.arrowIcon} />
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
