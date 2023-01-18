import React from 'react';
import Four33Loader from '../../../../assets/Loader_Yellow.gif';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const PrimaryLoader = ({
	children,
	loading = false,
	mainPage = false,
	secondary = false,
	opaqueBackground = false,
	fullHeight = false
}) => {
	const classes = useStyles({
		loading,
		mainPage,
		secondary,
		opaqueBackground,
		fullHeight
	});

	return (
		<div className={classes.backdrop}>
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
	children: PropTypes.element,
	loading: PropTypes.bool.isRequired,
	mainPage: PropTypes.bool,
	secondary: PropTypes.bool,
	opaqueBackground: PropTypes.bool,
	fullHeight: PropTypes.bool
};

export default PrimaryLoader;
