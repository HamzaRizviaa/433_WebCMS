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

	const { validateForm, resetForm, touched } = useFormikContext();

	const [getMatchesTree, { data: matchesData }] = useLazyGetMatchesTreeQuery();

	useEffect(() => {
		validateForm();
		getMatchesTree();

		return () => {
			resetForm(articleFormInitialValues);
		};
	}, []);

	console.log({ touched });

	return (
		<Box>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Builder</h2>
				<p>Edit, reorder elements here and build your article</p>
			</Box>
			<ArticleGeneralInfoForm isEdit={isEdit} status={status} />
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
	topElementRef: PropTypes.element,
	elementsWrapperRef: PropTypes.any
};

export default ArticleInternalForm;
