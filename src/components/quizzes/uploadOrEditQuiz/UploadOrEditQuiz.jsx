import React from 'react';
import Slider from '../../slider';
import PropTypes from 'prop-types';
//import classes from './_uploadOrEditQuiz.module.scss';
import UploadQuiz from './UploadQuiz';

const UploadOrEditQuiz = ({ open, handleClose, title, heading1 }) => {
	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
		>
			<UploadQuiz heading1={heading1} open={open} />
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