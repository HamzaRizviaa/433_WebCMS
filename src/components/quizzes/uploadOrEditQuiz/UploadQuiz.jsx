import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditQuiz.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import Close from '@material-ui/icons/Close';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

const UploadQuiz = ({ heading1, open }) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [previewFile, setPreviewFile] = useState(null);
	//const [previewBool, setPreviewBool] = useState(false);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png',
			maxFiles: 1
		});

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
					type: file.type === 'image'
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

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
		if (!open) {
			resetState();
		}
	}, [open]);

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	// const handlePreviewEscape = () => {
	// 	//setPreviewBool(false);
	// 	setPreviewFile(null);
	// };

	const resetState = () => {
		setUploadedFiles([]);
		setFileRejectionError('');
		setUploadMediaError('');
		setDropZoneBorder('#ffff00');
		setPreviewFile(null);
		//setPreviewBool(false);
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
	};
	console.log(validatePostBtn);

	return (
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
											<div
												key={index}
												className={classes.filePreview}
												ref={provided.innerRef}
											>
												<div className={classes.filePreviewLeft}>
													<img
														src={file.img}
														className={classes.fileThumbnail}
													/>
													<p className={classes.fileName}>{file.fileName}</p>
												</div>

												<div className={classes.filePreviewRight}>
													<EyeIcon
														className={classes.filePreviewIcons}
														onClick={() => {
															//setPreviewBool(true);
															setPreviewFile(file);
														}}
													/>
													<Deletes
														className={classes.filePreviewIcons}
														onClick={() => {
															handleDeleteFile(file.id);
															//setPreviewBool(false);
															setPreviewFile(null);
														}}
													/>
												</div>
											</div>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
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
								<p className={classes.uploadMediaError}>{uploadMediaError}</p>
							</div>
						</section>
					)}
					<p className={classes.fileRejectionError}>{fileRejectionError}</p>
				</div>
			</div>
			{previewFile != null && (
				<div className={classes.previewComponent}>
					<div className={classes.previewHeader}>
						<Close
							onClick={() => {
								//setPreviewBool(false);
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
								width: `${8 * 4}rem`,
								height: `${8 * 4}rem`,
								objectFit: 'cover',
								objectPosition: 'center'
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

UploadQuiz.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired
};

export default UploadQuiz;
