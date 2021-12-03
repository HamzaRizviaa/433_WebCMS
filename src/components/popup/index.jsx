import PropTypes from 'prop-types';
import classes from './_popup.module.scss';
import '../../styles/_variables.scss';

import * as React from 'react';
//import Button from '@mui/material/Button';

import { Paper } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import Close from '@material-ui/icons/Close';
//import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

// const useStyles = makeStyles({
// 	paper: {
// 		backgroundColor: '#000000 !important',
// 		zIndex: 5,
// 		//  position: 'relative',
// 		position: 'fixed',
// 		right: -2,
// 		color: '#FFFFFF',
// 		top: 0,
// 		flexGrow: 1,
// 		minWidth: '40%',
// 		height: '100vh',
// 		transform: 'translateZ(0)',
// 		// The position fixed scoping doesn't work in IE 11.
// 		// Disable this demo to preserve the others.
// 		'@media all and (-ms-high-contrast: none)': {
// 			display: 'none'
// 		},
// 		overflowY: 'auto',
// 		border: '1px solid yellow'
// 	},
// 	backdrop: {
// 		zIndex: 1,
// 		color: 'rgba(0,0,0,0.98)'
// 	},
// 	content: {
// 		margin: '1.38rem 0.88rem 1.5rem 1.63rem'
// 	},
// 	header: {
// 		display: 'flex',
// 		justifyContent: 'space-between',
// 		marginBottom: 5,
// 		marginTop: 15,
// 		paddingLeft: '3%'
// 	},
// 	heading: {
// 		margin: '0px 16px',
// 		position: 'static',
// 		width: '30.44rem',
// 		height: '2.25rem',
// 		left: '3 rem',
// 		top: '0 rem',
// 		fontFamily: 'Poppins',
// 		fontStyle: 'normal',
// 		fontWeight: '800',
// 		fontSize: '1.5rem',
// 		lineHeight: '2.25rem',
// 		display: 'flex',
// 		alignItems: 'center',
// 		letterSpacing: '-0.02em',
// 		color: '#FFFF00',
// 		flex: 'none',
// 		order: '1',
// 		flexGrow: '1'
// 	},
// 	closeIcon: {
// 		display: 'flex',
// 		flexDirection: 'row',
// 		alignItems: 'flex-start',
// 		padding: '0.5rem',
// 		position: 'static',
// 		width: '1.25rem',
// 		height: '1.25rem',
// 		left: '0rem',
// 		top: '0.13rem',
// 		background: '#404040',
// 		borderRadius: '2.5rem',
// 		flex: 'none',
// 		order: '0',
// 		flexGrow: '0',
// 		margin: '0rem 1rem'
// 	},
// 	assignmentContainer: {
// 		padding: 30,
// 		backgroundColor: '#00000',
// 		width: '38.44rem',
// 		marginRight: 30,
// 		height: 400
// 	},
// 	selectWrapper: {
// 		width: '41.44rem',
// 		marginTop: '2%'
// 	},
// 	selectWrapper2: {
// 		width: '41.44rem',
// 		marginTop: '2%',
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	right: {
// 		marginRight: 7
// 	},
// 	label1: {
// 		position: 'static',
// 		width: '31.44rem',
// 		height: '1.5rem',
// 		left: '0rem',
// 		top: '0rem',
// 		fontFamily: 'Poppins',
// 		fontStyle: 'normal',
// 		fontWeight: 'bold',
// 		fontSize: '1.15rem',
// 		lineHeight: '1.5rem',
// 		display: 'flex',
// 		alignItems: 'center',
// 		color: '#FFFFFF',
// 		flex: 'none',
// 		order: '0',
// 		flexGrow: '1',
// 		margin: '0rem 0.5rem',
// 	},
// 	dragdropWrapper: {
// 		padding: '1.5rem',
// 		backgroundColor: 'yellow',
// 		width: '38.44rem',
// 		marginRight: 30,
// 		height: '10.5rem',
// 		left: '0rem',
// 		//top: '6.75rem',
// 		borderRadius: '0.5rem',
// 		marginTop: '6.75rem'
// 	},
// 	label2: {
// 		position: 'static',
// 		width: '31.44rem',
// 		height: '1.5rem',
// 		left: '1rem',
// 		top: '0rem',
// 		fontFamily: 'Poppins',
// 		fontStyle: 'normal',
// 		fontWeight: 'bold',
// 		fontSize: '0.75rem',
// 		lineHeight: '1.5rem',
// 		textTransform: 'uppercase',
// 		color: '#FFFFFF',
// 		flex: 'none',
// 		order: '0',
// 		flexGrow: '1',
// 		margin: '0rem 1rem',
// 	},
// 	textField: {
// 		display: 'flex',
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		padding: '0.5rem 1rem',
// 		position: 'static',
// 		width: '41.44rem',
// 		//height: '2.5rem',
// 		left: '0rem',
// 		top: '1.5rem',
// 		backgroundColor: '#00000',
// 		border: '1px solid #FFFFFF',
// 		boxSizing: 'border-box',
// 		borderRadius: '1rem',
// 		flex: 'none',
// 		order: '1',
// 		alignSelf: 'stretch',
// 		flexGrow: '0',
// 		margin: '0rem 0rem',
// 		lineHeight: 1.6,
// 		color: 'white',
// 		marginBottom: '1rem'
// 	}
// });

//with conditional rendering setValue, prop will be passed as a value
//className={classes.iosSwitch} with switch
const IOSSwitch = styled((props) => (
	<Switch  focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
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

const PostBtn = ({ buttonText, btnStyle, btnAction = () => { }, disabled = false}) => {
    return (
        <button  style={btnStyle ? btnStyle : {}} onClick={!disabled ? (e) => { btnAction(e) } : null} >
            {buttonText}
        </button>
    )
}

const Popup = ({ title, open, closePopup }) => {
	//const classes = useStyles();

	const [caption, setCaption] = React.useState('');

	const handleClose = () => {
		closePopup();
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
								<div className={classes.dragdropWrapper}></div>
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
									<IOSSwitch sx={{ m: 1 }} />
								</div>
							</div>
							<PostBtn 
								buttonText={'POST'}
								className={`${classes.btn} ${classes.disabled}`}
								btnAction={() => {
									console.log('Button Clicked');
					  
								  }}
								  btnStyle={{
									width: '100%',
									padding: '13px 22px',
									marginRight: 13,
									marginBottom: 25,
								  }}
							/>
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
	disabled : PropTypes.bool.isRequired,
	buttonText : PropTypes.string.isRequired,
	btnStyle : PropTypes.func.isRequired,
	btnAction : PropTypes.func.isRequired
}

export default Popup;
