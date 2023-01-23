import React, { useEffect, useRef, useState } from 'react';
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
import ArticleBuilderFooter from './footers/ArticleBuilderFooter';
import ArticleTemplateFooter from './footers/ArticleTemplateFooter';
import {
	getRules,
	selectSpecificArticle,
	selectSpecificArticleStatus
} from '../../../../data/selectors';
import {
	articleFormStatusInitialValues,
	articleFormInitialValues,
	articleTemplateFormInitialValues,
	articleUnwantedKeysForDeepEqual,
	articleTemplateUnwantedKeysForDeepEqual
} from '../../../../data/helpers';
import {
	getArticleBuilderDrawerTitle,
	getArticleTemplateDrawerTitle
} from '../../../../data/utils/articleUtils';
import useSchedulerHandlers from '../../../../hooks/useSchedulerHandlers';
import SchedulerPopup from '../../../common/SchedulerPopup';

const ArticleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	selectedOption,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const [schedularModalState, setSchedulerModalState] = useState(false);
	const classes = useStyles();
	const topElementRef = useRef(null);
	const elementsWrapperRef = useRef(null);

	const specificArticle = useSelector(selectSpecificArticle);

	const closeSchedulerModal = () => setSchedulerModalState(false);
	const openSchedulerModal = () => setSchedulerModalState(true);

	const { values, isSubmitting, setStatus } = useFormikContext();

	const specificArticleStatus = useSelector(selectSpecificArticleStatus);
	const { rules } = useSelector(getRules);

	const isLoading = isSubmitting || specificArticleStatus === 'loading';

	useEffect(() => {
		setStatus({ ...articleFormStatusInitialValues });
	}, []);

	useEffect(() => {
		const unwantedKeysForDE =
			selectedOption === 'article'
				? articleUnwantedKeysForDeepEqual
				: articleTemplateUnwantedKeysForDeepEqual;

		const initialValues =
			selectedOption === 'article'
				? articleFormInitialValues(rules)
				: articleTemplateFormInitialValues(rules);

		setStatus({
			dirty: !isEqual(
				omit(values, unwantedKeysForDE),
				omit(initialValues, unwantedKeysForDE)
			)
		});
	}, [values, selectedOption]);

	const { handleRemoveSchedule, handleScheduleConfirm } = useSchedulerHandlers({
		onSubmitHandler,
		closeSchedulerModal
	});

	const initialScheduledDate = specificArticle?.is_scheduled
		? specificArticle?.schedule_date
		: '';

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={
				selectedOption === 'article'
					? getArticleBuilderDrawerTitle(isEdit)
					: getArticleTemplateDrawerTitle(isEdit)
			}
			notifID={isEdit ? values.id : ''}
			isLoading={isLoading}
			fromArticle
		>
			<SchedulerPopup
				open={schedularModalState}
				onClose={closeSchedulerModal}
				onConfirm={handleScheduleConfirm}
				onRemove={handleRemoveSchedule}
				initialStartDate={initialScheduledDate}
				isScheduled={values.is_scheduled}
				isSubmitting={isSubmitting}
			/>
			<Grid container className={classes.articlesGridBox}>
				<Grid className={classes.firstGridItem} item pr={1} md={3}>
					<ArticleElementsSidebar
						selectedOption={selectedOption}
						topElementRef={topElementRef}
						elementsWrapperRef={elementsWrapperRef}
					/>
				</Grid>
				<Grid className={classes.secondGridItem} item px={1.5} md={6}>
					<ArticleInternalForm
						isEdit={isEdit}
						status={status}
						selectedOption={selectedOption}
						topElementRef={topElementRef}
						elementsWrapperRef={elementsWrapperRef}
						openSchedulerModal={openSchedulerModal}
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
			{selectedOption === 'article' && (
				<ArticleBuilderFooter
					isEdit={isEdit}
					isDraft={status !== 'published'}
					loading={isLoading}
					openDeleteModal={toggleDeleteModal}
					onSubmitHandler={onSubmitHandler}
					openSchedulerModal={openSchedulerModal}
				/>
			)}
			{selectedOption === 'template' && (
				<ArticleTemplateFooter
					isEdit={isEdit}
					loading={isLoading}
					openDeleteModal={toggleDeleteModal}
					onSubmitHandler={onSubmitHandler}
				/>
			)}
		</DrawerLayout>
	);
};

ArticleFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ArticleFormDrawer;
