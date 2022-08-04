import React from 'react';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const SecondaryLoader = ({ loading }) => {
	const classes = useStyles();
	return (
		<div className={classes.loaderContainer}>
			{loading ? <img src={Four33Loader} className={classes.loader} /> : <></>}
		</div>
	);
};
SecondaryLoader.propTypes = {
	loading: PropTypes.bool.isRequired
};
export default SecondaryLoader;
