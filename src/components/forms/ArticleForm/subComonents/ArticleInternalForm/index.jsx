import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import { Box } from '@mui/material';

import ArticleTemplateInfoForm from './ArticleTemplateInfoForm';
import ArticleGeneralInfoForm from './ArticleGeneralInfoForm';
import ArticleElementsFieldArray from '../elements/ArticleElementsFieldArray';
import AdvancedSettingsForm from '../../../common/AdvancedSettingsForm';
import { useLazyGetMatchesTreeQuery } from '../../../../../data/features/articleLibrary/articleLibrary.query';
import { resetSpecificArticleTemplate } from '../../../../../data/features/articleLibrary/articleLibrarySlice';
import { articleFormInitialValues } from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';
import { resetSpecificArticle } from '../../../../../data/features/articleLibrary/articleLibrarySlice';
import { useStyles } from '../subComponents.styles';
import ScheduledInfoBox from '../../../common/ScheduledInfoBox';

const ArticleInternalForm = ({
	isEdit,
	status,
	selectedOption,
	topElementRef,
	elementsWrapperRef,
	openSchedulerModal
}) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { rules } = useSelector(getRules);
	const { values, validateForm, resetForm, isValid } = useFormikContext();
	const [getMatchesTree, { data: matchesData }] = useLazyGetMatchesTreeQuery();

	useEffect(() => {
		validateForm();
		getMatchesTree();

		return () => {
			resetForm(articleFormInitialValues(rules));
			dispatch(resetSpecificArticleTemplate());
			dispatch(resetSpecificArticle());
		};
	}, []);

	return (
		<Box>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Builder</h2>
				<p>Edit, reorder elements here and build your {selectedOption}</p>
			</Box>
			<Box mb={2}>
				{selectedOption === 'template' && <ArticleTemplateInfoForm />}
			</Box>
			{values.is_scheduled && (
				<ScheduledInfoBox
					scheduleDate={values.schedule_date}
					openSchedulerModal={openSchedulerModal}
					isValid={isValid}
				/>
			)}
			<ArticleGeneralInfoForm
				isEdit={isEdit}
				status={status}
				selectedOption={selectedOption}
			/>
			{values?.subCategoryId && (
				<AdvancedSettingsForm hideRules={selectedOption === 'template'} />
			)}
			<Box
				ref={topElementRef}
				sx={{
					scrollMarginBottom: '400px'
				}}
			></Box>
			<Box>
				<FieldArray
					name='elements'
					render={(props) => (
						<ArticleElementsFieldArray
							isEdit={isEdit}
							status={status}
							selectedOption={selectedOption}
							elementsWrapperRef={elementsWrapperRef}
							matchesData={matchesData}
							{...props}
						/>
					)}
				/>
			</Box>
		</Box>
	);
};

ArticleInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	topElementRef: PropTypes.element,
	elementsWrapperRef: PropTypes.any,
	openSchedulerModal: PropTypes.func.isRequired
};

export default ArticleInternalForm;
