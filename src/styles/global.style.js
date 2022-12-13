import { makeStyles } from '@material-ui/core';
import theme from '../assets/theme';

export const useStyles = makeStyles(() => ({
	dropZoneContainer: {
		border: `1.5px dashed ${theme.palette.neonYellow}`,
		cursor: 'pointer',
		borderRadius: '1rem'
	},

	borderRed: {
		borderColor: `${theme.palette.red} !important`
	},

	uploadMediaError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		// marginTop: '1rem',
		height: '1rem'
	},
	mediaError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		height: '1rem',
		marginBottom: '1rem',
		marginLeft: '1rem'
	},

	characterCount: {
		marginRight: '0.5rem',
		display: 'flex',
		justifyContent: 'space-between'
	},

	fileRejectionError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		height: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	},

	dragMsg: {
		fontSize: '1.4rem',
		lineHeight: '2.4rem',
		fontWeight: 400,
		...theme.components.preventSelect,
		color: theme.palette.white
	},

	formatMsg: {
		fontSize: '1.2rem',
		lineHeight: '1.6rem',
		fontWeight: 400,
		color: theme.palette.lightGrey,
		...theme.components.preventSelect
		// @include preventSelect,
	},

	addFilesIcon: {
		height: '2rem !important',
		width: '2rem !important',
		marginBottom: '1.5rem',
		color: `${theme.palette.neonYellow} !important`
	},

	dropzone: {
		textAlign: 'center',
		padding: '1.5rem 2.5rem 2rem 1.5rem'
	},

	previewComponent: {
		width: '35%',
		borderLeft: `1px solid ${theme.palette.normalGrey}`,
		marginLeft: '3rem',
		paddingLeft: '3rem',
		marginBottom: '10rem'
	},

	closeIcon: {
		width: '3.2rem !important',
		height: '3.2rem !important',
		marginRight: '0.8rem',
		cursor: 'pointer !important'
	},

	previewHeader: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '10px'
	},
	errorState: {
		color: theme.palette.red
	},

	noErrorState: {
		color: theme.palette.white
	},
	dropBoxUrlContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	},

	video: {
		'&::-webkit-media-controls-fullscreen-button': {
			display: 'none'
		}
	},

	editor: {
		margin: '10px 0px'
	},
	toolTip: {
		backgroundColor: ` ${theme.palette.black} !important`,
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: ' 16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},

	toolTipArrow: {
		color: ` ${theme.palette.black} !important`
	},
	explanationWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: '5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 700,
		lineHeight: '24px'
	},
	contentWrapperNoPreview: {
		//minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	textField: {
		width: '100%'
	},

	// textFieldInput: {
	// 	// ...theme.components.textFieldInput
	// 	// @include textFieldInput,
	// },

	textFieldInputStartAdornment: {
		color: 'white !important',
		border: '0.01px solid #404040',
		padding: ' 1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		fontFamily: 'Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		marginBottom: '1rem',
		backgroundColor: '#000000'
	},

	captionContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
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
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black} !important`,
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
		border: `0.01px solid ${theme.palette.normalGrey}`,
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
		marginBottom: '4rem'
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

	publishDraftDiv: {
		display: 'flex',
		marginRight: '20px'
	},

	previewContentWrapper: {
		//	minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		width: '1000px'
	},

	contentWrapper: {
		//minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	uploadedFilesContainer: {
		marginTop: '4rem',
		maxHeight: '220px',
		overflowY: 'auto',
		// -ms-overflow-style: none, /* Internet Explorer 10+ */
		// scrollbar-width: none, /* Firefox */
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},

	filePreview: {
		padding: '1.5rem 2rem',
		boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
		'&:last-child': {
			boxShadow: 'none'
		}
	},

	filePreviewLeft: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		width: '100%'
	},

	filePreviewRight: {
		display: 'flex',
		alignItems: 'center'
	},

	fileThumbnail: {
		height: '8rem',
		maxWidth: '50%',
		borderRadius: '4px',
		backgroundColor: theme.palette.white
	},

	fileName: {
		fontSize: '1rem',
		maxWidth: '150px',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},

	filePreviewIcons: {
		color: theme.palette.neonYellow,
		fontSize: '2.5rem !important',
		marginLeft: '2rem',
		cursor: 'pointer'
	},

	playIcon: {
		position: 'absolute',
		left: '48px',
		height: '2.5rem !important',
		width: 'auto !important',
		color: theme.palette.neonYellow
	},

	playIconPortrait: {
		position: 'absolute',
		left: '38px',
		height: '2.5rem !important',
		width: 'auto !important',
		color: theme.palette.neonYellow
	},

	loaderContainer: {
		position: 'absolute',
		width: 'calc(100% - 20px)',
		height: '110px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},

	loaderContainer2: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.87)',
		zIndex: 100
	},

	loader: {
		color: `${theme.palette.neonYellow} !important`
	},

	orientation: {
		marginRight: '2rem'
	},

	headerOrientationWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},

	orientationDimensionWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	dimensionWrapper: {
		borderRadius: '8px',
		backgroundColor: theme.palette.normalGrey,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '2px'
	},

	dimensionSingle: {
		borderRadius: '8px',
		padding: '1rem 1rem 0.8rem 1rem'
	},

	dimensionPreviewIcons: {
		color: theme.palette.disabled,
		cursor: 'pointer'
	},

	// ------------- library pages --------------//

	header: {
		display: 'flex',
		justifyContent: 'space-between'
	},

	subheader1: {
		display: 'flex',
		justifyContent: ' flex-start'
	},

	tableContainer: {
		margin: ' 1rem 0rem'
	},

	subheader2: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},

	calendarWrapper: {
		marginLeft: '10px',
		'& button': {
			backgroundColor: 'transparent !important',
			top: '0.5px !important',
			right: '30px !important'
		}
	},
	// date
	customDateInput: {
		// border: '0',
		margin: ' 0',
		display: 'inline-flex',
		// padding: '0',
		position: 'relative',
		minWidth: ' 0',
		// flexDirection: 'column',
		verticalAlign: 'top',
		width: '250px',
		color: 'white !important',
		border: ' 1px solid #404040',
		padding: '1rem 1rem 1.2rem 1rem !important',
		fontSize: '1.4rem !important',
		fontFamily: ' Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		backgroundColor: '#000000',
		borderColor: ' rgb(64, 64, 64)',
		height: '17.5px',
		boxSizing: 'content-box',
		// padding: ' 6px 0 7px',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	//search and error msgs

	searchField: {
		width: '300px'
	},

	searchIcon: {
		cursor: 'pointer',
		marginRight: '8'
	},

	noResultError: {
		color: '#ff355a',
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	},
	sortIcon: {
		position: 'absolute',
		left: '-4px',
		bottom: '1.5px',
		height: '2rem !important',
		width: '2rem !important'
	},

	sortIconSelected: {
		position: 'absolute',
		left: '-4px',
		bottom: '1.5px',
		height: '2rem !important',
		width: ' 2rem !important',
		color: theme.palette.neonYellow
	},

	//pagination

	paginationRow: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'absolute',
		bottom: '0',
		right: '0',
		padding: '1vw 2vw'
	},
	nav: {
		width: 'fit-content'
	},
	gotoText: {
		fontSize: '12px',
		fontWeight: 700,
		margin: '0px 10px'
	},
	gotoInput: {
		background: '#000000',
		color: 'white',
		borderRadius: '8px',
		padding: '6px',
		width: '50px',
		'&:focus': {
			outline: 'none'
		}
	},

	//loader on pages

	libraryLoader: {
		width: '20%',
		height: 'auto'
	},

	//library row edit icon
	editIcon: {
		width: '2.5rem',
		height: 'auto',
		cursor: 'pointer'
	},

	libraryToolTip: {
		backgroundColor: ' #000000 !important',
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: '16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},

	libraryToolTipArrow: {
		color: `#000000 !important`
	},

	//images styling

	mediaIconLandscape: {
		height: '25.131px',
		width: '48px',
		borderRadius: '8px',
		objectFit: 'cover'
	},
	virallandscapePreview: {
		height: 'calc(25.131px * 6)',
		width: 'calc(48px * 6)',
		borderRadius: '8px',
		objectFit: 'cover'
	},
	mediaIconPortrait: {
		height: '48px',
		width: '38.4px',
		borderRadius: '8px',
		objectFit: 'cover'
	},

	mediaIconPortraitPreview: {
		height: 'calc(48px * 6)',
		width: 'calc(38.4px * 6)',
		borderRadius: '8px',
		objectFit: 'cover'
	},

	mediaWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: ' 0.5rem',
		marginBottom: '1.5rem'
	},

	virallandscape: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '0.5rem',
		marginBottom: '2.5rem'
	},

	toolTipPreview: {
		backgroundColor: 'transparent !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},

	libraryFileName: {
		// margin-left: 1rem,
		fontSize: ' 1.2rem'
	},

	noWrapLibraryFileName: {
		fontSize: ' 1.2rem',
		maxWidth: '60%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	labelsWrapper: {
		maxWidth: '60%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	mediaIconPreview: {
		height: 'calc(5rem * 5)',
		//width: calc(5rem * 6),
		maxWidth: 'calc(5rem * 8)',
		borderRadius: '8px',
		objectFit: 'cover'
	},

	mediaIcon: {
		height: '48px',
		width: '48px',
		borderRadius: ' 8px',
		objectFit: 'cover',
		marginRight: '1.5rem'
	},
	libraryPlayIcon: {
		position: 'absolute',
		left: ' 20px',
		top: '26px',
		height: ' 2.5rem !important',
		width: 'auto !important',
		color: '#ffff00'
	},

	textFieldInput: {
		color: ' white !important',
		border: '1px solid #404040',
		padding: '0.5rem 0.5rem 0.5rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		fontFamily: 'Poppins !important',
		backgroundColor: ' #000000'
	},

	rowType: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingLeft: '35px',
		display: 'block',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	// ------- article page

	articleLibrary: {
		height: ' 100vh !important'
	},

	articlOptionRow: {
		marginBottom: '1.5rem',
		fontSize: ' 1.2rem',
		display: 'block'
	},

	row: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingLeft: '35px',
		display: 'block',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	// -------- virals library page

	viralRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingRight: '30px',
		display: 'block',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	viralFileName: {
		fontSize: ' 1.2rem',
		maxWidth: '60%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap !important'
	},

	// ---------- news library

	newsFileName: {
		fontSize: ' 1.2rem',
		maxWidth: '40%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap !important'
	},

	// -------- question library

	active_closed_btn: {
		paddingLeft: '30px',
		marginBottom: ' 1.7rem',
		fontSize: '1.2rem',
		width: '90px',
		height: '24px'
	},

	questionRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem'
	},

	questionRowType: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingLeft: '30px',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},
	questionLocation: { textTransform: 'capitalize !important' },

	// ----- games library

	gamesMediaWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1.5rem',
		maxWidth: '100%',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},

	gamesFileName: {
		marginLeft: '1rem',
		fontSize: '1.2rem',
		whiteSpace: 'nowrap !important'
	},
	gamesRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingLeft: '30px',
		display: 'block'
	},
	gamesTitleRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		display: 'block'
	},

	// media library
	publish_draft_btn: {
		paddingLeft: '20px',
		marginBottom: '1.6rem'
	},

	mediaMediaIcon: {
		height: '48px',
		width: '48px',
		borderRadius: ' 8px',
		objectFit: 'cover'
	},
	mediaMediaWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1.5rem',
		maxWidth: '100%',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	mediaFileName: {
		marginLeft: '1rem',
		fontSize: '1.2rem',
		whiteSpace: 'nowrap !important'
	},
	mediaRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		display: 'block'
	},
	accordionArticleRoot: {
		'& .MuiAccordion-root': {
			backgroundColor: `${theme.palette.black} `,
			color: theme.palette.white
		}
	},

	accordionRoot: {
		'& .MuiAccordion-root': {
			backgroundColor: `${theme.palette.black} `,
			color: theme.palette.white,
			margin: '20px 0px',
			border: `1px solid ${theme.palette.normalGrey}`,
			borderRadius: '6px !important'
		},
		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px',
			backgroundColor: theme.palette.normalGrey,
			borderRadius: '40px'
		},
		'& .MuiTypography-root': {
			fontFamily: 'Poppins',
			fontWeight: '800',
			fontSize: '18px',
			lineHeight: '30px',
			display: 'flex',
			alignItems: 'center'
		}
	}
}));
