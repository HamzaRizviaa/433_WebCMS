import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import LoadingOverlay from 'react-loading-overlay';
import theme from '../../../assets/theme';
import Sidebar from '../DashboardSidebar';
import Topbar from '../DashboardTopbar';
import { useLayoutStyles } from './index.style';
import Four33Loader from '../../../assets/Loader_Yellow.gif';

const DashboardLayout = ({
	title,
	onButtonClick,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false,
	isLoading = false,
	children
}) => {
	const classes = useLayoutStyles();

	return (
		<LoadingOverlay
			active={isLoading}
			spinner={
				<img
					src={Four33Loader}
					className={classes.libraryLoader}
					alt='loader'
				/>
			}
		>
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<Sidebar />
					<div className={classes.contentWrapper}>
						<Topbar
							title={title}
							onButtonClick={onButtonClick}
							hideBtn={hideBtn}
							hideSearchFilter={hideSearchFilter}
							hideDateFilter={hideDateFilter}
						/>
						{children}
					</div>
				</div>
			</ThemeProvider>
		</LoadingOverlay>
	);
};

DashboardLayout.propTypes = {
	title: PropTypes.string.isRequired,
	onButtonClick: PropTypes.func,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.element.isRequired
};

export default DashboardLayout;
