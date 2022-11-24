import * as React from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grow,
	IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useSound from 'use-sound';

import Button from '../ui/Button';
import soundOpen from '../../assets/openSound.mp3';
import soundClose from '../../assets/closeSound.mp3';
import { useStyles } from './index.style';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

export default function StopModal({
	text,
	open,
	toggle,
	stopBtn,
	wrapperRef,
	isSubmitting = false
}) {
	const classes = useStyles();
	const [playOpen] = useSound(soundOpen, { volume: 0.5 });
	const [playClose] = useSound(soundClose, { volume: 0.5 });

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				transitionDuration={{ enter: 600, exit: 400 }}
				onClose={() => {
					toggle();
				}}
				// onMouseEnter={playOpen}
				aria-describedby='alert-dialog-slide-description'
				classes={{ paper: classes.dialogBox, root: classes.root }}
				ref={wrapperRef}
			>
				<DialogTitle
					className={classes.dialogTitle}
					classes={{ root: classes.root }}
				>
					{`Stop this ${text}?`}
					<IconButton
						onClick={toggle}
						onMouseDown={playClose}
						classes={{ root: classes.closeIconRoot }}
					>
						<CloseIcon className={classes.closeIcon} />
					</IconButton>
				</DialogTitle>
				<DialogContent classes={{ root: classes.root2 }}>
					<DialogContentText
						id='alert-dialog-slide-description'
						className={classes.dialogContentText}
					>
						<p>
							You are about to stop this <strong> {text} </strong>. You won’t be
							able to restart the {text} again.
						</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
					<Button
						onClick={toggle}
						onMouseDown={playClose}
						size='small'
						variant='outlined'
					>
						GO BACK
					</Button>

					<Button
						onClick={stopBtn}
						onMouseDown={playOpen}
						size='small'
						variant='outlined'
						color='danger'
						disabled={isSubmitting}
					>
						{`STOP ${text}`.toUpperCase()}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

StopModal.propTypes = {
	text: PropTypes.string,
	open: PropTypes.bool,
	toggle: PropTypes.func.isRequired,
	stopBtn: PropTypes.func.isRequired,
	isSubmitting: PropTypes.bool,
	wrapperRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	])
};
