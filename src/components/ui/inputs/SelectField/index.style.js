import { makeStyles } from '@material-ui/core';

export const useSelectFieldStyles = makeStyles((theme) => ({
	selectFieldContainer: {
		marginBottom: '1rem'
	},

	select: {
		color: 'white !important',
		fontFamily: 'Poppins',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		border: `1px solid ${theme.palette.normalGrey}`,
		borderRadius: 40,
		height: '4.3rem',
		padding: '0 1.5rem',
		borderColor: (props) =>
			props.isError ? theme.palette.red : theme.palette.normalGrey,

		'& svg': {
			display: 'block',
			color: theme.palette.neonYellow,
			right: '1rem !important',
			top: '0 !important',
			fontSize: '3.5rem'
		}
	},

	selectOption: {
		fontFamily: 'Poppins !important',
		fontSize: '14px',

		'&:hover': {
			color: theme.palette.neonYellow
		}
	},

	paper: {
		background: theme.palette.black,
		border: `1px solid ${theme.palette.normalGrey}`,
		boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
		borderRadius: '8px',
		color: '#ffffff',
		fontSize: '14px',
		fontFamily: 'Poppins !important',
		marginTop: 10,
		borderColor: (props) =>
			props.isError ? theme.palette.red : theme.palette.normalGrey,

		'& ul': {
			padding: 0,

			'& .Mui-selected': {
				color: theme.palette.neonYellow
			}
		},
		'& li': {
			backgroundColor: theme.palette.black,
			color: theme.palette.white,
			fontSize: 14,
			'&:hover': {
				color: `${theme.palette.neonYellow} !important`,
				backgroundColor: `${theme.palette.normalGrey} !important`,
				cursor: 'pointer'
			}
		}
	},

	input: {
		color: (props) =>
			props.hasValue ? theme.palette.white : theme.palette.disabled,
		'&:hover': {
			boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)'
		},

		'& svg': {
			position: 'absolute',
			color: theme.palette.neonYellow,
			right: '12px !important',
			top: '-7px !important',
			fontSize: '2.6rem'
		}
	},

	noResultText: {
		color: theme.palette.disabled,
		fontSize: 14
	}
}));
