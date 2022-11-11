import { makeStyles } from '@material-ui/core/styles';

export const useBannerFormStyles = makeStyles(() => ({
	contentTypeWrapper: {
		display: 'flex',
		width: '52%',
		marginLeft: '22px'
	},
	bannerLabel: {
		width: '30%',
		fontFamily: 'Poppins',
		fontSize: '12px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px',
		textTransform: 'uppercase',
		marginTop: '10px'
	},
	fieldWrapper: {
		width: '70%'
	},
	bannertext: {
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		letterSpacing: '0em',
		textAlign: 'left',
		paddingRight: '24px',
		width: '100px',
		display: 'flex',
		alignItems: 'center'
	},
	bannerAndTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bannerMain: {
		width: '96%',
		maxHeight: 'calc(100vh - 200px)',
		overflowY: 'auto',
		paddingRight: '30px'
	},
	publishButton: {
		textTransform: 'uppercase',
		marginTop: '3rem',
		width: '100%',
		marginBottom: '4rem'
	}
}));
