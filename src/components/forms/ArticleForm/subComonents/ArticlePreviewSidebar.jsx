import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './subComponents.styles';
import PropTypes from 'prop-types';
import {
	IgElementPreviewer,
	MatchElementPreviewer,
	MediaElementPreviewer,
	QuestionPoolPreviewer,
	TextElementPreviewer,
	TwitterElementPreviewer
} from './previewers';
import { ElementTypes } from './ElementTypes';
import ArticlePreviewWrapper from './ArticlePreviewWrapper';

const ArticlePreviewSidebar = ({ data, form, isEdit }) => {
	const classes = useStyles();

	const renderElements = (item, index, isEdit) => {
		// element type
		const { element_type: type } = item;

		// conditional rendering
		switch (type) {
			case ElementTypes.MEDIA:
				return <MediaElementPreviewer data={item} isEdit={isEdit} />;
			case ElementTypes.TEXT:
				return <TextElementPreviewer data={item} />;
			// Will return same elements on both cases
			case ElementTypes.TWITTER:
				return <TwitterElementPreviewer data={item} itemIndex={index} />;
			case ElementTypes.IG:
				return <IgElementPreviewer data={item} itemIndex={index} />;
			case ElementTypes.QUESTION:
				return <QuestionPoolPreviewer data={item} itemIndex={index} />;
			case ElementTypes.MATCH:
				return <MatchElementPreviewer item={item} itemIndex={index} />;
			default:
				return null;
		}
	};
	return (
		<Box px={2} className={classes.gridDivSmall}>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Preview</h2>
				<p>Review the result here before publishing</p>
			</Box>

			<ArticlePreviewWrapper form={form}>
				{data.map((item, index) => {
					return (
						<div key={index} className={classes.elementContainer}>
							{renderElements(item, index, isEdit)}
						</div>
					);
				})}
			</ArticlePreviewWrapper>
		</Box>
	);
};

export default ArticlePreviewSidebar;

ArticlePreviewSidebar.propTypes = {
	data: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	isEdit: PropTypes.bool.isRequired
};
