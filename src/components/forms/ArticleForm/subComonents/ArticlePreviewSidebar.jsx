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
	TiktokElementPreviewer,
	AdPreviewer
} from './previewers';
import ArticlePreviewWrapper from './ArticlePreviewWrapper';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../data/helpers/articleHelpers/index';

const renderElements = (item, index, isEdit, errors) => {
	// element type
	const { element_type: type } = item;

	const error = errors?.length > 0 ? errors[index] : null;

	// conditional rendering
	switch (type) {
		case ARTICLE_ELEMENTS_TYPES.MEDIA:
			return (
				<MediaElementPreviewer data={item} error={error} isEdit={isEdit} />
			);
		case ARTICLE_ELEMENTS_TYPES.TEXT:
			return <TextElementPreviewer data={item} error={error} />;
		// Will return same elements on both cases
		case ARTICLE_ELEMENTS_TYPES.TWITTER:
			return (
				<TwitterElementPreviewer data={item} error={error} itemIndex={index} />
			);
		case ARTICLE_ELEMENTS_TYPES.IG:
			return <IgElementPreviewer data={item} error={error} itemIndex={index} />;
		case ARTICLE_ELEMENTS_TYPES.QUESTION:
			return (
				<QuestionPoolPreviewer data={item} error={error} itemIndex={index} />
			);
		case ARTICLE_ELEMENTS_TYPES.MATCH:
			return (
				<MatchElementPreviewer item={item} error={error} itemIndex={index} />
			);
		case ARTICLE_ELEMENTS_TYPES.YOUTUBE:
			return (
				<YoutubeElementPreviewer data={item} error={error} itemIndex={index} />
			);
		case ARTICLE_ELEMENTS_TYPES.TIKTOK:
			return (
				<TiktokElementPreviewer data={item} error={error} itemIndex={index} />
			);
		default:
			return null;
	}
};

const ArticlePreviewSidebar = ({ data, errors, form, isEdit }) => {
	const classes = useStyles();

	return (
		<Box px={2} className={classes.gridDivSmall}>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Preview</h2>
				<p>Review the result here before publishing</p>
			</Box>

			<ArticlePreviewWrapper form={form}>
				{data.map((item, index) => (
					<div key={index} className={classes.elementContainer}>
						{renderElements(item, index, isEdit, errors)}
						{(data.length === 1 || index === 1) && <AdPreviewer />}
					</div>
				))}
			</ArticlePreviewWrapper>
		</Box>
	);
};

ArticlePreviewSidebar.propTypes = {
	data: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	isEdit: PropTypes.bool.isRequired,
	errors: PropTypes.array
};

export default ArticlePreviewSidebar;
