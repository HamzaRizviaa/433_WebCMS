import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import SlideMaterial from '@material-ui/core/Slide';
import classes from './_slide.scss';

const Slide = () => {
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

export default Slide;
