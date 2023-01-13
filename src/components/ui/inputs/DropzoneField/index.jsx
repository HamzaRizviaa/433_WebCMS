/* eslint-disable react/prop-types */

import React from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import checkFileSize from '../../../../data/utils/validateFileSize';
import { useDropzoneStyles } from './index.style';
import { makeid } from '../../../../data/utils';
import UploadedFilesPreview from './UploadedFilesPreview';
import { useInputsStyles } from '../inputs.style';

const getFileExtension = (type) => {
	if (type) {
		let _type = type.split('/');
		return _type && _type[1];
	}
};

const selectFileType = (type) => {
	switch (type) {
		case 'video/mp4':
			return 'video';
		case 'audio/mp3':
			return 'audio';
		case 'audio/mpeg':
			return 'audio';
		default:
			return 'image';
	}
};

const DropzoneField = ({
	name,
	value,
	label,
	error,
	onBlur,
	formatMessage,
	fileSizeMessage,
	requiredDimension,
	required = false,
	onDelete,
	onPreview,
	showPreview,
	onDrop,
	accept,
	maxFiles = 1,
	hidePreviewIcon = false,
	hideDeleteIcon = false,
	readOnly = false,
	...rest
}) => {
	const handleDrop = (files) => {
		const filesWithPreview = files.map((file) => {
			const id = makeid(10);

			return {
				id: id,
				file_name: file.name,
				media_url: URL.createObjectURL(file),
				fileExtension: `.${getFileExtension(file.type)}`,
				mime_type: file.type,
				type: selectFileType(file.type),
				file: file
			};
		});

		if (onDrop) {
			onDrop(filesWithPreview);
		}
	};

	const { fileRejections, getRootProps, getInputProps } = useDropzone({
		accept,
		maxFiles,
		validator: checkFileSize,
		onDrop: handleDrop,
		...rest
	});

	const classes = useDropzoneStyles({
		isError: !!error || fileRejections.length > 0
	});

	const inputsClasses = useInputsStyles({
		isError: !!error || fileRejections.length > 0,
		isRequired: required
	});

	return (
		<div>
			{!!label && <span className={inputsClasses.inputLabel}>{label}</span>}
			{value?.length > 0 ? (
				<UploadedFilesPreview
					uploadedFiles={value}
					onDelete={onDelete}
					onPreview={onPreview}
					showPreview={showPreview}
					hidePreviewIcon={hidePreviewIcon}
					hideDeleteIcon={hideDeleteIcon}
					readOnly={readOnly}
				/>
			) : (
				<section
					tabIndex={-1}
					className={classes.dropZoneContainer}
					onBlur={onBlur}
				>
					<div {...getRootProps({ className: classes.dropzone })}>
						<input {...getInputProps({ name, onBlur })} disabled={readOnly} />
						<AddCircleOutlineIcon className={classes.addFilesIcon} />
						<p className={classes.dragMsg}>
							Click or drag files to this area to upload
						</p>
						<div className={classes.formatMsg}>{formatMessage}</div>
						<div className={classes.formatMsg}>{fileSizeMessage}</div>
						{!!requiredDimension && (
							<p className={classes.formatMsg}>
								Required size <strong>{requiredDimension}</strong>
							</p>
						)}
						<p className={classes.fileRejectionError}>{error}</p>
						{fileRejections.map(({ errors }) =>
							errors.map((err) => (
								<p key={err.code} className={classes.fileRejectionError}>
									{err.message}
								</p>
							))
						)}
					</div>
				</section>
			)}
		</div>
	);
};

export default DropzoneField;
