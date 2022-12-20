import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { omit, isEqual } from 'lodash';
import { Grid } from '@material-ui/core';
import { useStyles } from './subComponents.styles';
import DrawerLayout from '../../../layouts/DrawerLayout';
import ArticleElementsSidebar from './elements/ArticleElementsSidebar';
import ArticleInternalForm from './ArticleInternalForm/index';
import ArticlePreviewSidebar from './ArticlePreviewSidebar';
import ArticleFormFooter from './ArticleFormFooter/index';
import { selectSpecificArticleStatus } from '../../../../data/selectors';
import {
	articleFormInitialValues,
	articleFormStatusInitialValues,
	articleUnwantedKeysForDeepEqual
} from '../../../../data/helpers';

const ArticleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const classes = useStyles();
	const topElementRef = useRef(null);
	const elementsWrapperRef = useRef(null);

	const { values, isSubmitting, setStatus } = useFormikContext();

	const specificArticleStatus = useSelector(selectSpecificArticleStatus);

	const isLoading = isSubmitting || specificArticleStatus === 'loading';

	useEffect(() => {
		setStatus({ ...articleFormStatusInitialValues });
	}, []);

	useEffect(() => {
		setStatus({
			dirty: !isEqual(
				omit(values, articleUnwantedKeysForDeepEqual),
				omit(articleFormInitialValues, articleUnwantedKeysForDeepEqual)
			)
		});
	}, [values]);

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={isEdit ? 'Edit Article' : 'Article Builder'}
			notifID={isEdit ? values.id : ''}
			isLoading={isLoading}
			fromArticle
		>
			<Grid container className={classes.articlesGridBox}>
				<Grid className={classes.firstGridItem} item pr={1} md={3}>
					<ArticleElementsSidebar
						topElementRef={topElementRef}
						elementsWrapperRef={elementsWrapperRef}
					/>
				</Grid>
				<Grid className={classes.secondGridItem} item px={1.5} md={6}>
					<ArticleInternalForm
						isEdit={isEdit}
						status={status}
						topElementRef={topElementRef}
						elementsWrapperRef={elementsWrapperRef}
					/>
				</Grid>
				<Grid className={classes.lastGridItem} item md={3}>
					<ArticlePreviewSidebar
						isEdit={isEdit}
						form={values}
						data={values.elements}
					/>
				</Grid>
			</Grid>
			<ArticleFormFooter
				isEdit={isEdit}
				isDraft={status !== 'published'}
				loading={isLoading}
				openDeleteModal={toggleDeleteModal}
				onSubmitHandler={onSubmitHandler}
			/>
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
