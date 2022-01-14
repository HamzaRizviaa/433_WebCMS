import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './_slider.module.scss';
import Close from '@material-ui/icons/Close';
import { Backdrop, Paper, Slide } from '@material-ui/core';

const Slider = ({ children, open, handleClose, title }) => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	// useEffect(() => {
	// 	function handleClickOutside(event) {
	// 		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
	// 			handleClose();
	// 		}
	// 	}

	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => document.removeEventListener('mousedown', handleClickOutside);
	// }, [wrapperRef]);

	return (
		<div>
			<Backdrop
				//onClick={() => handleClose()}
				className={classes.backdrop}
				open={open}
			>
				<Slide
					//ref={wrapperRef}
					direction='left'
					mountOnEnter
					in={open}
					unmountOnExit
					timeout={800}
				>
					<Paper
						// tabIndex='0'
						// onKeyDown={(e) => {
						// 	if (e.key === 'Escape') {
						// 		handleClose();
						// 	}
						// }}
						ref={wrapperRef}
						elevation={4}
						className={classes.paper}
					>
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
};

export default Slider;
