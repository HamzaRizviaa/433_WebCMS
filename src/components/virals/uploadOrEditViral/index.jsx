/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditViral.module.scss';
import { useDropzone } from 'react-dropzone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { TextField } from '@material-ui/core';
import Button from '../../button';
import DragAndDropField from '../../DragAndDropField';
import { useDispatch, useSelector } from 'react-redux';
import { makeid } from '../../../utils/helper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAllViralsApi } from '../../../pages/ViralLibrary/viralLibararySlice';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import Close from '@material-ui/icons/Close';
import Labels from '../../Labels';
import { getLocalStorageDetails } from '../../../utils';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';

import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditViral = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText,
	page
}) => {
	const [caption, setCaption] = useState('');
	const [dropboxLink, setDropboxLink] = useState('');

	const [uploadMediaError, setUploadMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [captionColor, setCaptionColor] = useState('#ffffff');
	const [captionError, setCaptionError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const videoRef = useRef(null);
	const imgEl = useRef(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 1
		});

	const labels = useSelector((state) => state.postLibrary.labels);
	const specificViral = useSelector(
		(state) => state.ViralLibraryStore.specificViral
	);
	const dispatch = useDispatch();

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
		if (specificViral) {
			if (specificViral?.labels) {
				let _labels = [];
				specificViral.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setCaption(specificViral?.caption);
			setDropboxLink(specificViral?.dropbox_url);
			if (specificViral?.thumbnail_url) {
				setUploadedFiles([
					{
						id: makeid(10),
						fileName: specificViral?.file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.thumbnail_url}`,
						url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
						type: 'video'
					}
				]);
			}
			if (specificViral?.thumbnail_url === null) {
				setUploadedFiles([
					{
						id: makeid(10),
						fileName: specificViral?.file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
						type: 'image'
					}
				]);
			}
		}
	}, [specificViral]);

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

	useEffect(() => {
		if (fileRejections.length) {
			setFileRejectionError('The uploaded file format is not matching');
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
		if (acceptedFiles?.length) {
			setUploadMediaError('');
			setDropZoneBorder('#ffff00');
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				// readImageFile(file);
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
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	const resetState = () => {
		setCaption('');
		setDropboxLink('');
		setUploadMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setDropZoneBorder('#ffff00');
		setCaptionColor('#ffffff');
		setLabelColor('#ffffff');
		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPreviewFile(null);
		setPreviewBool(false);
		setSelectedLabels([]);
		setDisableDropdown(true);
	};

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const validateViralBtn = () => {
		if (uploadedFiles.length < 1) {
			setDropZoneBorder('#ff355a');
			setUploadMediaError('You need to upload a media in order to post');
			setTimeout(() => {
				setDropZoneBorder('#ffff00');
				setUploadMediaError('');
			}, [5000]);
		}

		if (selectedLabels.length < 10) {
			setLabelColor('#ff355a');
			setLabelError(
				`You need to add ${
					10 - selectedLabels.length
				} more labels in order to post`
			);
			setTimeout(() => {
				setLabelColor('#ffffff');
				setLabelError('');
			}, [5000]);
		}

		if (!caption) {
			setCaptionColor('#ff355a');
			setCaptionError(
				'You need to put a caption of atleast 1 character in order to post'
			);
			setTimeout(() => {
				setCaptionColor('#ffffff');
				setCaptionError('');
			}, [5000]);
		}
	};

	const createViral = async (id, mediaFiles = []) => {
		console.log(mediaFiles, 'media files in create viral');
		setFileWidth(mediaFiles[0].width);
		setFileHeight(mediaFiles[0].height);
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/add-viral`,
				{
					caption: caption,
					dropbox_url: dropboxLink,
					media_url:
						mediaFiles[0]?.media_url ||
						mediaFiles[0].img.split('cloudfront.net/')[1],
					file_name: mediaFiles[0]?.file_name || mediaFiles[0]?.fileName,
					thumbnail_url: mediaFiles[0]?.thumbnail_url,
					height: fileHeight,
					width: fileWidth,
					// ...(caption ? { caption: caption } : { caption: '' }),
					// ...(dropboxLink ? { dropbox_url: dropboxLink } : {}),
					// ...(!isEdit ? { media_url: mediaFiles[0]?.media_url } : {}),
					// ...(!isEdit ? { file_name: mediaFiles[0]?.file_name } : {}),
					// ...(!isEdit ? { thumbnail_url: mediaFiles[0]?.thumbnail_url } : {}),
					// ...(!isEdit ? { height: fileHeight } : {}),
					// ...(!isEdit ? { width: fileWidth } : {}),
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					},
					...(isEdit && id ? { viral_id: id } : {}),
					...(!isEdit && selectedLabels.length
						? { labels: [...selectedLabels] }
						: {})
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Viral has been edited!' : 'Viral has been created!'
				);
				setIsLoadingcreateViral(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getAllViralsApi({ page }));
				dispatch(getPostLabels());
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit viral!' : 'Failed to create viral!');
			setIsLoadingcreateViral(false);
			setPostButtonStatus(false);
			console.log(e);
		}
	};

	const deleteViral = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/delete-viral`,
				{
					viral_id: id
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Viral has been deleted!');
				handleClose();
				dispatch(getAllViralsApi({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Viral!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const [newLabels, setNewLabels] = useState([]);

	useEffect(() => {
		if (labels.length) setNewLabels(labels);
	}, [newLabels]);

	const handleChangeExtraLabel = (e) => {
		// e.preventDefault();
		// e.stopPropagation();
		setExtraLabel(e.target.value.toUpperCase());
	};

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const viralBtnDisabled =
		!uploadedFiles.length ||
		postButtonStatus ||
		selectedLabels.length < 10 ||
		!caption;

	useEffect(() => {
		if (specificViral) {
			setEditBtnDisabled(
				postButtonStatus ||
					!caption ||
					!uploadedFiles.length ||
					(specificViral?.file_name === uploadedFiles[0]?.fileName &&
						specificViral?.caption?.trim() === caption.trim() &&
						specificViral?.dropbox_url?.trim() === dropboxLink.trim())
			);
		}
	}, [specificViral, caption, uploadedFiles, dropboxLink]);

	const handlePostSaveBtn = () => {
		if (viralBtnDisabled || editBtnDisabled) {
			validateViralBtn();
		} else {
			setPostButtonStatus(true);
			if (isEdit) {
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'virallibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createViral(specificViral?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			} else {
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'virallibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createViral(null, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			}
		}
	};

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (uploadedFiles.length && !isEdit) {
					uploadedFiles.map((file) => handleDeleteFile(file.id));
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
			viral={true}
		>
			<LoadingOverlay active={isLoadingcreateViral} spinner text='Loading...'>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<div className={classes.explanationWrapper}>
								<h5>{heading1}</h5>
								<Tooltip
									TransitionComponent={Fade}
									TransitionProps={{ timeout: 800 }}
									title='Default encoding for videos should be H.264'
									arrow
									componentsProps={{
										tooltip: { className: classes.toolTip },
										arrow: { className: classes.toolTipArrow }
									}}
									placement='bottom-start'
								>
									<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
								</Tooltip>
							</div>
							<DragAndDropField
								uploadedFiles={uploadedFiles}
								// isEdit={isEdit}
								handleDeleteFile={handleDeleteFile}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								imgEl={imgEl}
								videoRef={videoRef}
								imageOnload={() => {
									setFileWidth(imgEl.current.naturalWidth);
									setFileHeight(imgEl.current.naturalHeight);
								}}
								onLoadedVideodata={() => {
									setFileWidth(videoRef.current.videoWidth);
									setFileHeight(videoRef.current.videoHeight);
								}}
								isPost
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
											Click or drag files to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg, png and mp4
										</p>
										<p className={classes.uploadMediaError}>
											{uploadMediaError}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>
							<div className={classes.dropBoxUrlContainer}>
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

							<div className={classes.captionContainer}>
								<h6 style={{ color: labelColor }}>LABELS</h6>
								<Labels
									isEdit={isEdit}
									setDisableDropdown={setDisableDropdown}
									selectedLabels={selectedLabels}
									setSelectedLabels={setSelectedLabels}
									LabelsOptions={postLabels}
									extraLabel={extraLabel}
									handleChangeExtraLabel={handleChangeExtraLabel}
								/>
							</div>
							<p className={classes.mediaError}>{labelError}</p>
							<div className={classes.captionContainer}>
								<h6 style={{ color: captionColor }}>CAPTION</h6>
								<TextField
									value={caption}
									onChange={(e) => setCaption(e.target.value)}
									placeholder={'Please write your caption here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: caption ? '16px' : '40px'
										}
									}}
									multiline
									maxRows={4}
								/>
							</div>
							<p className={classes.mediaError}>{captionError}</p>
						</div>

						<div className={classes.buttonDiv}>
							{isEdit ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={isEdit ? true : false}
										onClick={() => {
											if (!deleteBtnStatus) {
												deleteViral(specificViral?.id);
											}
										}}
										text={'DELETE VIRAL'}
									/>
								</div>
							) : (
								<> </>
							)}

							<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
								<Button
									disabled={isEdit ? editBtnDisabled : viralBtnDisabled}
									onClick={() => {
										handlePostSaveBtn();
									}}
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
								{previewFile.mime_type === 'video/mp4' ? (
									<video
										id={'my-video'}
										poster={isEdit ? previewFile.img : null}
										className={classes.previewFile}
										style={{
											//width: `${8 * 4}rem`,
											width: `100%`,
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.img} />
									</video>
								) : isEdit && previewFile.type === 'video' ? (
									<video
										id={'my-video'}
										poster={isEdit ? previewFile.thumbnail_url : null}
										className={classes.previewFile}
										style={{
											//width: `${8 * 4}rem`,
											width: `100%`,
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.url} />
									</video>
								) : (
									<img
										src={previewFile.img}
										className={classes.previewFile}
										style={{
											//width: `${8 * 4}rem`,
											width: `100%`,
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
	page: PropTypes.string
};

export default UploadOrEditViral;
