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
	isEdit
}) {
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);

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
		>
			<div className={muiClasses.root}>
				<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
					<TabsListUnstyled className={muiClasses.tabMainDiv}>
						<TabUnstyled>Quiz Results</TabUnstyled>
						<TabUnstyled>Edit Quiz</TabUnstyled>
					</TabsListUnstyled>
					<TabPanelUnstyled value={0}>
						{/* table */}
						<QuizResults style={{minWidth:"40% !important"}} />
					</TabPanelUnstyled>
					<TabPanelUnstyled value={1}>
						{/* add edit quiz */}
						{/* <EditQuiz/>  */}
						<UploadOrEditQuiz
							editQuiz={isEdit}
							heading1={heading1}
							open={open}
							buttonText={buttonText}
							setPreviewBool={setPreviewBool}
							previewFile={previewFile}
							setPreviewFile={setPreviewFile}
							previewRef={previewRef}
							setDisableDropdown={setDisableDropdown}
						/>
					</TabPanelUnstyled>
				</TabsUnstyled>
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
	isEdit: PropTypes.bool.isRequired
};
