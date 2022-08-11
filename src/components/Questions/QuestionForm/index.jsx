// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/display-name */
// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import LoadingOverlay from 'react-loading-overlay';
// import Close from '@material-ui/icons/Close';
// import Slide from '@mui/material/Slide';
// import PrimaryLoader from '../../PrimaryLoader';
// import { TextField } from '@material-ui/core';
// import DragAndDropField from '../../DragAndDropField';
// import Labels from '../../Labels';
// import { useStyles as globalUseStyles } from '../../../styles/global.style';
// import { useStyles } from '../UploadEditQuestion/UploadOrEditQuiz.style';
// const QuestionForm = ({
// 	item,
// 	key,
// 	index,
// 	// initialData,
// 	// sendDataToParent,
// 	// handleDeleteMedia,
// 	// handleDeleteNews,
// 	setPreviewBool = false,
// 	setPreviewFile = false
// }) => {
// 	//dummy
// 	var editPoll = false; // need to remove
// 	var editQuiz = false; //need to remove

// 	const [isError, setIsError] = useState({});
// 	const [form, setForm] = useState({
// 		uploadedFiles: [],
// 		dropbox_url: '',
// 		question: '',
// 		answer1: '',
// 		answer2: '',
// 		labels: [],
// 		end_date: null
// 	});
// 	const classes = useStyles();
// 	const globalClasses = globalUseStyles();
// 	<LoadingOverlay active={false} spinner={<PrimaryLoader />}>
// 		<Slide in={true} direction='up' {...{ timeout: 400 }}>
// 			<div
// 				ref={loadingRef}
// 				className={`${
// 					previewFile != null
// 						? classes.previewContentWrapper
// 						: classes.contentWrapper
// 				}`}
// 			>
// 				{questionEditStatus === 'loading' ? <PrimaryLoader /> : <></>}
// 				<div
// 					className={globalClasses.contentWrapperNoPreview}
// 					style={{ width: previewFile != null ? '60%' : 'auto' }}
// 				>
// 					<div>
// 						<DragAndDropField
// 							uploadedFiles={form.uploadedFiles}
// 							quizPollStatus={status}
// 							handleDeleteFile={handleDeleteFile}
// 							setPreviewBool={setPreviewBool}
// 							setPreviewFile={setPreviewFile}
// 							isArticle
// 							isEdit={editPoll || editQuiz}
// 							imgEl={imgRef}
// 							imageOnload={() => {
// 								setFileWidth(imgRef.current.naturalWidth);
// 								setFileHeight(imgRef.current.naturalHeight);
// 							}}
// 						/>

// 						{!form.uploadedFiles.length ? (
// 							<section
// 								className={globalClasses.dropZoneContainer}
// 								style={{
// 									borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
// 								}}
// 							>
// 								<div {...getRootProps({ className: globalClasses.dropzone })}>
// 									<input {...getInputProps()} />
// 									<AddCircleOutlineIcon
// 										className={globalClasses.addFilesIcon}
// 									/>
// 									<p className={globalClasses.dragMsg}>
// 										Click or drag file to this area to upload
// 									</p>
// 									<p className={globalClasses.formatMsg}>
// 										Supported formats are jpeg and png
// 									</p>
// 									<p className={globalClasses.uploadMediaError}>
// 										{isError.uploadedFiles
// 											? 'You need to upload a media in order to post'
// 											: ''}
// 									</p>
// 								</div>
// 							</section>
// 						) : (
// 							''
// 						)}

// 						<p className={globalClasses.fileRejectionError}>
// 							{fileRejectionError}
// 						</p>

// 						<div className={globalClasses.dropBoxUrlContainer}>
// 							<h6>DROPBOX URL</h6>
// 							<TextField
// 								value={form.dropbox_url}
// 								onChange={(e) =>
// 									setForm((prev) => {
// 										return { ...prev, dropbox_url: e.target.value };
// 									})
// 								}
// 								placeholder={'Please drop the dropbox URL here'}
// 								className={classes.textField}
// 								multiline
// 								maxRows={2}
// 								InputProps={{
// 									disableUnderline: true,
// 									className: classes.textFieldInput,
// 									style: {
// 										borderRadius: form.dropbox_url ? '16px' : '40px'
// 									}
// 								}}
// 							/>
// 						</div>

// 						<div className={classes.titleContainer}>
// 							<div className={globalClasses.characterCount}>
// 								<h6
// 									className={
// 										isError.question
// 											? globalClasses.errorState
// 											: globalClasses.noErrorState
// 									}
// 								>
// 									QUESTION
// 								</h6>
// 								<h6
// 									style={{
// 										color:
// 											form.question?.length >= 46 && form.question?.length <= 54
// 												? 'pink'
// 												: form.question?.length === 55
// 												? 'red'
// 												: 'white'
// 									}}
// 								>
// 									{form.question?.length}/55
// 								</h6>
// 							</div>
// 							<TextField
// 								disabled={(editQuiz || editPoll) && status !== 'draft'}
// 								value={form.question}
// 								onChange={(e) => {
// 									setForm((prev) => {
// 										return { ...prev, question: e.target.value };
// 									});
// 								}}
// 								placeholder={'Please write your question here'}
// 								className={classes.textField}
// 								InputProps={{
// 									disableUnderline: true,
// 									className: `${classes.textFieldInput}  ${
// 										(editQuiz || editPoll) &&
// 										status !== 'draft' &&
// 										classes.disableTextField
// 									}`
// 								}}
// 								inputProps={{ maxLength: 55 }}
// 								multiline
// 								maxRows={2}
// 							/>
// 						</div>

// 						<p className={globalClasses.mediaError}>
// 							{isError.question
// 								? 'You need to provide a question in order to post.'
// 								: ''}
// 						</p>

// 						<div className={classes.titleContainer}>
// 							<div className={globalClasses.characterCount}>
// 								<h6
// 									className={
// 										isError.ans1
// 											? globalClasses.errorState
// 											: globalClasses.noErrorState
// 									}
// 								>
// 									{quiz || editQuiz ? 'RIGHT ANSWER' : 'ANSWER 1'}
// 								</h6>
// 								<h6
// 									style={{
// 										color:
// 											form.answer1?.length >= 22 && form.answer1?.length <= 28
// 												? 'pink'
// 												: form.answer1?.length === 29
// 												? 'red'
// 												: 'white'
// 									}}
// 								>
// 									{form.answer1?.length}/29
// 								</h6>
// 							</div>
// 							<TextField
// 								disabled={(editQuiz || editPoll) && status !== 'draft'}
// 								value={form.answer1}
// 								onChange={(e) => {
// 									setForm((prev) => {
// 										return { ...prev, answer1: e.target.value };
// 									});
// 								}}
// 								placeholder={'Please write your answer here'}
// 								className={classes.textField}
// 								InputProps={{
// 									disableUnderline: true,
// 									className: `${classes.textFieldInput}  ${
// 										(editQuiz || editPoll) &&
// 										status !== 'draft' &&
// 										classes.disableTextField
// 									}`
// 								}}
// 								multiline
// 								maxRows={1}
// 								inputProps={{ maxLength: 29 }}
// 							/>
// 						</div>

// 						<p className={globalClasses.mediaError}>
// 							{isError.ans1
// 								? quiz
// 									? 'You need to provide right answer in order to post'
// 									: 'You need to provide first answer in order to post'
// 								: ''}
// 						</p>

// 						<div className={classes.titleContainer}>
// 							<div className={globalClasses.characterCount}>
// 								<h6
// 									className={
// 										isError.ans2
// 											? globalClasses.errorState
// 											: globalClasses.noErrorState
// 									}
// 								>
// 									{quiz || editQuiz ? 'WRONG ANSWER' : 'ANSWER 2'}
// 								</h6>
// 								<h6
// 									style={{
// 										color:
// 											form.answer2?.length >= 22 && form.answer2?.length <= 28
// 												? 'pink'
// 												: form.answer2?.length === 29
// 												? 'red'
// 												: 'white'
// 									}}
// 								>
// 									{form.answer2?.length}/29
// 								</h6>
// 							</div>
// 							<TextField
// 								disabled={(editQuiz || editPoll) && status !== 'draft'}
// 								value={form.answer2}
// 								onChange={(e) => {
// 									setForm((prev) => {
// 										return { ...prev, answer2: e.target.value };
// 									});
// 								}}
// 								placeholder={'Please write your answer here'}
// 								className={classes.textField}
// 								InputProps={{
// 									disableUnderline: true,
// 									className: `${classes.textFieldInput}  ${
// 										(editQuiz || editPoll) &&
// 										status !== 'draft' &&
// 										classes.disableTextField
// 									}`
// 								}}
// 								multiline
// 								maxRows={1}
// 								inputProps={{ maxLength: 29 }}
// 							/>
// 						</div>

// 						<p className={globalClasses.mediaError}>
// 							{isError.ans2
// 								? quiz
// 									? 'You need to provide wrong answer in order to post'
// 									: 'You need to provide second answer in order to post'
// 								: ''}
// 						</p>

// 						<div className={classes.titleContainer}>
// 							<h6
// 								className={
// 									isError.selectedLabels
// 										? globalClasses.errorState
// 										: globalClasses.noErrorState
// 								}
// 							>
// 								LABELS
// 							</h6>
// 							<Labels
// 								isEdit={editPoll || editQuiz}
// 								setDisableDropdown={setDisableDropdown}
// 								selectedLabels={form.labels}
// 								setSelectedLabels={(newVal) => {
// 									setForm((prev) => {
// 										return { ...prev, labels: [...newVal] };
// 									});
// 								}} //closure
// 								LabelsOptions={quizLabels}
// 								extraLabel={extraLabel}
// 								handleChangeExtraLabel={handleChangeExtraLabel}
// 								draftStatus={status}
// 								setExtraLabel={setExtraLabel}
// 							/>
// 						</div>

// 						<p className={globalClasses.mediaError}>
// 							{isError.selectedLabels
// 								? `You need to add ${
// 										7 - form.labels.length
// 								  } more labels in order to upload media`
// 								: isError.selectedLabelsDraft
// 								? 'You need to select atleast 1 label to save as draft'
// 								: ''}
// 						</p>

// 						<p className={globalClasses.mediaError}>
// 							{isError.endDate
// 								? 'You need to select a date in order to post'
// 								: ''}
// 						</p>
// 					</div>

// 					<p className={globalClasses.mediaError}>
// 						{isError.draftError
// 							? 'Something needs to be changed to save a draft'
// 							: ''}
// 					</p>
// 				</div>
// 				{previewFile != null && (
// 					<div ref={previewRef} className={globalClasses.previewComponent}>
// 						<div className={globalClasses.previewHeader}>
// 							<Close
// 								onClick={() => {
// 									setPreviewBool(false);
// 									setPreviewFile(null);
// 								}}
// 								className={globalClasses.closeIcon}
// 							/>
// 							<h5>Preview</h5>
// 						</div>
// 						<div>
// 							<img
// 								src={previewFile.media_url}
// 								className={classes.previewFile}
// 								style={{
// 									width: '100%',
// 									height: `${8 * 4}rem`,
// 									objectFit: 'contain',
// 									objectPosition: 'center'
// 								}}
// 							/>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</Slide>
// 	</LoadingOverlay>;
// };

// QuestionForm.propTypes = {
// 	item: PropTypes.number,
// 	key: PropTypes.number,
// 	index: PropTypes.number,
// 	// initialData: PropTypes.object,
// 	// sendDataToParent: PropTypes.func.isRequired,
// 	// handleDeleteMedia: PropTypes.func,
// 	// handleDeleteNews: PropTypes.func,
// 	setPreviewBool: PropTypes.func.isRequired,
// 	setPreviewFile: PropTypes.func.isRequired
// };

// export default QuestionForm;
