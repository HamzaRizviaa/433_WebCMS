import React from 'react';
import Four33Loader from '../../../../assets/Loader_Yellow.gif';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const PrimaryLoader = ({ loading, children, mainPage, secondary }) => {
	const classes = useStyles({ loading, mainPage, secondary });

	return (
		<div className={secondary ? classes.secondaryBackdrop : classes.backdrop}>
			{loading && (
				<div className={classes.loaderContainer}>
					<img src={Four33Loader} className={classes.loader} />
				</div>
			)}
			{children}
		</div>
	);
};

PrimaryLoader.propTypes = {
	loading: PropTypes.bool.isRequired,
	children: PropTypes.element,
	mainPage: PropTypes.bool,
	secondary: PropTypes.bool
};

export default PrimaryLoader;
