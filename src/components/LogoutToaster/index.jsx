import * as React from 'react';
import { useStyles } from './LogoutToaster.style';
import { toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import PropTypes from 'prop-types';
// import { ToastContainer } from 'react-toastify';

const LogoutToaster = ({ text, enabled }) => {
	const classes = useStyles();
	const navigate = useNavigate();

	return (
		<>
			{toast.warning(text, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				onClose: () => {
                    enabled(false);
					localStorage.removeItem('user_data');
					localStorage.removeItem('token_expire_time');
					navigate('/sign-in');
				},
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Flip,
				icon: () => <img src={Four33Loader} className={classes.loaderAlert} />,
				className: `${classes.toasterWrapper}`,
				bodyClassName: `${classes.toastBody}`
			})}
		</>
	);
};

LogoutToaster.propTypes = {
	text: PropTypes.string,
	enabled: PropTypes.func
};

export default LogoutToaster;
