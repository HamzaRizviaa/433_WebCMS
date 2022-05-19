import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './_dropDownField.module.scss';

import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import { ReactComponent as EyeIcon } from '../../assets/Eye.svg';
import { ReactComponent as Union } from '../../assets/Union.svg';
import { ReactComponent as MusicIcon } from '../../assets/Music.svg';

const DragAndDropField = ({
	onDragEnd,
	uploadedFiles,
	isEdit,
	editPoll,
	editQuiz,
	handleDeleteFile,
	setPreviewBool,
	setPreviewFile,
	dimensionSelect,
	imageToResizeWidth,
	imageToResizeHeight,
	isPost, // image and video
	isMedia, // image and video without thumbnail
	isArticle, // image
	imgEl,
	imageOnload,
	videoRef,
	onLoadedVideodata,
	onLoadedAudiodata,
	quizPollStatus,
	...props
}) => {
	return (
		<DragDropContext onDragEnd={onDragEnd} {...props}>
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
												{isMedia &&
													(file.type === 'video' && file.media_url ? (
														<>
															<Union className={classes.playIcon} />
															<div className={classes.fileThumbnail2} />
															<video
																src={file.media_url}
																style={{ display: 'none' }}
																ref={videoRef}
																onLoadedMetadata={onLoadedVideodata}
															/>
														</>
													) : file.type === 'audio' && file.media_url ? (
														<>
															<MusicIcon className={classes.playIcon} />
															<div className={classes.fileThumbnail2} />
															<audio
																src={file.media_url}
																style={{ display: 'none' }}
																ref={videoRef}
																onLoadedMetadata={onLoadedAudiodata}
															/>
														</>
													) : (
														<></>
													))}
												{isArticle && file.media_url && (
													<>
														<img
															src={file.media_url || file.img}
															className={classes.fileThumbnail}
															style={{
																objectFit: 'contain',
																objectPosition: 'center'
															}}
															ref={imgEl}
															onLoad={imageOnload}
														/>
													</>
												)}
												{isPost &&
													(file.type === 'video' ? (
														<>
															<PlayArrowIcon
																className={
																	dimensionSelect === 'portrait'
																		? classes.playIconPortrait
																		: classes.playIcon
																}
															/>
															<video
																id={'my-video'}
																poster={
																	isEdit ? file.thumbnail_url || file.img : null
																}
																className={classes.fileThumbnailPost}
																style={{
																	maxWidth: `${imageToResizeWidth}px`,
																	maxHeight: `${imageToResizeHeight}px`,
																	objectFit: 'cover',
																	objectPosition: 'center'
																}}
																ref={videoRef}
																onLoadedMetadata={onLoadedVideodata}
															>
																<source src={file.media_url || file.img} />
															</video>
														</>
													) : (
														<>
															<img
																src={file.media_url || file.img}
																className={classes.fileThumbnailPost}
																style={{
																	width: `${imageToResizeWidth}px`,
																	height: `${imageToResizeHeight}px`,
																	objectFit: 'cover',
																	objectPosition: 'center'
																}}
																ref={imgEl}
																onLoad={imageOnload}
															/>
														</>
													))}
												<p className={classes.fileName}>
													{file.fileName || file.file_name}
												</p>
											</div>
											{isEdit || editPoll || editQuiz ? (
												<div className={classes.filePreviewRight}>
													{isMedia && file?.media_url ? (
														<>
															<Deletes
																className={classes.filePreviewIcons}
																onClick={() => {
																	handleDeleteFile(file.id);
																	setPreviewBool(false);
																	setPreviewFile(null);
																}}
															/>
														</>
													) : file?.media_url ? (
														<div style={{ display: 'flex' }}>
															{isPost && uploadedFiles.length > 1 && (
																<span {...provided.dragHandleProps}>
																	<MenuIcon
																		style={{ cursor: 'grab' }}
																		className={classes.filePreviewIcons}
																	/>
																</span>
															)}
															<EyeIcon
																onClick={() => {
																	setPreviewBool(true);
																	setPreviewFile(file);
																}}
																className={classes.filePreviewIcons}
															/>

															{quizPollStatus === 'CLOSED' ? (
																<></>
															) : (
																<Deletes
																	className={classes.filePreviewIcons}
																	onClick={() => {
																		handleDeleteFile(file.id);
																		setPreviewBool(false);
																		setPreviewFile(null);
																	}}
																/>
															)}
														</div>
													) : (
														<></>
													)}
												</div>
											) : (
												<div
													className={classes.filePreviewRight}
													style={{ display: 'flex' }}
												>
													{isMedia ? (
														<></>
													) : (
														<EyeIcon
															className={classes.filePreviewIcons}
															onClick={() => {
																setPreviewBool(true);
																setPreviewFile(file);
															}}
														/>
													)}
													{isPost && uploadedFiles.length > 1 && (
														<span {...provided.dragHandleProps}>
															<MenuIcon
																style={{ cursor: 'grab' }}
																className={classes.filePreviewIcons}
															/>
														</span>
													)}
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
	);
};

DragAndDropField.propTypes = {
	onDragEnd: PropTypes.func,
	uploadedFiles: PropTypes.array,
	imageToResizeWidth: PropTypes.number,
	imageToResizeHeight: PropTypes.number,
	dimensionSelect: PropTypes.bool,
	isEdit: PropTypes.bool,
	editPoll: PropTypes.bool,
	editQuiz: PropTypes.bool,
	handleDeleteFile: PropTypes.func,
	setPreviewBool: PropTypes.func,
	setPreviewFile: PropTypes.func,
	isPost: PropTypes.bool,
	isMedia: PropTypes.bool,
	isArticle: PropTypes.bool,
	videoRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	imgEl: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	imageOnload: PropTypes.func,
	onLoadedVideodata: PropTypes.func,
	onLoadedAudiodata: PropTypes.func,
	quizPollStatus: PropTypes.string
};

export default DragAndDropField;
