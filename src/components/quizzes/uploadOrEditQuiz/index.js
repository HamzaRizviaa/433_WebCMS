import React from 'react';
//import classes from './_uploadOrEditQuiz.module.scss';
import Slider from '../../slider';
import PropTypes from 'prop-types';

const UploadOrEditQuiz = ({ open, handleClose, title }) => {
	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
		>
			{' '}
		</Slider>
	);
};

UploadOrEditQuiz.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
};

export default UploadOrEditQuiz;
