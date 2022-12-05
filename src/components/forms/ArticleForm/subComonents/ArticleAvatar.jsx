/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { makeid } from '../../../../data/utils';
// import { uploadFileToServer  from '../../../../data/utils';
import { useStyles } from '../index.styles';

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

const ArticleAvatar = (props) => {
	const { name, onChange, disabled = false, onBlur } = props;
	const [preview, setPreview] = useState('');
	const classes = useStyles();

	const { values } = useFormikContext();

	// const [fileLink, setFileLink] = useState('');
	const inputRef = useRef(null);

	// console.log('fileLINK', fileLink);

	const [field, meta] = useField(name);

	const {
		onChange: onValueChange,
		onBlur: onFieldBlur,
		value,
		...rest
	} = field;

	const { touched, error } = meta;

	console.log(touched, error);

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	// const getFileType = (type) => {
	// 	if (type) {
	// 		let _type = type.split('/');
	// 		return _type && _type[1];
	// 	}
	// };

	// const handleChange = (e) => {
	// 	const { files } = e.target;
	// 	let fileType = inputRef.current?.files[0]?.type;
	// 	fileType = getFileType(fileType);
	// 	console.log('fileType', fileType);
	// 	if (onChange) onChange(e);

	// 	if (files && files.length) {
	// 		const url = URL.createObjectURL(files[0]);
	// 		setFileLink(url);
	// 	}
	// };

	const handleChange = useCallback(
		(event) => {
			onValueChange(event);
			if (onChange) onChange(getFileWithPreview(event.target.files[0]));
		},
		[onValueChange, onChange]
	);

	const handleBlur = useCallback(
		(event) => {
			onFieldBlur(event);
			if (onBlur) onBlur(name, event.target.value);
		},
		[onFieldBlur, onBlur]
	);

	const getFileWithPreview = (file) => {
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
	};
	return (
		<div>
			<input
				{...rest}
				id={name}
				name={name}
				type='file'
				ref={inputRef}
				onChange={handleChange}
				onBlur={handleBlur}
				accept='image/jpeg, image/png, image/jpg'
				disabled={disabled}
				// value={value}
				hidden
			/>
			<div className={classes.authorAvatar}>
				<div>
					<Avatar src={values?.author_image?.media_url} />
				</div>
				{!disabled && (
					<button
						className={classes.hiddenAvatarBtn}
						type='button'
						onClick={handleClick}
					></button>
				)}
			</div>
		</div>
	);
};

export default ArticleAvatar;
