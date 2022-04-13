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
	type, // jogo - archade
	page,
	handleClose
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [dropZoneBorder2, setDropZoneBorder2] = useState('#ffff00');
	const [titleGame, setTitleGame] = useState('');
	const [titleGameColor, setTitleGameColor] = useState('#ffffff');
	const [titleGameError, setTitleGameError] = useState('');
	const [descriptionGame, setDescriptionGame] = useState('');
	const [descriptionGameColor, setDescriptionGameColor] = useState('#ffffff');
	const [descriptionGameError, setDescriptionGameError] = useState('');
	const [dropboxLink, setDropboxLink] = useState('');
	const [dropboxLink2, setDropboxLink2] = useState('');
	const [time, setTime] = useState('');
	const [scoring, setScoring] = useState('');
	const [objective, setObjective] = useState('');
	const [payload, setPayload] = useState('');
	const [questionColor, setQuestionColor] = useState('#ffffff');
	const [questionError, setQuestionError] = useState('');
	const [ans1Color, setAns1Color] = useState('#ffffff');
	const [ans1Error, setAns1Error] = useState('');
	const [ans2Color, setAns2Color] = useState('#ffffff');
	const [ans2Error, setAns2Error] = useState('');
	const [payloadColor, setPayloadColor] = useState('#ffffff');
	const [payloadError, setPayloadError] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [videoOrientation, setVideoOrientation] = useState('');
	const [videoOrientationColor, setVideoOrientationColor] = useState('#ffffff');
	const [videoOrientationError, setvideoOrientationError] = useState('');
	const [gameOrientation, setGameOrientation] = useState('');
	const [gameOrientationColor, setGameOrientationColor] = useState('#ffffff');
	const [gameOrientationError, setGameOrientationError] = useState('');
	const [uploadedExplanationOrIcon, setUploadedExplanationOrIcon] = useState(
		[]
	);
	const [uploadExplanationOrIconError, setUploadExplanationOrIconError] =
		useState('');
	const [arcadeGameType, setArcadeGameType] = useState('');
	const [arcadeGameTypeColor, setArcadeGameTypeColor] = useState('#ffffff');
	const [arcadeGameTypeError, setArcadeGameTypeError] = useState('');
	const [gameId, setGameId] = useState('');
	const [gameIdColor, setGameIdColor] = useState('#ffffff');
	const [gameIdError, setGameIdError] = useState('');
	const [android, setAndrioid] = useState('');
	const [androidColor, setAndroidColor] = useState('#ffffff');
	const [androidError, setAndroidError] = useState('');
	const [ios, setIos] = useState('');
	const [iosColor, setIosColor] = useState('#ffffff');
	const [iosError, setIosError] = useState('');
	const [playStore, setPlayStore] = useState('');
	const [playStoreColor, setPlayStoreColor] = useState('#ffffff');
	const [playStoreError, setPlayStoreError] = useState('');
	const [appStore, setAppStore] = useState('');
	const [appStoreColor, setAppStoreColor] = useState('#ffffff');
	const [appStoreError, setAppStoreError] = useState('');
	const [playStore2, setPlayStore2] = useState('');
	const [playStoreColor2, setPlayStoreColor2] = useState('#ffffff');
	const [playStoreError2, setPlayStoreError2] = useState('');
	const [appStore2, setAppStore2] = useState('');
	const [appStoreColor2, setAppStoreColor2] = useState('#ffffff');
	const [appStoreError2, setAppStoreError2] = useState('');
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [fileWidth2, setFileWidth2] = useState(null);
	const [fileHeight2, setFileHeight2] = useState(null);

	const videoRef = useRef(null);
	const imgRef = useRef(null);

	const gameExplanationOrientation = ['PORTRAIT', 'LANDSCAPE'];
	const gameOrientationArray = ['PORTRAIT', 'LANDSCAPE'];

	const arcadeType = ['Inside App', 'Outside App'];

	const muiClasses = useStyles();
	const dispatch = useDispatch();
	console.log(fileHeight, fileWidth, fileWidth2, fileHeight2);

	const specificGamesData = useSelector(
		(state) => state.GamesLibraryStore.specificGame
	);
	const specificGameStatus = useSelector(
		(state) => state.GamesLibraryStore.specificGameStatus
	);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg, .jpg, .png',
			maxFiles: 1
		});

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: type === 'jogo' ? 'video/mp4' : '.jpeg, .jpg, .png',
		maxFiles: 1
	});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	useEffect(() => {
		if (specificGamesData) {
			setDropboxLink(specificGamesData?.dropbox_urls?.image);
			setDropboxLink2(specificGamesData?.dropbox_urls?.video);
			setDescriptionGame(specificGamesData?.description);
			setTitleGame(specificGamesData?.title);
			setFileWidth(specificGamesData?.game_image?.width);
			setFileHeight(specificGamesData?.game_image?.height);
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: specificGamesData?.game_image_file_name,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_image?.url}`,
					type: 'image'
				}
			]);

			if (specificGamesData?.game_type === 'JOGO') {
				//jogo
				setScoring(specificGamesData?.scoring);
				setObjective(specificGamesData?.objective);
				setPayload(specificGamesData?.payload);
				setTime(specificGamesData?.time);
				setVideoOrientation(specificGamesData?.orientation?.toUpperCase());
				setGameOrientation(specificGamesData?.game_orientation);
				setFileWidth2(specificGamesData?.game_video?.width);
				setFileHeight2(specificGamesData?.game_video?.height);
				setUploadedExplanationOrIcon([
					{
						id: makeid(10),
						fileName: specificGamesData?.game_video_file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_video?.url}`,
						type: 'video',
						fileExtension: '.mp4',
						url: `${specificGamesData?.game_video?.url}`,
						file_name: specificGamesData?.game_video_file_name
					}
				]);
			} else {
				//arcade
				setArcadeGameType(
					specificGamesData?.arcade_game_type === 'Outside App'
						? 'Outside App'
						: 'Inside App'
				);
				setAndrioid(specificGamesData?.package_id?.android);
				setIos(specificGamesData?.package_id?.ios);
				setPlayStore(specificGamesData?.store_url?.play_store); //store url
				setAppStore(specificGamesData?.store_url?.apple_store);
				setPlayStore2(specificGamesData?.deep_link?.android); // deep link
				setAppStore2(specificGamesData?.deep_link?.ios);
				setGameId(specificGamesData?.game_id);
				setFileWidth2(specificGamesData?.game_icon?.width);
				setFileHeight2(specificGamesData?.game_icon?.height);
				setUploadedExplanationOrIcon([
					{
						id: makeid(10),
						fileName: specificGamesData?.game_icon_file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_icon?.url}`,
						type: 'image',
						fileExtension: '.jpg'
					}
				]);
			}
		}
		// }
	}, [specificGamesData]);

	useEffect(() => {
		if (acceptedFiles?.length) {
			setUploadMediaError('');
			setDropZoneBorder('#ffff00');
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					fileName: file.name,
					img: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'image'
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (acceptedFiles2?.length) {
			setUploadExplanationOrIconError('');
			setDropZoneBorder2('#ffff00');
			let newFiles = acceptedFiles2.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					fileName: file.name,
					img: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			setUploadedExplanationOrIcon([...uploadedExplanationOrIcon, ...newFiles]);
		}
	}, [acceptedFiles2]);

	useEffect(() => {
		if (fileRejections.length) {
			setFileRejectionError(
				'The uploaded file format is not matching OR max files exceeded'
			);
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	useEffect(() => {
		if (fileRejections2.length) {
			setFileRejectionError2('The uploaded file format is not matching');
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
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const handleDeleteFile2 = (id) => {
		setUploadedExplanationOrIcon((uploadedExplanationOrIcon) =>
			uploadedExplanationOrIcon.filter((file) => file.id !== id)
		);
	};

	const uploadFileToServer = async (uploadedFile) => {
		console.log('uploadedFile file to server', uploadedFile);
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
				console.log('inside THumb');
				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
					headers: { 'Content-Type': 'image/png' }
				});
			}
			if (result?.data?.data?.url) {
				console.log('inside put');
				const _result = await axios.put(
					result?.data?.data?.url,
					uploadedFile.file,
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
					}
				);

				console.log('_result', _result);

				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: uploadedFile.file.name,
							type: 'questionLibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									uploadedFile?.mime_type == 'video/mp4'
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
									uploadedFile?.mime_type == 'video/mp4'
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

		console.log(mediaFiles, 'mediaFiles in create game');
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/games/add-edit-game`,
				{
					type: type === 'jogo' ? 'JOGO' : 'ARCADE GAME',
					arcade_game_type:
						arcadeGameType === 'Inside App' ? 'insideapp' : 'outsideapp',
					orientation: type === 'jogo' ? videoOrientation : 'none',
					game_orientation: type === 'jogo' ? gameOrientation : 'none',
					title: titleGame,
					description: descriptionGame,
					game_medias: {
						game_image: {
							url:
								mediaFiles[0]?.media_url ||
								mediaFiles[0].img.split('cloudfront.net/')[1],
							dropbox_url: dropboxLink,
							file_name: mediaFiles[0]?.file_name || mediaFiles[0]?.fileName,
							width: fileWidth,
							height: fileHeight
						},
						game_video: {
							url:
								mediaFiles[1]?.media_url ||
								mediaFiles[1].img.split('cloudfront.net/')[1],
							dropbox_url: dropboxLink2,
							file_name: mediaFiles[1]?.file_name || mediaFiles[1]?.fileName, //mediaFiles[1]?.file_name || mediaFiles[1]?.fileName,
							width: fileWidth2,
							height: fileHeight2
						},
						game_icon: {
							url:
								mediaFiles[1]?.media_url ||
								mediaFiles[1].img.split('cloudfront.net/')[1],
							dropbox_url: dropboxLink2,
							file_name: mediaFiles[1]?.file_name || mediaFiles[1]?.fileName,
							width: fileWidth2,
							height: fileHeight2
						}
					},
					//jogo
					time: time,
					scoring: scoring,
					objective: objective,
					payload: payload,
					//arcade
					game_id: gameId,
					package_id: {
						android: android,
						ios: ios
					},
					store_url: {
						play_store: playStore,
						apple_store: appStore
					},
					deep_link: {
						android: playStore2,
						ios: appStore2
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
		setUploadMediaError('');
		setTitleGameError('');
		setTitleGame('');
		setDescriptionGame('');
		setDescriptionGameError('');
		setDescriptionGameColor('#ffffff');
		setPayloadError('');
		setPayloadColor('#ffffff');
		setUploadExplanationOrIconError('');
		setDropZoneBorder('#ffff00');
		setDropZoneBorder2('#ffff00');
		setTitleGameColor('#ffffff');
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
		setVideoOrientationColor('#ffffff');
		setvideoOrientationError('');
		setGameOrientation('');
		setGameOrientationColor('#ffffff');
		setGameOrientationError('');
		setArcadeGameType('');
		setArcadeGameTypeColor('#ffffff');
		setArcadeGameTypeError('');
		setGameId('');
		setGameIdColor('#ffffff');
		setGameIdError('');
		setAndrioid('');
		setAndroidColor('#ffffff');
		setAndroidError('');
		setIos('');
		setIosColor('#ffffff');
		setIosError('');
		setPlayStore('');
		setPlayStoreColor('#ffffff');
		setPlayStoreError('');
		setAppStore('');
		setAppStoreColor('#ffffff');
		setAppStoreError('');
		setPlayStore2('');
		setPlayStoreColor2('#ffffff');
		setPlayStoreError2('');
		setAppStore2('');
		setAppStoreColor2('#ffffff');
		setAppStoreError2('');
	};

	const validatePostBtn = () => {
		if (uploadedFiles.length < 1) {
			setDropZoneBorder('#ff355a');
			setUploadMediaError('You need to upload a media in order to post');
			setTimeout(() => {
				setDropZoneBorder('#ffff00');
				setUploadMediaError('');
			}, [5000]);
		}
		if (!videoOrientation) {
			setVideoOrientationColor('#ff355a');
			setvideoOrientationError('You need to enter an orientation');
			setTimeout(() => {
				setVideoOrientationColor('#ffffff');
				setvideoOrientationError('');
			}, [5000]);
		}
		if (!gameOrientation) {
			setGameOrientationColor('#ff355a');
			setGameOrientationError('You need to enter an orientation');
			setTimeout(() => {
				setGameOrientationColor('#ffffff');
				setGameOrientationError('');
			}, [5000]);
		}
		if (uploadedExplanationOrIcon.length < 1) {
			setDropZoneBorder2('#ff355a');
			setUploadExplanationOrIconError(
				'You need to upload a media in order to post'
			);
			setTimeout(() => {
				setDropZoneBorder2('#ffff00');
				setUploadExplanationOrIconError('');
			}, [5000]);
		}
		if (!titleGame) {
			setTitleGameColor('#ff355a');
			setTitleGameError('You need to enter a Title');
			setTimeout(() => {
				setTitleGameColor('#ffffff');
				setTitleGameError('');
			}, [5000]);
		}
		if (!descriptionGame) {
			setDescriptionGameColor('#ff355a');
			setDescriptionGameError('You need to enter a Description');
			setTimeout(() => {
				setDescriptionGameColor('#ffffff');
				setDescriptionGameError('');
			}, [5000]);
		}
		if (!time) {
			setQuestionColor('#ff355a');
			setQuestionError('You need to provide a time in order to post');
			setTimeout(() => {
				setQuestionColor('#ffffff');
				setQuestionError('');
			}, [5000]);
		}
		if (!scoring) {
			setAns1Color('#ff355a');
			setAns1Error('You need to provide scoring in order to post');
			setTimeout(() => {
				setAns1Color('#ffffff');
				setAns1Error('');
			}, [5000]);
		}
		if (!objective) {
			setAns2Color('#ff355a');
			setAns2Error('You need to provide objective in order to post');
			setTimeout(() => {
				setAns2Color('#ffffff');
				setAns2Error('');
			}, [5000]);
		}
		if (!payload) {
			setPayloadColor('#ff355a');
			setPayloadError('You need to provide payload in order to post');
			setTimeout(() => {
				setPayloadColor('#ffffff');
				setPayloadError('');
			}, [5000]);
		}
		if (!arcadeGameType) {
			setArcadeGameTypeColor('#ff355a');
			setArcadeGameTypeError('You need to provide payload in order to post');
			setTimeout(() => {
				setArcadeGameTypeColor('#ffffff');
				setArcadeGameTypeError('');
			}, [5000]);
		}
		if (!gameId) {
			setGameIdColor('#ff355a');
			setGameIdError('You need to provide game Id in order to post');
			setTimeout(() => {
				setGameIdColor('#ffffff');
				setGameIdError('');
			}, [5000]);
		}
		if (!android) {
			setAndroidColor('#ff355a');
			setAndroidError('You need to provide android in order to post');
			setTimeout(() => {
				setAndroidColor('#ffffff');
				setAndroidError('');
			}, [5000]);
		}
		if (!ios) {
			setIosColor('#ff355a');
			setIosError('You need to provide IOS in order to post');
			setTimeout(() => {
				setIosColor('#ffffff');
				setIosError('');
			}, [5000]);
		}
		if (!playStore) {
			setPlayStoreColor('#ff355a');
			setPlayStoreError('You need to provide PlayStore in order to post');
			setTimeout(() => {
				setPlayStoreColor('#ffffff');
				setPlayStoreError('');
			}, [5000]);
		}
		if (!appStore) {
			setAppStoreColor('#ff355a');
			setAppStoreError('You need to provide AppStore in order to post');
			setTimeout(() => {
				setAppStoreColor('#ffffff');
				setAppStoreError('');
			}, [5000]);
		}
		if (!playStore2) {
			setPlayStoreColor2('#ff355a');
			setPlayStoreError2('You need to provide PlayStore in order to post');
			setTimeout(() => {
				setPlayStoreColor2('#ffffff');
				setPlayStoreError2('');
			}, [5000]);
		}
		if (!appStore2) {
			setAppStoreColor2('#ff355a');
			setAppStoreError2('You need to provide AppStore in order to post');
			setTimeout(() => {
				setAppStoreColor2('#ffffff');
				setAppStoreError2('');
			}, [5000]);
		}
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
		if (addGameBtnDisabled || editBtnDisabled) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);

			if (!(editArcade || editJogo)) {
				if (
					(await handleTitleDuplicate(titleGame)) === 'The Title Already Exist'
					// 	200 &&
					// articleTitle !== specificArticle?.title
				) {
					setTitleGameColor('#ff355a');
					setTitleGameError('This title already exists');
					setTimeout(() => {
						setTitleGameColor('#ffffff');
						setTitleGameError('');
					}, [5000]);

					setPostButtonStatus(false);
					return;
				}
			}

			if (editArcade || editJogo) {
				setIsLoadingcreateViral(true);

				let uploadFilesPromiseArray = [
					uploadedFiles[0],
					uploadedExplanationOrIcon[0]
				].map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file);
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						console.log('media files', mediaFiles);
						createGames(specificGamesData?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
				// createGames(specificGamesData?.id);
			} else {
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = [
					uploadedFiles[0],
					uploadedExplanationOrIcon[0]
				].map(async (_file) => {
					return uploadFileToServer(_file);
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						console.log(mediaFiles, 'media files ');
						createGames(null, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			}
		}
	};

	const addGameBtnDisabled =
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
			  !gameId;

	const editBtnDisabled =
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
			  !gameId;
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
								uploadedFiles={uploadedFiles}
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
							{!uploadedFiles.length && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: dropZoneBorder
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
											{uploadMediaError}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>

							<div className={classes.titleContainer}>
								<h6>DROPBOX URL</h6>
								<TextField
									value={dropboxLink}
									onChange={(e) => setDropboxLink(e.target.value)}
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
										<h6 style={{ color: videoOrientationColor }}>
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
											value={videoOrientation}
											onChange={(e) => {
												setDisableDropdown(true);
												setVideoOrientation(e.target.value);
												// setMainCategoryLabelColor('#ffffff');
												// setMainCategoryError('');
												// if (uploadedFiles.length) {
												// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
												// }
											}}
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
									<p className={classes.mediaError}>{videoOrientationError}</p>
								</>
							) : (
								<>
									<div className={classes.QuizQuestion}>
										<h5>Add Icon Image</h5>
									</div>
								</>
							)}
							<DragAndDropField
								uploadedFiles={uploadedExplanationOrIcon}
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

							{!uploadedExplanationOrIcon.length && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: dropZoneBorder2
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
											{uploadExplanationOrIconError}
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
									value={dropboxLink2}
									onChange={(e) => setDropboxLink2(e.target.value)}
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
									<h6 style={{ color: titleGameColor }}>TITLE</h6>
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
									value={titleGame}
									onChange={(e) => {
										setTitleGame(e.target.value);
										setTitleGameError('');
										setTitleGameColor('#ffffff');
									}}
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
							<p className={classes.mediaError}>{titleGameError}</p>

							<div className={classes.titleContainer}>
								<div className={classes.characterCount}>
									<h6 style={{ color: descriptionGameColor }}>
										GAME DESCRIPTION
									</h6>
									<h6
										style={{
											color:
												descriptionGame?.length >= 75 &&
												descriptionGame?.length <= 83
													? 'pink'
													: descriptionGame?.length === 84
													? 'red'
													: 'white'
										}}
									>
										{type === 'jogo' ? `${descriptionGame?.length}/84` : ''}
									</h6>
								</div>
								<TextField
									value={descriptionGame}
									onChange={(e) => {
										setDescriptionGame(e.target.value);
										setDescriptionGameError('');
										setDescriptionGameColor('#ffffff');
									}}
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
							<p className={classes.mediaError}>{descriptionGameError}</p>

							{type === 'jogo' ? (
								<>
									<div className={classes.titleContainer}>
										<h6 style={{ color: questionColor }}>TIME</h6>
										<TextField
											disabled={false}
											value={time}
											onChange={(e) => {
												setTime(e.target.value);
											}}
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

									<p className={classes.mediaError}>{questionError}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: ans1Color }}>SCORING</h6>
										<TextField
											disabled={false}
											value={scoring}
											onChange={(e) => {
												setScoring(e.target.value);
											}}
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

									<p className={classes.mediaError}>{ans1Error}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: ans2Color }}>OBJECTIVE</h6>

										<TextField
											disabled={false}
											value={objective}
											onChange={(e) => {
												setObjective(e.target.value);
											}}
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

									<p className={classes.mediaError}>{ans2Error}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: payloadColor }}>PAYLOAD</h6>

										<TextField
											disabled={false}
											value={payload}
											onChange={(e) => {
												setPayload(e.target.value);
											}}
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

									<p className={classes.mediaError}>{payloadError}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: gameOrientationColor }}>
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
											value={gameOrientation}
											onChange={(e) => {
												setDisableDropdown(true);
												setGameOrientation(e.target.value);
												// setMainCategoryLabelColor('#ffffff');
												// setMainCategoryError('');
												// if (uploadedFiles.length) {
												// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
												// }
											}}
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
									<p className={classes.mediaError}>{gameOrientationError}</p>
								</>
							) : (
								<>
									<div className={classes.titleContainer}>
										<h6 style={{ color: arcadeGameTypeColor }}>
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
											value={arcadeGameType}
											onChange={(e) => {
												setDisableDropdown(true);
												setArcadeGameType(e.target.value);
												setArcadeGameTypeColor('#ffffff');
												setArcadeGameTypeError('');
											}}
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
									<p className={classes.mediaError}>{arcadeGameTypeError}</p>

									{arcadeGameType === 'Outside App' ? (
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div>
												<div className={classes.gameIDwrapper}>
													<h5>Package ID</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6 style={{ color: androidColor }}>ANDROID</h6>
													<TextField
														value={android}
														onChange={(e) => setAndrioid(e.target.value)}
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
												<p className={classes.mediaError}>{androidError}</p>
												<div className={classes.titleContainer}>
													<h6 style={{ color: iosColor }}>IOS</h6>
													<TextField
														value={ios}
														onChange={(e) => setIos(e.target.value)}
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
												<p className={classes.mediaError}>{iosError}</p>

												<div className={classes.gameIDwrapper}>
													<h5>Store URL</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6 style={{ color: playStoreColor }}>PLAY STORE</h6>
													<TextField
														value={playStore}
														onChange={(e) => setPlayStore(e.target.value)}
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
												<p className={classes.mediaError}>{playStoreError}</p>
												<div className={classes.titleContainer}>
													<h6 style={{ color: appStoreColor }}>APP STORE</h6>
													<TextField
														value={appStore}
														onChange={(e) => setAppStore(e.target.value)}
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
												<p className={classes.mediaError}>{appStoreError}</p>

												<div className={classes.gameIDwrapper}>
													<h5>Deep Link</h5>
												</div>
												<div className={classes.titleContainer}>
													<h6 style={{ color: playStoreColor2 }}>PLAY STORE</h6>
													<TextField
														value={playStore2}
														onChange={(e) => setPlayStore2(e.target.value)}
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
												<p className={classes.mediaError}>{playStoreError2}</p>
												<div className={classes.titleContainer}>
													<h6 style={{ color: appStoreColor2 }}>APP STORE</h6>
													<TextField
														value={appStore2}
														onChange={(e) => setAppStore2(e.target.value)}
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
												<p className={classes.mediaError}>{appStoreError2}</p>
											</div>
										</Slide>
									) : (
										<></>
									)}

									{arcadeGameType === 'Inside App' ? (
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div>
												<div className={classes.gameIDwrapper}>
													<h5 style={{ color: gameIdColor }}>Game ID</h5>
												</div>

												<div className={classes.titleContainer}>
													<TextField
														value={gameId}
														onChange={(e) => setGameId(e.target.value)}
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
												<p className={classes.mediaError}>{gameIdError}</p>
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
											: addGameBtnDisabled
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
							{console.log(previewFile, 'preview')}
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
										poster={editJogo || editArcade ? previewFile.img : null}
										className={classes.previewFile}
										style={{
											width: '100%',
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.img} />
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
										<source src={previewFile.img} />
									</video>
								) : (
									<img
										src={previewFile.img}
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

// specificGamesData?.game_image_file_name !==
// 	uploadedFiles[0]?.fileName?.trim() &&
// (specificGamesData?.game_video_file_name ||
// 	specificGamesData?.game_icon_file_name) ===
// 	uploadedExplanationOrIcon[0]?.fileName?.trim()
// 	? (uploadedFiles[0], uploadedExplanationOrIcon[0])
// 	: (specificGamesData?.game_video_file_name ||
// 			specificGamesData?.game_icon_file_name) !==
// 	  uploadedExplanationOrIcon[0]?.fileName?.trim()
// 	? uploadedExplanationOrIcon[0]
// 	: uploadedFiles[0],
// 	uploadedExplanationOrIcon[0];
