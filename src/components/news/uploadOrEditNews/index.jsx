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
import uploadFileToServer from '../../../utils/uploadFileToServer';
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
import {
	checkEmptyMediaNews,
	checkEmptyMediaNewsDraft,
	comparingNewsFields,
	checkNewElementNEWS,
	checkNewElementNEWSDraft,
	checkSortOrderOnEdit,
	checkDuplicateLabel
} from '../../../utils/newsUtils';
import { TextField } from '@material-ui/core';

//api calls

import { getAllNews } from '../../../pages/NewsLibrary/newsLibrarySlice';
import { ConstructionOutlined } from '@mui/icons-material';
import { ToastErrorNotifications } from '../../../constants';

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
	const [notifID, setNotifID] = useState('');
	const [form, setForm] = useState({
		labels: [],
		banner_title: '',
		banner_description: '',
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
		return () => {
			resetState();
		};
	}, []);

	useEffect(() => {
		if (specificNews) {
			setNotifID(specificNews?.id);
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
					show_comments: specificNews?.show_comments,
					banner_title: specificNews?.banner_title,
					banner_description: specificNews?.banner_description
				};
			});
			specificNews?.slides?.length > 0
				? setNews(updateSlidesDataFromAPI(specificNews?.slides))
				: setNews([]);
		}
	}, [specificNews]);

	useEffect(() => {
		if (specificNews) {
			const validateEmptyNewsArray = [
				checkEmptyMediaNews(news),
				news?.length !== 0
			];

			setEditBtnDisabled(
				!validateForm(form, null, news) ||
					!validateEmptyNewsArray.every((item) => item === true) ||
					comparingNewsFields(specificNews, form)
			);
		}
	}, [specificNews, form]);

	useEffect(() => {
		if (specificNews) {
			setDraftBtnDisabled(
				!validateDraft(form, null, news) ||
					(comparingNewsFields(specificNews, form) &&
						specificNews?.labels?.length === form?.labels.length &&
						!checkDuplicateLabel(form, specificNews))
			);
		}
	}, [specificNews, form]);

	useEffect(() => {
		const validateEmptyNewsArray = [
			checkEmptyMediaNews(news),
			news?.length !== 0
		];

		const validateEmptyNewsAndEditComparisonArray = [
			checkNewElementNEWS(specificNews, news),
			news?.length !== 0
		];

		if (
			!validateForm(form, null, news) ||
			!comparingNewsFields(specificNews, form)
		) {
			//console.log('if');
			setEditBtnDisabled(
				!validateEmptyNewsArray.every((item) => item === true) ||
					!validateForm(form, null, news)
			);
		} else {
			//console.log('else');
			if (specificNews?.slides?.length !== news?.length) {
				setEditBtnDisabled(
					!validateEmptyNewsArray.every((item) => item === true)
				);
			} else {
				if (
					validateEmptyNewsAndEditComparisonArray.every(
						(item) => item === true
					) ||
					!validateEmptyNewsArray.every((item) => item === true)
				) {
					setEditBtnDisabled(!checkSortOrderOnEdit(specificNews, news));
				} else {
					setEditBtnDisabled(
						validateEmptyNewsAndEditComparisonArray.every(
							(item) => item === true
						) || !validateEmptyNewsArray.every((item) => item === true)
					);
				}
				// setEditBtnDisabled(checkMediaUrlPublish(news));
			}
		}
	}, [news]);

	useEffect(() => {
		const validateEmptyNewsArray = [checkEmptyMediaNewsDraft(news)];

		const validateEmptyNewsAndEditComparisonArray = [
			checkNewElementNEWSDraft(specificNews, news)
		];

		if (
			!validateDraft(form, null, news) ||
			!comparingNewsFields(specificNews, form)
		) {
			setDraftBtnDisabled(
				!validateEmptyNewsArray.every((item) => item === true) ||
					!validateDraft(form, null, news)
			);
		} else {
			if (specificNews?.slides?.length !== news?.length) {
				setDraftBtnDisabled(
					!validateEmptyNewsArray.every((item) => item === true)
				);
			} else {
				if (
					validateEmptyNewsAndEditComparisonArray.every(
						(item) => item === true
					) ||
					!validateEmptyNewsArray.every((item) => item === true)
				) {
					//console.log('3rd');
					setDraftBtnDisabled(!checkSortOrderOnEdit(specificNews, news));
				} else {
					//	console.log('4th');
					setDraftBtnDisabled(
						validateEmptyNewsAndEditComparisonArray.every(
							(item) => item === true
						) || !validateEmptyNewsArray.every((item) => item === true)
					);
				}
			}
		}
	}, [news]);

	const updateSlidesDataFromAPI = (data) => {
		let slidesData = data.map(
			({ description, name, title, sort_order, ...rest }) => {
				return {
					sort_order: sort_order,
					data: [
						{
							...rest,
							description,
							name,
							title,
							...(rest.image
								? {
										media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest.image}`,
										file_name: rest.file_name
								  }
								: {})
						}
					]
				};
			}
		);

		return slidesData;
	};

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);

	const resetState = () => {
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPreviewFile(null);
		setPreviewBool(false);
		setDisableDropdown(true);
		setDraftBtnDisabled(false);
		setEditBtnDisabled(false);
		setIsError({});
		setNotifID('');
		setForm({
			labels: [],
			banner_title: '',
			banner_description: '',
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
		dataCopy[index].data = [
			{
				...(dataCopy[index]?.data?.length ? dataCopy[index]?.data[0] : {}),
				...childData
			}
		];

		setNews(dataCopy);
	};

	const handleMediaDataDelete = (elementData, index) => {
		let dataCopy = [...news];
		if (elementData) {
			setNews(
				dataCopy.filter((item, i) => {
					if (index === i) {
						delete item['data'][0]?.file_name;
						delete item['data'][0]?.height;
						delete item['data'][0]?.media_url;
						delete item['data'][0]?.width;

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
			setNews(dataCopy.filter((file) => file.sort_order !== sortOrder));
		}
	};

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
			toast.error(ToastErrorNotifications.deleteBannerItemText);
			setDeleteBtnStatus(false);
			console.log(e, 'Failed to delete News');
		}

		setOpenDeletePopup(!openDeletePopup);
	};

	const createNews = async (id, mediaFiles = [], draft = false) => {
		// setPostButtonStatus(true);

		let slides =
			news.length > 0
				? news.map((item, index) => {
						return {
							//id: item.data[0].id,
							image:
								mediaFiles[index]?.media_url?.split('cloudfront.net/')[1] ||
								mediaFiles[index]?.media_url,
							file_name: mediaFiles[index]?.file_name,
							height: item.data[0]?.height,
							width: item.data[0]?.width,

							dropbox_url: item.data[0]?.dropbox_url,
							description: item.data[0]?.description,
							title: item.data[0]?.title,
							name: item.data[0]?.name,
							sort_order: index + 1
						};
				  })
				: [];

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/news/add-news`,
				{
					save_draft: draft,
					banner_title: form.banner_title,
					banner_description: form.banner_description,
					show_likes: form.show_likes,
					show_comments: form.show_comments,
					slides: slides,
					...(isEdit && id ? { news_id: id } : {}),
					...(form.labels?.length ? { labels: [...form.labels] } : {}),
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

				handleClose();
				dispatch(getAllNews({ page }));
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit news!' : 'Failed to create news!');
			setIsLoading(false);

			console.log(e, 'Failed create / edit News');
		}
	};

	console.log('Labels', form.labels);

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
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				setIsLoading(true);
				let newsImages = news?.map(async (item) => {
					let newsData;
					if (item?.data[0].file) {
						newsData = await uploadFileToServer(item?.data[0], 'newslibrary');

						return newsData;
					} else {
						newsData = item?.data[0];
						return newsData;
					}
				});

				Promise.all([...newsImages])
					.then((mediaFiles) => {
						createNews(specificNews?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				setIsLoading(true);

				let newsImages = news?.map(async (item) => {
					let newsData = await uploadFileToServer(item?.data[0], 'newslibrary');
					return newsData;
				});

				Promise.all([...newsImages])
					.then((mediaFiles) => {
						createNews(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		}
	};

	const handlePublishNews = () => {
		setIsLoading(false);

		if (!validateForm(form) || (editBtnDisabled && status === 'published')) {
			validatePublishNewsBtn();
		} else {
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				setIsLoading(true);

				let newsImages = news?.map(async (item) => {
					let newsData;
					if (item?.data[0].file) {
						newsData = await uploadFileToServer(item?.data[0], 'newslibrary');
						return newsData;
					} else {
						return (newsData = item?.data[0]);
					}
				});

				Promise.all([...newsImages])
					.then((mediaFiles) => {
						createNews(specificNews?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				setIsLoading(true);

				let newsImages = news?.map(async (item) => {
					let newsData = await uploadFileToServer(item?.data[0], 'newslibrary');
					return newsData;
				});

				Promise.all([...newsImages])
					.then((mediaFiles) => {
						createNews(null, mediaFiles);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
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
				notifID={notifID}
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
													<Labels
														titleClasses={
															isError.selectedLabels
																? globalClasses.errorState
																: globalClasses.noErrorState
														}
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
														setExtraLabel={setExtraLabel}
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
												<div className={globalClasses.captionContainer}>
													<div className={globalClasses.characterCount}>
														<h6>BANNER TITLE</h6>
														<h6
															style={{
																color:
																	form?.banner_title?.length >= 39 &&
																	form?.banner_title?.length <= 42
																		? 'pink'
																		: form?.banner_title?.length === 43
																		? 'red'
																		: 'white'
															}}
														>
															{form?.banner_title?.length}/43
														</h6>
													</div>

													<TextField
														value={form.banner_title}
														onChange={(e) => {
															setForm((prev) => {
																return {
																	...prev,
																	banner_title: e.target.value
																};
															});
														}}
														placeholder={'Please write you caption here'}
														className={classes.textField}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput
														}}
														inputProps={{ maxLength: 43 }}
														multiline
														maxRows={2}
													/>
												</div>

												<div
													style={{ marginTop: '15px' }}
													className={globalClasses.captionContainer}
												>
													<div className={globalClasses.characterCount}>
														<h6>BANNER DESCRIPTION</h6>
														<h6
															style={{
																color:
																	form?.banner_description?.length >= 75 &&
																	form?.banner_description?.length <= 83
																		? 'pink'
																		: form?.banner_description?.length === 84
																		? 'red'
																		: 'white'
															}}
														>
															{form?.banner_description?.length}/84
														</h6>
													</div>

													<TextField
														value={form.banner_description}
														onChange={(e) => {
															setForm((prev) => {
																return {
																	...prev,
																	banner_description: e.target.value
																};
															});
														}}
														placeholder={'Please write you caption here'}
														className={classes.textField}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput
														}}
														inputProps={{ maxLength: 84 }}
														multiline
														minRows={3}
														maxRows={4}
													/>
												</div>
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
														initialData={item.data && item.data}
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

								<div
									className={isEdit ? classes.newsButtonDiv : classes.buttonDiv}
								>
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
														isEdit
															? draftBtnDisabled
															: !validateDraft(form, null, news)
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
													isEdit &&
													validateForm(form, null, news) &&
													status === 'draft'
														? false
														: isEdit
														? editBtnDisabled
														: !validateForm(form, null, news)
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
