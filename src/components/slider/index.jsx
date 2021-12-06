import React from 'react';
import PropTypes from 'prop-types';
import classes from './_slider.module.scss';
import { Backdrop, Paper, Slide } from '@material-ui/core';

const Slider = ({ children, open }) => {
	// handleClose();
	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Slide
					direction='left'
					mountOnEnter
					in={open}
					unmountOnExit
					timeout={800}
				>
					<Paper elevation={4} className={classes.paper}>
						{children}
					</Paper>
				</Slide>
			</Backdrop>
		</div>
	);
};

Slider.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired
	// handleClose: PropTypes.func.isRequired
};

export default Slider;
