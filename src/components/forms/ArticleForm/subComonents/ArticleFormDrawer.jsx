/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { Grid } from '@mui/material';
import { useStyles } from './subComponents.styles';
import DrawerLayout from '../../../layouts/DrawerLayout';
import ArticleElementsSidebar from './ArticleElementsSidebar';
import ArticleInternalForm from './ArticleInternalForm/index';
import ArticlePreviewSidebar from './ArticlePreviewSidebar';
import ArticleFormFooter from './ArticleFormFooter';
import { selectSpecificArticleStatus } from '../../../../data/selectors';

const ArticleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const classes = useStyles();
	const { values, isSubmitting } = useFormikContext();
	const specificArticleStatus = useSelector(selectSpecificArticleStatus);

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={isEdit ? 'Edit Article' : 'Article Builder'}
			notifID={isEdit ? values.id : ''}
			isLoading={isSubmitting || specificArticleStatus === 'loading'}
			fromArticle
		>
			<Grid container>
				<Grid className={classes.firstGridItem} item pr={1} md={3}>
					<ArticleElementsSidebar />
				</Grid>
				<Grid className={classes.secondGridItem} item px={1.5} md={6}>
					<ArticleInternalForm />
				</Grid>
				<Grid className={classes.lastGridItem} item md={3}>
					<ArticlePreviewSidebar
						isEdit={isEdit}
						form={values}
						data={values.elements}
					/>
				</Grid>
			</Grid>
			<ArticleFormFooter />
		</DrawerLayout>
	);
};

ArticleFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ArticleFormDrawer;
