import React from 'react';
import Four33Loader from '../../../../assets/Loader_Yellow.gif';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const CustomPrimaryLoader = ({ loading, children, mainPage }) => {
    const classes = useStyles({ loading, mainPage });
    return(
        <div className={classes.backdrop}>
            {loading &&
            <div className={classes.loaderContainer}>
			    <img src={Four33Loader} className={classes.loader} />
		    </div>
            }
            {children}
        </div>
    )
}

CustomPrimaryLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    mainPage: PropTypes.bool.isRequired
}

export default CustomPrimaryLoader