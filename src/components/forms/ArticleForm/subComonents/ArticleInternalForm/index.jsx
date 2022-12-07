import React, { useRef } from 'react';
import { FieldArray } from 'formik';
import { Box } from '@mui/material';
import { useStyles } from '../subComponents.styles';
import ArticleGeneralInfoForm from './ArticleGeneralInfoForm';
import ArticleElementsFieldArray from '../elements/ArticleElementsFieldArray';

const ArticleInternalForm = () => {
	const classes = useStyles();
	const topElementRef = useRef(null);

	return (
		<Box>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Builder</h2>
				<p>Edit, reorder elements here and build your article</p>
			</Box>
			<ArticleGeneralInfoForm />
			<Box
				sx={{
					scrollMarginBottom: '400px'
				}}
				ref={topElementRef}
			></Box>
			<FieldArray
				name='elements'
				render={(props) => <ArticleElementsFieldArray {...props} />}
			/>
		</Box>
	);
};

export default ArticleInternalForm;
