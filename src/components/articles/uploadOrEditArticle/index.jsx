/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
// import classes from './_uploadOrEditArticle.module.scss';
import { useDropzone } from 'react-dropzone';
import Editor from '../../Editor';
import ArticleElements from '../../ArticleElements';
import ArticleGeneralInfo from '../../ArticleGeneralInfo';
import ArticleMediaDraggable from '../../articleMediaDraggable';
import ArticleFooter from '../../ArticleFooter';
import DraggableWrapper from '../../DraggableWrapper';
import ArticleElementMedia from '../../ArticleElementMedia';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Box, MenuItem, TextField, Select, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import ArticleSlider from '../../articleSlider';

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
import DeleteModal from '../../DeleteModal';

import Instragram from '../../../assets/Instagram.svg';
import Text from '../../../assets/Text.svg';
import ImageVideo from '../../../assets/Image.svg';
import Tweet from '../../../assets/Twitter Line.svg';
import Profile433 from '../../../assets/Profile433.svg';
import ArticleDraggables from '../../ArticleDraggables';

//api calls
import {
	getAllArticlesApi,
	getArticleMainCategories,
	getArticleSubCategories
} from '../../../pages/ArticleLibrary/articleLibrarySlice';

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
	const [fileRejectionError2, setFileRejectionError2] = useState('');
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
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [dataItem, setDataItem] = useState('');
	const imgEl = useRef(null);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const loadingRef = useRef(null);
	const [form, setForm] = useState({
		title: '',
		description: '',
		dropbox_url: '',
		uploadedFiles: [],
		elementMediaFiles: [],
		avatarProfilePicture: [{ media_url: Profile433 }],
		labels: [],
		show_likes: true,
		show_comments: true,
		mainCategory: '',
		subCategory: ''
	});
	const [data, setData] = useState([]);
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const dialogWrapper = useRef(null);

	console.log('Data', data);

	const elementData = [
		{
			image: Text,
			text: 'Add Text',
			component: ArticleMediaDraggable
		},
		{
			image: ImageVideo,
			text: 'Add Image / Video',
			component: ArticleMediaDraggable
		},
		{
			image: Tweet,
			text: 'Add Tweet',
			component: ArticleMediaDraggable
		},
		{
			image: Instragram,
			text: 'Add IG post',
			component: ArticleMediaDraggable
		}
	];

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
			maxFiles: 1,
			validator: checkFileSize
		});

	const {
		acceptedFiles: acceptedFileAvatar,
		fileRejections: fileRejectionsAvatar,
		getRootProps: getRootPropsAvatar,
		getInputProps: getInputPropsAvatar
	} = useDropzone({
		accept: '.jpeg,.jpg,.png',
		maxFiles: 1,
		validator: checkFileSize
	});

	useEffect(() => {
		if (acceptedFileAvatar?.length) {
			let newFiles = acceptedFileAvatar.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});

			setForm((prev) => {
				return {
					...prev,
					avatarProfilePicture: [...newFiles]
				};
			});
		}
	}, [acceptedFileAvatar]);

	useEffect(() => {
		if (fileRejectionsAvatar.length) {
			fileRejectionsAvatar.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError2(e.message));
			});
			setTimeout(() => {
				setFileRejectionError2('');
			}, [5000]);
		}
	}, [fileRejectionsAvatar]);

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
			// SubCategoryId(specificArticle?.sub_category);
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
	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
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
			// SubCategoryId(specificArticle?.sub_category);
			// setId(specificArticle?.media_type, specificArticle?.sub_category);
			setForm((prev) => {
				return {
					...prev,
					title: specificArticle?.title,
					dropbox_url: specificArticle?.dropbox_url,
					// subCategory: specificArticle.sub_category,
					show_likes: specificArticle?.show_likes,
					show_comments: specificArticle?.show_comments,
					uploadedFiles: specificArticle?.image
						? [
								{
									id: makeid(10),
									file_name: specificArticle?.file_name,
									media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificArticle?.image}`,
									type: 'image'
								}
						  ]
						: [],
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
		if (specificArticle && subCategories) {
			SubCategoryId(specificArticle?.sub_category);
		}
	}, [specificArticle, subCategories]);

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
					height: form.uploadedFiles.length > 0 ? fileHeight : 0,
					width: form.uploadedFiles.length > 0 ? fileWidth : 0,
					main_category_id: form?.mainCategory.id,
					sub_category_id: form.subCategory.id,
					save_draft: draft,
					description: form.description,
					show_likes: form.show_likes ? true : undefined,
					show_comments: form.show_comments ? true : undefined,
					dropbox_url: form.dropbox_url ? form.dropbox_url : '',
					file_name: form?.uploadedFiles?.length
						? mediaFiles[0]?.file_name
						: '',
					image: form?.uploadedFiles?.length
						? mediaFiles[0]?.media_url.split('cloudfront.net/')[1] ||
						  mediaFiles[0]?.media_url
						: '',

					...(isEdit && id ? { article_id: id } : {}),
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
		setEditBtnDisabled(false);
		setDraftBtnDisabled(false);
		setIsError({});
		setForm({
			title: '',
			description: tinyMCE.activeEditor?.setContent(''),
			dropbox_url: '',
			uploadedFiles: [],
			elementMediaFiles: [],
			avatarProfilePicture: [{ media_url: Profile433 }],
			labels: [],
			mainCategory: '',
			subCategory: '',
			show_likes: true,
			show_comments: true
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

	const handleMediaDelete = (id) => {
		setForm((prev) => {
			return {
				...prev,
				elementMediaFiles: form.elementMediaFiles.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	const setNewFile = (file, index) => {
		setForm((prev) => {
			return {
				...prev,
				elementMediaFiles: [...form.elementMediaFiles, ...file]
			};
		});
		let dataCopy = [...data];
		dataCopy[index].data = { ...file };
		setData(dataCopy);
	};

	const handleExpand = (isOpen, index) => {
		let dataCopy = [...data];
		dataCopy[index].isOpen = isOpen;
		setData(dataCopy);
	};

	const handleDeleteAvatarPicture = (id) => {
		setForm((prev) => {
			return {
				...prev,
				avatarProfilePicture: form.avatarProfilePicture.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	const validateArticleBtn = () => {
		setIsError({
			articleTitle: !form.title,
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 7,
			editorText: !form.description,
			mainCategory: !form.mainCategory,
			subCategory: form?.subCategory
				? !form?.subCategory
				: !form?.subCategory?.name
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const [newLabels, setNewLabels] = useState([]);

	const deleteArticle = async (id, isDraft) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/delete-article`,
				{
					article_id: id,
					is_draft: isDraft
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
						'The media or article cannot be deleted because it is used as a top banner'
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
		setOpenDeletePopup(!openDeletePopup);
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
					!form.uploadedFiles.length ||
					!form.title ||
					!form.description ||
					(specificArticle?.file_name === form.uploadedFiles[0]?.file_name &&
						specificArticle?.title?.trim() === form?.title?.trim() &&
						specificArticle?.dropbox_url?.trim() ===
							form?.dropbox_url?.trim() &&
						specificArticleTextTrimmed === editorTextCheckerTrimmed &&
						specificArticle?.show_likes === form.show_likes &&
						specificArticle?.show_comments === form.show_comments)
			);
		}
	}, [specificArticle, editorTextChecker, form]);

	useEffect(() => {
		if (specificArticle) {
			setDraftBtnDisabled(
				!validateDraft(form) ||
					((specificArticle?.image || form?.uploadedFiles[0]
						? specificArticle?.file_name === form?.uploadedFiles[0]?.file_name
						: true) &&
						specificArticle?.media_type ===
							(form?.mainCategory?.name || form?.mainCategory) &&
						specificArticle?.sub_category ===
							(form?.subCategory?.name || form?.subCategory) &&
						specificArticle?.title?.trim() === form?.title?.trim() &&
						specificArticle?.dropbox_url?.trim() ===
							form?.dropbox_url?.trim() &&
						specificArticleTextTrimmed === editorTextCheckerTrimmed &&
						specificArticle?.labels?.length === form?.labels?.length &&
						specificArticle?.show_likes === form.show_likes &&
						specificArticle?.show_comments === form.show_comments &&
						!checkDuplicateLabel())
			);
		}
	}, [specificArticle, editorTextChecker, form]);

	const checkDuplicateLabel = () => {
		let formLabels = form?.labels?.map((formL) => {
			if (specificArticle?.labels?.includes(formL.name)) {
				return true;
			} else {
				return false;
			}
		});
		return formLabels.some((label) => label === false);
	};

	const handleAddSaveBtn = async () => {
		if (!validateForm(form) || (editBtnDisabled && status === 'published')) {
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
				articleTitle: !form.title,
				uploadedFiles: form.uploadedFiles.length < 1,
				selectedLabels: form.labels.length < 1,
				editorText: !form.description,
				mainCategory: !form.mainCategory,
				subCategory: form?.subCategory?.name
					? !form?.subCategory?.name
					: !form?.subCategory
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		}
	};

	const handleDraftSave = async () => {
		if (!validateDraft(form) || draftBtnDisabled) {
			validateDraftBtn();
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
			data,
			result.source.index, // pick
			result.destination.index // drop
		);
		setData(items);
	};

	const handleFileWidthHeight = (height, width) => {
		console.log('Width Height', height, width);
	};

	return (
		<>
			{/* <Slider
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
				dialogRef={dialogWrapper}
			> */}
			<ArticleSlider
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
				dialogRef={dialogWrapper}
			>
				<LoadingOverlay active={isLoading} spinner={<PrimaryLoader />}>
					{/* <ArticleSlide in={true} direction='up' {...{ timeout: 400 }}> */}
					<Slide in={true} direction='up' {...{ timeout: 400 }}>
						<div
							ref={loadingRef}
							className={`${
								previewFile != null
									? globalClasses.previewContentWrapper
									: globalClasses.contentWrapper
							}`}
						>
							{status === 'published' && specificArticleStatus === 'loading' ? (
								<PrimaryLoader />
							) : status === 'draft' && specificArticleStatus === 'loading' ? (
								<PrimaryLoader />
							) : (
								<></>
							)}
							<Grid container>
								<Grid item md={3}>
									<div className={classes.gridDivSmall}>
										<h2>Elements</h2>
										<ArticleElements
											data={elementData}
											onClick={(dataItem) => {
												// setDataItem(dataItem);
												setData((prev) => {
													return [
														...prev,
														{
															id: data.length + 1,
															heading: dataItem.text,
															component: dataItem.component,
															isOpen: true
															// <DraggableWrapper onDragEnd={onDragEnd}>
															// </DraggableWrapper>
														}
													];
												});
											}}
										/>
									</div>
								</Grid>
								<Grid item md={6}>
									<h2>Builder</h2>
									<ArticleGeneralInfo
										isEdit={isEdit}
										form={form}
										setForm={setForm}
										status={status}
										setDisableDropdown={setDisableDropdown}
										mainCategoryId={mainCategoryId}
										mainCategories={mainCategories}
										subCategories={subCategories}
										SubCategoryId={SubCategoryId}
										handleDeleteFile={handleDeleteFile}
										imgRef={imgEl}
										setFileWidth={setFileWidth}
										setFileHeight={setFileHeight}
										getRootProps={getRootProps}
										getInputProps={getInputProps}
										fileRejectionError={fileRejectionError}
										getRootPropsAvatar={getRootPropsAvatar}
										getInputPropsAvatar={getInputPropsAvatar}
										fileRejectionError2={fileRejectionError2}
										postLabels={postLabels}
										extraLabel={extraLabel}
										handleChangeExtraLabel={handleChangeExtraLabel}
										isError={isError}
									/>
									<DraggableWrapper onDragEnd={onDragEnd}>
										{data.map((item, index) => {
											return (
												<>
													{React.createElement(item.component, {
														sendFileToParent: (file) => setNewFile(file, index),
														setIsOpen: (isOpen) => handleExpand(isOpen, index),
														handleDeleteFile: handleMediaDelete,
														WidthHeightCallback: handleFileWidthHeight,
														item,
														index,
														key: item.id,
														initialData: item.data && item?.data[0]
													})}
												</>
											);
										})}
									</DraggableWrapper>
								</Grid>
								<Grid item md={3}>
									<Box px={3} className={classes.gridDivSmall}>
										<Box mb={3.5} className={classes.mainTitleDescription}>
											<h2>Preview</h2>
											<p>Review the result here before publishing</p>
										</Box>
										<Box>
											<img
												src='https://via.placeholder.com/298x596?text=Preview'
												alt='placeholder'
												style={{ width: '250px', height: '350px' }}
											/>
										</Box>
									</Box>
								</Grid>
							</Grid>
							<ArticleFooter
								buttonText={buttonText}
								isEdit={isEdit}
								form={form}
								setForm={setForm}
								status={status}
								deleteBtnStatus={deleteBtnStatus}
								toggleDeleteModal={toggleDeleteModal}
								validateDraft={validateDraft}
								handleDraftSave={handleDraftSave}
								validateForm={validateForm}
								editBtnDisabled={editBtnDisabled}
								handleAddSaveBtn={handleAddSaveBtn}
							/>
						</div>
					</Slide>
					{/* </ArticleSlide> */}
				</LoadingOverlay>
			</ArticleSlider>
			{/* </Slider> */}
			<DeleteModal
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteArticle(specificArticle?.id, status);
				}}
				text={'Article'}
				wrapperRef={dialogWrapper}
			/>
		</>
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
