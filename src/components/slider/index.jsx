import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './_slider.module.scss';
import Close from '@material-ui/icons/Close';
import { Backdrop, Paper, Slide } from '@material-ui/core';

const Slider = ({
	children,
	open,
	handleClose,
	title,
	disableDropdown,
	handlePreview,
	preview,
	previewRef
}) => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape' && preview === true) {
				handlePreview();
			} else {
				handleClose();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [preview]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				wrapperRef.current &&
				disableDropdown &&
				!preview &&
				!wrapperRef.current.contains(event.target)
			) {
				handleClose();
			}
			if (
				preview &&
				previewRef.current &&
				!previewRef.current.contains(event.target)
			) {
				handlePreview();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [wrapperRef, disableDropdown, preview]);

	return (
		<div>
			<Backdrop
				//onClick={() => handleClose()}
				className={classes.backdrop}
				open={open}
			>
				<Slide
					direction='left'
					mountOnEnter
					in={open}
					unmountOnExit
					timeout={800}
					ref={wrapperRef}
				>
					<Paper
						// tabIndex='0'
						// onKeyDown={(e) => {
						// 	if (e.key === 'Escape') {
						// 		handleClose();
						// 	}
						// }}

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
	title: PropTypes.string.isRequired,
	disableDropdown: PropTypes.bool.isRequired,
	handlePreview: PropTypes.func.isRequired,
	preview: PropTypes.bool.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired
};

export default Slider;
