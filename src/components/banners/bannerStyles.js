import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .MuiAutocomplete-endAdornment': {
			//display: 'none !important'
		}
	}
}));
export const useStyles2 = makeStyles(() => ({
	root: {
		'& .Mui-focused': {
			display: 'none !important'
			//outline: 'none !important'
		}
	}
}));
