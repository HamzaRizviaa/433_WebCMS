import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';

import Slider from '../../slider';
import { useStyles } from '../quizStyles';
import UploadOrEditQuiz from '../UploadEditQuestion/UploadOrEditQuiz';

// on upload button in header - to upload new poll or quiz

const UploadQuiz = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	location
}) => {
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);

	const muiClasses = useStyles();

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
			<div className={muiClasses.root}>
				<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
					<TabsListUnstyled
						className={muiClasses.tabMainDiv}
						style={{ width: previewBool ? '60%' : '100%' }}
					>
						<TabUnstyled>Add Poll</TabUnstyled>
						<TabUnstyled>Add Quiz</TabUnstyled>
					</TabsListUnstyled>
					<TabPanelUnstyled value={0}>
						<UploadOrEditQuiz
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
							type='poll'
							location={location}
						/>
					</TabPanelUnstyled>
					<TabPanelUnstyled value={1}>
						<UploadOrEditQuiz
							quiz={true}
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
							type='quiz'
							location={location}
						/>
					</TabPanelUnstyled>
				</TabsUnstyled>
			</div>
		</Slider>
	);
};

UploadQuiz.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired
};

export default UploadQuiz;
