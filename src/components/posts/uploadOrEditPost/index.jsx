import React, { useState } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { MenuItem, TextField, Select } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const UploadOrEditPost = ({ open, handleClose }) => {
	const [caption, setCaption] = useState('');
	const [value, setValue] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState([
		{ id: 1, img: 'https://picsum.photos/80', fileName: 'filenamrrre.jpg' },
		{ id: 2, img: 'https://picsum.photos/80', fileName: 'filename.jpg' }
	]);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	// eslint-disable-next-line no-unused-vars
	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			uploadedFiles,
			result.source.index,
			result.destination.index
		);

		setUploadedFiles(items);
	};

	return (
		<Slider open={open} handleClose={handleClose} title={'Upload a Post'}>
			<div className={classes.contentWrapper}>
				<div>
					<h5>Add Media Files</h5>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={classes.uploadedFilesContainer}
								>
									{uploadedFiles.map((file, index) => {
										console.log(file);
										return (
											<Draggable
												key={file.id}
												draggableId={`droppable-${file.id}`}
												index={index}
											>
												{(provided) => (
													<div
														key={index}
														className={classes.filePreview}
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={{
															...provided.draggableProps.style,
															position: 'static'
														}}
													>
														<div className={classes.filePreviewLeft}>
															<img
																src={file.img}
																className={classes.fileThumbnail}
															/>
															<p className={classes.fileName}>
																{file.fileName}
															</p>
														</div>
														<div className={classes.filePreviewRight}>
															<span {...provided.dragHandleProps}>
																<MenuIcon
																	style={{ cursor: 'grab' }}
																	className={classes.filePreviewIcons}
																/>
															</span>
															<DeleteIcon
																className={classes.filePreviewIcons}
															/>
														</div>
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
				</div>
				<div className={classes.postBtn}>
					<Button
						// disabled={true}
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
