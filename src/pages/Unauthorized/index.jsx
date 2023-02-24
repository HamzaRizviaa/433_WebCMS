import React from 'react';
import { unauthorizedStyles } from './Unauthorized.style';
import BackgroundGIF from '../../assets/you shall not pass.gif';
import { DeniedError } from '../../assets/svg-icons';

const Unauthorized = () => {
	const classes = unauthorizedStyles();
	return (
		<>
			<div className={classes.wrapper}>
				<img className={classes.gif} src={BackgroundGIF} />
				<div className={classes.modal}>
					<span className={classes.deniedSpan}>
						<DeniedError className={classes.deniedIcon} />
						Access Denied
					</span>
					<p>
						You don’t have permission to access this page. Please contact an
						Admin to grant you access
					</p>
				</div>
			</div>
		</>
	);
};

export default Unauthorized;
