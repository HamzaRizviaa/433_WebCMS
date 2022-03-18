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
import { getAllViralsApi } from '../../../pages/ViralLibrary/viralLibararySlice';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import captureVideoFrame from 'capture-video-frame';
import Close from '@material-ui/icons/Close';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { Popper, Paper } from '@mui/material';
import { getLocalStorageDetails } from '../../../utils';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

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
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const videoRef = useRef(null);
	const imgEl = useRef(null);

	// const ref = useRef(null);
	// useEffect(() => {
	// 	console.log('width', ref.current ? ref.current.offsetWidth : 0);
	// }, [ref.current]);
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
			setCaption(specificViral.caption);
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

	// useEffect(() => {
	// 	console.log(videoRef?.current?.duration);
	// }, [videoRef.current]);
	// useEffect(() => {
	// 	//console.log('adw');
	// 	if (videoRef?.current) {
	// 		console.log('dawdw');
	// 		console.log(videoRef?.current?.clientWidth);
	// 	}
	// 	alert(videoRef?.current?.clientWidth);
	// }, [videoRef.current]);

	// const readImageFile = (file) => {
	// 	var reader = new FileReader(); // CREATE AN NEW INSTANCE.

	// 	reader.onload = function (e) {
	// 		var img = file;
	// 		img.src = e.target.result;

	// 		img.onload = function () {
	// 			var w = this.width;
	// 			var h = this.height;
	// 			console.log(w, h, 'w h ');
	// 		};
	// 	};
	// };

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

			if (result?.data?.data?.url) {
				const _result = await axios.put(
					result?.data?.data?.url,
					uploadedFile.file,
					//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
					}
				);
				const frame = captureVideoFrame('my-video', 'png');
				// console.log(frame, 'frame', frame.width);
				if (result?.data?.data?.video_thumbnail_url) {
					await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
						headers: { 'Content-Type': 'image/png' }
					});
				}
				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: uploadedFile.file.name,
							type: 'virallibrary',
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
						throw 'Error';
					}
				} else {
					throw 'Error';
				}
			} else {
				throw 'Error';
			}
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const resetState = () => {
		setCaption('');
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
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/add-viral`,
				{
					...(caption ? { caption: caption } : { caption: '' }),
					...(!isEdit ? { media_url: mediaFiles[0]?.media_url } : {}),
					...(!isEdit ? { file_name: mediaFiles[0]?.file_name } : {}),
					...(!isEdit ? { thumbnail_url: mediaFiles[0]?.thumbnail_url } : {}),
					...(!isEdit ? { height: fileHeight } : {}),
					...(!isEdit ? { width: fileWidth } : {}),
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

				//setting a timeout for getting post after delete.
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

	const editBtnDisabled =
		postButtonStatus || !caption || specificViral?.caption === caption.trim();

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
					{/* {specificViralStatus.status === 'loading' ? (
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
																			{/* <PlayArrowIcon
																				className={classes.playIcon}
																			/> */}
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
																				ref={videoRef}
																				onLoadedMetadata={() => {
																					setFileWidth(
																						videoRef.current.videoWidth
																					);
																					setFileHeight(
																						videoRef.current.videoHeight
																					);
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
																				ref={imgEl}
																				onLoad={() => {
																					setFileWidth(
																						imgEl.current.naturalWidth
																					);
																					setFileHeight(
																						imgEl.current.naturalHeight
																					);
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
										<div className={classes.liAutocompleteWithButton}>
											{/* <p>{extraLabel.toUpperCase()}</p> */}
											<p>No results found</p>
											{/* <Button
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
											/> */}
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
										let currentLabelDuplicate = selectedLabels.some(
											(label) => label.name == option.name
										);

										if (option.id == null && !currentLabelDuplicate) {
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
															setSelectedLabels((labels) => [
																...labels,
																extraLabel.toUpperCase()
															]);
														}}
													/>
												</li>
											);
										} else if (!currentLabelDuplicate) {
											return (
												<li {...props} className={classes.liAutocomplete}>
													{option.name}
												</li>
											);
										} else {
											return (
												<div className={classes.liAutocompleteWithButton}>
													&apos;{option.name}&apos; is already selected
												</div>
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
										if (viralBtnDisabled || editBtnDisabled) {
											validateViralBtn();
										} else {
											setPostButtonStatus(true);
											if (isEdit) {
												createViral(specificViral?.id);
											} else {
												setIsLoadingcreateViral(true);
												let uploadFilesPromiseArray = uploadedFiles.map(
													async (_file) => {
														return uploadFileToServer(_file);
													}
												);

												Promise.all([...uploadFilesPromiseArray])
													.then((mediaFiles) => {
														createViral(null, mediaFiles);
													})
													.catch(() => {
														setIsLoadingcreateViral(false);
													});
											}
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
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string
};

export default UploadOrEditViral;
