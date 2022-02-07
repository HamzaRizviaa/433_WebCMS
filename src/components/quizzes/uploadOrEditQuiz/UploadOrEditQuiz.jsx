import React from 'react';
//import classes from './_uploadOrEditQuiz.module.scss';
import Slider from '../../slider';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditQuiz.module.scss';

const UploadOrEditQuiz = ({ open, handleClose, title, heading1 }) => {
	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
		>
			<div className={classes.contentWrapper}>
				<div>
					<h5>{heading1}</h5>
				</div>
			</div>
		</Slider>
	);
};

UploadOrEditQuiz.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired
};

export default UploadOrEditQuiz;
