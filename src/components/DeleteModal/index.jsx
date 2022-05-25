import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
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
import { useStyles } from './deleteModal.style';
import soundOpen from '../../assets/openSound.mp3';
import soundClose from '../../assets/closeSound.mp3';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

export default function DeleteModal({
	text,
	open,
	toggle,
	deleteBtn,
	wrapperRef
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
				onMouseEnter={playOpen}
				aria-describedby='alert-dialog-slide-description'
				classes={{ paper: classes.dialogBox, root: classes.root }}
				ref={wrapperRef}
			>
				<DialogTitle
					className={classes.dialogTitle}
					classes={{ root: classes.root }}
				>
					Delete this {text}?
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
						You are about to delete this <b>{text}</b>. You won’t be able to
						retrieve the post .
					</DialogContentText>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
					<Button
						button3={true}
						onClick={toggle}
						text={'GO BACK'}
						onMouseDown={playClose}
					/>
					<Button
						button2AddSave={true}
						onClick={deleteBtn}
						text={`Delete ${text}`.toUpperCase()}
						onMouseDown={playOpen}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}

DeleteModal.propTypes = {
	text: PropTypes.string,
	open: PropTypes.bool,
	toggle: PropTypes.func.isRequired,
	deleteBtn: PropTypes.func.isRequired,
	wrapperRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	])
};
