import { makeStyles } from '@material-ui/core';

export const useDrawerLayoutStyles = makeStyles(() => ({
	contentWrapper: ({ showPreview }) => ({
		position: 'relative',
		display: 'flex',
		width: showPreview ? '1000px' : 'unset',
		flexDirection: showPreview ? 'row' : 'column',
		justifyContent: showPreview ? 'flex-start' : 'space-between'
	}),

	contentChildrenWrapper: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: ({ showPreview }) => (showPreview ? '60%' : 'auto')
	}
}));
