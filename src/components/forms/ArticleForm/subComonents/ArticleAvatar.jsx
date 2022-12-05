/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useRef } from 'react';
// import { uploadFileToServer  from '../../../../data/utils';
import { useStyles } from '../index.styles';

const ArticleAvatar = (props) => {
	const { name, onChange, disabled = false, onBlur } = props;
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
			console.log('FFF', event.currentTarget.files[0]);
			onValueChange(event);
			if (onChange) onChange(name, event.currentTarget.files[0]);
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
					<Avatar src={values.author_image} />
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
