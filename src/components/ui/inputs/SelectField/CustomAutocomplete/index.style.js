import { makeStyles } from '@material-ui/core';

const sizeMapper = {
	small: {
		height: '0.5rem',
		borderRadius: 22
	},
	medium: {
		height: '0.9rem',
		borderRadius: 22
	},
	large: {
		height: '1.64rem',
		borderRadius: 30
	}
};

export const useAutocompleteStyles = makeStyles((theme) => ({
	selectFieldContainer: {
		marginBottom: '1rem'
	},

	paper: {
		maxHeight: 170,
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
				// backgroundColor: `${theme.palette.normalGrey} !important`,
				cursor: 'pointer'
			}
		}
	},

	input: {
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		fontFamily: 'Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: ({ size }) => sizeMapper[size]?.borderRadius || '22px',
		backgroundColor: theme.palette.black,
		borderColor: ({ isError }) =>
			isError ? theme.palette.red : theme.palette.normalGrey,

		'& > input': {
			height: ({ size }) => sizeMapper[size]?.height || 'auto',
			padding: 0
		},

		'& > input::placeholder': {
			color: ({ isDisabled }) => (isDisabled ? theme.palette.disabled : 'unset')
		},

		'&:hover': {
			boxShadow: ({ isDisabled }) =>
				isDisabled ? 'none' : '0px 16px 40px rgba(255, 255, 255, 0.16)'
		},

		'&.Mui-disabled': {
			backgroundColor: theme.palette.normalGrey,
			color: theme.palette.lightGrey
		},

		'& svg': {
			position: 'absolute',
			color: `${theme.palette.neonYellow} !important`,
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
