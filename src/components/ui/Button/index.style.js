import { makeStyles } from '@material-ui/core';

const btnPaddings = {
	small: '1rem 1rem',
	medium: '1rem 5rem',
	large: '2% 6% 2% 38%'
};

export const useButtonStyles = makeStyles((theme) => {
	const variantToColorMapper = colorMapper(theme.palette);

	return {
		btn: ({ variant, state, size, fullWidth, icon }) => ({
			color: variantToColorMapper[variant][state].color,
			backgroundColor: variantToColorMapper[variant][state].backgroundColor,
			border: `1px solid ${variantToColorMapper[variant][state].borderColor}`,
			textAlign: 'center',
			fontSize: '1.2rem',
			fontWeight: 800,
			letterSpacing: '0.03em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: icon ? 'space-between' : null,
			margin: '0 1rem 0 0',
			height: 'fit-content',
			borderRadius: 65,
			padding: btnPaddings[size],
			cursor: 'pointer',
			whiteSpace: 'nowrap',
			width: fullWidth ? '100%' : 'auto',

			'&:hover': {
				boxShadow: `0 5px 15px rgba(216, 204, 127, 0.73)`
			}
		})
	};
});

function colorMapper(colorPalette) {
	return {
		contained: {
			active: {
				color: colorPalette.black,
				backgroundColor: colorPalette.neonYellow,
				borderColor: colorPalette.neonYellow
			},
			disabled: {
				color: colorPalette.black,
				backgroundColor: colorPalette.disabled,
				borderColor: colorPalette.disabled
			}
		},
		outlined: {
			active: {
				color: colorPalette.white,
				backgroundColor: 'transparent',
				borderColor: colorPalette.neonYellow
			},
			disabled: {
				color: colorPalette.disabled,
				backgroundColor: 'transparent',
				borderColor: colorPalette.disabled
			}
		},
		text: {
			active: {
				color: colorPalette.black,
				backgroundColor: colorPalette.neonYellow,
				borderColor: colorPalette.neonYellow
			},
			disabled: {
				color: colorPalette.black,
				backgroundColor: colorPalette.lightGreen,
				borderColor: colorPalette.lightGreen
			}
		}
	};
}
