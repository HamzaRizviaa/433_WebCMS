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
	TwitterElementPreviewer,
	YoutubeElementPreviewer,
	TiktokElementPreviewer
} from './previewers';
import ArticlePreviewWrapper from './ArticlePreviewWrapper';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../data/helpers/articleHelpers/index';

const ArticlePreviewSidebar = ({ data, form, isEdit }) => {
	const classes = useStyles();

	const renderElements = (item, index, isEdit) => {
		// element type
		const { element_type: type } = item;

		// conditional rendering
		switch (type) {
			case ARTICLE_ELEMENTS_TYPES.MEDIA:
				return <MediaElementPreviewer data={item} isEdit={isEdit} />;
			case ARTICLE_ELEMENTS_TYPES.TEXT:
				return <TextElementPreviewer data={item} />;
			// Will return same elements on both cases
			case ARTICLE_ELEMENTS_TYPES.TWITTER:
				return <TwitterElementPreviewer data={item} itemIndex={index} />;
			case ARTICLE_ELEMENTS_TYPES.IG:
				return <IgElementPreviewer data={item} itemIndex={index} />;
			case ARTICLE_ELEMENTS_TYPES.QUESTION:
				return <QuestionPoolPreviewer data={item} itemIndex={index} />;
			case ARTICLE_ELEMENTS_TYPES.MATCH:
				return <MatchElementPreviewer item={item} itemIndex={index} />;
			case ARTICLE_ELEMENTS_TYPES.YOUTUBE:
				return <YoutubeElementPreviewer data={item} itemIndex={index} />;
			case ARTICLE_ELEMENTS_TYPES.TIKTOK:
				return <TiktokElementPreviewer data={item} itemIndex={index} />;
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
				{data.map((item, index) => (
					<div key={index} className={classes.elementContainer}>
						{renderElements(item, index, isEdit)}
					</div>
				))}
			</ArticlePreviewWrapper>
		</Box>
	);
};

ArticlePreviewSidebar.propTypes = {
	data: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	isEdit: PropTypes.bool.isRequired
};

export default ArticlePreviewSidebar;
