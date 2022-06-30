/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import { useStyles } from './index.styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
//tinymce
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/charmap';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';

const ArticleTextDraggable = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	initialData,
	// WidthHeightCallback,
	handleDeleteFile,
	setDisableDropdown
}) => {
	const classes = useStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (initialData?.description) {
			setTimeout(() => {
				let editorbyId =
					tinymce?.get(`text-${item.sortOrder}_ifr`) ||
					tinymce?.get(`text-${item.sortOrder}`);
				setDescription(editorbyId?.setContent(initialData?.description));
			}, 1000);
		}
	}, []);

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

	const handleEditorChange = () => {
		const editorTextContent = tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent();
		const textContent = tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent({ format: 'text' });
		setDescription(editorTextContent);
		if (textContent === '') {
			sendDataToParent([{ description: '' }]);
		} else {
			sendDataToParent([{ description: editorTextContent }]);
		}
		// setEditorTextChecker(editorTextContent); // to check yellow button condition
	};

	return (
		<>
			<Draggable
				draggableId={`draggable-${index}`}
				index={index}
				key={key}
				//	isDragDisabled={uploadeddatas.length <= 1}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
						className={classes.articleBuilder}
					>
						<div className={classes.draggableWrapperHead}>
							<div className={classes.leftDiv}>
								<div className={classes.grabIconDiv}>
									<span {...provided.dragHandleProps}>
										<Union
											style={{ cursor: 'grab' }}
											className={classes.grabIcon}
										/>
									</span>
								</div>
								<div className={classes.wrapperHeading}>{item.heading}</div>
							</div>
							<div className={classes.rightDiv}>
								<div className={classes.deleteIconDiv}>
									<Deletes
										className={classes.deleteIcon}
										onClick={() => {
											handleDeleteFile(item.sortOrder);
										}}
									/>
								</div>
								<div
									className={classes.expandIconDiv}
									onClick={() => {
										clickExpand();
									}}
								>
									{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</div>
							</div>
						</div>
						{clickExpandIcon ? (
							<div className={classes.editorDrag}>
								{/* <Editor
									editorId={`text-${item.sortOrder}`}
									description={description}
									onMouseEnter={() => setDisableDropdown(false)}
									onBlur={() => setDisableDropdown(true)}
									handleEditorChange={handleEditorChange}
								/> */}

								<div className={classes.editor}>
									<Editor
										init={{
											height: 288,
											selector: '#myTextarea',
											id: '#myTextarea',
											browser_spellcheck: true,
											contextmenu: false,
											content_css: '../../index.scss',
											setup: function (editor) {
												editor.on('init', function () {
													description;
												});
											},
											content_style:
												"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: Poppins; color: white; line-height:1  }; ",

											branding: false,
											statusbar: true,
											skin: false,

											formats: {
												title_h1: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '64px',
														letterSpacing: '-2%',
														marginBottom: '3px'
													}
												},
												title_h2: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '40px',
														letterSpacing: '-2%'
													}
												},
												title_h3: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '36px',
														letterSpacing: '-2%'
													}
												},
												title_h4: {
													inline: 'span',
													styles: {
														fontWeight: '800',
														fontSize: '24px',
														letterSpacing: '-2%'
													}
												},
												title_subtitle: {
													inline: 'span',
													styles: {
														fontWeight: '600',
														fontSize: '24px'
													}
												},
												body_regular: {
													inline: 'span',
													styles: {
														fontWeight: '400',
														fontSize: '16px',
														lineHeight: '24px'
													}
												},
												body_bold: {
													inline: 'span',
													styles: {
														fontWeight: '700',
														fontSize: '16px',
														lineHeight: '24px'
													}
												},
												body_small: {
													inline: 'span',
													styles: {
														fontWeight: '400',
														fontSize: '14px',
														lineHeight: '16px'
													}
												},
												body_tiny: {
													inline: 'span',
													styles: {
														fontWeight: '500',
														fontSize: '12px',
														lineHeight: '16px',
														letterSpacing: '3%'
													}
												},
												body_boldAndTiny: {
													inline: 'span',
													styles: {
														fontWeight: '700',
														fontSize: '12px',
														lineHeight: '16px',
														letterSpacing: '3%'
													}
												}
											},
											style_formats: [
												{
													title: 'Title',
													items: [
														{
															title: 'Header 1',
															format: 'title_h1'
														},
														{
															title: 'Header 2',
															format: 'title_h2'
														},
														{
															title: 'Header 3',
															format: 'title_h3'
														},
														{
															title: 'Header 4',
															format: 'title_h4'
														},
														{
															title: 'Subtitle',
															format: 'title_subtitle'
														}
													]
												},
												{
													title: 'Body',
													items: [
														{
															title: 'Regular',
															format: 'body_regular'
														},
														{
															title: 'Bold',
															format: 'body_bold'
														},
														{
															title: 'Small',
															format: 'body_small'
														},
														{
															title: 'Tiny',
															format: 'body_tiny'
														},
														{
															title: 'Bold and Tiny',
															format: 'body_boldAndTiny'
														}
													]
												}
											],
											menubar: 'edit insert format',
											menu: {
												edit: {
													title: 'Edit',
													items: 'undo redo | cut copy paste  | searchreplace'
												},
												insert: {
													title: 'Insert',
													items: ' hr insertdatetime'
												},
												format: {
													title: 'Format',
													items:
														' underline strikethrough | formats  align lineheight  '
												}
												// tools: {
												// 	title: 'Tools',
												// 	items: 'wordcount'
												// }
											},
											plugins: [
												'lists advlist link image anchor',
												'searchreplace  hr fullscreen',
												'insertdatetime paste wordcount  charmap textcolor colorpicker'
											]

											// toolbar:
											// 	'undo redo  bold italic underline strikethrough fontsizeselect | ' +
											// 	'alignleft aligncenter ' +
											// 	'alignright alignjustify | bullist numlist | '
										}}
										onEditorChange={() => handleEditorChange()}
										onMouseEnter={() => setDisableDropdown(false)}
										onBlur={() => setDisableDropdown(true)}
										id={`text-${item.sortOrder}`}
										// onMouseEnter={() => setDisableDropdown(false)}
										// onBlur={() => setDisableDropdown(true)}
									/>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
				)}
			</Draggable>
		</>
	);
};

ArticleTextDraggable.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func,
	// WidthHeightCallback: PropTypes.func,
	handleDeleteFile: PropTypes.func,
	// initialData: PropTypes.object,
	setDisableDropdown: PropTypes.func
};

export default ArticleTextDraggable;
