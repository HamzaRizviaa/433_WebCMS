/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
// import classes from './_uploadOrEditArticle.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import Close from '@material-ui/icons/Close';
import Slide from '@mui/material/Slide';
import checkFileSize from '../../../utils/validateFileSize';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
import PrimaryLoader from '../../PrimaryLoader';
import { useStyles } from './index.style';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
//api calls
import {
	getAllArticlesApi,
	getArticleMainCategories,
	getArticleSubCategories
} from '../../../pages/ArticleLibrary/articleLibrarySlice';
//tinymce
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/emoticons/js/emojiimages.min.js';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/charmap';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditViral = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText,
	page,
	status
}) => {
	const [editorTextChecker, setEditorTextChecker] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const imgEl = useRef(null);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const loadingRef = useRef(null);
	const [form, setForm] = useState({
		title: '',
		description: '',
		dropbox_url: '',
		uploadedFiles: [],
		labels: [],
		mainCategory: '',
		subCategory: ''
	});
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
			maxFiles: 1,
			validator: checkFileSize
		});

	const labels = useSelector((state) => state.postLibrary.labels);
	const {
		specificArticle,
		specificArticleStatus,
		subCategories,
		// subCategoriesStatus,
		mainCategories
		// mainCategoriesStatus
	} = useSelector((state) => state.ArticleLibraryStore);

	useEffect(() => {
		dispatch(getPostLabels());
		dispatch(getArticleMainCategories());
		return () => {
			resetState();
		};
	}, []);

	useEffect(() => {
		if (form.mainCategory && !isEdit) {
			dispatch(getArticleSubCategories(form.mainCategory.id));
		} else if (form.mainCategory?.name && isEdit) {
			let setData = mainCategories.find(
				(u) => u.name === form.mainCategory?.name
			);
			dispatch(getArticleSubCategories(setData?.id));
		} else {
			let setData = mainCategories.find((u) => u.name === form.mainCategory);
			dispatch(getArticleSubCategories(setData?.id));
		}
	}, [form.mainCategory]);

	const mainCategoryId = (categoryString) => {
		//find name and will return whole object  isEdit ? subCategory : subCategory.name
		let setData = mainCategories.find((u) => u.name === categoryString);
		setForm((prev) => {
			return { ...prev, mainCategory: setData };
		});
	};

	const SubCategoryId = (e) => {
		//e -- name
		//find name and will return whole object
		let setData = subCategories.find((u) => u.name === e);
		setForm((prev) => {
			return { ...prev, subCategory: setData };
		});
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (specificArticle) {
			if (specificArticle?.labels) {
				let _labels = [];
				specificArticle.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);

				setForm((prev) => {
					return {
						...prev,
						labels: _labels
					};
				});
			}
			mainCategoryId(specificArticle?.media_type);
			SubCategoryId(specificArticle?.sub_category);
			setForm((prev) => {
				return {
					...prev,
					title: specificArticle?.title,
					dropbox_url: specificArticle?.dropbox_url,
					uploadedFiles: [
						{
							id: makeid(10),
							file_name: specificArticle?.file_name,
							media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificArticle?.image}`,
							type: 'image'
						}
					],
					description:
						specificArticle?.length === 0
							? ''
							: // eslint-disable-next-line no-undef
							  tinyMCE.activeEditor?.setContent(specificArticle?.description)
				};
			});

			setEditorTextChecker(specificArticle?.description);
			setFileHeight(specificArticle?.height);
			setFileWidth(specificArticle?.width);
		}
	}, [specificArticle]);

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

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	useEffect(() => {
		validateForm(form);
	}, [form]);

	useEffect(() => {
		if (acceptedFiles?.length) {
			setIsError({});
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: 'image'
				};
			});
			setForm((prev) => {
				return {
					...prev,
					uploadedFiles: [...form.uploadedFiles, ...newFiles]
				};
			});
		}
	}, [acceptedFiles]);

	const handleEditorChange = () => {
		const editorTextContent = tinymce?.activeEditor?.getContent();
		setForm((prev) => {
			return { ...prev, description: editorTextContent };
		});

		setEditorTextChecker(editorTextContent); // to check yellow button condition
	};

	const createArticle = async (id, mediaFiles = [], draft = false) => {
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/post-article`,
				{
					title: form.title,
					height: fileHeight,
					width: fileWidth,
					main_category_id: form?.mainCategory.id,
					sub_category_id: form.subCategory.id,
					save_draft: draft,
					description: form.description,
					dropbox_url: form.dropbox_url ? form.dropbox_url : '',
					file_name: form?.uploadedFiles[0]?.length ? mediaFiles[0]?.file_name : '',
					image: form?.uploadedFiles[0]?.length
						? mediaFiles[0]?.media_url.split('cloudfront.net/')[1] ||
						  mediaFiles[0]?.media_url
						: '',

					...(isEdit && id ? { article_id: id } : {}),
					...((!isEdit || status !== 'published') && form.labels?.length
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
					isEdit ? 'Article has been edited!' : 'Article has been created!'
				);
				setIsLoading(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getAllArticlesApi({ page }));
				dispatch(getPostLabels());
			}
		} catch (e) {
			toast.error(
				isEdit ? 'Failed to edit Article!' : 'Failed to create Article!'
			);
			setIsLoading(false);
			setPostButtonStatus(false);
			console.log(e, 'Failed - create / edit  Article');
		}
	};

	const resetState = () => {
		setEditorTextChecker('');
		setFileRejectionError('');

		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setExtraLabel('');
		setPreviewFile(null);
		setPreviewBool(false);

		setDisableDropdown(true);
		setFileHeight(0);
		setFileWidth(0);
		setIsError({});
		setForm({
			title: '',
			description: tinyMCE.activeEditor?.setContent(''),
			dropbox_url: '',
			uploadedFiles: [],
			labels: [],
			mainCategory: '',
			subCategory: ''
		});
	};

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});
	};

	const validateArticleBtn = () => {
		setIsError({
			articleTitle: !form.title,
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 7,
			editorText: !form.description
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const [newLabels, setNewLabels] = useState([]);

	const deleteArticle = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/delete-article`,
				{
					article_id: id
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				if (result?.data?.data?.is_deleted === false) {
					toast.error(
						'the media or article cannot be deleted because it is used as a top banner'
					);
					dispatch(getAllArticlesApi({ page }));
				} else {
					toast.success('Article has been deleted!');
					handleClose();
					//setting a timeout for getting post after delete.
					dispatch(getAllArticlesApi({ page }));
				}
			}
		} catch (e) {
			toast.error('Failed to delete Article!');
			setDeleteBtnStatus(false);
			console.log(e, 'Failed to delete Article!');
		}
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	useEffect(() => {
		if (labels.length) setNewLabels(labels);
	}, [newLabels]);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const handleTitleDuplicate = async (givenTitle) => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/article/check/${givenTitle}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			setIsLoading(false);
			return result?.data?.message;
		} catch (error) {
			console.log(error, 'Error handle duplicate');
			setIsLoading(false);
			return null;
		}
	};

	const editorTextCheckerTrimmed = editorTextChecker?.replace(/&nbsp;/g, ' ');
	const specificArticleTextTrimmed = specificArticle?.description?.replace(
		/&nbsp;/g,
		' '
	); // api response

	useEffect(() => {
		if (specificArticle) {
			setEditBtnDisabled(
				postButtonStatus ||
					!form.uploadedFiles?.length ||
					!form.title ||
					!form.description ||
					(specificArticle?.file_name === form.uploadedFiles[0]?.file_name &&
						specificArticle?.title?.trim() === form.title?.trim() &&
						specificArticle?.dropbox_url?.trim() === form.dropbox_url.trim() &&
						specificArticleTextTrimmed === editorTextCheckerTrimmed)
			);
		}
	}, [specificArticle, editorTextChecker, form]);

	const handleAddSaveBtn = async () => {
		if (!validateForm(form)) {
			validateArticleBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoading(true);
			if (isEdit) {
				if (specificArticle?.title?.trim() !== form.title?.trim()) {
					console.log(form.title, 'title caption');
					if (
						(await handleTitleDuplicate(form.title)) ===
						'The Title Already Exist'
					) {
						setIsError({ articleTitleExists: 'This title already exists' });
						setTimeout(() => {
							setIsError({});
						}, [5000]);

						setPostButtonStatus(false);
						return;
					}
				}
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'articleLibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createArticle(specificArticle?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				if (
					(await handleTitleDuplicate(form.title)) === 'The Title Already Exist'
				) {
					setIsError({ articleTitleExists: 'This title already exists' });
					setTimeout(() => {
						setIsError({});
					}, [5000]);

					setPostButtonStatus(false);
					return;
				}
				setIsLoading(true);
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'articleLibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createArticle(null, mediaFiles);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		}
	};

	const handleDraftSave = async () => {
		if (!validateDraft(form)) {
			validateArticleBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoading(true);
			if (isEdit) {
				if (specificArticle?.title?.trim() !== form.title?.trim()) {
					if (
						(await handleTitleDuplicate(form.title)) ===
						'The Title Already Exist'
					) {
						setIsError({ articleTitleExists: 'This title already exists' });
						setTimeout(() => {
							setIsError({});
						}, [5000]);

						setPostButtonStatus(false);
						return;
					}
				}
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'articleLibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createArticle(specificArticle?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				if (
					(await handleTitleDuplicate(form.title)) === 'The Title Already Exist'
				) {
					setIsError({ articleTitleExists: 'This title already exists' });
					setTimeout(() => {
						setIsError({});
					}, [5000]);

					setPostButtonStatus(false);
					return;
				}
				setIsLoading(true);
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'articleLibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createArticle(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		}
	};

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (form.uploadedFiles.length && !isEdit) {
					form.uploadedFiles.map((file) => handleDeleteFile(file.id));
				}
			}}
			title={title}
			disableDropdown={disableDropdown}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			preview={previewBool}
			previewRef={previewRef}
			orientationRef={orientationRef}
			edit={isEdit}
			article={true}
		>
			<LoadingOverlay active={isLoading} spinner={<PrimaryLoader />}>
				<Slide in={true} direction='up' {...{ timeout: 400 }}>
					<div
						ref={loadingRef}
						className={`${
							previewFile != null
								? globalClasses.previewContentWrapper
								: globalClasses.contentWrapper
						}`}
					>
						{specificArticleStatus === 'loading' ? <PrimaryLoader /> : <></>}
						<div
							className={globalClasses.contentWrapperNoPreview}
							style={{ width: previewFile != null ? '60%' : 'auto' }}
						>
							<div>
								<h5>{heading1}</h5>
								<div className={classes.categoryContainer}>
									<div className={classes.mainCategory}>
										<h6
											className={[
												isError.mainCategory
													? globalClasses.errorState
													: globalClasses.noErrorState
											].join(' ')}
										>
											MAIN CATEGORY
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={isEdit && status === 'published' ? true : false}
											style={{
												backgroundColor:
													isEdit && status === 'published'
														? '#404040'
														: '#000000'
											}}
											value={
												isEdit ? form.mainCategory : form.mainCategory?.name
											}
											onChange={(event) => {
												console.log('event called 1');
												setDisableDropdown(true);
												// setForm((prev) => {
												// 	return {
												// 		...prev,
												// 		mainCategory: {
												// 			...form.mainCategory,
												// 			name: event.target.value
												// 		}
												// 	};
												// });

												mainCategoryId(event.target.value);
												if (form.uploadedFiles.length) {
													form.uploadedFiles.map((file) =>
														handleDeleteFile(file.id)
													);
												}
												if (isEdit) {
													console.log("event called'");
													setForm((prev) => {
														return { ...prev, subCategory: '' };
													});
												}
											}}
											className={`${classes.select} ${
												isEdit && status === 'published'
													? `${classes.isEditSelect}`
													: ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display:
															isEdit && status === 'published'
																? 'none'
																: 'block',
														top: '4'
													}}
												/>
											)}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'left'
												},
												transformOrigin: {
													vertical: 'top',
													horizontal: 'left'
												},
												getContentAnchorEl: null
											}}
											displayEmpty={true}
											renderValue={(value) => {
												return value ? value?.name || value : 'Please Select';
											}}
										>
											{mainCategories.map((category, index) => {
												return (
													<MenuItem key={index} value={category.name}>
														{category.name}
													</MenuItem>
												);
											})}
										</Select>
										<div className={classes.catergoryErrorContainer}>
											<p className={globalClasses.uploadMediaError}>
												{isError.mainCategory
													? 'You need to select main category'
													: ''}
											</p>
										</div>
									</div>
									<div className={classes.subCategory}>
										<h6
											className={[
												isError.subCategory && form.mainCategory
													? globalClasses.errorState
													: globalClasses.noErrorState
											].join(' ')}
										>
											SUB CATEGORY
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={
												!form.mainCategory || (isEdit && status === 'published')
													? true
													: false
											}
											style={{
												backgroundColor:
													isEdit && status === 'published'
														? '#404040'
														: '#000000'
											}}
											value={
												isEdit
													? form.subCategory
													: form.subCategory?.name || form.subCategory
											}
											onChange={(e) => {
												setDisableDropdown(true);
												SubCategoryId(e.target.value);
											}}
											className={`${classes.select} ${
												isEdit && status === 'published'
													? `${classes.isEditSelect}`
													: ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display:
															isEdit && status === 'published'
																? 'none'
																: 'block',
														top: '4'
													}}
												/>
											)}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'left'
												},
												transformOrigin: {
													vertical: 'top',
													horizontal: 'left'
												},
												getContentAnchorEl: null
											}}
											displayEmpty={form.mainCategory ? true : false}
											renderValue={
												(value) => {
													return value ? value?.name || value : 'Please Select';
												}
												// value?.length
												// 	? Array.isArray(value)
												// 		? value.join(', ')
												// 		: value?.name || value
												// 	: 'Please Select'
											}
										>
											{subCategories.map((category, index) => {
												return (
													<MenuItem key={index} value={category.name}>
														{category.name}
													</MenuItem>
												);
											})}
										</Select>
										<p className={globalClasses.uploadMediaError}>
											{isEdit && status === 'published'
												? ' '
												: form.mainCategory?.name || form.mainCategory
												? isError.subCategory &&
												  'You need to select sub category'
												: ''}
											{/* {} */}
										</p>
									</div>
								</div>

								<DragAndDropField
									uploadedFiles={form.uploadedFiles}
									// isEdit={isEdit}
									handleDeleteFile={handleDeleteFile}
									setPreviewBool={setPreviewBool}
									setPreviewFile={setPreviewFile}
									isArticle
									imgEl={imgEl}
									imageOnload={() => {
										setFileWidth(imgEl.current.naturalWidth);
										setFileHeight(imgEl.current.naturalHeight);
									}}
								/>

								{!form.uploadedFiles.length && (
									<section
										className={globalClasses.dropZoneContainer}
										style={{
											borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
										}}
									>
										<div
											{...getRootProps({ className: globalClasses.dropzone })}
										>
											<input {...getInputProps()} />
											<AddCircleOutlineIcon
												className={globalClasses.addFilesIcon}
											/>
											<p className={globalClasses.dragMsg}>
												Click or drag files to this area to upload
											</p>
											<p className={globalClasses.formatMsg}>
												Supported formats are jpeg and png
											</p>
											<p className={globalClasses.uploadMediaError}>
												{isError.uploadedFiles
													? 'You need to upload a media in order to post'
													: ''}
											</p>
										</div>
									</section>
								)}

								<p className={globalClasses.fileRejectionError}>
									{fileRejectionError}
								</p>
								<div className={globalClasses.dropBoxUrlContainer}>
									<h6>DROPBOX URL</h6>
									<TextField
										value={form.dropbox_url}
										onChange={(e) =>
											setForm((prev) => {
												return { ...prev, dropbox_url: e.target.value };
											})
										}
										placeholder={'Please drop the dropbox URL here'}
										className={classes.textField}
										multiline
										maxRows={2}
										InputProps={{
											disableUnderline: true,
											className: classes.textFieldInput
										}}
									/>
								</div>

								<div className={classes.captionContainer}>
									<div className={globalClasses.characterCount}>
										<h6
											className={
												isError.articleTitle || isError.articleTitleExists
													? globalClasses.errorState
													: globalClasses.noErrorState
											}
										>
											ARTICLE TITLE
										</h6>
										<h6
											style={{
												color:
													form.title?.length >= 39 && form.title?.length <= 42
														? 'pink'
														: form.title?.length === 43
														? 'red'
														: 'white'
											}}
										>
											{form.title?.length}/43
										</h6>
									</div>

									<TextField
										// disabled={isEdit}
										value={form.title}
										onChange={(e) =>
											setForm((prev) => {
												return { ...prev, title: e.target.value };
											})
										}
										placeholder={'Please write your title here'}
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
								<p className={globalClasses.mediaError}>
									{isError.articleTitle
										? 'This field is required'
										: isError.articleTitleExists
										? 'This title aready Exists'
										: ''}
								</p>

								<div className={classes.captionContainer}>
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
										draftStatus={status}
										handleChangeExtraLabel={handleChangeExtraLabel}
										setSelectedLabels={(newVal) => {
											setForm((prev) => {
												return { ...prev, labels: [...newVal] };
											});
										}}
									/>
								</div>
								<p className={globalClasses.mediaError}>
									{isError.selectedLabels
										? `You need to add  ${
												7 - form.labels.length
										  }  more labels in order to post`
										: ''}
								</p>

								<div className={classes.captionContainer}>
									<h6
										className={
											isError.editorText
												? globalClasses.errorState
												: globalClasses.noErrorState
										}
									>
										ARTICLE TEXT
									</h6>
									<div className={classes.editor}>
										<Editor
											init={{
												height: 288,
												selector: '#myTextarea',
												id: '#myTextarea',
												browser_spellcheck: true,
												contextmenu: false,
												setup: function (editor) {
													editor.on('init', function () {
														// editorText;
														form.description;
													});
												},
												content_style:
													"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: Poppins; color: white; line-height:1  }; ",

												branding: false,
												statusbar: true,
												skin: false,
												emoticons_database: 'emojiimages',
												formats: {
													title_h1: {
														inline: 'span',
														styles: {
															fontWeight: '800',
															fontSize: '64px',
															letterSpacing: '-2%',
															marginBottom: '3px'
														}
													},
													title_h2: {
														inline: 'span',
														styles: {
															fontWeight: '800',
															fontSize: '40px',
															letterSpacing: '-2%'
														}
													},
													title_h3: {
														inline: 'span',
														styles: {
															fontWeight: '800',
															fontSize: '36px',
															letterSpacing: '-2%'
														}
													},
													title_h4: {
														inline: 'span',
														styles: {
															fontWeight: '800',
															fontSize: '24px',
															letterSpacing: '-2%'
														}
													},
													title_subtitle: {
														inline: 'span',
														styles: {
															fontWeight: '600',
															fontSize: '24px'
														}
													},
													body_regular: {
														inline: 'span',
														styles: {
															fontWeight: '400',
															fontSize: '16px',
															lineHeight: '24px'
														}
													},
													body_bold: {
														inline: 'span',
														styles: {
															fontWeight: '700',
															fontSize: '16px',
															lineHeight: '24px'
														}
													},
													body_small: {
														inline: 'span',
														styles: {
															fontWeight: '400',
															fontSize: '14px',
															lineHeight: '16px'
														}
													},
													body_tiny: {
														inline: 'span',
														styles: {
															fontWeight: '500',
															fontSize: '12px',
															lineHeight: '16px',
															letterSpacing: '3%'
														}
													},
													body_boldAndTiny: {
														inline: 'span',
														styles: {
															fontWeight: '700',
															fontSize: '12px',
															lineHeight: '16px',
															letterSpacing: '3%'
														}
													}
												},
												style_formats: [
													{
														title: 'Title',
														items: [
															{
																title: 'Header 1',
																format: 'title_h1'
															},
															{
																title: 'Header 2',
																format: 'title_h2'
															},
															{
																title: 'Header 3',
																format: 'title_h3'
															},
															{
																title: 'Header 4',
																format: 'title_h4'
															},
															{
																title: 'Subtitle',
																format: 'title_subtitle'
															}
														]
													},
													{
														title: 'Body',
														items: [
															{
																title: 'Regular',
																format: 'body_regular'
															},
															{
																title: 'Bold',
																format: 'body_bold'
															},
															{
																title: 'Small',
																format: 'body_small'
															},
															{
																title: 'Tiny',
																format: 'body_tiny'
															},
															{
																title: 'Bold and Tiny',
																format: 'body_boldAndTiny'
															}
														]
													}
												],
												menubar: 'edit insert tools format',
												menu: {
													edit: {
														title: 'Edit',
														items: 'undo redo | cut copy paste  | searchreplace'
													},
													insert: {
														title: 'Insert',
														items: 'image link charmap hr anchor insertdatetime'
													},
													format: {
														title: 'Format',
														items:
															'bold italic underline strikethrough | formats  fontsizes align lineheight  '
													},
													tools: {
														title: 'Tools',
														items: 'wordcount'
													}
												},
												plugins: [
													'lists advlist link image anchor',
													'searchreplace  hr visualblocks fullscreen',
													'insertdatetime table paste wordcount  charmap textcolor colorpicker'
												],

												toolbar:
													'undo redo  bold italic underline strikethrough fontsizeselect | ' +
													'alignleft aligncenter ' +
													'alignright alignjustify | bullist numlist | '
											}}
											onEditorChange={() => handleEditorChange()}
											onMouseEnter={() => setDisableDropdown(false)}
											onBlur={() => setDisableDropdown(true)}
										/>
									</div>
								</div>

								<p className={globalClasses.mediaError}>
									{isError.editorText ? 'This field is required' : ''}
								</p>
							</div>

							{/* <div className={classes.buttonDiv}>
								{isEdit ? (
									<div className={classes.editBtn}>
										<Button
											disabled={deleteBtnStatus}
											button2={isEdit ? true : false}
											onClick={() => {
												if (!deleteBtnStatus) {
													deleteArticle(specificArticle?.id);
												}
											}}
											text={'DELETE ARTICLE'}
										/>
									</div>
								) : (
									<> </>
								)}

								<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
									<Button
										disabled={isEdit ? editBtnDisabled : !validateForm(form)}
										onClick={() => handleAddSaveBtn()}
										text={buttonText}
									/>
								</div>
							</div> */}
							<div className={classes.buttonDiv}>
								{isEdit || (status === 'draft' && isEdit) ? (
									<div className={classes.editBtn}>
										<Button
											disabled={deleteBtnStatus}
											button2={isEdit ? true : false}
											onClick={() => {
												if (!deleteBtnStatus) {
													deleteArticle(specificArticle?.id);
												}
											}}
											text={'DELETE ARTICLE'}
										/>
									</div>
								) : (
									<></>
								)}

								<div className={classes.publishDraftDiv}>
									{status === 'draft' || !isEdit ? (
										<div
											className={
												isEdit ? classes.draftBtnEdit : classes.draftBtn
											}
										>
											<Button
												disabledDraft={isEdit ? false : !validateDraft(form)}
												onClick={() => handleDraftSave()}
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

									<div
										className={
											isEdit && validateForm(form)
												? classes.addMediaBtn
												: isEdit
												? classes.addMediaBtnEdit
												: classes.addMediaBtn
										}
									>
										<Button
											disabled={
												isEdit && validateForm(form) && status === 'draft'
													? false
													: isEdit
													? editBtnDisabled
													: !validateForm(form)
											}
											button2AddSave={true}
											text={buttonText}
											onClick={() => handleAddSaveBtn()}
										/>
									</div>
								</div>
							</div>
						</div>

						{previewFile != null && (
							<div ref={previewRef} className={globalClasses.previewComponent}>
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
									<img
										src={previewFile.media_url}
										className={classes.previewFile}
										style={{
											width: `100%`,
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</Slide>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditViral.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string,
	status: PropTypes.string
};

export default UploadOrEditViral;
