/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { useModalStyles } from './index.style';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grow,
	IconButton
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

export default function TemplateModal({
	title,
	open,
	onClose,
	size = 'small',
	color = 'primary',
	customWidth,
	children
}) {
	const classes = useModalStyles({ size, color, customWidth });

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
						<IconButton
							onClick={onClose}
							classes={{ root: classes.closeIconRoot }}
						>
							<CloseIcon className={classes.closeIcon} />
						</IconButton>
						<span>{title}</span>
					</div>
				</DialogTitle>
				<DialogContent classes={{ root: classes.dialogContentRoot }}>
					<div className={classes.dialogContentText}>{children}</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

TemplateModal.propTypes = {
	title: PropTypes.string,
	open: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	size: PropTypes.string,
	color: PropTypes.string,
	customWidth: PropTypes.any,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	])
};
