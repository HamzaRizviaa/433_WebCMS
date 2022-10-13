import { makeStyles } from '@material-ui/core';

const btnPaddings = {
	small: '0.5rem 4rem',
	medium: '1rem 6rem',
	large: '1.5 8rem'
};

export const useButtonStyles = makeStyles((theme) => {
	const variantToColorMapper = colorMapper(theme.palette);

	return {
		btn: ({ variant, state, size, fullWidth }) => ({
			color: variantToColorMapper[variant][state].color,
			backgroundColor: variantToColorMapper[variant][state].backgroundColor,
			border: `1px solid ${variantToColorMapper[variant][state].backgroundColor}`,
			textAlign: 'center',
			fontAize: '1.2rem',
			fontWeight: 800,
			letterSpacing: '0.03em',
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
				backgroundColor: colorPalette.lightGreen,
				borderColor: colorPalette.lightGreen
			}
		}
	};
}
