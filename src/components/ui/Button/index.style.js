import { makeStyles } from '@material-ui/core';
import theme from '../../../assets/theme';

const btnPaddings = {
	xsmall: '0.865rem',
	small: '0.865rem 2rem',
	medium: '0.865rem 5.9rem',
	large: '0.865rem 6rem',
	xlarge: '1.1rem 8rem'
};

export const useButtonStyles = makeStyles((theme) => {
	const variantToColorMapper = colorMapper(theme.palette);

	return {
		btn: ({
			variant,
			color,
			size,
			fullWidth,
			customPadding,
			isIconButton
		}) => ({
			color: variantToColorMapper[variant][color].color,
			backgroundColor: variantToColorMapper[variant][color].backgroundColor,
			border: `1px solid ${variantToColorMapper[variant][color].borderColor}`,
			position: 'relative',
			textAlign: 'center',
			// marginRight: '1rem',
			height: isIconButton ? 40 : 'fit-content',
			borderRadius: isIconButton ? '50%' : 65,
			padding:
				variant === 'text' || isIconButton
					? 0
					: customPadding || btnPaddings[size],
			cursor: 'pointer',
			whiteSpace: 'nowrap',
			width: isIconButton ? 40 : fullWidth ? '100%' : 'auto',

			...(variant !== 'text' && {
				'&:hover': {
					boxShadow: `0 5px 15px rgba(216, 204, 127, 0.73)`
				}
			})
		}),

		btnSpan: {
			width: '100%',
			fontFamily: 'Poppins',
			fontSize: ({ size }) =>
				size === 'xlarge' || size === 'large' ? '1.4rem' : '1.2rem',
			fontWeight: 800,
			letterSpacing: '0.03em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',

			'& > svg': {
				position: ({ variant, isIconButton }) =>
					variant === 'text' || isIconButton ? 'static' : 'absolute',
				right: 30,
				fill: ({ variant, color, isIconButton }) =>
					isIconButton ? variantToColorMapper[variant][color].color : 'auto',

				'& path': {
					fill: ({ variant, color, isIconButton }) =>
						isIconButton ? variantToColorMapper[variant][color].color : 'auto'
				}
			}
		}
	};
});

function colorMapper(colorPalette) {
	return {
		contained: {
			primary: {
				color: colorPalette.black,
				backgroundColor: colorPalette.neonYellow,
				borderColor: colorPalette.neonYellow
			},
			secondary: {
				color: colorPalette.black,
				backgroundColor: colorPalette.disabled,
				borderColor: colorPalette.disabled
			},
			danger: {
				color: colorPalette.white,
				backgroundColor: colorPalette.red,
				borderColor: colorPalette.red
			}
		},
		outlined: {
			primary: {
				color: colorPalette.white,
				backgroundColor: 'transparent',
				borderColor: colorPalette.neonYellow
			},
			secondary: {
				color: colorPalette.disabled,
				backgroundColor: 'transparent',
				borderColor: colorPalette.disabled
			},
			danger: {
				color: colorPalette.white,
				backgroundColor: 'transparent',
				borderColor: colorPalette.red
			}
		},
		text: {
			primary: {
				color: colorPalette.white,
				backgroundColor: theme.palette.black,
				borderColor: theme.palette.black
			},
			secondary: {
				color: colorPalette.lightGreen,
				backgroundColor: theme.palette.black,
				borderColor: theme.palette.black
			},
			danger: {
				color: colorPalette.red,
				backgroundColor: theme.palette.black,
				borderColor: theme.palette.black
			}
		}
	};
}
