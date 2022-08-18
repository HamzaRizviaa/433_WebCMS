/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef  */
import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import Slide from '@mui/material/Slide';
import checkFileSize from '../../../utils/validateFileSize';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
import PrimaryLoader from '../../PrimaryLoader';
import { useStyles } from './index.style';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import DeleteModal from '../../DeleteModal';
import LoadingOverlay from 'react-loading-overlay';
import Instragram from '../../../assets/Instagram.svg';
import Text from '../../../assets/Text.svg';
import ImageVideo from '../../../assets/Image.svg';
import Tweet from '../../../assets/Twitter Line.svg';
import Question from '../../../assets/Quiz.svg';

/*  ArticleBuilder imports  */
import ArticleElements from '../../ArticleBuilder/ArticleElements'; // left pan of buttons
import ArticleGeneralInfo from '../../ArticleBuilder/ArticleGeneralInfo'; // general Info
import ArticleMediaDraggable from '../../ArticleBuilder/articleMediaDraggable'; // image / video
import ArticleTextDraggable from '../../ArticleBuilder/articleTextDraggable'; // text
import ArticleSocialMediaDraggable from '../../ArticleBuilder/ArticleSocialMediaDraggable'; // insta and twitter
import ImagePreview from '../../ArticleBuilder/PreviewArticles/imagePreview';
import TextPreview from '../../ArticleBuilder/PreviewArticles/textPreview';
import TwitterPost from '../../ArticleBuilder/PreviewArticles/TwitterPost';
import InstagramPost from '../../ArticleBuilder/PreviewArticles/InstagramPost';
import QuestionPoll from '../../ArticleBuilder/PreviewArticles/QuestionPoll';
import DraggableWrapper from '../../ArticleBuilder/DraggableWrapper';
import PreviewWrapper from '../../ArticleBuilder/PreviewWrapper';
import ArticleSlider from '../../ArticleBuilder/ArticleSlider';
import ArticleFooter from '../../ArticleBuilder/ArticleFooter';

//api calls
import {
	getAllArticlesApi,
	getArticleMainCategories,
	getArticleSubCategories
} from '../../../pages/ArticleLibrary/articleLibrarySlice';

import { aws4Interceptor } from 'aws4-axios';

import {
	checkEmptyIG,
	checkNewElementMedia,
	checkEmptyMedia,
	checkNewElementDescription,
	checkEmptyDescription,
	checkEmptyTwitter,
	checkNewElementTwitter,
	checkNewElementIG,
	checkEmptyQuestion,
	checkNewElementQuestion,
	checkEmptyQuestionDraft,
	checkNewElementQuestionDraft
} from '../../../utils/articleUtils';
import ArticleQuestionDraggable from '../../ArticleBuilder/ArticleQuestionDraggable';

const UploadOrEditArticle = ({
	open,
	handleClose,
	title,
	isEdit,
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
	const [landscapeFileWidth, setLandscapeFileWidth] = useState(0);
	const [landscapeFileHeight, setLandscapeFileHeight] = useState(0);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [notifID, setNotifID] = useState('');
	const imgEl = useRef(null);
	const imgEl2 = useRef(null);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const loadingRef = useRef(null);

	const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/6c69e8b4-12ad-4f51-adb5-88def57d73c7.png`;

	const [form, setForm] = useState({
		title: '',
		sub_text: '',
		dropbox_url: '',
		landscape_dropbox_url: '',
		uploadedFiles: [],
		uploadedLandscapeCoverImage: [],
		author_text: '433 Team',
		author_image: [{ media_url: Profile433 }],
		labels: [],
		show_likes: true,
		show_comments: true,
		mainCategory: '',
		subCategory: ''
	});
	const [data, setData] = useState([]);
	const [dataErrors, setDataErrors] = useState(Array(data?.length).fill(false));
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const dialogWrapper = useRef(null);
	console.log('DATA', data);
	// console.log('FORM', form);
	const elementData = [
		{
			image: Text,
			text: 'Add Text',
			type: 'TEXT',
			description: '',
			component: ArticleTextDraggable
		},
		{
			image: ImageVideo,
			text: 'Add Image / Video',
			type: 'MEDIA',
			component: ArticleMediaDraggable
		},
		{
			image: Tweet,
			text: 'Add Tweet',
			type: 'TWITTER',
			twitter_post_url: '',
			component: ArticleSocialMediaDraggable
		},
		{
			image: Instragram,
			text: 'Add IG post',
			type: 'IG',
			ig_post_url: '',
			component: ArticleSocialMediaDraggable
		},
		{
			image: Question,
			text: 'Add Question',
			type: 'QUESTION',
			component: ArticleQuestionDraggable
		}
	];

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
			maxFiles: 1,
			validator: checkFileSize
		});

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: '.jpeg, .jpg, .png',
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
					author_image: [...newFiles]
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
		mainCategories
	} = useSelector((state) => state.ArticleLibraryStore);

	useEffect(() => {
		// dispatch(getPostLabels());
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
			setNotifID(specificArticle?.id);
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
					sub_text: specificArticle?.sub_text,
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
					landscape_dropbox_url: specificArticle?.landscape_dropbox_url,
					uploadedLandscapeCoverImage: specificArticle?.landscape_image
						? [
								{
									id: makeid(10),
									file_name: specificArticle?.landscape_file_name,
									media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificArticle?.landscape_image}`,
									type: 'image'
								}
						  ]
						: [],
					author_text: specificArticle?.author_text,
					author_image: specificArticle?.author_image
						? [
								{
									id: makeid(10),
									media_url: specificArticle?.author_image?.split(
										'cloudfront.net/'
									)[1]
										? specificArticle?.author_image
										: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificArticle?.author_image}`,
									type: 'image'
								}
						  ]
						: [{ media_url: Profile433 }]
				};
			});
			setData(updateDataFromAPI(specificArticle.elements));
			// setEditorTextChecker(specificArticle?.description);
			setFileHeight(specificArticle?.height);
			setFileWidth(specificArticle?.width);
			setLandscapeFileWidth(specificArticle?.landscape_width);
			setLandscapeFileHeight(specificArticle?.landscape_height);
		}
	}, [specificArticle]);

	const updateLabelsFromAPI = (labels) => {
		let newLabels = [];
		if (labels) {
			labels.map((label) => newLabels.push({ id: -1, name: label }));
			return newLabels;
		} else {
			return undefined;
		}
	};

	const updateDataFromAPI = (apiData) => {
		let modifiedData = apiData?.map(
			({ id, sort_order, element_type, ...rest }) => {
				const renderComponent = {
					TEXT: ArticleTextDraggable,
					MEDIA: ArticleMediaDraggable,
					QUESTION: ArticleQuestionDraggable,
					TWITTER: ArticleSocialMediaDraggable,
					IG: ArticleSocialMediaDraggable
				};
				return {
					sortOrder: sort_order,
					element_type,
					component: renderComponent[element_type],
					heading: `Add ${element_type}`,
					isOpen: true,
					isOld: true,
					id,
					data:
						element_type === 'QUESTION'
							? {
									...rest.question_data,

									uploadedFiles: rest?.question_data?.image
										? [
												{
													media_url:
														`${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest?.question_data?.image}` ||
														undefined,
													file_name: rest?.question_data?.file_name
												}
										  ]
										: undefined,
									labels: updateLabelsFromAPI(rest?.question_data?.labels)
							  }
							: [
									{
										...rest,
										...(rest.media_url
											? {
													media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest.media_url}`
											  }
											: {}),
										...(rest.thumbnail_url
											? {
													thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest.thumbnail_url}`
											  }
											: {}),
										...(rest.thumbnail_url
											? {
													type: 'video'
											  }
											: rest.media_url && !rest.thumbnail_url
											? {
													type: 'image'
											  }
											: {})
									}
							  ]
				};
			}
		);
		return modifiedData;
	};

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
	useEffect(() => {
		if (fileRejections2.length) {
			fileRejections2.forEach(({ errors }) => {
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
		validateForm(form, data);
	}, [form, data]);

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

	useEffect(() => {
		if (acceptedFiles2?.length) {
			setIsError({});
			let newFiles = acceptedFiles2.map((file) => {
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
					uploadedLandscapeCoverImage: [
						...form.uploadedLandscapeCoverImage,
						...newFiles
					]
				};
			});
		}
	}, [acceptedFiles2]);

	const createArticle = async (id, mediaFiles = [], draft = false) => {
		setPostButtonStatus(true);

		let elementsData;
		if (data.length) {
			elementsData = data.map((item, index) => {
				return {
					element_type: item.element_type,
					description: item?.data[0]?.description || undefined,
					media_url:
						item.data[0]?.media_url?.split('cloudfront.net/')[1] ||
						item.data[0]?.media_url ||
						undefined,
					thumbnail_url:
						item.data[0]?.thumbnail_url?.split('cloudfront.net/')[1] ||
						item.data[0]?.thumbnail_url ||
						undefined,
					width: item.data[0]?.width || undefined,
					height: item.data[0]?.height || undefined,
					file_name: item.data[0]?.file_name || undefined,
					dropbox_url: item?.data[0]?.dropbox_url || undefined,
					ig_post_url: item?.data[0]?.ig_post_url || undefined,
					twitter_post_url: item?.data[0]?.twitter_post_url || undefined,
					...(item.element_type === 'QUESTION'
						? {
								question_data: {
									image: item?.data?.uploadedFiles
										? item?.data?.uploadedFiles[0]?.image ||
										  item?.data?.uploadedFiles[0]?.media_url?.split(
												'cloudfront.net/'
										  )[1]
										: undefined,
									file_name: item?.data?.uploadedFiles
										? item?.data?.uploadedFiles[0]?.file_name
										: undefined,
									question: item?.data?.question || undefined,
									dropbox_url: item?.data?.dropbox_url || undefined,
									answers: item?.data?.answers || undefined,
									labels: item?.data?.labels || undefined,
									question_type: item?.data?.question_type || undefined,
									question_id: item?.data?.question_id || undefined,
									id: item?.data?.id || undefined
								}
						  }
						: undefined),
					sort_order: index + 1,
					id: item.id || undefined
				};
			});
		}
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/post-article`,
				{
					title: form.title,
					sub_text: form.sub_text,
					height: form.uploadedFiles.length > 0 ? fileHeight : 0,
					width: form.uploadedFiles.length > 0 ? fileWidth : 0,
					main_category_id: form?.mainCategory.id,
					sub_category_id: form.subCategory.id,
					save_draft: draft,
					show_likes: form.show_likes ? true : false,
					show_comments: form.show_comments ? true : false,
					dropbox_url: form.dropbox_url ? form.dropbox_url : '',
					file_name: form?.uploadedFiles?.length
						? mediaFiles[0]?.file_name
						: '',
					image: form?.uploadedFiles?.length
						? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
						  mediaFiles[0]?.media_url
						: '',
					landscape_height:
						form.uploadedLandscapeCoverImage.length > 0
							? landscapeFileHeight
							: 0,
					landscape_width:
						form.uploadedLandscapeCoverImage.length > 0
							? landscapeFileWidth
							: 0,
					landscape_dropbox_url: form.landscape_dropbox_url
						? form.landscape_dropbox_url
						: '',
					landscape_file_name: form?.uploadedLandscapeCoverImage?.length
						? mediaFiles[2]?.landscape_file_name
						: '',
					landscape_image: form?.uploadedLandscapeCoverImage?.length
						? mediaFiles[2]?.media_url?.split('cloudfront.net/')[1] ||
						  mediaFiles[2]?.media_url
						: '',
					author_text: form.author_text,
					author_image: form?.author_image[0]?.file
						? mediaFiles[1]?.media_url?.split('cloudfront.net/')[1] ||
						  mediaFiles[1]?.media_url
						: mediaFiles[1]?.media_url?.split('cloudfront.net/')[1] ||
						  mediaFiles[1]?.media_url,
					...(isEdit && id ? { article_id: id } : {}),
					...((!isEdit || status !== 'published') &&
					(form.labels?.length || status == 'draft')
						? { labels: [...form.labels] }
						: {}),
					elements: elementsData?.length ? elementsData : [],
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

				if (draft === true) {
					// save draft pressed
					// not hitting the API
				} else {
					if (status !== 'published') {
						publishReadMoreApi(result?.data?.data?.id);
					}
				}

				setIsLoading(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getAllArticlesApi({ page }));
				// dispatch(getPostLabels());
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

	const publishReadMoreApi = async (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Format: 'pandas-split'
		};
		const body = {
			columns: ['operation', 'article_id'],
			index: [0],
			data: [['add_article', id]]
		};

		const client = axios.create();
		const interceptor = aws4Interceptor(
			{
				region: 'eu-west-2',
				service: 'sagemaker'
			},
			{
				accessKeyId: 'AKIAW2RPSZR2K7SWJSPE',
				secretAccessKey: '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'
			}
		);
		client.interceptors.request.use(interceptor);

		try {
			let initialResponse = client.post(
				process.env.REACT_APP_INVOCATIONS_ENDPOINT,
				body,
				{
					headers
				}
			);
			let result = await initialResponse;
			if (result?.data?.status_code === 200) {
				console.log('Success - Read More Api !');
			}
		} catch (e) {
			console.log(e, 'Failed - Read More Api !');
		}
	};

	const deleteReadMoreApi = async (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Format: 'pandas-split'
		};
		const body = {
			columns: ['operation', 'article_id'],
			index: [0],
			data: [['delete_article', id]]
		};

		const client = axios.create();
		const interceptor = aws4Interceptor(
			{
				region: 'eu-west-2',
				service: 'sagemaker'
			},
			{
				accessKeyId: 'AKIAW2RPSZR2K7SWJSPE',
				secretAccessKey: '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'
			}
		);
		client.interceptors.request.use(interceptor);

		try {
			let initialResponse = client.post(
				process.env.REACT_APP_INVOCATIONS_ENDPOINT,
				body,
				{
					headers
				}
			);
			let result = await initialResponse;
			if (result?.data?.status_code === 200) {
				console.log('Success - Read More Api !');
			}
		} catch (e) {
			console.log(e, 'Failed - Read More Api !');
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
		setLandscapeFileWidth(0);
		setLandscapeFileHeight(0);
		setEditBtnDisabled(false);
		setDraftBtnDisabled(false);
		setIsError({});
		setNotifID('');
		setForm({
			title: '',
			sub_text: '',
			// description: tinyMCE.activeEditor?.setContent(''),
			dropbox_url: '',
			uploadedFiles: [],
			landscape_dropbox_url: '',
			uploadedLandscapeCoverImage: [],
			author_text: '433 Team',
			author_image: [{ media_url: Profile433 }],
			labels: [],
			mainCategory: '',
			subCategory: '',
			show_likes: true,
			show_comments: true
		});
		setDataErrors(Array(data.length).fill(false));
		setData([]);
	};

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});
	};

	const handleDeleteLandscapeFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedLandscapeCoverImage: form.uploadedLandscapeCoverImage.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	const handleMediaElementDelete = (sortOrder) => {
		let dataCopy = [...data];

		if (sortOrder) {
			setData(dataCopy.filter((file) => file.sortOrder !== sortOrder));
		}
	};

	const handleElementDataDelete = (elementData, index) => {
		let dataCopy = [...data];
		if (elementData) {
			setData(
				dataCopy.filter((item, i) => {
					if (index === i) {
						if (item.element_type === 'QUESTION') {
							const abc = item.data;
							delete abc['uploadedFiles'];
							return abc;
						} else {
							delete item['data'];
							return item;
						}
					} else {
						return item;
					}
				})
			);
		}
	};

	//element type == question , uploaded file detee

	const setNewData = (childData, index) => {
		let dataCopy = [...data];
		dataCopy[index].data = {
			...(dataCopy[index].data ? dataCopy[index].data : {}),
			...childData
		};
		setData(dataCopy);
	};

	const handleExpand = (isOpen, index) => {
		let dataCopy = [...data];
		dataCopy[index].isOpen = isOpen;
		setData(dataCopy);
	};

	const checkDataErrors = () => {
		const errors = data.map((item, index) => {
			if (!item.data) {
				return true;
			} else {
				if (item.element_type === 'TEXT' && !item.data[0].description) {
					return true;
				}
				if (item.element_type === 'MEDIA' && !item.data[0].file_name) {
					return true;
				}
				if (item.element_type === 'TWITTER' && !item.data[0].twitter_post_url) {
					return true;
				}
				if (item.element_type === 'IG' && !item.data[0].ig_post_url) {
					return true;
				}
				if (item.element_type === 'QUESTION') {
					// questionValidate(item.data);
					return true;
				}
			}
		});
		setDataErrors(errors);
	};

	// const questionValidate = (item) => {
	// 	console.log(item, 'item');
	// 	var validate = Object.keys(item).map((key) => {
	// 		if (!item[key]) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	});
	// 	console.log(validate, 'validate');
	// 	var quesValidate = validate.some((item) => {
	// 		item === true;
	// 	});

	// 	console.log(quesValidate, 'quesValidate');

	// 	return quesValidate;
	// };

	useEffect(() => {
		setDataErrors(Array(data.length).fill(false));
	}, [data]);

	const validateArticleBtn = () => {
		setIsError({
			articleTitle: !form.title,
			sub_text: !form.sub_text,
			// elementUnfilled: data?.length ? data.every((item) =>  !item.data) : false,
			// elementUnfilled: function (index) {
			//  if (data?.length) {
			//      data.forEach((item, i) => {
			//          if (i === index) {
			//              return !item.data;
			//          }
			//      });
			//  } else {
			//      return false;
			//  }
			// },
			uploadedFiles: form.uploadedFiles.length < 1,
			uploadedLandscapeCoverImage: form.uploadedLandscapeCoverImage.length < 1,
			selectedLabels: form.labels.length < 7,
			// editorText: !form.description,
			mainCategory: !form.mainCategory,
			subCategory: form?.subCategory
				? !form?.subCategory
				: !form?.subCategory?.name
		});
		checkDataErrors();
		setTimeout(() => {
			setIsError({});
			setDataErrors(Array(data.length).fill(false));
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
				deleteReadMoreApi(id);

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

	const handleArticleElement = (dataItem) => {
		setData((prev) => {
			return [
				...prev,
				{
					sortOrder: data.length + 1,
					heading: dataItem.text,
					component: dataItem.component,
					element_type: dataItem.type,
					isOpen: true,
					deleted: false
				}
			];
		});
	};

	const checkNewAuthorImage = () => {
		return form?.author_image?.some((item) => {
			return item?.file;
		});
	};

	const comparingFields = (specificArticle, form) => {
		return (
			specificArticle?.title?.trim() === form?.title?.trim() &&
			specificArticle?.sub_text?.trim() === form?.sub_text?.trim() &&
			specificArticle?.dropbox_url?.trim() === form?.dropbox_url?.trim() &&
			specificArticle?.landscape_dropbox_url?.trim() ===
				form?.landscape_dropbox_url?.trim() &&
			specificArticle?.author_text?.trim() === form?.author_text?.trim() &&
			specificArticle?.show_likes === form.show_likes &&
			specificArticle?.show_comments === form.show_comments &&
			specificArticle?.file_name === form.uploadedFiles[0]?.file_name &&
			specificArticle?.landscape_file_name ===
				form.uploadedLandscapeCoverImage[0]?.file_name
		);
	};

	const filteringByType = (data, elementType) => {
		return data?.filter((item) => item.element_type === elementType);
	};

	useEffect(() => {
		if (specificArticle) {
			setEditBtnDisabled(postButtonStatus || !validateForm(form, data));
		}
	}, [specificArticle]);

	const checkSortOrderOnEdit = (specificArticle, data) => {
		let result = [];
		for (let i = 0; i < data?.length; i++) {
			result.push(specificArticle.elements[i].sort_order === data[i].sortOrder);
		}
		return result.some((item) => item === false);
	};

	useEffect(() => {
		if (specificArticle) {
			const validationEmptyArray = [
				checkEmptyDescription(data),
				checkEmptyTwitter(data),
				checkEmptyIG(data),
				checkEmptyMedia(data),
				checkEmptyQuestion(data),
				data?.length !== 0
			];

			setEditBtnDisabled(
				!validateForm(form, data) ||
					!validationEmptyArray.every((item) => item === true) ||
					(comparingFields(specificArticle, form) && !checkNewAuthorImage())
			);
		}
	}, [form]);

	useEffect(() => {
		if (specificArticle) {
			const validationCompleteArray = [
				checkNewElementDescription(
					filteringByType(specificArticle?.elements, 'TEXT'),
					filteringByType(data, 'TEXT')
				),
				checkNewElementTwitter(
					filteringByType(specificArticle?.elements, 'TWITTER'),
					filteringByType(data, 'TWITTER')
				),
				checkNewElementIG(
					filteringByType(specificArticle?.elements, 'IG'),
					filteringByType(data, 'IG')
				),
				checkNewElementMedia(
					filteringByType(specificArticle?.elements, 'MEDIA'),
					filteringByType(data, 'MEDIA')
				),
				checkNewElementQuestion(
					filteringByType(specificArticle?.elements, 'QUESTION'),
					filteringByType(data, 'QUESTION')
				),
				data?.length !== 0
			];

			const validationEmptyArray = [
				checkEmptyDescription(data),
				checkEmptyTwitter(data),
				checkEmptyIG(data),
				checkEmptyMedia(data),
				checkEmptyQuestion(data),
				data?.length !== 0
			];

			// console.log(validationCompleteArray, 'valE');

			if (
				!validateForm(form, data) ||
				!comparingFields(specificArticle, form)
			) {
				// console.log('1');
				// console.log(
				// 	!validateForm(form, data),
				// 	!validationEmptyArray.every((item) => item === true),
				// 	'CHECK'
				// );
				setEditBtnDisabled(
					!validationEmptyArray.every((item) => item === true) ||
						!validateForm(form, data)
				);
			} else {
				if (specificArticle?.elements?.length !== data?.length) {
					// console.log('2');
					setEditBtnDisabled(
						!validationEmptyArray.every((item) => item === true)
					);
				} else {
					if (
						validationCompleteArray.every((item) => item === true) ||
						!validationEmptyArray.every((item) => item === true)
					) {
						// console.log('3');
						// console.log(
						// 	validationCompleteArray.every((item) => item === true),
						// 	!validationEmptyArray.every((item) => item === true),
						// 	'CHECK'
						// );
						setEditBtnDisabled(!checkSortOrderOnEdit(specificArticle, data));
					} else {
						// console.log('4');
						// console.log(
						// 	validationCompleteArray.every((item) => item === true),
						// 	!validationEmptyArray.every((item) => item === true),
						// 	'CHECK2'
						// );
						setEditBtnDisabled(
							validationCompleteArray.every((item) => item === true) ||
								!validationEmptyArray.every((item) => item === true)
						);
					}
				}
			}
		}
	}, [data]);

	useEffect(() => {
		if (specificArticle) {
			const validationCompleteArrayDraft = [
				checkNewElementDescription(
					filteringByType(specificArticle?.elements, 'TEXT'),
					filteringByType(data, 'TEXT')
				),
				checkNewElementTwitter(
					filteringByType(specificArticle?.elements, 'TWITTER'),
					filteringByType(data, 'TWITTER')
				),
				checkNewElementIG(
					filteringByType(specificArticle?.elements, 'IG'),
					filteringByType(data, 'IG')
				),
				checkNewElementMedia(
					filteringByType(specificArticle?.elements, 'MEDIA'),
					filteringByType(data, 'MEDIA')
				),
				checkNewElementQuestionDraft(
					filteringByType(specificArticle?.elements, 'QUESTION'),
					filteringByType(data, 'QUESTION')
				)
			];

			const validationDraftEmptyArray = [
				checkEmptyDescription(data),
				checkEmptyTwitter(data),
				checkEmptyIG(data),
				checkEmptyMedia(data),
				checkEmptyQuestionDraft(data)
			];

			// console.log(
			// 	validationDraftEmptyArray,
			// 	validationCompleteArrayDraft,
			// 	'validate'
			// );
			if (
				!validateDraft(form, data) ||
				!comparingDraftFields(specificArticle, form)
			) {
				console.log('1D');
				setDraftBtnDisabled(
					!validationDraftEmptyArray.every((item) => item === true)
				);
			} else {
				if (specificArticle?.elements?.length !== data?.length) {
					console.log('2D');
					setDraftBtnDisabled(
						!validationDraftEmptyArray.every((item) => item === true)
					);
				} else {
					if (
						validationCompleteArrayDraft.every((item) => item === true) ||
						!validationDraftEmptyArray.every((item) => item === true)
					) {
						console.log('3D');
						console.log(
							validationCompleteArrayDraft.every((item) => item === true),
							!validationDraftEmptyArray.every((item) => item === true),
							'CHECK'
						);
						setDraftBtnDisabled(!checkSortOrderOnEdit(specificArticle, data));
					} else {
						console.log('4D');
						console.log(
							validationCompleteArrayDraft.every((item) => item === true),
							!validationDraftEmptyArray.every((item) => item === true),
							'CHECK--2'
						);
						setDraftBtnDisabled(
							validationCompleteArrayDraft.every((item) => item === true) ||
								!validationDraftEmptyArray.every((item) => item === true)
						);
					}
				}
			}
		}
	}, [data]);

	const comparingDraftFields = (specificArticle, form) => {
		return (
			specificArticle?.title?.trim() === form?.title?.trim() &&
			specificArticle?.sub_text?.trim() === form?.sub_text?.trim() &&
			specificArticle?.dropbox_url?.trim() === form?.dropbox_url?.trim() &&
			specificArticle?.landscape_dropbox_url?.trim() ===
				form?.landscape_dropbox_url?.trim() &&
			specificArticle?.author_text?.trim() === form?.author_text?.trim() &&
			specificArticle?.show_likes === form.show_likes &&
			specificArticle?.show_comments === form.show_comments &&
			(specificArticle?.image || form?.uploadedFiles[0]
				? specificArticle?.file_name === form?.uploadedFiles[0]?.file_name
				: true) &&
			(specificArticle?.landscape_image || form?.uploadedLandscapeCoverImage[0]
				? specificArticle?.landscape_file_name ===
				  form?.uploadedLandscapeCoverImage[0]?.file_name
				: true) &&
			specificArticle?.media_type ===
				(form?.mainCategory?.name || form?.mainCategory) &&
			specificArticle?.sub_category ===
				(form?.subCategory?.name || form?.subCategory)
		);
	};

	useEffect(() => {
		if (specificArticle) {
			setDraftBtnDisabled(
				!validateDraft(form, data) ||
					(comparingDraftFields(specificArticle, form) &&
						specificArticle?.labels?.length === form?.labels?.length &&
						!checkDuplicateLabel() &&
						!checkNewAuthorImage())
			);
		}
	}, [specificArticle, form]);

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

	const handleDraftSave = async () => {
		if (!validateDraft(form, data) || draftBtnDisabled) {
			validateDraftBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoading(true);

			if (isEdit) {
				const fileUploader = async (file) => {
					if (file.file) {
						return await uploadFileToServer(file, 'articleLibrary');
					}
					return file;
				};

				let dataMedia = [];
				if (data.length) {
					dataMedia = await Promise.all(
						data.map(async (item, index) => {
							if (item.element_type === 'MEDIA' && item.data[0].file) {
								let uploadedFile = await uploadFileToServer(
									item.data[0],
									'articleLibrary'
								);
								const dataCopy = [...data];
								dataCopy[index].data[0].media_url = uploadedFile.media_url;
								dataCopy[index].data[0].thumbnail_url =
									uploadedFile.thumbnail_url;
								await setData(dataCopy);
								return uploadedFile;
							} else {
								return item;
							}
						})
					);
				}

				let updatedArray = [
					form.uploadedFiles[0] && fileUploader(form.uploadedFiles[0]),
					form.author_image[0] && fileUploader(form.author_image[0]),
					form.uploadedLandscapeCoverImage[0] &&
						fileUploader(form.uploadedLandscapeCoverImage[0]),
					dataMedia && dataMedia[0]
				];

				Promise.all([...updatedArray])
					.then((mediaFiles) => {
						createArticle(specificArticle?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				setIsLoading(true);

				const fileUploader = async (file) => {
					if (file.file) {
						return await uploadFileToServer(file, 'articleLibrary');
					}
					return file;
				};

				let dataMedia = [];
				if (data.length) {
					dataMedia = await Promise.all(
						data.map(async (item, index) => {
							if (item.element_type === 'MEDIA' && item.data[0].file) {
								let uploadedFile = await uploadFileToServer(
									item.data[0],
									'articleLibrary'
								);

								const dataCopy = [...data];
								dataCopy[index].data[0].media_url = uploadedFile?.media_url;
								dataCopy[index].data[0].thumbnail_url =
									uploadedFile?.thumbnail_url;
								await setData(dataCopy);
								return uploadedFile;
							}
						})
					);
				}

				let updatedArray = [
					form.uploadedFiles[0] && fileUploader(form.uploadedFiles[0]),
					form.author_image[0] && fileUploader(form.author_image[0]),
					form.uploadedLandscapeCoverImage[0] &&
						fileUploader(form.uploadedLandscapeCoverImage[0]),
					dataMedia && dataMedia[0]
				];

				Promise.all([...updatedArray])
					.then((mediaFiles) => {
						createArticle(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		}
	};

	const handleAddSaveBtn = async () => {
		if (
			!validateForm(form, data) ||
			(editBtnDisabled && status === 'published')
		) {
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

				setIsLoading(true);

				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'articleLibrary');
					} else {
						return _file;
					}
				});

				let uploadAuthorImagePromiseArray = form.author_image.map(
					async (_file) => {
						if (_file.file) {
							return uploadFileToServer(_file, 'articleLibrary');
						} else {
							return _file;
						}
					}
				);

				let uploadedLandscapeCoverImagePromise =
					form.uploadedLandscapeCoverImage.map(async (_file) => {
						if (_file.file) {
							return uploadFileToServer(_file, 'articleLibrary');
						} else {
							return _file;
						}
					});

				let dataMedia;
				if (data.length) {
					dataMedia = await Promise.all(
						data.map(async (item, index) => {
							if (item.element_type === 'MEDIA' && item.data[0].file) {
								let uploadedFile = await uploadFileToServer(
									item.data[0],
									'articleLibrary'
								);
								const dataCopy = [...data];
								dataCopy[index].data[0].media_url = uploadedFile.media_url;
								dataCopy[index].data[0].thumbnail_url =
									uploadedFile.thumbnail_url;
								await setData(dataCopy);
								return uploadedFile;
							} else {
								return item;
							}
						})
					);
				}

				Promise.all([
					...uploadFilesPromiseArray,
					...uploadAuthorImagePromiseArray,
					...uploadedLandscapeCoverImagePromise,
					...dataMedia
				])
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

				let uploadAuthorImagePromiseArray = form.author_image.map(
					async (_file) => {
						if (_file.file) {
							return uploadFileToServer(_file, 'articleLibrary');
						} else {
							return _file;
						}
					}
				);
				let uploadedLandscapeCoverImagePromise =
					form.uploadedLandscapeCoverImage.map(async (_file) => {
						if (_file.file) {
							return uploadFileToServer(_file, 'articleLibrary');
						} else {
							return _file;
						}
					});
				let dataMedia;
				if (data.length) {
					dataMedia = await Promise.all(
						data.map(async (item, index) => {
							if (item.element_type === 'MEDIA' && item.data[0].file) {
								let uploadedFile = await uploadFileToServer(
									item.data[0],
									'articleLibrary'
								);

								const dataCopy = [...data];
								dataCopy[index].data[0].media_url = uploadedFile.media_url;
								dataCopy[index].data[0].thumbnail_url =
									uploadedFile.thumbnail_url;
								await setData(dataCopy);
								return uploadedFile;
							}
						})
					);
				}

				Promise.all([
					...uploadFilesPromiseArray,
					...uploadAuthorImagePromiseArray,
					...uploadedLandscapeCoverImagePromise,
					...dataMedia
				])
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
				sub_text: !form.sub_text,
				uploadedFiles: form.uploadedFiles.length < 1,
				selectedLabels: form.labels.length < 1,
				// editorText: !form.description,
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

	const handleFileWidthHeight = (width, height) => {
		console.log('call back in article preview', height, width);
	};

	return (
		<>
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
				notifID={status === 'draft' ? '' : notifID}
			>
				<LoadingOverlay
					active={isLoading}
					spinner={<PrimaryLoader />}
					style={{ top: '100px' }}
				>
					<Slide in={true} direction='up' {...{ timeout: 400 }}>
						<div style={{ paddingTop: '100px' }}>
							<div
								ref={loadingRef}
								className={`${
									previewFile != null
										? globalClasses.previewContentWrapper
										: globalClasses.contentWrapper
								}`}
							>
								{status === 'published' &&
								specificArticleStatus === 'loading' ? (
									<PrimaryLoader />
								) : status === 'draft' &&
								  specificArticleStatus === 'loading' ? (
									<PrimaryLoader />
								) : (
									<></>
								)}
								<Grid container>
									<Grid pr={1} item md={2}>
										<div className={classes.gridDivSmall}>
											<Box mb={3.5} className={classes.mainTitleDescription}>
												<h2>Elements</h2>
												<p>Add elements to build your article</p>
											</Box>
											<ArticleElements
												data={elementData}
												onClick={(dataItem) => handleArticleElement(dataItem)}
											/>
										</div>
									</Grid>
									<Grid item md={6} ml={1}>
										<Box mb={3.5} className={classes.mainTitleDescription}>
											<h2>Builder</h2>
											<p>Edit, reorder elements here and build your article</p>
										</Box>
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
											handleDeleteLandscapeFile={handleDeleteLandscapeFile}
											imgRef={imgEl}
											imgRef2={imgEl2}
											setFileWidth={setFileWidth}
											setFileHeight={setFileHeight}
											setLandscapeFileWidth={setLandscapeFileWidth}
											setLandscapeFileHeight={setLandscapeFileHeight}
											getRootProps={getRootProps}
											getInputProps={getInputProps}
											getRootProps2={getRootProps2}
											getInputProps2={getInputProps2}
											fileRejectionError={fileRejectionError}
											getRootPropsAvatar={getRootPropsAvatar}
											getInputPropsAvatar={getInputPropsAvatar}
											fileRejectionError2={fileRejectionError2}
											postLabels={postLabels}
											extraLabel={extraLabel}
											handleChangeExtraLabel={handleChangeExtraLabel}
											setExtraLabel={setExtraLabel}
											isError={isError}
										/>
										<DraggableWrapper onDragEnd={onDragEnd}>
											{data.map((item, index) => {
												return (
													<>
														{React.createElement(item.component, {
															sendDataToParent: (data) =>
																setNewData(data, index),
															setIsOpen: (isOpen) =>
																handleExpand(isOpen, index),
															handleDeleteFile: (sortOrder) =>
																handleMediaElementDelete(sortOrder),
															handleDeleteData: (data) =>
																handleElementDataDelete(data, index),
															WidthHeightCallback: (width, height) =>
																handleFileWidthHeight(width, height),
															// WidthHeightCallback: handleFileWidthHeight,
															item,
															index,
															key: item.sortOrder,
															isEdit: isEdit,
															status: isEdit ? status : undefined,
															initialData:
																item.element_type === 'QUESTION'
																	? item?.data
																	: item.data && item?.data[0],
															setDisableDropdown: setDisableDropdown
														})}

														<p className={globalClasses.mediaError}>
															{dataErrors.length &&
																dataErrors[index] &&
																'This field is required'}
														</p>
													</>
												);
											})}
										</DraggableWrapper>
									</Grid>
									<Grid item md={4}>
										<Box px={2} className={classes.gridDivSmall}>
											<Box mb={3.5} className={classes.mainTitleDescription}>
												<h2>Preview</h2>
												<p>Review the result here before publishing</p>
											</Box>

											<PreviewWrapper form={form}>
												{data.map((item, index) => {
													return (
														<div key={index} style={{ padding: '5px' }}>
															{item.element_type === 'MEDIA' ? (
																<ImagePreview
																	style={{ width: '100%' }}
																	data={item}
																	isEdit={isEdit}
																/>
															) : item.element_type === 'TEXT' ? (
																<TextPreview
																	data={item}
																	style={{ width: '100%' }}
																/>
															) : item.element_type === 'TWITTER' ? (
																<TwitterPost
																	data={item}
																	itemIndex={index}
																	style={{ width: '100%' }}
																/>
															) : item.element_type === 'IG' ? (
																<InstagramPost
																	data={item}
																	itemIndex={index}
																	style={{ width: '100%' }}
																/>
															) : item.element_type === 'QUESTION' ? (
																<QuestionPoll
																	data={item}
																	itemIndex={index}
																	style={{ width: '100%' }}
																/>
															) : (
																''
															)}
														</div>
													);
												})}
											</PreviewWrapper>
										</Box>
									</Grid>
								</Grid>
								<ArticleFooter
									buttonText={buttonText}
									isEdit={isEdit}
									form={form}
									dataElement={data}
									setForm={setForm}
									status={status}
									deleteBtnStatus={deleteBtnStatus}
									toggleDeleteModal={toggleDeleteModal}
									draftBtnDisabled={draftBtnDisabled}
									validateDraft={validateDraft}
									handleDraftSave={handleDraftSave}
									validateForm={validateForm}
									editBtnDisabled={editBtnDisabled}
									handleAddSaveBtn={handleAddSaveBtn}
								/>
							</div>
						</div>
					</Slide>
				</LoadingOverlay>
			</ArticleSlider>

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

UploadOrEditArticle.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string,
	status: PropTypes.string
};

export default UploadOrEditArticle;
