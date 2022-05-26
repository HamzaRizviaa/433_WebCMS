/* eslint-disable no-dupe-keys */
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	textField: {
		width: '100%'
	},

	textFieldInput: {
		...theme.components.textFieldInput
		// @include textFieldInput,
	},

	captionContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},
	categoryContainer: {
		marginTop: '2.5rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	mainCategory: {
		width: '48%',
		display: 'inline-block'
	},

	subCategory: {
		width: '48%',
		display: 'inline-block'
	},

	postMediaHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	postMediaContainer: {
		marginTop: '2.5rem'
	},
	mediaContainer: {
		marginTop: '2.5rem',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	select: {
		'& .MuiSelect-select': {
			padding: '1rem 0rem 1rem 1rem',
			paddingRight: '32px'
		},
		width: '100%',
		padding: '3px 0',
		color: `${theme.palette.white} !important`,
		border: `1px solid ${theme.palette.grey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black}`,
		"& div[role='button']": {
			padding: '1rem 0rem 1rem 2rem'
		},

		'& svg': {
			color: theme.palette.neonYellow,
			right: '1rem',
			top: 0,
			fontSize: '4rem'
		}
	},

	textFieldInput2: {
		color: ` ${theme.palette.white} !important`,
		border: `0.01px solid ${theme.palette.grey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		marginBottom: '1rem',
		backgroundColor: theme.palette.black,

		'& svg': {
			color: theme.palette.neonYellow,
			right: '5rem !important',
			top: '0 !important',
			fontSize: '3rem !important'
		}
	},

	buttonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'space-between'
	},
	publishDraftDiv: {
		display: 'flex'
	},

	postBtn: {
		width: '100%'
	},

	postBtnEdit: {
		width: '70%',
		display: 'inline-block'
	},

	editBtn: {
		display: 'inline-block'
	},

	// uploadedFilesContainer: {
	// 	marginTop: '4rem',
	// 	maxHeight: '220px',
	// 	overflowY: 'auto',
	// 	// -ms-overflow-style: none, /* Internet Explorer 10+ */
	// 	// scrollbar-width: none, /* Firefox */
	// 	'&::-webkit-scrollbar': {
	// 		display: 'none'
	// 	}
	// },

	// filePreview: {
	// 	padding: '1.5rem 2rem',
	// 	boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
	// 	display: 'flex',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	position: 'relative',
	// 	'&:last-child': {
	// 		boxShadow: 'none'
	// 	}
	// },

	// filePreviewLeft: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	gap: '10px',
	// 	width: '100%'
	// },

	// filePreviewRight: {
	// 	display: 'flex',
	// 	alignItems: 'center'
	// },

	// fileThumbnail: {
	// 	height: '8rem',
	// 	maxWidth: '50%',
	// 	borderRadius: '4px',
	// 	backgroundColor: theme.palette.white
	// },

	// fileName: {
	// 	fontSize: '1rem',
	// 	maxWidth: '150px',
	// 	textOverflow: 'ellipsis',
	// 	overflow: 'hidden'
	// },

	// filePreviewIcons: {
	// 	color: theme.palette.neonYellow,
	// 	fontSize: '2.5rem !important',
	// 	marginLeft: '2rem',
	// 	cursor: 'pointer'
	// },

	// playIcon: {
	// 	position: 'absolute',
	// 	left: '48px',
	// 	height: '2.5rem !important',
	// 	width: 'auto !important',
	// 	color: theme.palette.neonYellow
	// },

	// playIconPortrait: {
	// 	position: 'absolute',
	// 	left: '38px',
	// 	height: '2.5rem !important',
	// 	width: 'auto !important',
	// 	color: theme.palette.neonYellow
	// },

	// loaderContainer: {
	// 	position: 'absolute',
	// 	width: 'calc(100% - 20px)',
	// 	height: '110px',
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: 'rgba(0, 0, 0, 0.5)'
	// },

	// loaderContainer2: {
	// 	position: 'absolute',
	// 	width: '100%',
	// 	height: '100%',
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: 'rgba(0, 0, 0, 0.87)',
	// 	zIndex: 100
	// },

	// loader: {
	// 	color: `${theme.palette.neonYellow} !important`
	// },

	// orientation: {
	// 	marginRight: '2rem'
	// },

	// headerOrientationWrapper: {
	// 	display: 'flex',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	width: '100%'
	// },

	// orientationDimensionWrapper: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'center'
	// },

	// dimensionWrapper: {
	// 	borderRadius: '8px',
	// 	backgroundColor: theme.palette.grey,
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'space-between',
	// 	padding: '2px'
	// },

	// dimensionSingle: {
	// 	borderRadius: '8px',
	// 	padding: '1rem 1rem 0.8rem 1rem'
	// },

	// dimensionPreviewIcons: {
	// 	color: theme.palette.disabled,
	// 	cursor: 'pointer'
	// },

	///////////// RIGHT PREVIEW

	// previewComponent: {
	// 	width: '35%',
	// 	borderLeft: `1px solid ${theme.palette.grey}`,
	// 	marginLeft: '3rem',
	// 	paddingLeft: '3rem',
	// 	marginBottom: '10rem'
	// },

	// closeIcon: {
	// 	width: '3.2rem !important',
	// 	height: '3.2rem !important',
	// 	marginRight: '0.8rem',
	// 	cursor: 'pointer !important'
	// },

	// previewHeader: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	marginBottom: '10px'
	// },
	// errorState: {
	// 	color: theme.palette.red
	// },

	// noErrorState: {
	// 	color: theme.palette.white
	// },

	video: {
		'&::-webkit-media-controls-fullscreen-button': {
			display: 'none'
		}
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
					'& > div.tox-toolbar-overlord': {
						//tox-toolbar tox-toolbar--scrolling
						'& > div.tox-toolbar__primary': {
							//tox-toolbar__group
							borderTop: `1px solid #404040 !important`,
							backgroundColor: `#404040 !important`,
							// border-right: none !important;
							'& > div > button.tox-tbtn': {
								// border-right: 1px solid white !important;
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
							}
						}
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
		}
	}
}));
