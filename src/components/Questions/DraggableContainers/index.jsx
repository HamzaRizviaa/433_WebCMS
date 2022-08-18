/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import { Draggable } from 'react-beautiful-dnd';
import Slide from '@mui/material/Slide';
import PrimaryLoader from '../../PrimaryLoader';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { useStyles } from '../UploadEditQuestion/UploadOrEditQuiz.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles as quizStyles } from '../quizStyles';
import QuestionForm from '../QuestionForm';
import {
	Accordion,
	Box,
	AccordionSummary,
	AccordionDetails,
	InputAdornment
} from '@mui/material';
import QuizResults from '../QuestionResults/QuizResults';

const DraggableContainers = ({
	item,
	key,
	index,
	type,
	initialData,
	sendDataToParent,
	handleDeleteMedia,
	setDisableDropdown,
	handleDeleteQuestionSlide,
	setPreviewBool,
	setPreviewFile,
	isEdit,
	location,
	setQuesType,
	resetSlides
}) => {
	const [expanded, setExpanded] = useState(true);
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const muiClasses = quizStyles();
	const imgRef = useRef(null);
	const loadingRef = useRef(null);
	return (
		<div>
			<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
					>
						<div
							className={
								location === 'article'
									? globalClasses.accordionArticleRoot
									: globalClasses.accordionRoot
							}
						>
							<Accordion expanded={expanded} style={{ marginTop: '20px' }}>
								{location === 'article' ? (
									<></>
								) : (
									<AccordionSummary className={classes.accordionSummary}>
										<div className={classes.leftDiv}>
											<div className={classes.grabIconDiv}>
												<span {...provided.dragHandleProps}>
													<Union
														style={{ cursor: 'grab' }}
														className={classes.grabIcon}
													/>
												</span>
											</div>
											<Typography
												className={classes.heading}
												style={{ textTransform: 'capitalize' }}
											>
												{type} {index + 1}
											</Typography>
										</div>

										<Box className={classes.rightDiv}>
											<div className={classes.deleteIconDiv}>
												<Deletes
													className={classes.deleteIcon}
													onClick={() => {
														handleDeleteQuestionSlide(item.sort_order);
													}}
												/>
											</div>
											<div className={classes.deleteIconDiv}>
												{expanded ? (
													<ExpandLessIcon onClick={() => setExpanded(false)} />
												) : (
													<ExpandMoreIcon onClick={() => setExpanded(true)} />
												)}
											</div>
										</Box>
									</AccordionSummary>
								)}

								<AccordionDetails>
									<LoadingOverlay active={false} spinner={<PrimaryLoader />}>
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div
												ref={loadingRef}
												className={`${classes.contentWrapper}`}
											>
												{/* {questionEditStatus === 'loading' ? <PrimaryLoader /> : <></>} */}
												<div className={globalClasses.contentWrapperNoPreview}>
													{isEdit ? (
														<>
															<div className={muiClasses.root}>
																<TabsUnstyled
																	defaultValue={0}
																	className={muiClasses.tabRoot}
																>
																	<TabsListUnstyled
																		className={muiClasses.tabMainDiv}
																	>
																		<TabUnstyled>{'Result'}</TabUnstyled>
																		<TabUnstyled>
																			{`${'Edit ' + type}`}
																		</TabUnstyled>
																	</TabsListUnstyled>
																	<TabPanelUnstyled value={0}>
																		<QuizResults />
																	</TabPanelUnstyled>
																	<TabPanelUnstyled value={1}>
																		<QuestionForm
																			item={item}
																			index={index}
																			type={type}
																			key={item.sort_order}
																			sendDataToParent={(data) =>
																				sendDataToParent(data, index)
																			}
																			handleDeleteMedia={(data) =>
																				handleDeleteMedia(data, index)
																			}
																			handleDeleteQuestionSlide={(sortOrder) =>
																				handleDeleteQuestionSlide(sortOrder)
																			}
																			initialData={item.data && item.data}
																			setPreviewFile={setPreviewFile}
																			isEdit={isEdit}
																			setPreviewBool={setPreviewBool}
																			setDisableDropdown={setDisableDropdown}
																		/>
																	</TabPanelUnstyled>
																</TabsUnstyled>
															</div>
														</>
													) : (
														//first time upload
														<QuestionForm
															item={item}
															index={index}
															type={type}
															key={item.sort_order}
															sendDataToParent={(data) =>
																sendDataToParent(data, index)
															}
															handleDeleteMedia={(data) =>
																handleDeleteMedia(data, index)
															}
															handleDeleteQuestionSlide={(sortOrder) =>
																handleDeleteQuestionSlide(sortOrder)
															}
															initialData={item.data && item.data}
															setPreviewFile={setPreviewFile}
															isEdit={isEdit}
															setPreviewBool={setPreviewBool}
															setDisableDropdown={setDisableDropdown}
														/>
													)}
												</div>
											</div>
										</Slide>
									</LoadingOverlay>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

DraggableContainers.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	type: PropTypes.string,
	location: PropTypes.string,
	isEdit: PropTypes.bool,
	initialData: PropTypes.object,
	sendDataToParent: PropTypes.func,
	handleDeleteMedia: PropTypes.func,
	handleDeleteQuestionSlide: PropTypes.func,
	setPreviewBool: PropTypes.func,
	setPreviewFile: PropTypes.func,
	setDisableDropdown: PropTypes.func,
	setQuesType: PropTypes.func.isRequired,
	resetSlides: PropTypes.func.isRequired
};

export default DraggableContainers;
