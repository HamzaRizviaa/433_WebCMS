import { makeStyles } from '@material-ui/core';
// import theme from '../assets/theme';

export const useStyles = makeStyles(() => ({
	previewWrapper: {
		height: '812px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
		// padding: '5px 10px'
	},
	backgroundSet: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	topIcons: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '2px',
		marginTop: '4px'
	},
	topMobileIcons: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '2px',
		height: '20px'
	},
	mobileTopBars: { display: 'flex', padding: '2px 4px' },
	mobileIcons: { marginLeft: '3px', height: '10px' },

	icons: {
		width: '40px',
		height: '40px',
		background: 'rgba(64, 64, 64, 0.4)',
		borderRadius: '40px',
		display: 'flex',
		justifyContent: 'center'
	},
	navIcons: {
		width: '48px',
		height: '48px',
		background: 'rgba(64, 64, 64, 0.4)',
		borderRadius: '48px',
		display: 'flex',
		justifyContent: 'center'
	},
	goBackIcon: {
		height: '24px',
		marginLeft: '-6px',
		paddingTop: '10px'
	},
	shareIcon: { height: '32px', paddingTop: '7px' },

	bottomIcons: {
		display: 'flex',
		padding: '2px'
	},
	footballIcon: {
		width: '20px',
		height: '20px',
		padding: '11px 0px'
	},
	commentIcon: {
		width: '24px',
		height: '24px',
		padding: '8px 0px 10px 0px'
	},
	commentbox: {
		marginLeft: '5px'
	},
	subCatText: {
		fontWeight: 700,
		fontSize: '12px',
		lineHeight: '16px',
		textTransform: 'uppercase',
		margin: '10px 0px'
	},
	mainTitle: {
		fontWeight: 800,
		fontSize: '24px',
		lineHeight: '54px',
		color: 'white',
		overflowWrap: 'anywhere'
	},
	authordetails: {
		display: 'flex',
		padding: '2px',
		marginTop: '20px'
	},
	authorname: {
		fontWeight: 700,
		fontSize: '16px',
		lineHeight: '24px'
	},
	postDateDetails: {
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px'
	},
	authorSection: {
		marginLeft: '5px',
		color: 'white'
	},
	description: {
		marginTop: '10px',
		padding: '2px',
		color: 'white',
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px'
	}
}));
