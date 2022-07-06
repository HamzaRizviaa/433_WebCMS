/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useStyles } from './index.styles';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { getLocalStorageDetails } from '../../../utils';
import LoadingOverlay from 'react-loading-overlay';
import PrimaryLoader from '../../PrimaryLoader';
import Slide from '@mui/material/Slide';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Labels from '../../Labels';
import ToggleSwitch from '../../switch';
import DeleteModal from '../../DeleteModal';
import Button from '../../button';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
import NewsDraggable from '../NewsDraggableWrapper';
import NewsSlide from '../NewsSlide';
import Close from '@material-ui/icons/Close';

//api calls
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import { getAllNews } from '../../../pages/NewsLibrary/newsLibrarySlice';

const UploadOrEditNews = ({
	open,
	handleClose,
	title,
	buttonText,
	isEdit,
	page,
	status
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const [isLoading, setIsLoading] = useState(false);
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
	const [news, setNews] = useState([]);

	const previewRef = useRef(null);
	const loadingRef = useRef(null);
	const dialogWrapper = useRef(null);

	const dispatch = useDispatch();
	const labels = useSelector((state) => state.postLibrary.labels);
	const { specificNews, specificNewsStatus } = useSelector(
		(state) => state.NewsLibrary
	);

	useEffect(() => {
		dispatch(getPostLabels());
		return () => {
			resetState();
		};
	}, []);

	useEffect(() => {
		if (specificNews) {
			if (specificNews?.labels) {
				let _labels = [];
				specificNews.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);

				setForm((prev) => {
					return {
						...prev,
						labels: _labels
					};
				});
			}
			setForm((prev) => {
				return {
					...prev,
					show_likes: specificNews?.show_likes,
					show_comments: specificNews?.show_comments
				};
			});
			// setData(updateDataFromAPI(specificArticle.elements));
		}
	}, [specificNews]);

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
		setNews([]);
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

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const items = reorder(
			news,
			result.source.index, // pick
			result.destination.index // drop
		);
		setNews(items);
	};

	const handleNewsSlide = () => {
		setNews((prev) => {
			return [
				...prev,
				{
					sort_order: news.length + 1
				}
			];
		});
	};

	const setNewData = (childData, index) => {
		let dataCopy = [...news];
		dataCopy[index].data = {
			...(dataCopy[index].data ? dataCopy[index].data : {}),
			...childData
		};
		setNews(dataCopy);
	};

	const handleMediaDataDelete = (elementData, index) => {
		let dataCopy = [...news];
		if (elementData) {
			setNews(
				dataCopy.filter((item, i) => {
					if (index === i) {
						delete item['data'][0];
						return item;
					} else {
						return item;
					}
				})
			);
		}
	};

	const handleNewsElementDelete = (sortOrder) => {
		let dataCopy = [...news];
		if (sortOrder) {
			setNews(dataCopy.filter((file) => file.sortOrder !== sortOrder));
		}
	};

	console.log(news, 'newS');
	const deleteNews = async (id, isDraft) => {
		setDeleteBtnStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/news/delete-news`,
				{
					news_id: id,
					is_draft: isDraft
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('News has been deleted!');
				handleClose();
				dispatch(getAllNews({ page }));
			}
		} catch (e) {
			toast.error('News to delete Viral!');
			setDeleteBtnStatus(false);
			console.log(e, 'News to delete Viral');
		}

		setOpenDeletePopup(!openDeletePopup);
	};

	const validateDraftBtn = () => {
		if (isEdit) {
			setIsError({
				draftError: draftBtnDisabled
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		} else {
			setIsError({
				selectedLabelsDraft: form.labels.length < 1
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		}
	};

	const validatePublishNewsBtn = () => {
		setIsError({
			selectedLabels: form.labels.length < 7
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const handleCreateDraft = () => {
		setIsLoading(false);
		if (!validateDraft(form) || draftBtnDisabled) {
			validateDraftBtn();
		} else {
			// setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				setIsLoading(true);

				try {
					createNews(specificNews?.id, true);
				} catch {
					setIsLoading(false);
				}
			} else {
				setIsLoading(true);

				try {
					createNews(null, true);
				} catch {
					setIsLoading(false);
				}
			}
		}
	};

	const handlePublishNews = () => {
		setIsLoading(false);
		if (!validateForm(form) || (editBtnDisabled && status === 'published')) {
			validatePublishNewsBtn();
		} else {
			// setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				setIsLoading(true);

				try {
					createNews(specificNews?.id);
				} catch {
					setIsLoading(false);
				}
			} else {
				setIsLoading(true);

				try {
					createNews(null);
				} catch {
					setIsLoading(false);
				}
			}
		}
	};

	const createNews = async (id, draft = false) => {
		console.log(id, draft, form.show_likes, 'form.show_likes');
		// setPostButtonStatus(true);
		const data = [
			{
				id: 0,
				image: '',
				height: 420,
				width: 220,
				file_name: 'abc',
				description: 'abc',
				dropbox_url: 'abc',
				title: 'abc',
				name: 'abc',
				sort_order: 0
			}
		];
		let slides = data.map((item, index) => {
			return {
				id: item.id,
				image: '',
				height: item.height,
				width: item.width,
				file_name: item.file_name,
				description: item.description,
				dropbox_url: item.dropbox_url,
				title: item.title,
				name: item.name,
				sort_order: index
			};
		});
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/news/add-news`,
				{
					save_draft: draft,
					show_likes: form.show_likes,
					show_comments: form.show_comments,
					slides: slides.length > 0 ? slides : [],
					...(isEdit && id ? { news_id: id } : {}),
					...((!isEdit || status !== 'published') &&
					(form.labels?.length || status == 'draft')
						? { labels: [...form.labels] }
						: {}),
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					}
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'News has been edited!' : 'News has been created!'
				);
				setIsLoading(false);
				// setPostButtonStatus(false);
				handleClose();
				dispatch(getAllNews({ page }));
				dispatch(getPostLabels());
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit news!' : 'Failed to create news!');
			setIsLoading(false);
			// setPostButtonStatus(false);
			console.log(e, 'Failed create / edit News');
		}
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
					active={isLoading}
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
							{specificNewsStatus === 'loading' ? <PrimaryLoader /> : <></>}
							<div
								className={globalClasses.contentWrapperNoPreview}
								style={{ width: previewFile != null ? '60%' : 'auto' }}
							>
								<div>
									<div className={globalClasses.accordionRoot}>
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

									<NewsDraggable onDragEnd={onDragEnd}>
										{news.map((item, index) => {
											return (
												<>
													<NewsSlide
														item={item}
														index={index}
														key={item.sort_order}
														sendDataToParent={(data) => setNewData(data, index)}
														handleDeleteMedia={(data) =>
															handleMediaDataDelete(data, index)
														}
														handleDeleteNews={(sortOrder) =>
															handleNewsElementDelete(sortOrder)
														}
														initialData={item.data}
														setPreviewBool={setPreviewBool}
														setPreviewFile={setPreviewFile}
													/>
												</>
											);
										})}
									</NewsDraggable>

									<Button
										style={{ marginTop: '4rem' }}
										disabled={false}
										buttonNews={true}
										onClick={() => handleNewsSlide()}
										text={'ADD NEWS SLIDE'}
									/>
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
													onClick={() => handleCreateDraft()}
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
												onClick={() => handlePublishNews()}
												button2AddSave={true}
												text={buttonText}
											/>
										</div>
									</div>
								</div>
							</div>

							{previewFile != null && (
								<div
									ref={previewRef}
									className={globalClasses.previewComponent}
								>
									<div className={globalClasses.previewHeader}>
										<Close
											onClick={() => {
												setPreviewBool(false);
												setPreviewFile(null);
											}}
											className={globalClasses.closeIcon}
										/>
										<h5>Preview</h5>
									</div>
									<div>
										{
											<img
												src={previewFile.media_url}
												className={globalClasses.previewFile}
												style={{
													width: '100%',
													height: `${8 * 4}rem`,
													objectFit: 'contain',
													objectPosition: 'center'
												}}
											/>
										}
									</div>
								</div>
							)}
						</div>
					</Slide>
				</LoadingOverlay>
			</Slider>

			<DeleteModal
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteNews(specificNews?.id, status);
				}}
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
