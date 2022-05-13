import React from 'react';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import { useStyles } from './index.style';

const PrimaryLoader = () => {
	const classes = useStyles();

	return (
		<div className={classes.loaderContainer}>
			<img src={Four33Loader} className={classes.loader} />
		</div>
	);
};

export default PrimaryLoader;
