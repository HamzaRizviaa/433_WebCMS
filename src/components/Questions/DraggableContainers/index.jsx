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
import QuizResults from '../QuestionResults/QuizResults';
import QuestionForm from '../QuestionForm';
import {
	Accordion,
	Box,
	AccordionSummary,
	AccordionDetails
} from '@mui/material';
import CopyToClipboard from '../../CopyToClipboard'
import { ReactComponent as CopyIcon } from '../../../assets/Copy.svg'

const DraggableContainers = ({
	item,
	key,
	index,
	type,
	status,
	initialData,
	sendDataToParent,
	handleDeleteMedia,
	setDisableDropdown,
	handleDeleteQuestionSlide,
	setPreviewBool,
	setPreviewFile,
	isEdit,
	location,
	endDate
}) => {
	const [expanded, setExpanded] = useState(true);
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const muiClasses = quizStyles();
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
											<div
												className={
													!isEdit || status === 'draft'
														? classes.grabIconDiv
														: classes.grabIconDivDisbaled
												}
											>
												{!isEdit || status === 'draft' ? (
													<span {...provided.dragHandleProps}>
														<Union
															style={{
																cursor: 'grab'
															}}
															className={classes.grabIcon}
														/>
													</span>
												) : (
													<span>
														<Union className={classes.grabIcon} />
													</span>
												)}
											</div>
											<Typography
												className={classes.heading}
												style={{ textTransform: 'capitalize' }}
											>
												{type} {index + 1}
											</Typography>
										</div>

										<Box className={classes.rightDiv}>
											<div
												className={
													!isEdit || status === 'draft'
														? classes.deleteIconDiv
														: classes.deleteIconDivDisabled
												}
											>
												<Deletes
													className={classes.deleteIcon}
													onClick={() => {
														((isEdit && status === 'draft') || !isEdit) &&
															handleDeleteQuestionSlide(item.sortOrder);
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
															{status === 'draft' ? (
																<QuestionForm
																	item={item}
																	index={index}
																	type={type}
																	isEdit={isEdit}
																	status={status}
																	key={item.sortOrder}
																	initialData={initialData}
																	setPreviewFile={setPreviewFile}
																	setPreviewBool={setPreviewBool}
																	setDisableDropdown={setDisableDropdown}
																	sendDataToParent={(data) =>
																		sendDataToParent(data)
																	}
																	handleDeleteMedia={(data) =>
																		handleDeleteMedia(data, index)
																	}
																	handleDeleteQuestionSlide={(sortOrder) =>
																		handleDeleteQuestionSlide(sortOrder)
																	}
																/>
															) : (
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
																			<QuizResults
																				initialData={initialData}
																				status={status}
																				location={location}
																				endDate={endDate}
																			/>
																		</TabPanelUnstyled>
																		<TabPanelUnstyled value={1}>
																			<QuestionForm
																				item={item}
																				index={index}
																				type={type}
																				isEdit={isEdit}
																				status={status}
																				key={item.sortOrder}
																				initialData={initialData}
																				setPreviewFile={setPreviewFile}
																				setPreviewBool={setPreviewBool}
																				setDisableDropdown={setDisableDropdown}
																				sendDataToParent={(data) =>
																					sendDataToParent(data, index)
																				}
																				handleDeleteMedia={(data) =>
																					handleDeleteMedia(data, index)
																				}
																				handleDeleteQuestionSlide={(
																					sortOrder
																				) =>
																					handleDeleteQuestionSlide(sortOrder)
																				}
																			/>
																		</TabPanelUnstyled>
																	</TabsUnstyled>
																	<br />
																</div>
															)}
														</>
													) : (
														//first time upload
														<QuestionForm
															item={item}
															index={index}
															type={type}
															key={item.sortOrder}
															sendDataToParent={(data) =>
																sendDataToParent(data, index)
															}
															handleDeleteMedia={(data) =>
																handleDeleteMedia(data, index)
															}
															handleDeleteQuestionSlide={(sortOrder) =>
																handleDeleteQuestionSlide(sortOrder)
															}
															initialData={initialData}
															setPreviewFile={setPreviewFile}
															isEdit={isEdit}
															status={status}
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
	status: PropTypes.string,
	endDate: PropTypes.any
};

export default DraggableContainers;
