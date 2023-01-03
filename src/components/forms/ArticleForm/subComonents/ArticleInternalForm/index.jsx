import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import { Box } from '@mui/material';
import { useStyles } from '../subComponents.styles';
import ArticleTemplateInfoForm from './ArticleTemplateInfoForm';
import ArticleGeneralInfoForm from './ArticleGeneralInfoForm';
import ArticleElementsFieldArray from '../elements/ArticleElementsFieldArray';
import AdvancedSettingsForm from '../../../common/AdvancedSettingsForm';
import { useLazyGetMatchesTreeQuery } from '../../../../../data/features/articleLibrary/articleLibrary.query';
import { articleFormInitialValues } from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';

const ArticleInternalForm = ({
	isEdit,
	status,
	selectedOption,
	topElementRef,
	elementsWrapperRef
}) => {
	const classes = useStyles();
	const { rules } = useSelector(getRules);
	const { values, validateForm, resetForm } = useFormikContext();
	const [getMatchesTree, { data: matchesData }] = useLazyGetMatchesTreeQuery();

	useEffect(() => {
		validateForm();
		getMatchesTree();

		return () => {
			resetForm(articleFormInitialValues(rules));
		};
	}, []);

	return (
		<Box>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Builder</h2>
				<p>Edit, reorder elements here and build your article</p>
			</Box>
			<Box mb={2}>
				{selectedOption === 'template' && <ArticleTemplateInfoForm />}
			</Box>
			<ArticleGeneralInfoForm isEdit={isEdit} status={status} />
			{values.subCategoryId && <AdvancedSettingsForm />}
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
	elementsWrapperRef: PropTypes.any
};

export default ArticleInternalForm;
