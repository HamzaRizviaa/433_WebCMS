import React from 'react';
import PropTypes from 'prop-types';
import classes from './_slider.module.scss';
import Close from '@material-ui/icons/Close';
import { Backdrop, Paper, Slide } from '@material-ui/core';

const Slider = ({ children, open, handleClose, title }) => {
	return (
		<div
		// onKeyDown={() => {
		// 	onKeyDowne();
		// }}
		>
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
								<h1 className={classes.heading}>{title}</h1>
							</div>
							{children}
						</div>
					</Paper>
				</Slide>
			</Backdrop>
		</div>
	);
};

Slider.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
	//onKeyDowne: PropTypes.func.isRequired
};

export default Slider;
