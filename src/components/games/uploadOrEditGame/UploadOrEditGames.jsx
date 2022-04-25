/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditGames.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import Close from '@material-ui/icons/Close';
import { TextField, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DragAndDropField from '../../DragAndDropField';
import Button from '../../button';
import checkFileSize from '../../../utils/validateFileSize';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import { getAllGames } from '../../../pages/GamesLibrary/gamesLibrarySlice';
import { useStyles } from './gamesStyles';
import captureVideoFrame from 'capture-video-frame';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';
import { ReactComponent as Timer } from '../../../assets/Timer.svg';
import { ReactComponent as Scoring } from '../../../assets/football.svg';
import { ReactComponent as Objective } from '../../../assets/Cross.svg';
import Four33Loader from '../../../assets/Loader_Yellow.gif';
import { Tooltip, Fade } from '@mui/material';
import validateForm from '../../../utils/validateForm';

const UploadOreditArcade = ({
	heading1,
	open,
	buttonText,
	editArcade,
	editJogo,
	setPreviewBool,
	previewFile,
	setPreviewFile,
	previewRef,
	setDisableDropdown,
	type, // jogo - arcade
	page,
	handleClose
}) => {
	// const keyBinding = (type = 'jogo', gameData, outSideApp) => {
	// 	const obj = {
	// 		title: gameData?.title || '',
	// 		description: gameData?.description || ''
	// 	};
	// 	if (type === 'jogo') {
	// 		return {
	// 			...obj,
	// 			time: gameData?.time || '',
	// 			scoring: gameData?.scoring || '',
	// 			objective: gameData?.objective || '',
	// 			payload: gameData?.payload || '',
	// 			orientation: gameData?.orientation || '',
	// 			game_orientation: gameData?.game_orientation || ''
	// 		};
	// 	} else {
	// 		if (
	// 			gameData?.arcade_game_type === 'Outside App' ||
	// 			outSideApp === 'Outside App'
	// 		) {
	// 			return {
	// 				...obj,
	// 				android: gameData?.package_id.android || '',
	// 				ios: gameData?.package_id.ios || '',
	// 				play_store: gameData?.store_url.play_store || '',
	// 				apple_store: gameData?.store_url.apple_store || '',
	// 				play_store_deeplink: gameData?.deep_link.android || '',
	// 				apple_store_deeplink: gameData?.deep_link.ios || '',
	// 				arcade_game_type: gameData?.arcade_game_type || ''
	// 			};
	// 		} else {
	// 			return {
	// 				...obj,
	// 				game_id: gameData?.game_id || '',
	// 				arcade_game_type: gameData?.arcade_game_type || ''
	// 			};
	// 		}
	// 	}
	// };

	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [titleGame, setTitleGame] = useState('');
	const [descriptionGame, setDescriptionGame] = useState('');
	const [dropboxLink, setDropboxLink] = useState('');
	const [dropboxLink2, setDropboxLink2] = useState('');
	const [time, setTime] = useState('');
	const [scoring, setScoring] = useState('');
	const [objective, setObjective] = useState('');
	const [payload, setPayload] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [videoOrientation, setVideoOrientation] = useState('');
	const [gameOrientation, setGameOrientation] = useState('');
	const [uploadedExplanationOrIcon, setUploadedExplanationOrIcon] = useState(
		[]
	);
	const [arcadeGameType, setArcadeGameType] = useState('');
	const [gameId, setGameId] = useState('');
	const [android, setAndrioid] = useState('');
	const [ios, setIos] = useState('');
	const [playStore, setPlayStore] = useState('');
	const [appStore, setAppStore] = useState('');
	const [playStore2, setPlayStore2] = useState('');
	const [appStore2, setAppStore2] = useState('');
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		uploadedFiles: [],
		uploadedExplanationOrIcon: [],
		dropbox_urls: {
			image: '',
			video_icon: '' // same for video and icon
		},
		orientation: '',
		title: '',
		description: '',
		time: '',
		scoring: '',
		objective: '',
		payload: '',
		game_orientation: '',
		arcade_game_type: '',
		game_id: '',
		android: '',
		ios: '',
		play_store: '',
		apple_store: '',
		play_store_deeplink: '',
		apple_store_deeplink: ''
	});
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [fileWidth2, setFileWidth2] = useState(null);
	const [fileHeight2, setFileHeight2] = useState(null);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const videoRef = useRef(null);
	const imgRef = useRef(null);
	// const jogoKeys = {
	// 	uploadedFiles: [],
	// 	uploadedExplanationOrIcon: [],
	// 	orientation: '',
	// 	title: '',
	// 	description: '',
	// 	time: '',
	// 	scoring: '',
	// 	objective: '',
	// 	payload: '',
	// 	game_orientation: '',
	// 	game_id: ''
	// };
	// const arcadeKeys = {
	// 	uploadedFiles: [],
	// 	uploadedExplanationOrIcon: [],
	// 	title: '',
	// 	description: '',
	// 	android: '',
	// 	ios: '',
	// 	play_store: '',
	// 	apple_store: '',
	// 	play_store_deeplink: '',
	// 	apple_store_deeplink: '',
	// };
	// const commonKeys = [
	// 	'uploadedFiles',
	// 	'uploadedExplanationOrIcon',
	// 	'title',
	// 	'description'
	// ];
	const gameExplanationOrientation = ['PORTRAIT', 'LANDSCAPE'];
	const gameOrientationArray = ['PORTRAIT', 'LANDSCAPE'];
	const arcadeType = ['Inside App', 'Outside App'];

	const muiClasses = useStyles();
	const dispatch = useDispatch();

	const specificGamesData = useSelector(
		(state) => state.GamesLibraryStore.specificGame
	);
	const specificGameStatus = useSelector(
		(state) => state.GamesLibraryStore.specificGameStatus
	);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg, .jpg, .png',
			maxFiles: 1,
			validator: checkFileSize
		});

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: type === 'jogo' ? 'video/mp4' : '.jpeg, .jpg, .png',
		maxFiles: 1,
		validator: checkFileSize
	});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const validateGamesForm = (type, form) => {
		if (type === 'jogo') {
			console.log(
				Object.keys({
					title: !form?.title,
					description: !form?.description,
					time: !form?.time,
					scoring: !form?.scoring,
					objective: !form?.objective,
					payload: !form?.payload,
					orientation: !form?.orientation,
					game_orientation: !form?.game_orientation
					// uploadedFiles: !form?.uploadedFiles.length,
					// uploadedExplanationOrIcon: !form?.uploadedExplanationOrIcon.length
				}).every((key) => form[key] === true),
				'Every'
			);
		} else {
			if (form?.arcade_game_type === 'Outside App') {
				return Object.keys({
					title: !form?.title,
					description: !form?.description,
					android: !form?.package_id.android,
					ios: !form?.package_id.ios,
					play_store: !form?.store_url.play_store,
					apple_store: !form?.store_url.apple_store,
					play_store_deeplink: !form?.deep_link.android,
					apple_store_deeplink: !form?.deep_link.ios,
					arcade_game_type: !form?.arcade_game_type,
					uploadedFiles: form.uploadedFiles.length === 0,
					uploadedExplanationOrIcon: form.uploadedExplanationOrIcon.length === 0
				}).every((key) => form[key] !== '');
			} else {
				return Object.keys({
					title: !form?.title,
					description: !form?.description,
					game_id: !form?.game_id,
					arcade_game_type: !form?.arcade_game_type,
					uploadedFiles: form.uploadedFiles.length === 0,
					uploadedExplanationOrIcon: form.uploadedExplanationOrIcon.length === 0
				}).every((key) => form[key] !== '');
			}
		}
	};

	useEffect(() => {
		if (specificGamesData) {
			setForm((prev) => {
				return {
					...prev,
					...specificGamesData,
					uploadedFiles: [
						{
							id: makeid(10),
							file_name: specificGamesData?.game_image_file_name,
							media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_image?.url}`,
							type: 'image'
						}
					],
					uploadedExplanationOrIcon: [
						{
							id: makeid(10),
							file_name: specificGamesData?.game_video_file_name
								? specificGamesData?.game_video_file_name
								: specificGamesData?.game_icon_file_name,
							media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${
								specificGamesData?.game_video?.url
									? specificGamesData?.game_video?.url
									: specificGamesData?.game_icon?.url
							}`,
							type: specificGamesData?.game_video?.url ? 'video' : 'image',
							fileExtension: specificGamesData?.game_video?.url
								? '.mp4'
								: '.jpg',
							url: `${
								specificGamesData?.game_video?.url &&
								specificGamesData?.game_video?.url
							}`
						}
					]
				};
			});
			setFileWidth(specificGamesData?.game_image?.width);
			setFileHeight(specificGamesData?.game_image?.height);
			setFileWidth2(
				specificGamesData?.game_video?.width
					? specificGamesData?.game_video?.width
					: specificGamesData?.game_icon?.width
			);
			setFileHeight2(
				specificGamesData?.game_video?.height
					? specificGamesData?.game_video?.height
					: specificGamesData?.game_icon?.height
			);
			// setDropboxLink(specificGamesData?.dropbox_urls?.image);
			// setDropboxLink2(specificGamesData?.dropbox_urls?.video);
			// setDescriptionGame(specificGamesData?.description);
			// setTitleGame(specificGamesData?.title);
			// setUploadedFiles([
			// 	{
			// 		id: makeid(10),
			// 		file_name: specificGamesData?.game_image_file_name,
			// 		media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_image?.url}`,
			// 		type: 'image'
			// 	}
			// ]);

			// if (specificGamesData?.game_type === 'JOGO') {
			// 	//jogo
			// 	setScoring(specificGamesData?.scoring);
			// 	setObjective(specificGamesData?.objective);
			// 	setPayload(specificGamesData?.payload);
			// 	setTime(specificGamesData?.time);
			// 	setVideoOrientation(specificGamesData?.orientation?.toUpperCase());
			// 	setGameOrientation(specificGamesData?.game_orientation);
			// 	setFileWidth2(specificGamesData?.game_video?.width);
			// 	setFileHeight2(specificGamesData?.game_video?.height);
			// 	setUploadedExplanationOrIcon([
			// 		{
			// 			id: makeid(10),
			// 			file_name: specificGamesData?.game_video_file_name,
			// 			media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_video?.url}`,
			// 			type: 'video',
			// 			fileExtension: '.mp4',
			// 			url: `${specificGamesData?.game_video?.url}`
			// 		}
			// 	]);
			// } else {
			// 	//arcade
			// 	setArcadeGameType(
			// 		specificGamesData?.arcade_game_type === 'Outside App'
			// 			? 'Outside App'
			// 			: 'Inside App'
			// 	);
			// 	setAndrioid(specificGamesData?.package_id?.android);
			// 	setIos(specificGamesData?.package_id?.ios);
			// 	setPlayStore(specificGamesData?.store_url?.play_store); //store url
			// 	setAppStore(specificGamesData?.store_url?.apple_store);
			// 	setPlayStore2(specificGamesData?.deep_link?.android); // deep link
			// 	setAppStore2(specificGamesData?.deep_link?.ios);
			// 	setGameId(specificGamesData?.game_id);
			// 	setFileWidth2(specificGamesData?.game_icon?.width);
			// 	setFileHeight2(specificGamesData?.game_icon?.height);
			// 	setUploadedExplanationOrIcon([
			// 		{
			// 			id: makeid(10),
			// 			file_name: specificGamesData?.game_icon_file_name,
			// 			media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_icon?.url}`,
			// 			type: 'image',
			// 			fileExtension: '.jpg'
			// 		}
			// 	]);
			// }
		}
		// }
	}, [specificGamesData]);

	// console.log(form, 'formkeys specificGamesData');

	useEffect(() => {
		validateGamesForm(type, form);
	}, [form]);

	useEffect(() => {
		if (acceptedFiles?.length) {
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'image'
				};
			});
			// setUploadedFiles([...uploadedFiles, ...newFiles]);
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
			let newFiles = acceptedFiles2.map((file) => {
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
			// setUploadedExplanationOrIcon([...uploadedExplanationOrIcon, ...newFiles]);
			setForm((prev) => {
				return {
					...prev,
					uploadedExplanationOrIcon: [
						...form.uploadedExplanationOrIcon,
						...newFiles
					]
				};
			});
		}
	}, [acceptedFiles2]);

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
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError2(e.message));
			});
			setTimeout(() => {
				setFileRejectionError2('');
			}, [5000]);
		}
	}, [fileRejections2]);

	useEffect(() => {
		if (!open) {
			resetState();
		}
		!(editJogo || editArcade) ? resetState() : '';
	}, [open]);

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form?.uploadedFiles?.filter((file) => file.id !== id)
			};
		});
	};

	const handleDeleteFile2 = (id) => {
		// setUploadedExplanationOrIcon((uploadedExplanationOrIcon) =>
		// 	uploadedExplanationOrIcon.filter((file) => file.id !== id)
		// );
		setForm((prev) => {
			return {
				...prev,
				uploadedExplanationOrIcon: form.uploadedExplanationOrIcon.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	const uploadFileToServer = async (uploadedFile) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
				{
					file_type: uploadedFile.fileExtension,
					parts: 1
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);

			if (result?.data?.data?.video_thumbnail_url) {
				const frame = captureVideoFrame('my-video', 'png');
				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
					headers: { 'Content-Type': 'image/png' }
				});
			}
			if (result?.data?.data?.url) {
				const _result = await axios.put(
					result?.data?.data?.url,
					uploadedFile.file,
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
					}
				);

				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: uploadedFile.file.name,
							type: 'questionLibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									form.uploadedFile?.mime_type == 'video/mp4'
										? [
												{
													e_tag: _result?.headers?.etag.replace(/['"]+/g, ''),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: result?.data?.data?.keys?.image_key,
									video_key: result?.data?.data?.keys?.video_key,
									audio_key: ''
								},
								upload_id:
									form.uploadedFile?.mime_type == 'video/mp4'
										? result?.data?.data?.upload_id
										: 'image'
							}
						},
						{
							headers: {
								Authorization: `Bearer ${
									getLocalStorageDetails()?.access_token
								}`
							}
						}
					);
					if (uploadResult?.data?.status_code === 200) {
						return uploadResult.data.data;
					} else {
						throw 'not 200 Error';
					}
				} else {
					throw 'Error';
				}
			} else {
				throw 'Error';
			}
		} catch (error) {
			console.log('Catch Error');
			return null;
		}
	};

	const createGames = async (id, mediaFiles = []) => {
		setPostButtonStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/games/add-edit-game`,
				{
					type: type === 'jogo' ? 'JOGO' : 'ARCADE GAME',
					arcade_game_type:
						form.arcade_game_type === 'Inside App' ? 'insideapp' : 'outsideapp',
					orientation: type === 'jogo' ? form.orientation : 'none',
					game_orientation: type === 'jogo' ? form.game_orientation : 'none',
					title: form.title,
					description: form.description,
					game_medias: {
						game_image: {
							url:
								mediaFiles[0].media_url.split('cloudfront.net/')[1] ||
								mediaFiles[0]?.media_url,
							dropbox_url: form.dropbox_urls.image,
							file_name: mediaFiles[0]?.file_name,
							width: fileWidth,
							height: fileHeight
						},
						game_video: {
							url:
								mediaFiles[1].media_url.split('cloudfront.net/')[1] ||
								mediaFiles[1]?.media_url,
							dropbox_url: form.dropbox_urls.video_icon,
							file_name: mediaFiles[1]?.file_name, //mediaFiles[1]?.file_name || mediaFiles[1]?.file_name,
							width: fileWidth2,
							height: fileHeight2
						},
						game_icon: {
							url:
								mediaFiles[1].media_url.split('cloudfront.net/')[1] ||
								mediaFiles[1]?.media_url,
							dropbox_url: form.dropbox_urls.video_icon,
							file_name: mediaFiles[1]?.file_name,
							width: fileWidth2,
							height: fileHeight2
						}
					},
					//jogo
					time: form.time,
					scoring: form.scoring,
					objective: form.objective,
					payload: form.payload,
					//arcade
					game_id: form.game_id,
					package_id: {
						android: form.android,
						ios: form.ios
					},
					store_url: {
						play_store: form.play_store,
						apple_store: form.apple_store
					},
					deep_link: {
						android: form.play_store_deeplink,
						ios: form.apple_store_deeplink
					},
					...((editArcade || editJogo) && id ? { edit_game_id: id } : {})
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					editArcade || editJogo
						? 'Game has been edited!'
						: 'Game has been created!'
				);
				setIsLoadingcreateViral(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getAllGames({ page }));
			}
		} catch (e) {
			toast.error(
				editArcade || editJogo
					? 'Failed to edit Game!'
					: 'Failed to create Game!'
			);
			setIsLoadingcreateViral(false);
			setPostButtonStatus(false);
			console.log(e);
		}
	};

	const deleteGame = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/games/delete-game`,
				{
					game_id: id
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
						'The game  cannot be deleted because it is used as a top banner'
					);
					dispatch(getAllGames({ page }));
				} else {
					toast.success('Game has been deleted!');
					handleClose();
					//setting a timeout for getting post after delete.
					dispatch(getAllGames({ page }));
				}
				// toast.success('Game has been deleted!');
				// handleClose();

				// //setting a timeout for getting post after delete.
				// dispatch(getAllGames({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Game!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const resetState = () => {
		setUploadedFiles([]);
		setUploadedExplanationOrIcon([]);
		setFileRejectionError('');
		setFileRejectionError2('');
		setDropboxLink('');
		setDropboxLink2('');
		setTitleGame('');
		setDescriptionGame('');
		setPreviewFile(null);
		setPreviewBool(false);
		setTime('');
		setScoring('');
		setObjective('');
		setPayload('');
		setDisableDropdown(true);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
		setVideoOrientation('');
		setGameOrientation('');
		setArcadeGameType('');
		setGameId('');
		setAndrioid('');
		setIos('');
		setPlayStore('');
		setAppStore('');
		setPlayStore2('');
		setAppStore2('');
		setIsError({});
		setForm({
			uploadedFiles: [],
			uploadedExplanationOrIcon: [],
			dropbox_urls: {
				image: '',
				video_icon: '' // same for video and icon
			},
			orientation: '',
			title: '',
			description: '',
			time: '',
			scoring: '',
			objective: '',
			payload: '',
			game_orientation: '',
			arcade_game_type: '',
			game_id: '',
			android: '',
			ios: '',
			play_store: '',
			apple_store: '',
			play_store_deeplink: '',
			apple_store_deeplink: ''
		});
	};

	const validatePostBtn = () => {
		setIsError({
			videoOrientation: !form?.orientation,
			uploadedFiles: form?.uploadedFiles?.length < 1,
			gameOrientation: !form?.game_orientation,
			uploadedExplanationOrIcon: form?.uploadedExplanationOrIcon.length < 1,
			titleGame: !form?.title && { message: 'You need to enter a Title' },
			descriptionGame: !form?.description,
			time: !form?.time,
			scoring: !form?.scoring,
			objective: !form?.objective,
			payload: !form?.payload,
			arcadeGameType: !form?.arcade_game_type,
			gameId: !form?.game_id,
			android: !form?.android,
			ios: !form?.ios,
			playStore: !form?.play_store,
			appStore: !form?.apple_store,
			playStore2: !form?.play_store_deeplink,
			appStore2: !form?.apple_store_deeplink
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const handleTitleDuplicate = async (givenTitle) => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/games/check/${givenTitle}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			return result?.data?.message;
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const addSaveGameBtn = async () => {
		if (!validateGamesForm(type, form) || editBtnDisabled) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);

			if (editArcade || editJogo) {
				if (form.title?.trim() !== specificGamesData?.title?.trim()) {
					if (
						(await handleTitleDuplicate(form.title)) ===
						'The Title Already Exist'
						// 	200 &&
						// articleTitle !== specificArticle?.title
					) {
						setIsError((prev) => {
							return {
								...prev,
								titleGame: { message: 'This title already exists' }
							};
						});

						setTimeout(() => {
							setIsError({});
						}, [5000]);

						setPostButtonStatus(false);
						return;
					}
				}
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = [
					form.uploadedFiles[0],
					form.uploadedExplanationOrIcon[0]
				].map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file);
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						// console.log('media files', mediaFiles);
						createGames(specificGamesData?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
				// createGames(specificGamesData?.id);
			} else {
				if (
					(await handleTitleDuplicate(form.title)) === 'The Title Already Exist'
					// 	200 &&
					// articleTitle !== specificArticle?.title
				) {
					setIsError((prev) => {
						return {
							...prev,
							titleGame: { message: 'This title already exists' }
						};
					});

					setTimeout(() => {
						setIsError({});
					}, [5000]);

					setPostButtonStatus(false);
					return;
				}

				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = [
					form.uploadedFiles[0],
					form.uploadedExplanationOrIcon[0]
				].map(async (_file) => {
					return uploadFileToServer(_file);
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createGames(null, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			}
		}
	};

	// const addGameBtnDisabled =
	// 	type === 'jogo'
	// 		? !uploadedFiles.length ||
	// 		  !videoOrientation ||
	// 		  !gameOrientation ||
	// 		  !uploadedExplanationOrIcon.length ||
	// 		  postButtonStatus ||
	// 		  !titleGame ||
	// 		  !descriptionGame ||
	// 		  !time ||
	// 		  !scoring ||
	// 		  !objective ||
	// 		  !payload
	// 		: type === 'arcade' && arcadeGameType === 'Outside App'
	// 		? !uploadedFiles.length ||
	// 		  !uploadedExplanationOrIcon.length ||
	// 		  postButtonStatus ||
	// 		  !titleGame ||
	// 		  !descriptionGame ||
	// 		  !arcadeGameType ||
	// 		  !android ||
	// 		  !ios ||
	// 		  !playStore ||
	// 		  !appStore ||
	// 		  !playStore2 ||
	// 		  !appStore2
	// 		: !uploadedFiles.length ||
	// 		  !uploadedExplanationOrIcon.length ||
	// 		  postButtonStatus ||
	// 		  !titleGame ||
	// 		  !descriptionGame ||
	// 		  !arcadeGameType ||
	// 		  !gameId;

	useEffect(() => {
		if (specificGamesData) {
			setEditBtnDisabled(
				type === 'jogo'
					? !uploadedFiles.length ||
							!videoOrientation ||
							!gameOrientation ||
							!uploadedExplanationOrIcon.length ||
							postButtonStatus ||
							!titleGame ||
							!descriptionGame ||
							!time ||
							!scoring ||
							!objective ||
							!payload ||
							(specificGamesData?.title === titleGame?.trim() &&
								specificGamesData?.description === descriptionGame?.trim() &&
								specificGamesData?.time === time?.trim() &&
								specificGamesData?.scoring === scoring?.trim() &&
								specificGamesData?.objective === objective?.trim() &&
								specificGamesData?.payload === payload?.trim() &&
								// specificGamesData?.uploadedFiles[0].file_name ===
								// 	uploadedFiles[0].file_name &&
								// specificGamesData?.uploadedExplanationOrIcon[0].file_name ===
								// 	uploadedExplanationOrIcon[0].file_name &&
								specificGamesData?.game_orientation === gameOrientation &&
								specificGamesData?.orientation === videoOrientation)
					: type === 'arcade' && arcadeGameType === 'Outside App'
					? !uploadedFiles.length ||
					  !uploadedExplanationOrIcon.length ||
					  postButtonStatus ||
					  !titleGame ||
					  !descriptionGame ||
					  !arcadeGameType ||
					  !android ||
					  !ios ||
					  !playStore ||
					  !appStore ||
					  !playStore2 ||
					  !appStore2
					: !uploadedFiles.length ||
					  !uploadedExplanationOrIcon.length ||
					  postButtonStatus ||
					  !titleGame ||
					  !descriptionGame ||
					  !arcadeGameType ||
					  !gameId ||
					  type === 'jogo'
					? !uploadedFiles.length ||
					  !videoOrientation ||
					  !gameOrientation ||
					  !uploadedExplanationOrIcon.length ||
					  postButtonStatus ||
					  !titleGame ||
					  !descriptionGame ||
					  !time ||
					  !scoring ||
					  !objective ||
					  !payload
					: type === 'arcade' && arcadeGameType === 'Outside App'
					? !uploadedFiles.length ||
					  !uploadedExplanationOrIcon.length ||
					  postButtonStatus ||
					  !titleGame ||
					  !descriptionGame ||
					  !arcadeGameType ||
					  !android ||
					  !ios ||
					  !playStore ||
					  !appStore ||
					  !playStore2 ||
					  !appStore2
					: !uploadedFiles.length ||
					  !uploadedExplanationOrIcon.length ||
					  postButtonStatus ||
					  !titleGame ||
					  !descriptionGame ||
					  !arcadeGameType ||
					  !gameId ||
					  (specificGamesData?.title === titleGame?.trim() &&
							specificGamesData?.description === descriptionGame?.trim() &&
							specificGamesData?.arcade_game_type === arcadeGameType.trim() &&
							specificGamesData?.gameId === gameId?.trim() &&
							specificGamesData?.time === time?.trim() &&
							specificGamesData?.scoring === scoring?.trim() &&
							specificGamesData?.objective === objective?.trim() &&
							specificGamesData?.payload === payload?.trim() &&
							specificGamesData?.android === android?.trim() &&
							specificGamesData?.ios === ios?.trim() &&
							specificGamesData?.playStore === playStore?.trim() &&
							specificGamesData?.store_url.appStore === appStore?.trim() &&
							specificGamesData?.playStore2 === playStore2?.trim() &&
							specificGamesData?.appStore2 === appStore2?.trim() &&
							// specificGamesData?.uploadedFiles[0].file_name ===
							// 	uploadedFiles[0].file_name &&
							// specificGamesData?.uploadedExplanationOrIcon[0].file_name ===
							// 	uploadedExplanationOrIcon[0].file_name &&
							specificGamesData?.game_orientation === gameOrientation &&
							specificGamesData?.orientation === videoOrientation)
			);
		}
	}, [
		specificGamesData,
		uploadedFiles,
		dropboxLink,
		editBtnDisabled,
		postButtonStatus,
		titleGame,
		descriptionGame,
		arcadeGameType,
		gameId,
		time,
		scoring,
		objective,
		payload,
		android,
		ios,
		playStore,
		appStore,
		playStore2,
		appStore2,
		videoOrientation,
		gameOrientation
	]);

	return (
		<LoadingOverlay active={isLoadingcreateViral} spinner text='Loading...'>
			<Slide in={true} direction='up' {...{ timeout: 400 }}>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					{specificGameStatus === 'loading' ? (
						<div className={classes.loaderContainer2}>
							<img src={Four33Loader} className={classes.loader} />
						</div>
					) : (
						<></>
					)}
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<h5 className={classes.QuizQuestion}>{heading1}</h5>
							<DragAndDropField
								uploadedFiles={form?.uploadedFiles}
								handleDeleteFile={handleDeleteFile}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								isArticle
								imgEl={imgRef}
								imageOnload={() => {
									setFileWidth(imgRef.current.naturalWidth);
									setFileHeight(imgRef.current.naturalHeight);
								}}
							/>
							{!form.uploadedFiles.length && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
									}}
								>
									<div {...getRootProps({ className: classes.dropzone })}>
										<input {...getInputProps()} />
										<AddCircleOutlineIcon className={classes.addFilesIcon} />
										<p className={classes.dragMsg}>
											Click or drag file to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg and png
										</p>
										<p className={classes.uploadMediaError}>
											{isError.uploadedFiles
												? 'You need to upload a media in order to post'
												: ''}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>

							<div className={classes.titleContainer}>
								<h6>DROPBOX URL</h6>
								<TextField
									value={form?.dropbox_urls?.image}
									onChange={(e) =>
										setForm((prev) => {
											return {
												...prev,
												dropbox_urls: { image: e.target.value }
											};
										})
									}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: dropboxLink ? '16px' : '40px'
										}
									}}
								/>
							</div>

							{type === 'jogo' ? (
								<>
									<div className={classes.explanationWrapper}>
										<h5>Add Game Explanation Video</h5>
										<Tooltip
											TransitionComponent={Fade}
											TransitionProps={{ timeout: 800 }}
											title='Default encoding for videos should be H.264'
											arrow
											componentsProps={{
												tooltip: { className: classes.toolTip },
												arrow: { className: classes.toolTipArrow }
											}}
											placement='bottom'
										>
											<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
										</Tooltip>
									</div>
									<div className={classes.titleContainer}>
										<h6
											className={
												isError.videoOrientation
													? classes.errorState
													: classes.noErrorState
											}
										>
											SELECT GAME EXPLANATION VIDEO ORIENTATION
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={false}
											value={form?.orientation}
											onChange={(e) =>
												setForm((prev) => {
													setDisableDropdown(true);
													return { ...prev, orientation: e.target.value };
												})
											}
											// value={videoOrientation}
											// onChange={(e) => {
											// 	setDisableDropdown(true);
											// 	setVideoOrientation(e.target.value);
											// 	// setMainCategoryLabelColor('#ffffff');
											// 	// setMainCategoryError('');
											// 	// if (uploadedFiles.length) {
											// 	// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
											// 	// }
											// }}
											className={`${classes.select}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
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
												getContentAnchorEl: null,
												classes: {
													paper: muiClasses.paper
												}
											}}
											inputProps={{
												classes: {
													root: videoOrientation
														? muiClasses.input
														: muiClasses.inputPlaceholder
												}
											}}
											displayEmpty={true}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select Orientation'
											}
										>
											{gameExplanationOrientation.map((orientation, index) => {
												return (
													<MenuItem
														key={index}
														value={orientation}
														style={{
															fontFamily: 'Poppins !important',
															fontSize: '14px'
														}}
													>
														{orientation}
													</MenuItem>
												);
											})}
										</Select>
									</div>
									<p className={classes.mediaError}>
										{isError.videoOrientation
											? 'You need to select video orientation in order to post'
											: ''}
									</p>
								</>
							) : (
								<>
									<div className={classes.QuizQuestion}>
										<h5>Add Icon Image</h5>
									</div>
								</>
							)}
							<DragAndDropField
								uploadedFiles={form?.uploadedExplanationOrIcon}
								handleDeleteFile={handleDeleteFile2}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								isPost
								imgEl={videoRef}
								videoRef={videoRef}
								imageOnload={() => {
									setFileWidth2(videoRef.current.naturalWidth);
									setFileHeight2(videoRef.current.naturalHeight);
								}}
								onLoadedVideodata={() => {
									setFileWidth2(videoRef.current.videoWidth);
									setFileHeight2(videoRef.current.videoHeight);
								}}
							/>

							{!form.uploadedExplanationOrIcon.length && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: isError.uploadedExplanationOrIcon
											? '#ff355a'
											: 'yellow'
									}}
								>
									<div {...getRootProps2({ className: classes.dropzone })}>
										<input {...getInputProps2()} />
										<AddCircleOutlineIcon className={classes.addFilesIcon} />
										<p className={classes.dragMsg}>
											Click or drag file to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are{' '}
											{type === 'jogo' ? 'mp4' : 'jpeg and png'}
										</p>
										<p className={classes.uploadMediaError}>
											{isError.uploadedExplanationOrIcon
												? 'You need to upload a media in order to post'
												: ''}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>
								{fileRejectionError2}
							</p>

							<div className={classes.titleContainer}>
								<h6>DROPBOX URL</h6>
								<TextField
									value={form?.dropbox_urls?.video_icon}
									onChange={(e) =>
										setForm((prev) => {
											return {
												...prev,
												dropbox_urls: { video_icon: e.target.value }
											};
										})
									}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: dropboxLink2 ? '16px' : '40px'
										}
									}}
								/>
							</div>

							<div className={classes.titleContainer}>
								<div className={classes.characterCount}>
									<h6
										className={
											isError.titleGame
												? classes.errorState
												: classes.noErrorState
										}
									>
										TITLE
									</h6>
									<h6
										style={{
											color:
												titleGame?.length >= 25 && titleGame?.length <= 27
													? 'pink'
													: titleGame?.length === 28
													? 'red'
													: 'white'
										}}
									>
										{titleGame?.length}/28
									</h6>
								</div>
								<TextField
									value={form?.title}
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
									inputProps={{ maxLength: 28 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={classes.mediaError}>
								{isError.titleGame ? isError.titleGame.message : ''}
							</p>

							<div className={classes.titleContainer}>
								<div className={classes.characterCount}>
									<h6
										className={
											isError.descriptionGame
												? classes.errorState
												: classes.noErrorState
										}
									>
										GAME DESCRIPTION
									</h6>
									<h6
										style={{
											color:
												form.description?.length >= 75 &&
												form.description?.length <= 83
													? 'pink'
													: form.description?.length === 84
													? 'red'
													: 'white'
										}}
									>
										{type === 'jogo' ? `${form.description?.length}/84` : ''}
									</h6>
								</div>
								<TextField
									value={form?.description}
									onChange={(e) =>
										setForm((prev) => {
											return { ...prev, description: e.target.value };
										})
									}
									placeholder={'Please write your description here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
									inputProps={{ maxLength: type === 'jogo' ? 84 : 524288 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={classes.mediaError}>
								{isError.descriptionGame
									? 'You need to upload a description in order to post'
									: ''}
							</p>

							{type === 'jogo' ? (
								<>
									<div className={classes.titleContainer}>
										<h6
											className={
												isError.time ? classes.errorState : classes.noErrorState
											}
										>
											TIME
										</h6>
										<TextField
											disabled={false}
											value={form?.time}
											onChange={(e) =>
												setForm((prev) => {
													return { ...prev, time: e.target.value };
												})
											}
											placeholder={'Please write the game duration here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment}`,
												startAdornment: (
													<InputAdornment position='start'>
														<Timer />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={2}
										/>
									</div>

									<p className={classes.mediaError}>
										{isError.time
											? 'You need to upload a time in order to post'
											: ''}
									</p>

									<div className={classes.titleContainer}>
										<h6
											className={
												isError.scoring
													? classes.errorState
													: classes.noErrorState
											}
										>
											SCORING
										</h6>
										<TextField
											disabled={false}
											value={form?.scoring}
											onChange={(e) =>
												setForm((prev) => {
													return { ...prev, scoring: e.target.value };
												})
											}
											placeholder={'Please write the game scoring here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment} `,
												startAdornment: (
													<InputAdornment position='start'>
														<Scoring />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={1}
										/>
									</div>

									<p className={classes.mediaError}>
										{isError.scoring
											? 'You need to upload a scoring in order to post'
											: ''}
									</p>

									<div className={classes.titleContainer}>
										<h6
											className={
												isError.objective
													? classes.errorState
													: classes.noErrorState
											}
										>
											OBJECTIVE
										</h6>

										<TextField
											disabled={false}
											value={form?.objective}
											onChange={(e) =>
												setForm((prev) => {
													return { ...prev, objective: e.target.value };
												})
											}
											placeholder={'Please write the game objective here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment} `,
												startAdornment: (
													<InputAdornment position='start'>
														<Objective />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={1}
										/>
									</div>

									<p className={classes.mediaError}>
										{isError.objective
											? 'You need to upload an objective in order to post'
											: ''}
									</p>

									<div className={classes.titleContainer}>
										<h6
											className={
												isError.payload
													? classes.errorState
													: classes.noErrorState
											}
										>
											PAYLOAD
										</h6>

										<TextField
											disabled={false}
											value={form?.payload}
											onChange={(e) =>
												setForm((prev) => {
													return { ...prev, payload: e.target.value };
												})
											}
											placeholder={'Please write the payload here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInput}  `
											}}
											multiline
											maxRows={2}
										/>
									</div>

									<p className={classes.mediaError}>
										{isError.payload
											? 'You need to upload a payload in order to post'
											: ''}
									</p>

									<div className={classes.titleContainer}>
										<h6
											className={
												isError.gameOrientation
													? classes.errorState
													: classes.noErrorState
											}
										>
											SELECT GAME ORIENTATION
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={false}
											value={form?.game_orientation}
											onChange={(e) => {
												setDisableDropdown(true);
												setForm((prev) => {
													return { ...prev, game_orientation: e.target.value };
												});
											}}
											// value={gameOrientation}
											// onChange={(e) => {
											// 	setDisableDropdown(true);
											// 	setGameOrientation(e.target.value);
											// 	// setMainCategoryLabelColor('#ffffff');
											// 	// setMainCategoryError('');
											// 	// if (uploadedFiles.length) {
											// 	// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
											// 	// }
											// }}
											className={`${classes.select}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
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
												getContentAnchorEl: null,
												classes: {
													paper: muiClasses.paper
												}
											}}
											inputProps={{
												classes: {
													root: gameOrientation
														? muiClasses.input
														: muiClasses.inputPlaceholder
												}
											}}
											displayEmpty={true}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select Game Orientation'
											}
										>
											{gameOrientationArray.map((orientation, index) => {
												return (
													<MenuItem
														key={index}
														value={orientation}
														style={{
															fontFamily: 'Poppins !important',
															fontSize: '14px'
														}}
													>
														{orientation}
													</MenuItem>
												);
											})}
										</Select>
									</div>
									<p className={classes.mediaError}>
										{isError.gameOrientation
											? 'You need to select game orientation in order to post'
											: ''}
									</p>
								</>
							) : (
								<>
									<div className={classes.titleContainer}>
										<h6
											className={
												isError.arcadeGameType
													? classes.errorState
													: classes.noErrorState
											}
										>
											ARCADE GAME TYPE
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={false}
											value={form?.arcade_game_type}
											onChange={(e) => {
												setDisableDropdown(true);
												setForm((prev) => {
													return { ...prev, arcade_game_type: e.target.value };
												});
											}}
											// value={arcadeGameType}
											// onChange={(e) => {
											// 	setDisableDropdown(true);
											// 	setArcadeGameType(e.target.value);
											// }}
											className={`${classes.select}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
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
												getContentAnchorEl: null,
												classes: {
													paper: muiClasses.paper
												}
											}}
											inputProps={{
												classes: {
													root: arcadeGameType
														? muiClasses.input
														: muiClasses.inputPlaceholder
												}
											}}
											displayEmpty={true}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select Game Type'
											}
										>
											{arcadeType.map((type, index) => {
												return (
													<MenuItem
														key={index}
														value={type}
														style={{
															fontFamily: 'Poppins !important',
															fontSize: '14px'
														}}
													>
														{type}
													</MenuItem>
												);
											})}
										</Select>
									</div>
									<p className={classes.mediaError}>
										{isError.arcadeGameType
											? 'You need to select Arcade type in order to post'
											: ''}
									</p>

									{form?.arcade_game_type === 'Outside App' ? (
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div>
												<div className={classes.gameIDwrapper}>
													<h5>Package ID</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.android
																? classes.errorState
																: classes.noErrorState
														}
													>
														ANDROID
													</h6>
													<TextField
														value={form?.android}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	android: e.target.value
																};
															})
														}
														placeholder={'Enter Andrioid'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: android ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.android
														? 'You need to upload android in order to post'
														: ''}
												</p>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.ios
																? classes.errorState
																: classes.noErrorState
														}
													>
														IOS
													</h6>
													<TextField
														value={form?.ios}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	ios: e.target.value
																};
															})
														}
														placeholder={'Enter IOS'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: ios ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.ios
														? 'You need to upload IOS in order to post'
														: ''}
												</p>

												<div className={classes.gameIDwrapper}>
													<h5>Store URL</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.playStore
																? classes.errorState
																: classes.noErrorState
														}
													>
														PLAY STORE
													</h6>
													<TextField
														value={form?.play_store}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	play_store: e.target.value
																};
															})
														}
														placeholder={'Enter PLAY STORE'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: playStore ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.playStore
														? 'You need to upload playStore in order to post'
														: ''}
												</p>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.appStore
																? classes.errorState
																: classes.noErrorState
														}
													>
														APP STORE
													</h6>
													<TextField
														value={form?.apple_store}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	apple_store: e.target.value
																};
															})
														}
														placeholder={'Enter APP STORE'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: appStore ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.appStore
														? 'You need to upload appStore in order to post'
														: ''}
												</p>

												<div className={classes.gameIDwrapper}>
													<h5>Deep Link</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.playStore2
																? classes.errorState
																: classes.noErrorState
														}
													>
														PLAY STORE
													</h6>
													<TextField
														value={form?.play_store_deeplink}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	play_store_deeplink: e.target.value
																};
															})
														}
														placeholder={'Enter PLAY STORE'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: playStore2 ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.playStore2
														? 'You need to upload playStore in order to post'
														: ''}
												</p>
												<div className={classes.titleContainer}>
													<h6
														className={
															isError.appStore2
																? classes.errorState
																: classes.noErrorState
														}
													>
														APP STORE
													</h6>
													<TextField
														value={form?.apple_store_deeplink}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	apple_store_deeplink: e.target.value
																};
															})
														}
														placeholder={'Enter APP STORE'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: appStore2 ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.appStore2
														? 'You need to upload appStore in order to post'
														: ''}
												</p>
											</div>
										</Slide>
									) : (
										<></>
									)}

									{form?.arcade_game_type === 'Inside App' ? (
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div>
												<div className={classes.gameIDwrapper}>
													<h5
														className={
															isError.gameId
																? classes.errorState
																: classes.noErrorState
														}
													>
														Game ID
													</h5>
												</div>

												<div className={classes.titleContainer}>
													<TextField
														value={form?.game_id}
														onChange={(e) =>
															setForm((prev) => {
																return {
																	...prev,
																	game_id: e.target.value
																};
															})
														}
														placeholder={'Game ID'}
														className={classes.textField}
														multiline
														maxRows={2}
														InputProps={{
															disableUnderline: true,
															className: classes.textFieldInput,
															style: {
																borderRadius: gameId ? '16px' : '40px'
															}
														}}
													/>
												</div>
												<p className={classes.mediaError}>
													{isError.gameId
														? 'You need to upload gameId in order to post'
														: ''}
												</p>
											</div>
										</Slide>
									) : (
										<></>
									)}
								</>
							)}
						</div>
						<div className={classes.buttonDiv}>
							{editArcade || editJogo ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={editArcade || editJogo ? true : false}
										onClick={() => {
											if (!deleteBtnStatus) {
												//console.log('specific', specificGamesData.id);
												deleteGame(specificGamesData?.id);
											}
										}}
										text={'DELETE GAME'}
									/>
								</div>
							) : (
								<></>
							)}

							<div
								className={
									editArcade || editJogo
										? classes.addQuizBtnEdit
										: classes.addQuizBtn
								}
							>
								<Button
									disabled={
										editArcade || editJogo
											? editBtnDisabled
											: !validateGamesForm(type, form)
									}
									onClick={() => {
										addSaveGameBtn();
									}}
									// text={type === 'quiz' ? 'ADD QUIZ' : 'ADD POLL'}
									text={buttonText}
								/>
							</div>
						</div>
					</div>
					{previewFile != null && (
						<div ref={previewRef} className={classes.previewComponent}>
							<div className={classes.previewHeader}>
								<Close
									onClick={() => {
										setPreviewBool(false);
										setPreviewFile(null);
									}}
									className={classes.closeIcon}
								/>
								<h5>Preview</h5>
							</div>
							<div>
								{previewFile.mime_type === 'video/mp4' ||
								previewFile.mime_type === 'video' ||
								previewFile.type === 'video' ||
								previewFile.type === 'video/mp4' ? (
									<video
										id={'my-video'}
										poster={
											editJogo || editArcade ? previewFile.media_url : null
										}
										className={classes.previewFile}
										style={{
											width: '100%',
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.media_url} />
									</video>
								) : (editJogo || editArcade) && previewFile.type === 'video' ? (
									<video
										id={'my-video'}
										poster={
											editJogo || editArcade ? previewFile?.thumbnail_url : null
										}
										className={classes.previewFile}
										style={{
											width: '100%',
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.media_url} />
									</video>
								) : (
									<img
										src={previewFile.media_url}
										className={classes.previewFile}
										style={{
											width: '100%',
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</Slide>
		</LoadingOverlay>
	);
};

UploadOreditArcade.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	setPreviewBool: PropTypes.func.isRequired,
	previewFile: PropTypes.bool.isRequired,
	setPreviewFile: PropTypes.func.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	editJogo: PropTypes.bool, // poll
	editArcade: PropTypes.bool, // quiz
	page: PropTypes.string,
	type: PropTypes.string, //JOGO OR ARCADE
	handleClose: PropTypes.func.isRequired
};

export default UploadOreditArcade;
