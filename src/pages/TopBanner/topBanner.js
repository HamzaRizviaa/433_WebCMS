import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .TabsListUnstyled-root': {
			width: '35%',
			border: 'none',
			backgroundColor: '#404040',
			borderRadius: '8px',
			padding: '6px 0px',
			marginTop: '2.5rem',
			marginBottom: '2rem'
		},
		'& button': {
			width: '49%',
			backgroundColor: '#404040',
			color: '#ffffff !important',
			border: 'none !important',
			fontFamily: 'Poppins',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '12px',
			lineHeight: '16px',
			textTransform: 'capitalize'
		},
		' & .Mui-selected': {
			color: '#000000 !important',
			border: 'none !important',
			backgroundColor: '#ffff00 !important',
			marginRight: '4px !important',
			marginLeft: '4px !important',
			borderRadius: '4px !important',
			padding: '8px 0px'
		}
	}
}));
