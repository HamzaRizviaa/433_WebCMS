import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { MenuItem, TextField, Select } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from './mediaDropdownSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPosts } from '../../../pages/PostLibrary/postLibrarySlice';

const UploadOrEditPost = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText
}) => {
	const [caption, setCaption] = useState('');
	const [value, setValue] = useState(false);
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [mediaError, setMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [filesUploadingStatus, setFilesUploadingStatus] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [mediaLabelColor, setMediaLabelColor] = useState('#ffffff');
	const [selectedMedia, setSelectedMedia] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [loadingMedia, setLoadingMedia] = useState([]);
	const [mediaFiles, setMediaFiles] = useState([]);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 10
		});

	const media = useSelector((state) => state.mediaDropdown.media);
	const specificPost = useSelector((state) => state.editButton.specificPost);

	const dispatch = useDispatch();

	console.log(specificPost);

	useEffect(() => {
		if (specificPost) {
			setCaption(specificPost.caption);
			if (specificPost?.media_id !== null) {
				setValue(true);
				setSelectedMedia(specificPost.media_id);
			}
			if (specificPost?.medias) {
				let newFiles = specificPost.medias.map((file) => {
					console.log(file.thumbnail_url);
					if (file.type === 'video/mp4') {
						return {
							fileName: file.file_name,
							id: makeid(10),
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.thumbnail_url}`,
							type: 'video'
						};
					} else {
						return {
							fileName: file.file_name,
							id: makeid(10),
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`,
							type: 'image'
						};
					}
				});
				setUploadedFiles([...uploadedFiles, ...newFiles]);
			}
		}
	}, [specificPost]);

	useEffect(() => {
		dispatch(getMedia());

		return () => {
			// if (uploadedFiles.length && !isEdit) {
			// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
			// }
			resetState();
		};
	}, []);

	useEffect(() => {
		if (!open) {
			// if (uploadedFiles.length && !isEdit) {
			// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
			// }
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
			let newFilesUploadingStatus = [];
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				newFilesUploadingStatus.push({
					id,
					uploadStatus: 'inprogress',
					fileExtension: `.${getFileType(file.type)}`,
					type: file.type,
					file: file
				});
				setLoadingMedia((loadingMedia) => [...loadingMedia, id]);
				if (file.type === 'video/mp4') {
					return {
						id: id,
						fileName: file.name,
						img: URL.createObjectURL(file),
						fileExtension: `.${getFileType(file.type)}`,
						mime_type: file.type,
						file: file,
						type: 'video'
					};
				} else {
					return {
						id: id,
						fileName: file.name,
						img: URL.createObjectURL(file),
						fileExtension: `.${getFileType(file.type)}`,
						mime_type: file.type,
						file: file,
						type: 'image'
					};
				}
			});

			setFilesUploadingStatus([
				...filesUploadingStatus,
				...newFilesUploadingStatus
			]);
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (uploadedFiles.length) {
			uploadedFiles.map(async (uploadedFile) => {
				if (loadingMedia.includes(uploadedFile.id)) {
					try {
						const result = await axios.post(
							`${process.env.REACT_APP_BUCKET_API_ENDPOINT}/post/get-signed-url`,
							{
								fileType: uploadedFile.fileExtension,
								parts: 1
							}
						);

						if (result?.data?.result?.url) {
							const _result = await axios.put(
								result?.data?.result?.url,
								uploadedFile.file,
								{
									headers: { 'Content-Type': uploadedFile.mime_type }
								}
							);
							if (_result?.status === 200) {
								const uploadResult = await axios.post(
									`${process.env.REACT_APP_BUCKET_API_ENDPOINT}/post/complete-upload`,
									{
										file_name: uploadedFile.file.name,
										data: {
											Bucket: 'media',
											MultipartUpload:
												uploadedFile?.mime_type == 'video/mp4'
													? [
															{
																ETag: _result?.headers?.etag.replace(
																	/['"]+/g,
																	''
																),
																PartNumber: 1
															}
													  ]
													: ['image'],
											Key: result?.data?.result?.Key,
											UploadId:
												uploadedFile?.mime_type == 'video/mp4'
													? result?.data?.result?.UploadId
													: 'image'
										}
									}
								);
								if (uploadResult?.data?.status === 200) {
									setMediaFiles((mediaFiles) => [
										...mediaFiles,
										{ ...uploadResult.data.result }
									]);
									setLoadingMedia((_loadingMedia) =>
										_loadingMedia.filter((media) => media != uploadedFile.id)
									);
								} else {
									throw 'Error in uploading file';
								}
							} else {
								throw 'Error in uploading file';
							}
						} else {
							throw 'Error in uploading file';
						}
					} catch (error) {
						toast.error('Error in uploading file!');
						setUploadedFiles((_uploadedFiles) =>
							_uploadedFiles.filter((__file) => __file.id != uploadedFile.id)
						);
						setLoadingMedia((_loadingMedia) =>
							_loadingMedia.filter((media) => media != uploadedFile.id)
						);
						console.log({ error });
					}
				}
			});
		}
	}, [uploadedFiles]);

	const resetState = () => {
		setCaption('');
		setValue(false);
		setUploadMediaError('');
		setMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setFilesUploadingStatus([]);
		setDropZoneBorder('#ffff00');
		setMediaLabelColor('#ffffff');
		setSelectedMedia(null);
	};

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			uploadedFiles,
			result.source.index,
			result.destination.index
		);

		setUploadedFiles(items);
	};

	const handleDeleteFile = async (id) => {
		try {
			let mediaFileToDelete = uploadedFiles.filter((file) => file.id === id);
			mediaFileToDelete = mediaFiles.filter(
				(_file) => _file?.file_name === mediaFileToDelete[0]?.fileName
			);
			if (mediaFileToDelete.length) {
				const response = await axios.post(
					`${process.env.REACT_APP_API_ENDPOINT}/post/remove-media`,
					{ media_ids: [mediaFileToDelete[0].id] }
				);

				if (response?.data?.status == 200) {
					setUploadedFiles((files) => {
						return files.filter((file) => file.id != id);
					});
					setMediaFiles((files) => {
						return files.filter((file) => file.id != mediaFileToDelete[0].id);
					});
				}
			} else {
				throw 'Error';
			}
		} catch (e) {
			toast.error('Failed to delete media');
			console.log(e);
		}
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
		if (value && !selectedMedia) {
			setMediaLabelColor('#ff355a');
			setMediaError('This field is required');
			setTimeout(() => {
				setMediaLabelColor('#ffffff');
				setMediaError('');
			}, [5000]);
		}
	};

	const createPost = async (id) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/post/add-post`,
				{
					caption: caption,
					media_files: [...mediaFiles],
					...(selectedMedia ? { media_id: selectedMedia } : { media_id: null }),
					...(isEdit && id ? { post_id: id } : {})
				}
			);
			if (result?.data?.status === 200) {
				toast.success(
					isEdit ? 'Post has been edited!' : 'Post has been created!'
				);
				handleClose();
				dispatch(getPosts());
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit post!' : 'Failed to create post!');
			console.log(e);
		}
	};

	const deletePost = async (id) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/post/delete-post`,
				{
					post_id: id
				}
			);
			if (result?.data?.status === 200) {
				toast.success('Post has been deleted!');
				handleClose();
				dispatch(getPosts());
			}
		} catch (e) {
			toast.error('Failed to delete post!');
			console.log(e);
		}
	};

	const postBtnDisabled = !uploadedFiles.length || (value && !selectedMedia);
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
		>
			<div className={classes.contentWrapper}>
				<div>
					<h5>{heading1}</h5>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={classes.uploadedFilesContainer}
								>
									{uploadedFiles.map((file, index) => {
										return (
											<Draggable
												key={file.id}
												draggableId={`droppable-${file.id}`}
												index={index}
												isDragDisabled={
													uploadedFiles.length <= 1 || loadingMedia.length > 0
												}
											>
												{(provided) => (
													<div
														key={index}
														className={classes.filePreview}
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={{
															...provided.draggableProps.style
														}}
													>
														<div className={classes.filePreviewLeft}>
															{file.type === 'video' ? (
																<>
																	<PlayArrowIcon className={classes.playIcon} />
																	<video className={classes.fileThumbnail}>
																		<source src={file.img} />
																	</video>
																</>
															) : (
																<img
																	src={file.img}
																	className={classes.fileThumbnail}
																/>
															)}

															<p className={classes.fileName}>
																{file.fileName}
															</p>
														</div>

														{loadingMedia.includes(file.id) ? (
															<div className={classes.loaderContainer}>
																<CircularProgress className={classes.loader} />
															</div>
														) : (
															<></>
														)}

														{isEdit ? (
															<></>
														) : (
															<div className={classes.filePreviewRight}>
																<span {...provided.dragHandleProps}>
																	<MenuIcon
																		style={{ cursor: 'grab' }}
																		className={classes.filePreviewIcons}
																	/>
																</span>
																<DeleteIcon
																	className={classes.filePreviewIcons}
																	onClick={() => {
																		handleDeleteFile(file.id);
																	}}
																/>
															</div>
														)}
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					{uploadedFiles.length < 10 && !isEdit ? (
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
								<p className={classes.uploadMediaError}>{uploadMediaError}</p>
							</div>
						</section>
					) : (
						<></>
					)}

					<p className={classes.fileRejectionError}>{fileRejectionError}</p>
					<div className={classes.captionContainer}>
						<h6>CAPTION</h6>
						<TextField
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							placeholder={'Please write your caption here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: classes.textFieldInput
							}}
							multiline
							maxRows={4}
						/>
					</div>

					<div className={classes.postMediaContainer}>
						<div className={classes.postMediaHeader}>
							<h5>Link post to media</h5>
							<ToggleSwitch
								id={1}
								checked={value}
								onChange={(checked) => {
									setSelectedMedia(null);
									setValue(checked);
								}}
							/>
						</div>
					</div>
					{value ? (
						<div className={classes.mediaContainer}>
							<h6 style={{ color: mediaLabelColor }}>SELECT MEDIA</h6>
							<Select
								value={selectedMedia}
								onChange={(e) => {
									setMediaError(false);
									setMediaLabelColor('#ffffff');
									setSelectedMedia(e.target.value);
								}}
								disableUnderline={true}
								className={`${classes.select}`}
								IconComponent={KeyboardArrowDownIcon}
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
							>
								{media.map((item, index) => (
									<MenuItem key={index} value={item.id}>
										{item.title}{' '}
									</MenuItem>
								))}
							</Select>

							<p className={classes.mediaError}>{mediaError}</p>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className={classes.buttonDiv}>
					{isEdit ? (
						<div className={classes.editBtn}>
							<Button
								button2={isEdit ? true : false}
								onClick={() => {
									deletePost(specificPost?.id);
								}}
								text={'DELETE POST'}
							/>
						</div>
					) : (
						<> </>
					)}
					<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
						<Button
							disabled={postBtnDisabled}
							onClick={() => {
								if (postBtnDisabled) {
									validatePostBtn();
								} else {
									createPost(isEdit ? specificPost?.id : null);
								}
							}}
							text={buttonText}
						/>
					</div>
				</div>
			</div>
		</Slider>
	);
};

UploadOrEditPost.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadOrEditPost;
