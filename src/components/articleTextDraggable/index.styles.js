import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px'
		}
	},
	articleBuilder: {
		border: '1px solid #404040',
		borderRadius: '8px',
		margin: '10px 0px',
		padding: '20px'
	},
	draggableWrapperHead: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	grabIcon: {
		height: '12px',
		width: '16px',
		padding: '10px 0px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},
	deleteIcon: {
		padding: '3px 0px',
		width: '20px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},

	grabIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center'
	},
	deleteIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		cursor: 'pointer'
	},
	expandIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		marginLeft: '10px',
		cursor: 'pointer',
		'& > svg': {
			padding: '3px 0px',
			color: theme.palette.white,
			fontSize: '25px',
			fill: `${theme.palette.white} !important`
		}
	},
	rightDiv: {
		display: 'flex'
	},
	leftDiv: {
		display: 'flex'
	},
	wrapperHeading: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		marginLeft: '20px',
		color: `${theme.palette.white} !important`
	},
	editorDrag: {
		margin: '20px 0px'
	},
	editor: {
		margin: '10px 0px',
		'& > div': {
			//tox tox-tinymce tox-platform-touch
			border: `1px solid #404040 !important`,
			borderRadius: '8px',
			//top bars and middle box
			'& > div.tox-editor-container': {
				//tox-editor-container
				backgroundColor: '#404040 !important',
				// top bars
				'& > div.tox-editor-header': {
					//tox-editor-header
					'& > div.tox-menubar': {
						//tox-menubar
						backgroundColor: `#404040 !important`,
						background: `#404040 !important`,
						'& > button.tox-mbtn': {
							color: 'white !important',
							'&:focus': {
								background: `#404040 !important`
							},
							'&:hover': {
								background: `#404040 !important`
							},
							'&:active': {
								background: `#404040 !important`
							}
						}
					},
					'& > div.tox-toolbar': {
						backgroundColor: `#404040 !important`,
						background: `#404040 !important`,
						'&  >div.tox-toolbar__group': {
							'& >button.tox-tbtn': {
								'& > span.tox-icon': {
									color: ` white !important`,
									'& > svg': {
										fill: `white !important`
									}
								},
								'&:focus': {
									background: `#404040 !important`
								},
								'&:hover': {
									background: `#404040 !important`
								},
								'&:active': {
									background: `#404040 !important`
								}
							},
							'& >button.tox-tbtn--select': {
								'& >span.tox-tbtn__select-label': {
									color: `white !important`
								},
								'& >div.tox-tbtn__select-chevron': {
									color: ` white !important`,
									'& > svg': {
										fill: `white !important`
									}
								}
							}
						}
					},
					'& >div.tox .tox-toolbar--scrolling': {
						display: 'none !important'
					},
					'& > div.tox-toolbar-overlord': {
						display: 'none !important'
						//tox-toolbar tox-toolbar--scrolling
						// '& > div.tox-toolbar__primary': {
						// 	//tox-toolbar__group
						// 	borderTop: `1px solid #404040 !important`,
						// 	backgroundColor: `#404040 !important`,
						// 	// border-right: none !important;
						// 	'& > div > button.tox-tbtn': {
						// 		// border-right: 1px solid white !important;
						// 		'& > span.tox-icon': {
						// 			color: ` white !important`,
						// 			'& > svg': {
						// 				fill: `white !important`
						// 			}
						// 		},
						// 		'&:focus': {
						// 			background: `#404040 !important`
						// 		},
						// 		'&:hover': {
						// 			background: `#404040 !important`
						// 		},
						// 		'&:active': {
						// 			background: `#404040 !important`
						// 		}
						// 	}
						// }
					}
				},
				//middle text area
				'& > div.tox-sidebar-wrap': {
					//tox-sidebar-wrap
					'& > div.tox-edit-area': {
						'& > iframe.tox-edit-area__iframe': {
							backgroundColor: `black !important`
							// color: white !important ;
							// #document {
							//  color: white !important;
							// }
							// > html {
							//  color: white !important;
							// }
							// .mce-content-body {
							//  color: white !important;
							// }
						}
					}
				}
			},
			//bottom bar
			'& > div.tox-statusbar': {
				background: `#404040 !important`,
				//tox-statusbar
				'& > div.tox-statusbar__text-container': {
					'& > div.tox-statusbar__path': {
						'& > div.tox-statusbar__path-item': {
							color: ` white !important`
						}
					},
					'& > button.tox-statusbar__wordcount': {
						color: `white !important`
					}
				}
			}
			// '& >div .tox-menu': {
			// 	backgroundColor: '#404040 !important'
			// }
		}
	}
}));
