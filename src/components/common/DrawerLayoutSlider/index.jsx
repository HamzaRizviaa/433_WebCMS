import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DrawerLayoutStyles } from './index.style';
import Close from '@material-ui/icons/Close';
import { Backdrop, Box, Paper, Slide } from '@material-ui/core';
import CopyToClipboard from '../CopyToClipboard';
import { ReactComponent as CopyIcon } from '../../../assets/Copy.svg';

const DrawerLayoutSlider = ({
	children,
	open,
	handleClose,
	title,
	handlePreview,
	preview,
	fromArticle = false,
	notifID,
	customWidth
}) => {
	const classes = DrawerLayoutStyles({ fromArticle, customWidth });
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

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Slide
					direction='left'
					mountOnEnter
					in={open}
					unmountOnExit
					timeout={800}
					ref={wrapperRef}
				>
					<Paper
						elevation={4}
						className={classes.paper}
						style={{ maxWidth: `${preview ? 'none' : '40%'}` }}
					>
						<div className={classes.content}>
							<div
								className={
									fromArticle ? classes.articleBuilderHeader : classes.header
								}
							>
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
							{open && children}
						</div>
					</Paper>
				</Slide>
			</Backdrop>
		</div>
	);
};

DrawerLayoutSlider.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	fromArticle: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	disableDropdown: PropTypes.bool.isRequired,
	handlePreview: PropTypes.func.isRequired,
	preview: PropTypes.bool.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	isEdit: PropTypes.bool.isRequired,
	notifID: PropTypes.string,
	customWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DrawerLayoutSlider;
