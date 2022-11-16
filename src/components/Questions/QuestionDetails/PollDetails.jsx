/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef } from 'react';
import Slider from '../../slider';
import PropTypes from 'prop-types';
import { useStyles } from '../quizStyles';
import QuizResults from '../QuestionResults/QuizResults';

//Question Library : this slider slides when click on row with type : poll

export default function PollDetails({
	open,
	handleClose,
	title,
	status,
	location,
	notifID,
	questionId,
	questionType
}) {
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);
	const dialogWrapper = useRef(null);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const muiClasses = useStyles();

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
			dialogRef={dialogWrapper}
			notifID={notifID}
		>
			<div className={muiClasses.root}>
				<QuizResults
					handleClose={() => {
						handleClose();
					}}
					style={{ minWidth: '40% !important' }}
					type={'poll'}
					questionId={questionId}
					questionType={questionType}
					status={status}
					location={location}
					dialogWrapper={dialogWrapper}
				/>
			</div>
		</Slider>
	);
}
PollDetails.propTypes = {
	questionId: PropTypes.number.isRequired,
	questionType: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	notifID: PropTypes.string
};
