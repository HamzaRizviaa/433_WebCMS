import { makeStyles } from '@material-ui/core';

const sizeMapper = {
	small: {
		height: '2.4rem !important',
		borderRadius: '2rem',
		top: '1px !important'
	},
	medium: {
		height: '3rem !important',
		borderRadius: '3rem',
		top: '5px !important'
	},
	large: {
		height: '3.74rem !important',
		borderRadius: '5rem',
		top: '9px !important'
	}
};

export const useSelectStyles = makeStyles((theme) => ({
	selectFieldContainer: {
		marginBottom: '1rem'
	},

	select: ({ isError, isDisabled, size }) => ({
		display: 'flex',
		alignItems: 'center',
		color: 'white !important',
		fontFamily: 'Poppins',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		border: `1px solid ${theme.palette.normalGrey}`,
		borderRadius: sizeMapper[size]?.borderRadius || 40,
		padding: '0 1.5rem',
		backgroundColor: isDisabled ? theme.palette.normalGrey : 'transparent',
		borderColor: isError ? theme.palette.red : theme.palette.normalGrey,

		'& svg': {
			display: 'block',
			color: `${
				isDisabled ? theme.palette.disabled : theme.palette.neonYellow
			} !important`,
			right: '1rem !important',
			top: sizeMapper[size]?.top || '5px !important',
			fontSize: '3.5rem !important'
		}
	}),

	selectOption: {
		fontFamily: 'Poppins !important',
		fontSize: '14px',

		'&:hover': {
			color: theme.palette.neonYellow
		}
	},

	paper: {
		maxWidth: 'min-content',
		maxHeight: 170,
		background: theme.palette.black,
		border: `1px solid ${theme.palette.normalGrey}`,
		boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
		borderRadius: '8px',
		color: '#ffffff',
		fontSize: '14px',
		fontFamily: 'Poppins !important',
		marginTop: 10,
		borderColor: ({ isError }) =>
			isError ? theme.palette.red : theme.palette.normalGrey,

		'& ul': {
			padding: 0,

			'& .Mui-selected': {
				color: theme.palette.neonYellow
			}
		},

		'& li': {
			backgroundColor: theme.palette.black,
			color: theme.palette.white,
			whiteSpace: 'pre-wrap',
			fontSize: 14,

			'&:hover': {
				color: `${theme.palette.neonYellow} !important`,
				// backgroundColor: `${theme.palette.normalGrey} !important`,
				cursor: 'pointer'
			}
		}
	},

	input: {
		display: 'flex',
		alignItems: 'center',
		height: ({ size }) => sizeMapper[size]?.height || 'auto',
		color: ({ hasValue }) =>
			hasValue ? theme.palette.white : theme.palette.disabled,

		'&:hover': {
			boxShadow: ({ isDisabled }) =>
				isDisabled ? 'none' : '0px 16px 40px rgba(255, 255, 255, 0.16)'
		},

		'&.Mui-disabled': {
			backgroundColor: theme.palette.normalGrey,
			borderRadius: 10
		},

		'& svg': {
			position: 'absolute',
			color: `${theme.palette.neonYellow} !important`,
			right: '12px !important',
			top: '-7px !important',
			fontSize: '2.6rem'
		}
	},

	noOptionsText: {
		color: `${theme.palette.disabled} !important`,
		fontSize: 14,
		pointerEvents: 'none',
		cursor: 'default',
		padding: '14px'
	}
}));
