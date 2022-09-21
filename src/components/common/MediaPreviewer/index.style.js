import { makeStyles } from '@material-ui/core';

export const useMediaPreviewerStyle = makeStyles((theme) => ({
	mediaWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: ' 0.5rem',
		marginBottom: (props) => (props.isLandscape ? '2.5rem' : '1.5rem')
	},
	mediaIcon: {
		height: '48px',
		width: '48px',
		borderRadius: ' 8px',
		objectFit: 'contain',
		marginRight: '1.5rem'
	},
	mediaIconPreview: (props) => ({
		height: props.isLandscape
			? 'calc(25.131px * 6)'
			: props.isPortrait
			? 'calc(48px * 6)'
			: 'calc(5rem * 5)',
		maxWidth: props.isLandscape
			? 'calc(48px * 6)'
			: props.isPortrait
			? 'calc(38.4px * 6)'
			: 'calc(5rem * 8)',
		borderRadius: '8px',
		objectFit: 'cover'
	}),
	toolTipPreview: {
		backgroundColor: 'transparent !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},
	mediaPlayIcon: {
		position: 'absolute',
		left: ' 20px',
		top: '26px',
		height: ' 2.5rem !important',
		width: 'auto !important',
		color: '#ffff00'
	},
	fileNameToolTip: {
		backgroundColor: `${theme.palette.black} !important`,
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: '16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},
	fileNameToolTipArrow: {
		color: `${theme.palette.black} !important`
	},
	mediaFileName: {
		fontSize: ' 1.2rem',
		maxWidth: '60%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap !important'
	},
	slidesIcon: { marginRight: '10px', height: '20px', width: '20px' }
}));
