const getFontSize = (key) => {
	const textSize = {
		h1: '64px',
		h2: '40px',
		h3: '36px',
		h4: '24px',
		sub: '24px'
	};
	return textSize[key];
};
export const getTextStyle = (heading) => {
	return {
		fontWeight: heading === 'sub' ? '600' : '800',
		fontSize: getFontSize(heading),
		letterSpacing: '-2%',
		marginBottom: heading === 'h1' ? '3px' : 0
	};
};

export const titleFormats = {
	h1: {
		inline: 'span',
		styles: getTextStyle('h1')
	},
	h2: {
		inline: 'span',
		styles: getTextStyle('h2')
	},
	h3: {
		inline: 'span',
		styles: getTextStyle('h3')
	},
	h4: {
		inline: 'span',
		styles: getTextStyle('h4')
	},
	subtitle: {
		inline: 'span',
		styles: getTextStyle('sub')
	}
};

export const titleStyleFormats = {
	title: 'Title',
	items: [
		{
			title: 'Header 1',
			format: titleFormats.h1
		},
		{
			title: 'Header 2',
			format: titleFormats['h2']
		},
		{
			title: 'Header 3',
			format: titleFormats['h3']
		},
		{
			title: 'Header 4',
			format: titleFormats['h4']
		},
		{
			title: 'Subtitle',
			format: titleFormats['subtitle']
		}
	]
};

export const formatAndStyle = {
	formats: {
		h1: {
			inline: 'span',
			styles: {
				fontWeight: '800',
				fontSize: '64px',
				letterSpacing: '-2%',
				marginBottom: '3px'
			}
		},
		h2: {
			inline: 'span',
			styles: {
				fontWeight: '800',
				fontSize: '40px',
				letterSpacing: '-2%'
			}
		},
		h3: {
			inline: 'span',
			styles: {
				fontWeight: '800',
				fontSize: '36px',
				letterSpacing: '-2%'
			}
		},
		h4: {
			inline: 'span',
			styles: {
				fontWeight: '800',
				fontSize: '24px',
				letterSpacing: '-2%'
			}
		},
		subtitle: {
			inline: 'span',
			styles: {
				fontWeight: '600',
				fontSize: '24px'
			}
		},
		body_regular: {
			inline: 'span',
			styles: {
				fontWeight: '400',
				fontSize: '16px',
				lineHeight: '24px'
			}
		},
		body_bold: {
			inline: 'span',
			styles: {
				fontWeight: '700',
				fontSize: '16px',
				lineHeight: '24px'
			}
		},
		body_small: {
			inline: 'span',
			styles: {
				fontWeight: '400',
				fontSize: '14px',
				lineHeight: '16px'
			}
		},
		body_tiny: {
			inline: 'span',
			styles: {
				fontWeight: '500',
				fontSize: '12px',
				lineHeight: '16px',
				letterSpacing: '3%'
			}
		},
		body_boldAndTiny: {
			inline: 'span',
			styles: {
				fontWeight: '700',
				fontSize: '12px',
				lineHeight: '16px',
				letterSpacing: '3%'
			}
		}
	},
	style_formats: [
		{
			title: 'Title',
			items: [
				{
					title: 'Header 1',
					format: 'h1'
				},
				{
					title: 'Header 2',
					format: 'h2'
				},
				{
					title: 'Header 3',
					format: 'h3'
				},
				{
					title: 'Header 4',
					format: 'h4'
				},
				{
					title: 'Subtitle',
					format: 'subtitle'
				}
			]
		},
		{
			title: 'Body',
			items: [
				{
					title: 'Regular',
					format: 'body_regular'
				},
				{
					title: 'Bold',
					format: 'body_bold'
				},
				{
					title: 'Small',
					format: 'body_small'
				},
				{
					title: 'Tiny',
					format: 'body_tiny'
				},
				{
					title: 'Bold and Tiny',
					format: 'body_boldAndTiny'
				}
			]
		}
	]
};

export const Menu = {
	edit: {
		title: 'Edit',
		items: 'undo redo | cut copy paste  | searchreplace'
	},
	insert: {
		title: 'Insert',
		items: ' hr insertdatetime'
	},
	format: {
		title: 'Format',
		items: ' underline strikethrough | formats  align lineheight  '
	}
};
