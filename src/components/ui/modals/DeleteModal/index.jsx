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
import { useStyles } from './deleteModal.style';
import soundOpen from '../../../../assets/openSound.mp3';
import soundClose from '../../../../assets/closeSound.mp3';
import Button from '../../Button';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

export default function DeleteModal({
	text,
	open,
	toggle,
	deleteBtn,
	wrapperRef,
	isSubmitting = false
}) {
	const classes = useStyles();
	const [playOpen] = useSound(soundOpen, { volume: 0.5 });
	const [playClose] = useSound(soundClose, { volume: 0.5 });

	const handleDeleteClick = () => {
		if (deleteBtn) deleteBtn();
	};

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
					{`Delete this ${text}?`}
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
							You are about to delete this <strong> {text}.</strong> You won’t
							be able to retrieve the post.
						</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
					<Button
						onClick={toggle}
						size='small'
						onMouseDown={playOpen}
						variant='outlined'
					>
						{'GO BACK'}
					</Button>

					<Button
						onClick={handleDeleteClick}
						size='small'
						onMouseDown={playOpen}
						disabled={isSubmitting}
					>
						{`Delete ${text}`.toUpperCase()}
					</Button>
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
	isSubmitting: PropTypes.bool,
	wrapperRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	])
};
