/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */ import React, {
	useState,
	useRef
} from 'react';
import PropTypes from 'prop-types';

import Slider from '../../slider';
import { useStyles } from '../quizStyles';

import QuizResults from '../QuestionResults/QuizResults';

//Question Library : this slider slides when click on row with type : quiz

export default function QuizDetails({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit,
	status,
	location,
	page,
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
			notifID={
				location === 'article' || status === 'CLOSED' || status === 'draft'
					? ''
					: notifID
			}
		>
			<div className={muiClasses.root}>
				<QuizResults
					page={page}
					handleClose={() => {
						handleClose();
					}}
					style={{ minWidth: '40% !important' }}
					location={location}
					questionId={questionId}
					questionType={questionType}
					type={'quiz'}
					status={status}
					quiz={true}
					dialogWrapper={dialogWrapper}
				/>
			</div>
		</Slider>
	);
}
QuizDetails.propTypes = {
	questionId: PropTypes.number.isRequired,
	questionType: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	page: PropTypes.string,
	notifID: PropTypes.string
};
