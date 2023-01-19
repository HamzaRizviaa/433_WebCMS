import * as React from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Grow,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useSound from 'use-sound';

import Button from '../../Button';
import soundOpen from '../../../../assets/openSound.mp3';
import soundClose from '../../../../assets/closeSound.mp3';
import { useModalStyles } from './index.style';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

export default function Modal({
	title,
	open,
	onConfirm,
	onClose,
	onLeftButtonClick,
	isSubmitting = false,
	confirmButtonText = 'CONFIRM',
	confirmButtonVariant = 'contained',
	confirmButtonColor = 'primary',
	leftButtonText = 'GO BACK',
	leftButtonVariant = 'outlined',
	leftButtonColor = 'primary',
	hideLeftButton = false,
	size = 'small',
	color = 'primary',
	isConfirmButtonDisabled = false,
	children
}) {
	const classes = useModalStyles({ size, color });
	const [playOpen] = useSound(soundOpen, { volume: 0.5 });
	const [playClose] = useSound(soundClose, { volume: 0.5 });

	const handleftButtonClick = () => {
		onClose();
		if (onLeftButtonClick) onLeftButtonClick();
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				transitionDuration={{ enter: 600, exit: 400 }}
				onClose={onClose}
				aria-describedby='alert-dialog-slide-description'
				classes={{ paper: classes.dialogBox, root: classes.root }}
			>
				<DialogTitle classes={{ root: classes.root }}>
					<div className={classes.dialogTitle}>
						<span>{title}</span>
						<IconButton
							onClick={onClose}
							onMouseDown={playClose}
							classes={{ root: classes.closeIconRoot }}
						>
							<CloseIcon className={classes.closeIcon} />
						</IconButton>
					</div>
				</DialogTitle>
				<DialogContent classes={{ root: classes.dialogContentRoot }}>
					<div className={classes.dialogContentText}>{children}</div>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
					<div>
						{!hideLeftButton && (
							<Button
								onClick={handleftButtonClick}
								onMouseDown={playClose}
								className={classes.modalBtns}
								variant={leftButtonVariant}
								color={leftButtonColor}
								disabled={isSubmitting}
								size='small'
							>
								{leftButtonText}
							</Button>
						)}
					</div>
					<div>
						<Button
							onClick={onConfirm}
							onMouseDown={playOpen}
							className={classes.modalBtns}
							variant={confirmButtonVariant}
							color={confirmButtonColor}
							disabled={isConfirmButtonDisabled || isSubmitting}
							size='small'
						>
							{confirmButtonText}
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}

Modal.propTypes = {
	title: PropTypes.string,
	open: PropTypes.bool,
	onConfirm: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onLeftButtonClick: PropTypes.func,
	isSubmitting: PropTypes.bool,
	confirmButtonText: PropTypes.string,
	confirmButtonVariant: PropTypes.string,
	confirmButtonColor: PropTypes.string,
	leftButtonText: PropTypes.string,
	leftButtonVariant: PropTypes.string,
	leftButtonColor: PropTypes.string,
	hideLeftButton: PropTypes.bool,
	isConfirmButtonDisabled: PropTypes.bool,
	wrapperRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]),
	size: PropTypes.string,
	color: PropTypes.string
};
