import React, { useState, useRef } from 'react';
import Slider from '../../slider';
import PropTypes from 'prop-types';
//import classes from './_uploadOrEditQuiz.module.scss';
import UploadOrEditQuiz from './UploadOrEditQuiz';

const UploadQuiz = ({ open, handleClose, title, heading1, buttonText }) => {
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
			preview={previewBool}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			previewRef={previewRef}
			disableDropdown={disableDropdown}
			quiz={true}
		>
			<UploadOrEditQuiz
				editQuiz={true}
				heading1={heading1}
				open={open}
				buttonText={buttonText}
				setPreviewBool={setPreviewBool}
				previewFile={previewFile}
				setPreviewFile={setPreviewFile}
				previewRef={previewRef}
				setDisableDropdown={setDisableDropdown}
			/>
		</Slider>
	);
};

UploadQuiz.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadQuiz;
