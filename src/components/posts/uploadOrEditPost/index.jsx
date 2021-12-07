import React, { useState } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { MenuItem, TextField, Select } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';

const UploadOrEditPost = ({ open, handleClose }) => {
	const [caption, setCaption] = useState('');
	const [value, setValue] = useState(false);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	// eslint-disable-next-line no-unused-vars
	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<Slider open={open} handleClose={handleClose} title={'Upload a Post'}>
			<div>
				<h5>Add Media Files</h5>
				{/* <div className={classes.uploadedFilesContainer}></div> */}
				<section className={classes.dropZoneContainer}>
					<div {...getRootProps({ className: classes.dropzone })}>
						<input {...getInputProps()} />
						<AddCircleOutlineIcon className={classes.addFilesIcon} />
						<p className={classes.dragMsg}>
							Click or drag files to this area to upload
						</p>
						<p className={classes.formatMsg}>
							Supported formats are jpeg, png and mp4
						</p>
					</div>
				</section>
				<div className={classes.captionContainer}>
					<h6>CAPTION</h6>
					<TextField
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						placeholder={'Please write your caption here'}
						className={classes.textField}
						InputProps={{
							disableUnderline: true,
							className: classes.textFieldInput
						}}
						multiline
						maxRows={4}
					/>
				</div>

				<div className={classes.postMediaContainer}>
					<div className={classes.postMediaHeader}>
						<h5>Link post to media</h5>
						<ToggleSwitch
							id={1}
							checked={value}
							onChange={(checked) => setValue(checked)}
						/>
					</div>
				</div>
				{value ? (
					<div className={classes.mediaContainer}>
						<h6>SELECT MEDIA</h6>
						<Select
							// value={selectedMedia}
							// onChange={handleSelectedMedia}
							disableUnderline={true}
							className={`${classes.select}`}
							IconComponent={KeyboardArrowDownIcon}
							MenuProps={{
								anchorOrigin: {
									vertical: 'bottom',
									horizontal: 'left'
								},
								transformOrigin: {
									vertical: 'top',
									horizontal: 'left'
								},
								getContentAnchorEl: null
							}}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</div>
				) : (
					<></>
				)}

				<div className={classes.postBtn}>
					<Button
						disabled={true}
						onClick={() => {
							// setShowSlider(true);
						}}
						text={'POST'}
					/>
				</div>
			</div>
		</Slider>
	);
};

UploadOrEditPost.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default UploadOrEditPost;
