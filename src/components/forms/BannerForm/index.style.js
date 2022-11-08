import { makeStyles } from '@material-ui/core/styles';

export const useBannerFormStyles = makeStyles(() => ({
	contentTypeWrapper: {
		display: 'flex',
		// justifyContent: 'space-between',
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
		marginTop: '7px'
	},
	fieldWrapper: {
		width: '70%'
	}
}));
