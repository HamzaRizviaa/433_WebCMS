import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
	createTheme({
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: '#000000',
						color: '#ffffff'
					}
				}
			}
		},
		palette: {
			primary: {
				main: '#000000',
				black: '#000000',
				white: '#ffffff'
			}
		},
		typography: {
			fontFamily: ['Poppins', 'sans-serif'].join(','),
			h1: {
				fontSize: 48
			}
		},
		overrides: {}
	})
);

export default theme;
