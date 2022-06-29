/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { useStyles } from './index.styles';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import LoadingOverlay from 'react-loading-overlay';
import PrimaryLoader from '../../PrimaryLoader';
import Slide from '@mui/material/Slide';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Labels from '../../Labels';
import { useDispatch, useSelector } from 'react-redux';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import ToggleSwitch from '../../switch';
import DeleteModal from '../../DeleteModal';
import Button from '../../button';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';

const UploadOrEditNews = ({
	open,
	handleClose,
	title,
	buttonText,
	isEdit,
	// page,
	status
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const [isLoadingNews, setIsLoadingNews] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		labels: [],
		show_likes: true,
		show_comments: true
	});

	const previewRef = useRef(null);
	const loadingRef = useRef(null);
	const dialogWrapper = useRef(null);

	const dispatch = useDispatch();
	const labels = useSelector((state) => state.postLibrary.labels);

	useEffect(() => {
		dispatch(getPostLabels());
		return () => {
			resetState();
		};
	}, []);

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);

	const resetState = () => {
		// setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPreviewFile(null);
		setPreviewBool(false);
		setDisableDropdown(true);
		// setFileHeight(0);
		// setFileWidth(0);
		setDraftBtnDisabled(false);
		setEditBtnDisabled(false);
		setIsError({});
		setForm({
			labels: [],
			show_likes: true,
			show_comments: true
		});
	};

	useEffect(() => {
		setPostLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = postLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setPostLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	useEffect(() => {
		if (labels.length) {
			setPostLabels([...labels]);
		}
	}, [labels]);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

	return (
		<div>
			<Slider
				open={open}
				handleClose={() => {
					handleClose();
				}}
				title={title}
				disableDropdown={disableDropdown}
				handlePreview={() => {
					handlePreviewEscape();
				}}
				preview={previewBool}
				previewRef={previewRef}
				news={true}
				dialogRef={dialogWrapper}
			>
				<LoadingOverlay
					active={isLoadingNews}
					className={classes.loadingOverlay}
					spinner={<PrimaryLoader />}
				>
					<Slide in={true} direction='up' {...{ timeout: 400 }}>
						<div
							ref={loadingRef}
							className={`${
								previewFile != null
									? globalClasses.previewContentWrapper
									: globalClasses.contentWrapper
							}`}
						>
							<div
								className={globalClasses.contentWrapperNoPreview}
								style={{ width: previewFile != null ? '60%' : 'auto' }}
							>
								<div>
									<div className={classes.root}>
										<Accordion defaultExpanded>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography>General Information</Typography>
											</AccordionSummary>

											<AccordionDetails>
												<div className={globalClasses.captionContainer}>
													<h6
														className={
															isError.selectedLabels
																? globalClasses.errorState
																: globalClasses.noErrorState
														}
													>
														LABELS
													</h6>
													<Labels
														isEdit={isEdit}
														setDisableDropdown={setDisableDropdown}
														selectedLabels={form.labels}
														LabelsOptions={postLabels}
														extraLabel={extraLabel}
														handleChangeExtraLabel={handleChangeExtraLabel}
														setSelectedLabels={(newVal) => {
															setForm((prev) => {
																return { ...prev, labels: [...newVal] };
															});
														}}
														draftStatus={status}
													/>
												</div>
												<p className={globalClasses.mediaError}>
													{isError.selectedLabels
														? `You need to add ${
																7 - form.labels.length
														  } more labels in order to upload media`
														: isError.selectedLabelsDraft
														? 'You need to select atleast 1 label to save as draft'
														: ''}
												</p>

												<div className={globalClasses.postMediaContainer}>
													<div className={globalClasses.postMediaHeader}>
														<h5>Show comments</h5>
														<ToggleSwitch
															id={1}
															checked={form.show_comments}
															onChange={(checked) =>
																setForm((prev) => {
																	return { ...prev, show_comments: checked };
																})
															}
														/>
													</div>
												</div>
												<div
													className={globalClasses.postMediaContainer}
													style={{ marginBottom: '1rem' }}
												>
													<div className={globalClasses.postMediaHeader}>
														<h5>Show likes</h5>
														<ToggleSwitch
															id={2}
															checked={form.show_likes}
															onChange={(checked) =>
																setForm((prev) => {
																	return { ...prev, show_likes: checked };
																})
															}
														/>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
									</div>
								</div>

								<p className={globalClasses.mediaError}>
									{isError.draftError
										? 'Something needs to be changed to save a draft'
										: ''}
								</p>

								<div className={classes.buttonDiv}>
									{isEdit || (status === 'draft' && isEdit) ? (
										<div className={globalClasses.editBtn}>
											<Button
												disabled={deleteBtnStatus}
												button2={isEdit ? true : false}
												onClick={() => {
													if (!deleteBtnStatus) {
														toggleDeleteModal();
													}
												}}
												text={'DELETE NEWS'}
											/>
										</div>
									) : (
										<></>
									)}

									<div className={globalClasses.publishDraftDiv}>
										{status === 'draft' || !isEdit ? (
											<div
												className={
													isEdit ? classes.draftBtnEdit : classes.draftBtn
												}
											>
												<Button
													disabledDraft={
														isEdit ? draftBtnDisabled : !validateDraft(form)
													}
													// onClick={() => handleViralDraftBtn()}
													button3={true}
													text={
														status === 'draft' && isEdit
															? 'SAVE DRAFT'
															: 'SAVE AS DRAFT'
													}
												/>
											</div>
										) : (
											<></>
										)}

										<div>
											<Button
												disabled={
													isEdit && validateForm(form) && status === 'draft'
														? false
														: isEdit
														? editBtnDisabled
														: !validateForm(form)
												}
												// onClick={handlePostSaveBtn}
												button2AddSave={true}
												text={buttonText}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
				</LoadingOverlay>
			</Slider>

			<DeleteModal
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				// deleteBtn={() => {
				// 	deleteViral(specificViral?.id, status);
				// }}
				text={'News'}
				wrapperRef={dialogWrapper}
			/>
		</div>
	);
};

UploadOrEditNews.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string,
	status: PropTypes.string.isRequired
};

export default UploadOrEditNews;
