/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditViral.module.scss';
import { useDropzone } from 'react-dropzone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Button from '../../button';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import captureVideoFrame from 'capture-video-frame';
import Close from '@material-ui/icons/Close';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@mui/material/Chip';
import { Popper, Paper } from '@mui/material';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditViral = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText
	// page
}) => {
	const [caption, setCaption] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 1
		});

	const labels = useSelector((state) => state.postLibrary.labels);

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

	// useEffect(() => {
	// 	if (specificPost) {
	// 		if (specificPost?.labels) {
	// 			let _labels = [];
	// 			specificPost.labels.map((label) =>
	// 				_labels.push({ id: -1, name: label })
	// 			);
	// 			setSelectedLabels(_labels);
	// 		}
	// 		setCaption(specificPost.caption);
	// 		if (specificPost?.medias) {
	// 			let newFiles = specificPost.medias.map((file) => {
	// 				if (file.thumbnail_url) {
	// 					return {
	// 						fileName: file.file_name,
	// 						id: makeid(10),
	// 						url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`,
	// 						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.thumbnail_url}`,
	// 						type: 'video'
	// 					};
	// 				} else {
	// 					return {
	// 						fileName: file.file_name,
	// 						id: makeid(10),
	// 						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`,
	// 						type: 'image'
	// 					};
	// 				}
	// 			});
	// 			setUploadedFiles([...uploadedFiles, ...newFiles]);
	// 		}
	// 	}
	// }, [specificPost]);

	useEffect(() => {
		if (isEdit) {
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: 'Better than Messi',
					img: 'https://cdni0.trtworld.com/w960/h540/q75/34070_esp20180526ronaldo_1527420747155.JPG',
					type: 'image'
				}
			]);
			setSelectedLabels([
				{ id: 1, name: 'CRISTINAAAAA' },
				{ id: 2, name: 'SIUUUUUU7UUUUUUU' },
				{ id: 3, name: 'DIL HAI PAKISTANI <3' }
			]);
			setCaption('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO :(');
		}
	}, [isEdit]);

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

	// const uploadFileToServer = async (uploadedFile) => {
	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
	// 			{
	// 				file_type: uploadedFile.fileExtension,
	// 				parts: 1
	// 			}
	// 		);

	// 		if (result?.data?.data?.url) {
	// 			const _result = await axios.put(
	// 				result?.data?.data?.url,
	// 				uploadedFile.file,
	// 				//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
	// 				{
	// 					headers: { 'Content-Type': uploadedFile.mime_type }
	// 				}
	// 			);
	// 			const frame = captureVideoFrame('my-video', 'png');
	// 			if (result?.data?.data?.video_thumbnail_url) {
	// 				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
	// 					headers: { 'Content-Type': 'image/png' }
	// 				});
	// 			}
	// 			if (_result?.status === 200) {
	// 				const uploadResult = await axios.post(
	// 					`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
	// 					{
	// 						file_name: uploadedFile.file.name,
	// 						type: 'postlibrary',
	// 						data: {
	// 							bucket: 'media',
	// 							multipart_upload:
	// 								uploadedFile?.mime_type == 'video/mp4'
	// 									? [
	// 											{
	// 												e_tag: _result?.headers?.etag.replace(/['"]+/g, ''),
	// 												part_number: 1
	// 											}
	// 									  ]
	// 									: ['image'],
	// 							keys: {
	// 								image_key: result?.data?.data?.keys?.image_key,
	// 								video_key: result?.data?.data?.keys?.video_key,
	// 								audio_key: ''
	// 							},
	// 							upload_id:
	// 								uploadedFile?.mime_type == 'video/mp4'
	// 									? result?.data?.data?.upload_id
	// 									: 'image'
	// 						}
	// 					}
	// 				);
	// 				if (uploadResult?.data?.status_code === 200) {
	// 					return uploadResult.data.data;
	// 				} else {
	// 					throw 'Error';
	// 				}
	// 			} else {
	// 				throw 'Error';
	// 			}
	// 		} else {
	// 			throw 'Error';
	// 		}
	// 	} catch (error) {
	// 		console.log('Error');
	// 		return null;
	// 	}
	// };

	const resetState = () => {
		setCaption('');
		setUploadMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setDropZoneBorder('#ffff00');
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
				setLabelColor('#ffff00');
				setLabelError('');
			}, [5000]);
		}
	};

	// const createPost = async (id, mediaFiles = []) => {
	// 	setPostButtonStatus(true);
	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/post/add-post`,
	// 			{
	// 				caption: caption,
	// 				orientation_type: dimensionSelect,
	// 				...(selectedMedia
	// 					? { media_id: selectedMedia.id }
	// 					: { media_id: null }),
	// 				...(isEdit && id ? { post_id: id } : {}),
	// 				...(!isEdit && selectedLabels.length
	// 					? { labels: [...selectedLabels] }
	// 					: {}),
	// 				...(!isEdit ? { media_files: [...mediaFiles] } : {})
	// 			}
	// 		);
	// 		if (result?.data?.status_code === 200) {
	// 			toast.success(
	// 				isEdit ? 'Post has been edited!' : 'Post has been created!'
	// 			);
	// 			setIsLoadingCreatePost(false);
	// 			setPostButtonStatus(false);
	// 			handleClose();
	// 			dispatch(getPosts({ page }));
	// 			dispatch(getPostLabels());
	// 		}
	// 	} catch (e) {
	// 		toast.error(isEdit ? 'Failed to edit post!' : 'Failed to create post!');
	// 		setIsLoadingCreatePost(false);
	// 		setPostButtonStatus(false);
	// 		console.log(e);
	// 	}
	// };

	// const deletePost = async (id) => {
	// 	setDeleteBtnStatus(true);
	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/post/delete-post`,
	// 			{
	// 				post_id: id
	// 			}
	// 		);
	// 		if (result?.data?.status_code === 200) {
	// 			toast.success('Post has been deleted!');
	// 			handleClose();

	// 			//setting a timeout for getting post after delete.
	// 			dispatch(getPosts({ page }));
	// 		}
	// 	} catch (e) {
	// 		toast.error('Failed to delete post!');
	// 		setDeleteBtnStatus(false);
	// 		console.log(e);
	// 	}
	// };

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
		!uploadedFiles.length || postButtonStatus || selectedLabels.length < 10;

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
			<LoadingOverlay active={isLoadingCreatePost} spinner text='Loading...'>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					{/* {specificPostStatus.status === 'loading' ? (
						<div className={classes.loaderContainer2}>
							<CircularProgress className={classes.loader} />
						</div>
					) : (
						<></>
					)} */}

					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<h5>{heading1}</h5>
							<DragDropContext>
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
														isDragDisabled={uploadedFiles.length <= 1}
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
																			<PlayArrowIcon
																				className={classes.playIcon}
																			/>
																			<video
																				id={'my-video'}
																				poster={isEdit ? file.img : null}
																				className={classes.fileThumbnail}
																				style={{
																					// maxWidth: `${imageToResizeWidth}px`,
																					// maxHeight: `${imageToResizeHeight}px`,
																					objectFit: 'cover',
																					objectPosition: 'center'
																				}}
																			>
																				<source src={file.img} />
																			</video>
																		</>
																	) : (
																		<>
																			<img
																				src={file.img}
																				className={classes.fileThumbnail}
																				style={{
																					// width: `${imageToResizeWidth}px`,
																					// height: `${imageToResizeHeight}px`,
																					objectFit: 'cover',
																					objectPosition: 'center'
																				}}
																			/>
																		</>
																	)}

																	<p className={classes.fileName}>
																		{file.fileName}
																	</p>
																</div>

																{/* {loadingMedia.includes(file.id) ? (
															<div className={classes.loaderContainer}>
																<CircularProgress className={classes.loader} />
															</div>
														) : (
															<></>
														)} */}

																{isEdit ? (
																	<div className={classes.filePreviewRight}>
																		<EyeIcon
																			onClick={() => {
																				setPreviewBool(true);
																				setPreviewFile(file);
																			}}
																			className={classes.filePreviewIcons}
																		/>
																	</div>
																) : (
																	<div className={classes.filePreviewRight}>
																		<EyeIcon
																			className={classes.filePreviewIcons}
																			onClick={() => {
																				setPreviewBool(true);
																				setPreviewFile(file);
																			}}
																		/>
																		<Deletes
																			className={classes.filePreviewIcons}
																			onClick={() => {
																				handleDeleteFile(file.id);
																				setPreviewBool(false);
																				setPreviewFile(null);
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
							{uploadedFiles.length < 1 && !isEdit ? (
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
							) : (
								<></>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>
							<div className={classes.captionContainer}>
								<h6 style={{ color: labelColor }}>LABELS</h6>
								<Autocomplete
									disabled={isEdit}
									getOptionLabel={(option) => option.name} // name out of array of strings
									PaperComponent={(props) => {
										setDisableDropdown(false);
										return (
											<Paper
												elevation={6}
												className={classes.popperAuto}
												style={{
													marginTop: '12px',
													background: 'black',
													border: '1px solid #404040',
													boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
													borderRadius: '8px'
												}}
												{...props}
											/>
										);
									}}
									PopperComponent={({ style, ...props }) => (
										<Popper {...props} style={{ ...style, height: 0 }} />
									)}
									ListboxProps={{
										style: { maxHeight: 180 },
										position: 'bottom'
									}}
									onClose={(e) => {
										setDisableDropdown(true);
									}}
									multiple
									filterSelectedOptions
									// freeSolo
									freeSolo={false}
									value={selectedLabels}
									onChange={(event, newValue) => {
										setDisableDropdown(true);
										event.preventDefault();
										event.stopPropagation();
										let newLabels = newValue.filter(
											(v, i, a) =>
												a.findIndex(
													(t) => t.name.toLowerCase() === v.name.toLowerCase()
												) === i
										);
										setSelectedLabels([...newLabels]);
									}}
									popupIcon={''}
									noOptionsText={
										<div
											className={classes.liAutocompleteWithButton}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												color: 'white',
												fontSize: 14
											}}
										>
											<p>{extraLabel.toUpperCase()}</p>
											<Button
												text='CREATE NEW LABEL'
												style={{
													padding: '3px 12px',
													fontWeight: 700
												}}
												onClick={() => {
													// setSelectedLabels((labels) => [
													// 	...labels,
													// 	extraLabel.toUpperCase()
													// ]);
												}}
											/>
										</div>
									}
									className={`${classes.autoComplete} ${
										isEdit && classes.disableAutoComplete
									}`}
									id='free-solo-2-demo'
									disableClearable
									options={postLabels}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder={selectedLabels.length ? ' ' : 'Select Label'}
											className={classes.textFieldAuto}
											value={extraLabel}
											onChange={handleChangeExtraLabel}
											InputProps={{
												disableUnderline: true,
												className: classes.textFieldInput,
												...params.InputProps
											}}
										/>
									)}
									renderOption={(props, option, state) => {
										if (option.id == null) {
											return (
												<li
													{...props}
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'space-between'
													}}
													className={classes.liAutocomplete}
												>
													{option.name}
													<Button
														text='CREATE NEW LABEL'
														style={{
															padding: '3px 12px',
															fontWeight: 700
														}}
														onClick={() => {
															// setSelectedLabels((labels) => [
															// 	...labels,
															// 	extraLabel.toUpperCase()
															// ]);
														}}
													/>
												</li>
											);
										} else {
											return (
												<li {...props} className={classes.liAutocomplete}>
													{option.name}
												</li>
											);
										}
									}}
									ChipProps={{
										className: classes.tagYellow,
										size: 'small',
										deleteIcon: <ClearIcon />
									}}
									clearIcon={''}
								/>
							</div>
							<p className={classes.mediaError}>{labelError}</p>

							<div className={classes.captionContainer}>
								<h6>CAPTION</h6>
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
						</div>

						<div className={classes.buttonDiv}>
							{isEdit ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={isEdit ? true : false}
										onClick={() => {
											// if (!deleteBtnStatus) {
											// 	deletePost(specificPost?.id);
											// }
										}}
										text={'DELETE VIRAL'}
									/>
								</div>
							) : (
								<> </>
							)}

							<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
								<Button
									disabled={viralBtnDisabled}
									onClick={() => {
										if (viralBtnDisabled) {
											validateViralBtn();
										} else {
											setPostButtonStatus(true);
											// 	if (isEdit) {
											// 		createPost(specificPost?.id);
											// 	} else {
											// 		setIsLoadingCreatePost(true);
											// 		let uploadFilesPromiseArray = uploadedFiles.map(
											// 			async (_file) => {
											// 				return uploadFileToServer(_file);
											// 			}
											// 		);

											// 		Promise.all([...uploadFilesPromiseArray])
											// 			.then((mediaFiles) => {
											// 				createPost(null, mediaFiles);
											// 			})
											// 			.catch(() => {
											// 				setIsLoadingCreatePost(false);
											// 			});
											// 	}
										}
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
	buttonText: PropTypes.string.isRequired
	//page: PropTypes.string
};

export default UploadOrEditViral;
