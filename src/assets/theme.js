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
				}
			}
		}
	},
	palette: {
		primary: {
			main: '#000000'
		},
		black: '#000000',
		white: '#ffffff',
		neonYellow: '#ffff00',
		grey: '#404040',
		lightGrey: '#c4c4c4',
		lighrGreen: '#00d87d',
		disabled: '#808080',
		red: '#ff355a'
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
