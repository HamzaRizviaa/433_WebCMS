import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Slide
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function DeleteModal({ text, open, toggle, rightBtn }) {
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					toggle();
				}}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>Delete this {text}?</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						You are about to delete this {text}. You won’t be able to retrieve
						the post .
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							toggle();
						}}
					>
						Go Back
					</Button>
					<Button
						onClick={() => {
							rightBtn();
						}}
					>
						Delete {text}
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
	rightBtn: PropTypes.func.isRequired
};
