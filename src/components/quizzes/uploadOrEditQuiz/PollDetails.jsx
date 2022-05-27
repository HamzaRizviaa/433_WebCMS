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

export default function PollDetails({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit,
	status
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
	// Question Library :  click on row with type:poll
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
		>
			<div className={muiClasses.root}>
				{status === 'draft' ? (
					<UploadOrEditQuiz
						type={'poll'}
						editPoll={isEdit}
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
						dialogWrapper={dialogWrapper}
						publishedStatus='draft'
					/>
				) : (
					<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
						<TabsListUnstyled
							className={muiClasses.tabMainDiv}
							style={{ width: previewBool ? '60%' : '100%' }}
						>
							<TabUnstyled>Poll Results</TabUnstyled>
							<TabUnstyled>Edit Poll</TabUnstyled>
						</TabsListUnstyled>
						<TabPanelUnstyled value={0}>
							{/* poll results table */}
							<QuizResults
								handleClose={() => {
									handleClose();
								}}
								style={{ minWidth: '40% !important' }}
								type={'poll'}
								status={status}
								dialogWrapper={dialogWrapper}
							/>
						</TabPanelUnstyled>
						<TabPanelUnstyled value={1}>
							{/*  edit poll */}
							<UploadOrEditQuiz
								type={'poll'}
								editPoll={isEdit}
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
								dialogWrapper={dialogWrapper}
								publishedStatus='draft'
							/>
						</TabPanelUnstyled>
					</TabsUnstyled>
				)}
			</div>
		</Slider>
	);
}
PollDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};
