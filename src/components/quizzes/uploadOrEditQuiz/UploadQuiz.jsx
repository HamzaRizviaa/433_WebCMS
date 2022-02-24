import React, { useState, useRef } from 'react';
import Slider from '../../slider';
import PropTypes from 'prop-types';
//import classes from './_uploadOrEditQuiz.module.scss';
import UploadOrEditQuiz from './UploadOrEditQuiz';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './quizStyles';

const UploadQuiz = ({ open, handleClose, title, heading1, buttonText }) => {
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
			{/* tab panes */}
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
						/>
					</TabPanelUnstyled>
					<TabPanelUnstyled value={1}>
						<UploadOrEditQuiz
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
};

UploadQuiz.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadQuiz;
