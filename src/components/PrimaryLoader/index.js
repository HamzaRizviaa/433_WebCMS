import React from 'react';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import classes from './_primaryLoader.module.scss';

const PrimaryLoader = () => {
	return (
		<div className={classes.loaderContainer}>
			<img src={Four33Loader} className={classes.loader} />
		</div>
	);
};

export default PrimaryLoader;
