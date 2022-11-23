import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: ({ type, hideTabsHead }) => ({
		'& .TabsListUnstyled-root': {
			width: type === 'questions' ? '98%' : '70%',
			border: 'none',
			backgroundColor: '#404040',
			borderRadius: '8px',
			padding: '6px 5px',
			marginTop: '2.5rem',
			marginBottom: '2rem',
			display: hideTabsHead ? 'none' : 'flex',
			justifyContent: 'space-between'
		},
		'& .TabUnstyled-root': {
			width: '49%',
			cursor: 'pointer',
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
			// marginRight: '4px !important',
			// marginLeft: '4px !important',
			borderRadius: '4px !important',
			padding: '8px 0px'
		}
	})
}));
