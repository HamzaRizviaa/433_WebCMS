import React from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grow,
	IconButton
} from '@material-ui/core';
import { usePreviewrModalStyles } from './index.style';
import CloseIcon from '@material-ui/icons/Close';
import PrimaryLoader from '../../loaders/PrimaryLoader';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Grow in={true} ref={ref} {...props} />;
});

const PreviewerModal = ({
	open,
	onClose,
	title,
	loading = false,
	children
}) => {
	const classes = usePreviewrModalStyles();

	return (
		<Dialog
			open={open}
			onClose={onClose}
			TransitionComponent={Transition}
			transitionDuration={{ enter: 600, exit: 400 }}
			aria-describedby='alert-dialog-slide-description'
			classes={{ paper: classes.dialogBox, root: classes.root }}
			hideBackdrop
		>
			<DialogTitle className={classes.dialogTitleWrapper}>
				<div className={classes.dialogTitle}>
					<IconButton
						onClick={onClose}
						classes={{ root: classes.closeIconRoot }}
					>
						<CloseIcon className={classes.closeIcon} />
					</IconButton>
					<span className={classes.title}>{`Preview: ${title}`}</span>
				</div>
			</DialogTitle>
			<DialogContent classes={{ root: classes.dialogContentRoot }}>
				<PrimaryLoader loading={loading} fullHeight>
					<div className={classes.dialogContentWrapper}>{children}</div>
				</PrimaryLoader>
			</DialogContent>
		</Dialog>
	);
};

PreviewerModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	])
};

export default PreviewerModal;
