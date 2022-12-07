import React, { useRef } from 'react';
import { Box } from '@mui/material';
import ArticleGeneralInfoForm from './ArticleGeneralInfoForm';
import { useStyles } from '../subComponents.styles';

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
			{/** The elements to be rendered over here */}
		</Box>
	);
};

export default ArticleInternalForm;
