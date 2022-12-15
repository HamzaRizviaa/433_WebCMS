/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useRef } from 'react';
import { Avatar } from '@material-ui/core';
import { useField } from 'formik';
import { useStyles } from '../../index.styles';
import {
	makeid,
	getFileExtension,
	selectFileType
} from '../../../../../data/utils';

const ArticleAvatarField = (props) => {
	const { name, onChange, disabled = false, onBlur } = props;

	const classes = useStyles();

	const inputRef = useRef(null);

	const [field, meta, helpers] = useField(name);

	const { onBlur: onFieldBlur, value, ...rest } = field;

	const { touched, error } = meta;
	const { setValue, setError } = helpers;

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleChange = useCallback(
		(event) => {
			const { files } = event.target;
			if (files[0].size > 1000000) {
				setError(
					'The file size you are trying to upload exceeds the limit of 1MB.'
				);
			} else {
				setValue(getFileWithPreview(files[0]));
				if (onChange) onChange(getFileWithPreview(files[0]));
			}
		},
		[setValue, onChange]
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

		return [
			{
				id: id,
				file_name: file.name,
				media_url: URL.createObjectURL(file),
				fileExtension: `.${getFileExtension(file.type)}`,
				mime_type: file.type,
				type: selectFileType(file.type),
				file: file
			}
		];
	};

	return (
		<div>
			<input
				{...rest}
				id={name}
				// name={name}
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
					<Avatar src={value[0]?.media_url} />
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

export default ArticleAvatarField;
