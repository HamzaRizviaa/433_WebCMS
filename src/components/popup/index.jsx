import PropTypes from 'prop-types';
import classes from './_popup.module.scss';

import * as React from 'react';
//import Button from '@mui/material/Button';

import { Paper } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import Close from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as DropdownArrow } from '../../assets/drop_drown_arrow.svg';

//with conditional rendering setValue, prop will be passed as a value
//className={classes.iosSwitch} with switch
const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
	width: '4rem',
	height: '2rem',
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#000000',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FFFF00',
				opacity: 1,
				border: 0
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5
			}
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '1px solid #fff'
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.mode === 'light' ? '#808080' : '#808080'
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
		}
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: '1.6rem',
		height: '1.6rem'
	},
	'& .MuiSwitch-track': {
		borderRadius: '1.5rem',
		backgroundColor: theme.palette.mode === 'light' ? '#808080' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 30
		})
	}
}));

const PostBtn = ({
	classes,
	buttonText,
	btnStyle,
	btnAction = () => {},
	disabled = true
}) => {
	return (
		<button
			className={`${classes.btn} ${disabled ? classes.disabled : null}`}
			style={btnStyle ? btnStyle : {}}
			onClick={
				!disabled
					? (e) => {
							btnAction(e);
					  }
					: null
			}
		>
			{buttonText}
		</button>
	);
};

const DropArea = (props) => {
	const allowDrop = (e) => {
		e.preventDefault();
	};

	return (
		<div
			id={props.id}
			onDrop={props.onDrop}
			onDragOver={allowDrop}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

const Popup = ({ title, open, closePopup }) => {
	const [caption, setCaption] = React.useState('');
	const [switchValue, setSwitchValue] = React.useState(false);
	const [selectedMedia, setSelectedMedia] = React.useState('');

	const handleClose = () => {
		closePopup();
		setSwitchValue(false);
	};

	const handleSwitchValue = () => {
		setSwitchValue(!switchValue);
	};

	const handleSelectedMedia = (e) => {
		setSelectedMedia(e.target.value);
	};

	const handleDisablePostBtn = () => {
		if (switchValue) {
			if (selectedMedia !== '') {
				return false;
			}
		}
		return true;
	};

	return (
		<div>
			{/* <Button variant='outlined' onClick={handleClickOpen}>
				Slide in alert dialog
				</Button> */}
			<Backdrop className={classes.backdrop} open={open}>
				<Slide
					direction='left'
					mountOnEnter
					in={open}
					unmountOnExit
					timeout={800}
				>
					<Paper elevation={4} className={classes.paper}>
						<div className={classes.content}>
							<div className={classes.header}>
								<Close
									onClick={() => handleClose()}
									className={classes.closeIcon}
								/>
								<div className={classes.heading}>{title}</div>
							</div>

							<div className={classes.assignmentContainer}>
								<div className={`${classes.selectWrapper} ${classes.right}`}>
									<label className={classes.label1}>{'Add Media Files'}</label>
								</div>

								<div className={classes.dragdropWrapper}>
									<DropArea id={'droppable'}>
										<div className={classes.dropArea}>
											{'Click or drag files to this area to upload'}
										</div>
									</DropArea>
								</div>

								<div className={`${classes.selectWrapper} ${classes.right}`}>
									<label className={classes.label2}>{'Caption'}</label>
									<TextField
										value={caption}
										onChange={(e) => setCaption(e.target.value)}
										placeholder={'Please write your caption here'}
										InputProps={{
											disableUnderline: true,
											className: classes.textField
										}}
										multiline
										maxRows={4}
									/>
								</div>

								<div className={`${classes.selectWrapper2}`}>
									<label className={classes.label1}>
										{'Link post to Media'}
									</label>
									<IOSSwitch
										value={switchValue}
										onClick={handleSwitchValue}
										sx={{ m: 1 }}
									/>
								</div>

								{switchValue ? (
									<div className={`${classes.selectWrapper} ${classes.right}`}>
										<label
											style={
												selectedMedia === ''
													? { color: '#FF355A' }
													: { color: 'white' }
											}
											className={classes.label2}
										>
											{'Select Media'}
										</label>
										<Select
											value={selectedMedia}
											onChange={handleSelectedMedia}
											disableUnderline={true}
											className={`${classes.select}`}
										>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
										<DropdownArrow className={classes.dropdownicon} />
										{selectedMedia === '' ? (
											<label className={classes.label3}>
												{'This field is required'}
											</label>
										) : null}
									</div>
								) : null}
							</div>

							<div className={`${classes.selectWrapper3}`}>
								<PostBtn
									classes={classes}
									buttonText={'POST'}
									btnAction={() => {
										console.log('Button Clicked');
									}}
									disabled={handleDisablePostBtn()}
								/>
							</div>
						</div>
					</Paper>
				</Slide>
			</Backdrop>
		</div>
	);
};

Popup.propTypes = {
	title: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	closePopup: PropTypes.func.isRequired
};

PostBtn.propTypes = {
	disabled: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	btnStyle: PropTypes.func.isRequired,
	btnAction: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

DropArea.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	style: PropTypes.object.isRequired,
	onDrop: PropTypes.func.isRequired
};

export default Popup;
