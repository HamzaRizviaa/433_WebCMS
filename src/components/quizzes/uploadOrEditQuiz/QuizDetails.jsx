import React, { useState, useRef } from 'react';

import Slider from '../../slider';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './quizStyles';
import UploadOrEditQuiz from './UploadOrEditQuiz';
import QuizResults from './QuizResults';

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
	notifID
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
			notifID={ status === 'CLOSED' ? '' : notifID }

		>
			<div className={muiClasses.root}>
				{status === 'draft' ? (
					<UploadOrEditQuiz
						page={page}
						quiz={true}
						editQuiz={isEdit}
						heading1={heading1}
						open={open}
						buttonText={buttonText}
						setPreviewBool={setPreviewBool}
						previewFile={previewFile}
						setPreviewFile={setPreviewFile}
						previewRef={previewRef}
						setDisableDropdown={setDisableDropdown}
						handleClose={() => {
							handleClose();
						}}
						status={status}
						type={'quiz'}
						dialogWrapper={dialogWrapper}
						publishedStatus='draft'
						location={location}
					/>
				) : location === 'article' ? (
					<QuizResults
						page={page}
						handleClose={() => {
							handleClose();
						}}
						style={{ minWidth: '40% !important' }}
						location={location}
						type={'quiz'}
						status={status}
						quiz={true}
						dialogWrapper={dialogWrapper}
					/>
				) : (
					<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
						<TabsListUnstyled
							className={muiClasses.tabMainDiv}
							style={{ width: previewBool ? '60%' : '100%' }}
						>
							<TabUnstyled>Quiz Results</TabUnstyled>
							<TabUnstyled>Edit Quiz</TabUnstyled>
						</TabsListUnstyled>
						<TabPanelUnstyled value={0}>
							{/* quiz results table */}
							<QuizResults
								page={page}
								handleClose={() => {
									handleClose();
								}}
								style={{ minWidth: '40% !important' }}
								type={'quiz'}
								status={status}
								location={location}
								quiz={true}
								dialogWrapper={dialogWrapper}
							/>
						</TabPanelUnstyled>
						<TabPanelUnstyled value={1}>
							{/* edit quiz */}

							<UploadOrEditQuiz
								page={page}
								quiz={true}
								editQuiz={isEdit}
								heading1={heading1}
								open={open}
								buttonText={buttonText}
								setPreviewBool={setPreviewBool}
								previewFile={previewFile}
								setPreviewFile={setPreviewFile}
								previewRef={previewRef}
								setDisableDropdown={setDisableDropdown}
								handleClose={() => {
									handleClose();
								}}
								status={status}
								type={'quiz'}
								dialogWrapper={dialogWrapper}
								publishedStatus='draft'
								location={location}
							/>
						</TabPanelUnstyled>
					</TabsUnstyled>
				)}
			</div>
		</Slider>
	);
}
QuizDetails.propTypes = {
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
