/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditArticle.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import { getAllArticlesApi } from '../../../pages/ArticleLibrary/articleLibrarySlice';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import Close from '@material-ui/icons/Close';
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
import 'tinymce/plugins/emoticons/js/emojiimages.min.js';
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
	const [dropboxLink, setDropboxLink] = useState('');
	const [editorTextChecker, setEditorTextChecker] = useState('');

	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
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
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
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
			setDropboxLink(specificArticle?.dropbox_url);
			setEditorTextChecker(specificArticle.description);
			setFileHeight(specificArticle?.height);
			setFileWidth(specificArticle?.width);
			specificArticle?.length === 0
				? setEditorText('')
				: setEditorText(
						tinyMCE.activeEditor?.setContent(specificArticle?.description)
				  );
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
			setIsError({});
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

	const handleEditorChange = () => {
		const editorTextContent = tinymce?.activeEditor?.getContent();
		setEditorText(editorTextContent);
		setEditorTextChecker(editorTextContent); // to check yellow button condition
	};

	const createArticle = async (id, mediaFiles = []) => {
		setIsLoading(true);
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/article/post-article`,
				{
					title: articleTitle,
					image:
						mediaFiles[0]?.media_url ||
						mediaFiles[0].img.split('cloudfront.net/')[1],
					file_name: mediaFiles[0]?.file_name || mediaFiles[0]?.fileName,
					height: fileHeight,
					width: fileWidth,
					description: editorText,
					dropbox_url: dropboxLink ? dropboxLink : '',
					...(isEdit && id ? { article_id: id } : {}),
					...(!isEdit && selectedLabels.length
						? { labels: [...selectedLabels] }
						: {}), // can't edit

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
		setArticleTitle('');
		setEditorText('');
		setEditorText(tinyMCE.activeEditor?.setContent(''));
		setDropboxLink('');
		setEditorTextChecker('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setExtraLabel('');
		setPreviewFile(null);
		setPreviewBool(false);
		setSelectedLabels([]);
		setDisableDropdown(true);
		setFileHeight(null);
		setFileWidth(null);
		setIsError({});
	};

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const validateArticleBtn = () => {
		setIsError({
			articleTitle: !articleTitle,
			uploadedFiles: uploadedFiles.length < 1,
			selectedLabels: selectedLabels.length < 10,
			editorText: !editorText
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
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
			console.log(e, 'Failed to delete Article!');
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
			return result?.data?.message;
		} catch (error) {
			console.log(error, 'Error handle duplicate');

			return null;
		}
	};

	const postBtnDisabled =
		!uploadedFiles.length ||
		!articleTitle ||
		postButtonStatus ||
		selectedLabels.length < 10 ||
		!editorText;

	const editorTextCheckerTrimmed = editorTextChecker?.replace(/&nbsp;/g, ' ');
	const specificArticleTextTrimmed = specificArticle?.description?.replace(
		/&nbsp;/g,
		' '
	);

	useEffect(() => {
		if (specificArticle) {
			setEditBtnDisabled(
				postButtonStatus ||
					!uploadedFiles.length ||
					!articleTitle ||
					(specificArticle?.file_name === uploadedFiles[0]?.fileName &&
						specificArticle?.title?.trim() === articleTitle?.trim() &&
						specificArticle?.dropbox_url?.trim() === dropboxLink.trim() &&
						specificArticleTextTrimmed === editorTextCheckerTrimmed?.trim())
			);
		}
	}, [
		specificArticle,
		articleTitle,
		uploadedFiles,
		editorTextChecker,
		editorText,
		dropboxLink
	]);

	const handleAddSaveBtn = async () => {
		if (postBtnDisabled || editBtnDisabled) {
			validateArticleBtn();
		} else {
			setPostButtonStatus(true);

			if (isEdit) {
				if (specificArticle?.title?.trim() !== articleTitle?.trim()) {
					if (
						(await handleTitleDuplicate(articleTitle)) ===
						'The Title Already Exist'
						// 	200 &&
						// articleTitle !== specificArticle?.title
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
				}
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
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
					(await handleTitleDuplicate(articleTitle)) ===
					'The Title Already Exist'
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
				setIsLoading(true);
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
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
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<h5>{heading1}</h5>
							<DragAndDropField
								uploadedFiles={uploadedFiles}
								// isEdit={isEdit}
								handleDeleteFile={handleDeleteFile}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								isArticle
								imgEl={imgEl}
								imageOnload={() => {
									setFileWidth(imgEl.current.naturalWidth);
									setFileHeight(imgEl.current.naturalHeight);
								}}
							/>

							{!uploadedFiles.length && (
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
											Click or drag files to this area to upload
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
								<div className={classes.characterCount}>
									<h6
										className={
											isError.articleTitle
												? classes.errorState
												: classes.noErrorState
										}
									>
										ARTICLE TITLE
									</h6>
									<h6
										style={{
											color:
												articleTitle?.length >= 25 && articleTitle?.length <= 27
													? 'pink'
													: articleTitle?.length === 28
													? 'red'
													: 'white'
										}}
									>
										{articleTitle?.length}/28
									</h6>
								</div>

								<TextField
									// disabled={isEdit}
									value={articleTitle}
									onChange={(e) => setArticleTitle(e.target.value)}
									placeholder={'Please write your title here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: articleTitle ? '16px' : '40px'
										}
									}}
									inputProps={{ maxLength: 28 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={classes.mediaError}>
								{isError.articleTitle ? 'This field is required' : ''}
							</p>

							<div className={classes.captionContainer}>
								<h6
									className={
										isError.selectedLabels
											? classes.errorState
											: classes.noErrorState
									}
								>
									LABELS
								</h6>
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
							<p className={classes.mediaError}>
								{isError.selectedLabels
									? `You need to add  ${
											10 - selectedLabels.length
									  }  more labels in order to post`
									: ''}
							</p>

							<div className={classes.captionContainer}>
								<h6
									className={
										isError.editorText
											? classes.errorState
											: classes.noErrorState
									}
								>
									ARTICLE TEXT
								</h6>
								<div className={classes.editor}>
									<Editor
										init={{
											height: 288,
											selector: '#myTextarea',
											id: '#myTextarea',
											browser_spellcheck: true,
											contextmenu: false,
											setup: function (editor) {
												editor.on('init', function () {
													editorText;
												});
											},
											content_style:
												"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: Poppins; color: white  }; ",

											branding: false,
											statusbar: true,
											skin: false,
											emoticons_database: 'emojiimages',
											formats: {
												title_h1: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '64px',
														letterSpacing: '-2%',
														marginBottom: '3px'
													}
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
															format: 'title_h1'
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
											menubar: 'edit insert tools format',
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

											toolbar:
												'undo redo  bold italic underline strikethrough fontsizeselect | ' +
												'alignleft aligncenter ' +
												'alignright alignjustify | bullist numlist | ' +
												'emoticons'
										}}
										onEditorChange={() => handleEditorChange()}
										onMouseEnter={() => setDisableDropdown(false)}
										onBlur={() => setDisableDropdown(true)}
									/>
								</div>
							</div>

							<p className={classes.mediaError}>
								{isError.editorText ? 'This field is required' : ''}
							</p>
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
									onClick={() => handleAddSaveBtn()}
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
