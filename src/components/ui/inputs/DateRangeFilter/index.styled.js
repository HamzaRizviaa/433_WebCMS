import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	customDateInput: {
		margin: ' 0',
		display: 'inline-flex',
		position: 'relative',
		minWidth: ' 0',
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
		height: '17.5px',
		boxSizing: 'content-box',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: (props) => (props.isError ? '#FF355A' : '#404040')
	},
	inputField: {
		whiteSpace: 'pre-wrap',
		display: 'flex',
		alignItems: 'center',
		color: (props) => (props.hasData ? '#fff' : '#808080'),

		'& svg': {
			marginRight: 4
		}
	},
	inputIcon: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
	dateRangePickerWrapper: {
		marginLeft: '10px',
		'& button': {
			backgroundColor: 'transparent !important',
			top: '0.5px !important',
			right: '30px !important'
		}
	},
	noResultError: {
		color: '#ff355a',
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	}
}));
