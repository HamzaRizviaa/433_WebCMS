/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './_slider.module.scss';
import Close from '@material-ui/icons/Close';
import { Backdrop, Box, Paper, Slide } from '@material-ui/core';
import CopyToClipboard from '../CopyToClipboard';
import { ReactComponent as CopyIcon } from '../../assets/Copy.svg';

const Slider = ({
	children,
	open,
	handleClose,
	title,
	disableDropdown,
	handlePreview,
	preview,
	previewRef,
	orientationRef,
	dialogRef,
	edit,
	media,
	quiz,
	viral,
	article,
	games,
	news,
	notifID
}) => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape' && preview === true) {
				handlePreview();
			} else if (e.key === 'Escape' && preview === false) {
				handleClose();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [preview]);

	useEffect(() => {
		function handleClickOutside(event) {
			// if (
			// 	wrapperRef.current &&
			// 	disableDropdown &&
			// 	!preview &&
			// 	!wrapperRef.current.contains(event.target) &&
			// 	(dialogRef?.current
			// 		? dialogRef.current && !dialogRef.current.contains(event.target)
			// 		: true)
			// ) {
			// 	handleClose();
			// }
			if (
				!media &&
				!quiz &&
				!games &&
				!news &&
				!viral &&
				!article &&
				preview &&
				previewRef?.current &&
				!previewRef?.current.contains(event.target) &&
				orientationRef?.current &&
				!orientationRef?.current.contains(event.target)
			) {
				handlePreview();
			}
			if (
				edit &&
				preview &&
				previewRef.current &&
				!previewRef.current.contains(event.target)
			) {
				handlePreview();
			}
			if (
				(media || quiz || games || viral || article || news) &&
				preview &&
				previewRef.current &&
				!previewRef.current.contains(event.target)
			) {
				handlePreview();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [wrapperRef, disableDropdown, preview, dialogRef]);

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
						style={{ maxWidth: `${preview ? 'none' : '40%'}` }}
					>
						<div className={classes.content}>
							<div className={classes.header}>
								<Close
									onClick={() => handleClose()}
									className={classes.closeIcon}
								/>
								<div className={classes.notifIDWrapper}>
									<h1 className={classes.heading}>{title}</h1>
									{notifID && (
										<CopyToClipboard>
											{({ copy }) => (
												<Box
													display='flex'
													alignItems='center'
													onClick={() => copy(notifID)}
												>
													<CopyIcon />
													<Box ml={'4px'} className={classes.notifID}>
														{notifID}
													</Box>
												</Box>
											)}
										</CopyToClipboard>
									)}
								</div>
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
	]).isRequired,
	orientationRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	dialogRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	edit: PropTypes.bool.isRequired,
	media: PropTypes.bool,
	quiz: PropTypes.bool,
	viral: PropTypes.bool,
	article: PropTypes.bool,
	games: PropTypes.bool,
	news: PropTypes.bool,
	notifID: PropTypes.string
};

export default Slider;
