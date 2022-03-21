/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditArticle.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
//import { CircularProgress } from '@material-ui/core';
//import 'tinymce/plugins/emoticons/js/emojiimages.min.js';
import Button from '../../button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import { getAllArticlesApi } from '../../../pages/ArticleLibrary/articleLibrarySlice';
import captureVideoFrame from 'capture-video-frame';
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
	const [articleTitle, setArticleTitle] = useState('');
	const [editorText, setEditorText] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [articleTitleColor, setArticleTitleColor] = useState('#ffffff');
	const [articleTitleError, setArticleTitleError] = useState('');
	const [articleTextColor, setArticleTextColor] = useState('#ffffff');
	const [articleTextError, setArticleTextError] = useState('');
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const imgEl = useRef(null);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
			maxFiles: 1
		});

	const labels = useSelector((state) => state.postLibrary.labels);

	const specificArticle = useSelector(
		(state) => state.ArticleLibraryStore.specificArticle
	);
	// console.log(specificArticle, '==== specificArticle ----');

	const dispatch = useDispatch();

	useEffect(() => {
		if (specificArticle) {
			if (specificArticle?.labels) {
				let _labels = [];
				specificArticle.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setArticleTitle(specificArticle?.title);
			// setEditorText(specificArticle.description);
			// setTimeout(() => {
			specificArticle?.length === 0
				? setEditorText('')
				: setEditorText(
						tinyMCE.activeEditor.setContent(specificArticle?.description)
				  );
			// }, 5000);

			setUploadedFiles([
				{
					id: makeid(10),
					fileName: specificArticle?.file_name,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificArticle?.image}`,
					type: 'image'
				}
			]);
		}
	}, [specificArticle]);

	// useEffect(() => {
	// 	setEditorText(editorText);
	// 	console.log(editorText, 'use Effect');
	// }, [editorText]);

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
			const frame = captureVideoFrame('my-video', 'png');
			if (result?.data?.data?.video_thumbnail_url) {
				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
					headers: { 'Content-Type': 'image/png' }
				});
			}
			if (result?.data?.data?.url) {
				const _result = await axios.put(
					result?.data?.data?.url,
					uploadedFile.file,
					//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
					}
				);

				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: uploadedFile.file.name,
							type: 'articleLibrary',
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

	const handleEditorChange = () => {
		const editorTextContent = tinymce?.activeEditor?.getContent();
		setEditorText(editorTextContent);
	};

	const createArticle = async (id, mediaFiles = []) => {
		// const editorTextContent = tinymce?.activeEditor?.getContent();
		// console.log(editorTextContent, 'editorTextContent');
		setPostButtonStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/post-article`,
				{
					...(articleTitle ? { title: articleTitle } : { articleTitle: '' }),
					...(!isEdit ? { image: mediaFiles[0]?.media_url } : {}),
					...(!isEdit ? { file_name: mediaFiles[0]?.file_name } : {}),
					...(!isEdit ? { height: fileHeight } : {}),
					...(!isEdit ? { width: fileWidth } : {}),
					// ...(!isEdit ? { description: editorTextContent } : {}),
					// description: editorTextContent,
					description: editorText,
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					},
					...(isEdit && id ? { article_id: id, description: editorText } : {}),
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
			console.log(e);
		}
	};

	const resetState = () => {
		setArticleTitle('');
		setEditorText('');
		setUploadMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setDropZoneBorder('#ffff00');
		setArticleTitleColor('#ffffff');
		setArticleTextColor('#ffffff');
		setArticleTitleError('');
		setArticleTextError('');
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
				setLabelColor('#ffffff');
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

		if (!editorText) {
			setArticleTextColor('#ff355a');
			setArticleTextError('This field is required');
			setTimeout(() => {
				setArticleTextColor('#ffffff');
				setArticleTextError('');
			}, [5000]);
		}
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
			console.log(e);
		}
	};

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
			return result?.data?.status_code;
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const postBtnDisabled =
		!uploadedFiles.length ||
		!articleTitle ||
		postButtonStatus ||
		selectedLabels.length < 10 ||
		!editorText;

	const editBtnDisabled =
		postButtonStatus || specificArticle?.description === editorText;

	console.log(specificArticle?.description?.trim(), 'desc');
	console.log(editorText.trim(), 'editor');
	console.log(specificArticle?.description?.trim().length, 'desc Length');
	console.log(editorText.trim()?.length, 'editor Length');
	// const editBtnDisabled = postButtonStatus || !articleTitle;
	//|| (specificPost?.articleTitle === articleTitle.trim() &&
	// 	specificPost?.media_id == selectedMedia?.id);

	// const regex = /[!@#$%^&*(),.?":{}|<>/\\ ]/g;
	// var abc = 'hello editor';
	// var abc = tinymce?.activeEditor?.getContent();

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
			<LoadingOverlay active={isLoading} spinner text='Loading...'>
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
																		ref={imgEl}
																		onLoad={() => {
																			setFileWidth(imgEl.current.naturalWidth);
																			setFileHeight(
																				imgEl.current.naturalHeight
																			);
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
								<h6 style={{ color: articleTextColor }}>ARTICLE TEXT</h6>
								<div className={classes.editor}>
									<Editor
										// value={editorText}
										// onChange={(e) => setEditorText(e.target.value)}
										init={{
											height: 288,
											selector: '#myTextarea',
											id: '#myTextarea',
											browser_spellcheck: true,
											contextmenu: false,
											setup: function (editor) {
												editor.on('init', function () {
													// while (description === null || undefined) {
													// 	console.log(description);
													// }
													// setTimeout(() => {
													// console.log(editorText, 'timeout');
													// editor.setContent(
													editorText;
													// editorText === null || undefined ? '' : editorText;
													// );
													// }, 5000);
													// console.log(
													// 	tinymce.activeEditor.getContent(),
													// 	'abc tinymce'
													// );
												});
											},
											content_style:
												"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: Poppins; color: white  }; ",
											//+'.hamza {font-family:Poppins, sans-serif; font-size:64px ;color : green ; letter-spacing : -2%; font-weight : 800}',
											branding: false,
											statusbar: true,
											skin: false,
											emoticons_database: 'emojiimages',
											//toolbar_mode: 'wrap',
											//relative_urls: false,
											//placeholder: 'WYSIWYG .......',
											//emoticons_database_url: '/emojis.js',
											formats: {
												title_h1: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '64px',
														letterSpacing: '-2%',
														marginBottom: '3px'
														// lineHeight: '56px',
													}
													//classes: 'hamza'
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
															format: 'title_h1',
															styles: {
																marginBottom: '23px !important'
															}
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
											menubar: 'edit insert format tools',
											menu: {
												edit: {
													title: 'Edit',
													items: 'undo redo | cut copy paste  | searchreplace'
												},
												insert: {
													title: 'Insert',
													items:
														'image link media charmap emoticons hr anchor insertdatetime'
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
												'searchreplace  emoticons hr visualblocks fullscreen',
												'insertdatetime media table paste wordcount  charmap textcolor colorpicker'
											],
											//width: 490,
											toolbar:
												'undo redo  bold italic underline strikethrough fontsizeselect | ' +
												'alignleft aligncenter ' +
												'alignright alignjustify | bullist numlist | ' +
												'emoticons'
										}}
										onEditorChange={() => handleEditorChange()}
										onInit={() => setDisableDropdown(false)}
										onFocusIn={() => {
											setDisableDropdown(false);
										}}
										onBlur={() => setDisableDropdown(true)}
									/>
								</div>
							</div>

							<p className={classes.mediaError}>{articleTextError}</p>
						</div>

						<div className={classes.buttonDiv}>
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
									disabled={isEdit ? editBtnDisabled : postBtnDisabled}
									onClick={async () => {
										if (postBtnDisabled || editBtnDisabled) {
											validateArticleBtn();
										} else {
											setPostButtonStatus(true);
											if (
												(await handleTitleDuplicate(articleTitle)) === 200 &&
												articleTitle !== specificArticle?.title
											) {
												setArticleTitleColor('#ff355a');
												setArticleTitleError('This title already exists');
												setTimeout(() => {
													setArticleTitleColor('#ffffff');
													setArticleTitleError('');
												}, [5000]);

												setPostButtonStatus(false);
												return;
											}
											if (isEdit) {
												createArticle(specificArticle?.id);
											} else {
												setIsLoading(true);
												let uploadFilesPromiseArray = uploadedFiles.map(
													async (_file) => {
														return uploadFileToServer(_file);
													}
												);

												Promise.all([...uploadFilesPromiseArray])
													.then((mediaFiles) => {
														createArticle(null, mediaFiles);
													})
													.catch(() => {
														setIsLoading(false);
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
								<img
									src={previewFile.img}
									className={classes.previewFile}
									style={{
										// width: `${imageToResizeWidth * 4}px`,
										// height: `${imageToResizeHeight * 4}px`,
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
