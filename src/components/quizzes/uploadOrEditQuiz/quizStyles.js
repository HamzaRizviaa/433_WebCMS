import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .TabsListUnstyled-root': {
			width: '100%',
			border: 'none',
			backgroundColor: '#404040',
			borderRadius: '8px',
			padding: '6px 0px'
		},
		'& button': {
			width: '48%',
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
			marginRight: '7px !important',
			marginLeft: '7px !important',
			borderRadius: '4px !important',
			padding: '8px 0px'
		}
	}
}));