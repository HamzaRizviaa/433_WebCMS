import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import { Box } from '@mui/material';
import { useStyles } from '../subComponents.styles';
import ArticleGeneralInfoForm from './ArticleGeneralInfoForm';
import ArticleElementsFieldArray from '../elements/ArticleElementsFieldArray';
import { useLazyGetMatchesTreeQuery } from '../../../../../data/features/articleLibrary/articleLibrary.query';
import { articleFormInitialValues } from '../../../../../data/helpers';

const ArticleInternalForm = ({
	isEdit,
	status,
	topElementRef,
	elementsWrapperRef
}) => {
	const classes = useStyles();

	const { validateForm, resetForm } = useFormikContext();

	const [getMatchesTree, { isFetching: matchesLoading, data: matchesData }] =
		useLazyGetMatchesTreeQuery();

	useEffect(() => {
		validateForm();
		getMatchesTree();

		return () => {
			resetForm(articleFormInitialValues);
		};
	}, []);

	return (
		<Box>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Builder</h2>
				<p>Edit, reorder elements here and build your article</p>
			</Box>
			<ArticleGeneralInfoForm isEdit={isEdit} status={status} />
			<Box
				sx={{
					scrollMarginBottom: '400px'
				}}
				ref={topElementRef}
			></Box>
			<FieldArray
				name='elements'
				render={(props) => (
					<ArticleElementsFieldArray
						isEdit={isEdit}
						status={status}
						elementsWrapperRef={elementsWrapperRef}
						matchesLoading={matchesLoading}
						matchesData={matchesData}
						{...props}
					/>
				)}
			/>
		</Box>
	);
};

ArticleInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	topElementRef: PropTypes.element,
	elementsWrapperRef: PropTypes.element
};

export default ArticleInternalForm;
