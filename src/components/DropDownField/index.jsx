import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import { ReactComponent as EyeIcon } from '../../assets/Eye.svg';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './_dropDownField.module.scss';

const DropDownField = ({
	onDragEnd,
	uploadedFiles,
	isEdit,
	handleDeleteFile,
	setPreviewBool,
	setPreviewFile,
	dimensionSelect,
	imageToResizeWidth,
	imageToResizeHeight,
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
												{file.type === 'video' ? (
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
															poster={isEdit ? file.img : null}
															className={classes.fileThumbnail}
															style={{
																maxWidth: `${imageToResizeWidth}px`,
																maxHeight: `${imageToResizeHeight}px`,
																objectFit: 'cover',
																objectPosition: 'center'
															}}
														>
															<source src={file.img} />
														</video>
													</>
												) : (
													<>
														<img
															src={file.img}
															className={classes.fileThumbnail}
															style={{
																width: `${imageToResizeWidth}px`,
																height: `${imageToResizeHeight}px`,
																objectFit: 'cover',
																objectPosition: 'center'
															}}
														/>
													</>
												)}

												<p className={classes.fileName}>{file.fileName}</p>
											</div>
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
													{uploadedFiles.length > 1 && (
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

DropDownField.propTypes = {
	onDragEnd: PropTypes.func,
	uploadedFiles: PropTypes.array,
	imageToResizeWidth: PropTypes.number,
	imageToResizeHeight: PropTypes.number,
	dimensionSelect: PropTypes.bool,
	isEdit: PropTypes.bool,
	handleDeleteFile: PropTypes.func,
	setPreviewBool: PropTypes.func,
	setPreviewFile: PropTypes.func
};

export default DropDownField;
