import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import SlideMaterial from '@material-ui/core/Slide';
import { useStyles } from './index.style';

const ArticleSlider = () => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={true}>
			<SlideMaterial
				direction='left'
				mountOnEnter
				in={true}
				unmountOnExit
				timeout={800}
			>
				<Paper elevation={4} className={classes.paper}></Paper>
			</SlideMaterial>
		</Backdrop>
	);
};

export default ArticleSlider;
