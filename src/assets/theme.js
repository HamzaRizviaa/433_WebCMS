import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#000000',
					// color: '#ffffff',
					margin: '1rem',
					lineHeight: 1.4
					// fontFamily: `['Poppins', 'sans-serif'].join(',') !important`
				}
			}
		},
		textFieldInput: {
			color: '#ffffff',
			border: ' 0.01px solid #404040',
			padding: '1rem 1rem 1rem 1.5rem !important',
			fontSize: '1.4rem !important',
			fontFamily: 'Poppins !important',
			lineHeight: '1.6 !important',
			borderRadius: '22px',
			marginBottom: '1rem',
			backgroundColor: '#000000',
			'& svg': {
				position: 'absolute',
				color: '#ffff00',
				right: '2rem !important',
				top: '-9px !important',
				fontSize: '3rem'
			}
		},
		preventSelect: {
			userSelect: 'none !important'
		},
		textFieldInputStartAdornment: {
			color: 'white !important',
			border: '0.01px solid #404040',
			padding: ' 1rem 1rem 1rem 1.5rem !important',
			fontSize: '1.4rem !important',
			fontFamily: 'Poppins !important',
			lineHeight: '1.6 !important',
			borderRadius: '40px',
			marginBottom: '1rem',
			backgroundColor: '#000000'
		}
	},
	palette: {
		primary: {
			main: '#000000'
		},
		black: '#000000',
		white: '#ffffff',
		neonYellow: '#ffff00',
		normalGrey: '#404040',
		lightGrey: '#c4c4c4',
		lightGreen: '#00d87d',
		disabled: '#808080',
		red: '#ff355a',
		orange: '#f68216',
		green: '#00D87D',
		pink: '#ffc0cb',
		black90: '#1A1A1A',
		black80: '#333333',
		purple: '#9581FF'
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		h1: {
			fontSize: 48
		}
	},
	overrides: {}
});

export default theme;
