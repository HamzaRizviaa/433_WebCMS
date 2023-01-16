export const formatAndStyle = {
	formats: {
		h1: {
			inline: 'span',

			styles: {
				fontWeight: '800',
				fontSize: '64px',
				letterSpacing: '-2%',
				marginBottom: '3px',
				color: 'white',
				fontFamily: 'Poppins'
			}
		},
		h2: {
			inline: 'span',

			styles: {
				fontWeight: '800',
				fontSize: '40px',
				letterSpacing: '-2%',

				color: 'white',
				fontFamily: 'Poppins'
			}
		},
		h3: {
			inline: 'span',

			styles: {
				fontWeight: '800',
				fontSize: '36px',
				letterSpacing: '-2%',
				color: 'white',
				fontFamily: 'Poppins'
			}
		},
		h4: {
			inline: 'span',

			styles: {
				fontWeight: '800',
				fontSize: '24px',
				letterSpacing: '-2%',
				color: 'white',
				fontFamily: 'Poppins'
			}
		},
		subtitle: {
			inline: 'span',

			styles: {
				fontWeight: '600',
				fontSize: '24px',
				color: 'white',
				fontFamily: 'Poppins'
			}
		},
		body_regular: {
			inline: 'span',
			classes: 'previewBodyTexts',
			styles: {
				fontWeight: '400',
				fontSize: '16px',
				lineHeight: '24px'
			}
		},
		body_bold: {
			inline: 'span',
			classes: 'previewBodyTexts',
			styles: {
				fontWeight: '700',
				fontSize: '16px',
				lineHeight: '24px'
			}
		},
		body_small: {
			inline: 'span',
			classes: 'previewBodyTexts',
			styles: {
				fontWeight: '400',
				fontSize: '14px',
				lineHeight: '16px'
			}
		},
		body_tiny: {
			inline: 'span',
			classes: 'previewBodyTexts',
			styles: {
				fontWeight: '500',
				fontSize: '12px',
				lineHeight: '16px',
				letterSpacing: '3%'
			}
		},
		body_boldAndTiny: {
			inline: 'span',
			classes: 'previewBodyTexts',
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
		},
		{
			title: 'Colours',
			items: [
				{
					title: '433 Yellow',
					inline: 'span',
					styles: { color: '#ffff00' }
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
