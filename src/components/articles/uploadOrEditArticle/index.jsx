import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditArticle.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
//import { CircularProgress } from '@material-ui/core';
import Button from '../../button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
//import { getLocalStorageDetails } from '../../../utils';
//import axios from 'axios';
//import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
//import captureVideoFrame from 'capture-video-frame';
import Close from '@material-ui/icons/Close';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { Popper, Paper } from '@mui/material';
import { TextField } from '@material-ui/core';

//tinymce
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/table';
import 'tinymce/plugins/spellchecker';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';

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
}) => {
	const [articleTitle, setArticleTitle] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [articleTitleColor, setArticleTitleColor] = useState('#ffffff');
	const [articleTitleError, setArticleTitleError] = useState('');
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	//const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
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
					type: 'image'
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (isEdit) {
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: 'Pyari photo',
					img: `https://www.suchtv.pk/media/k2/items/cache/56956f629e5b759e41d3d88448802c3f_XL.jpg?t=20160823_164734`,
					type: 'image'
				}
			]);
			setArticleTitle('Lets win this');
			setSelectedLabels([
				{ id: 1, name: 'yummy :D' },
				{ id: 2, name: 'ICE CREAM TIME' }
			]);
		}
	}, [isEdit]);

	// const uploadFileToServer = async (uploadedFile) => {
	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
	// 			{
	// 				file_type: uploadedFile.fileExtension,
	// 				parts: 1
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
	// 				}
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
	// 					},
	// 					{
	// 						headers: {
	// 							Authorization: `Bearer ${
	// 								getLocalStorageDetails()?.access_token
	// 							}`
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
		setArticleTitle('');
		setUploadMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setDropZoneBorder('#ffff00');
		setArticleTitleColor('#ffffff');
		setArticleTitleError('');
		setLabelColor('#ffffff');
		setLabelError('');
		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setExtraLabel('');
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

	const validateArticleBtn = () => {
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

		if (!articleTitle) {
			setArticleTitleColor('#ff355a');
			setArticleTitleError('This field is required');
			setTimeout(() => {
				setArticleTitleColor('#ffffff');
				setArticleTitleError('');
			}, [5000]);
		}
	};

	const [newLabels, setNewLabels] = useState([]);

	const handleChangeExtraLabel = (e) => {
		// e.preventDefault();
		// e.stopPropagation();
		setExtraLabel(e.target.value.toUpperCase());
	};

	useEffect(() => {
		if (labels.length) setNewLabels(labels);
	}, [newLabels]);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const postBtnDisabled =
		!uploadedFiles.length ||
		!articleTitle ||
		postButtonStatus ||
		selectedLabels.length < 10;

	// const editBtnDisabled = postButtonStatus || !articleTitle;
	//|| (specificPost?.articleTitle === articleTitle.trim() &&
	// 	specificPost?.media_id == selectedMedia?.id);

	// const regex = /[!@#$%^&*(),.?":{}|<>/\\ ]/g;

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
			article={true}
		>
			<LoadingOverlay spinner text='Loading...'>
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
																	<img
																		src={file.img}
																		className={classes.fileThumbnail}
																		// ref={imageElement}
																		style={{
																			objectFit: 'cover',
																			objectPosition: 'center'
																		}}
																	/>

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
										<input
											{...getInputProps()}
											// ref={ref}
										/>
										<AddCircleOutlineIcon className={classes.addFilesIcon} />
										<p className={classes.dragMsg}>
											Click or drag files to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg and png
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
								<h6 style={{ color: articleTitleColor }}>ARTICLE TITLE</h6>
								<TextField
									disabled={isEdit}
									value={articleTitle}
									onChange={(e) => setArticleTitle(e.target.value)}
									placeholder={'Please write your title here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: `${classes.textFieldInput} ${
											isEdit && classes.disableAutoComplete
										}`,
										style: {
											borderRadius: articleTitle ? '16px' : '40px'
										}
									}}
									// inputProps={{ maxLength: 30 }}
									// autoFocus={true}
									// FormHelperTextProps={{
									// 	className: classes.characterCount,
									// 	style: {
									// 		color: articleTitle.length === 30 ? 'red' : 'white'
									// 	}
									// }}
									// helperText={`${articleTitle.length}/30`}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={classes.mediaError}>{articleTitleError}</p>

							<div className={classes.captionContainer}>
								<h6 style={{ color: labelColor }}>LABELS</h6>
								<Autocomplete
									disabled={isEdit}
									getOptionLabel={(option) => option.name} // setSelectedLabels name out of array of strings
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
									onClose={() => {
										setDisableDropdown(true);
									}}
									multiple
									filterSelectedOptions
									// freeSolo
									freeSolo={false}
									value={selectedLabels}
									onChange={(event, newValue) => {
										//console.log(newValue);
										setDisableDropdown(true);
										event.preventDefault();
										event.stopPropagation();
										// let regexCheck = regex.test(newValue);
										// if (regexCheck) {
										// 	alert('you cant use regex');
										// }
										// else {
										let newLabels = newValue.filter(
											//code to check if the new added label is already in the list
											(v, i, a) =>
												a.findIndex(
													(t) => t.name.toLowerCase() === v.name.toLowerCase()
												) === i
										);

										setSelectedLabels([...newLabels]);
										//}

										console.log(selectedLabels, newValue);
									}}
									popupIcon={''}
									noOptionsText={
										<div className={classes.liAutocompleteWithButton}>
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
									renderOption={(props, option) => {
										//selected in input field,  some -> array to check exists
										let currentLabelDuplicate = selectedLabels.some(
											(label) => label.name == option.name
										);

										if (option.id == null && !currentLabelDuplicate) {
											// if (option.filter(option=>option.name===option.name))

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
								<h6>ARTICLE TEXT</h6>
								<Editor
									init={{
										height: 288,
										//content_style: 'div {background: red;}',

										branding: false,
										statusbar: true,
										skin: 'oxide',
										menubar: 'edit view insert format tools',
										spellchecker_callback: function (method, text, success) {
											var words = text.match(this.getWordCharPattern());
											if (method === 'spellcheck') {
												var suggestions = {};
												for (var i = 0; i < words.length; i++) {
													suggestions[words[i]] = ['First', 'Second'];
												}
												success({ words: suggestions, dictionary: [] });
											} else if (method === 'addToDictionary') {
												// Add word to dictionary here
												success();
											}
										},
										browser_spellcheck: true,
										emoticons_database: 'emojiimages',
										menu: {
											edit: {
												title: 'Edit',
												items: 'undo redo | cut copy paste  | searchreplace'
											},
											view: {
												title: 'View',
												items: ' spellchecker '
											},
											insert: {
												title: 'Insert',
												items:
													'image link media emoticons hr anchor insertdatetime'
											},
											format: {
												title: 'Format',
												items:
													'bold italic underline strikethrough | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat'
											},
											tools: {
												title: 'Tools',
												items: 'spellchecker'
											}
										},
										contextmenu: 'spellchecker',
										plugins: [
											'advlist autolink lists link image charmap print preview anchor',
											'searchreplace spellchecker emoticons hr visualblocks code fullscreen',
											'insertdatetime media table paste code help wordcount'
										],
										toolbar:
											'undo redo | formatselect insertdatetime| ' +
											'bold italic backcolor | alignleft aligncenter ' +
											'alignright alignjustify | bullist numlist outdent indent | ' +
											'removeformat | help'
									}}
									onFocus={() => setDisableDropdown(false)}
									onBlur={() => setDisableDropdown(true)}
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
											if (!deleteBtnStatus) {
												// deletePost(specificPost?.id);
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
									disabled={postBtnDisabled}
									onClick={() => {
										if (postBtnDisabled) {
											validateArticleBtn();
										} else {
											setPostButtonStatus(true);
											// if (isEdit) {
											// 	createPost(specificPost?.id);
											// } else {
											// 	setIsLoadingCreatePost(true);
											// 	let uploadFilesPromiseArray = uploadedFiles.map(
											// 		async (_file) => {
											// 			return uploadFileToServer(_file);
											// 		}
											// 	);

											// 	Promise.all([...uploadFilesPromiseArray])
											// 		.then((mediaFiles) => {
											// 			createPost(null, mediaFiles);
											// 		})
											// 		.catch(() => {
											// 			setIsLoadingCreatePost(false);
											// 		});
											// }
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
								<img
									src={previewFile.img}
									className={classes.previewFile}
									style={{
										// width: `${imageToResizeWidth * 4}px`,
										// height: `${imageToResizeHeight * 4}px`,
										width: `100%`,
										height: `${8 * 4}rem`,
										objectFit: 'cover',
										objectPosition: 'center'
									}}
								/>
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
