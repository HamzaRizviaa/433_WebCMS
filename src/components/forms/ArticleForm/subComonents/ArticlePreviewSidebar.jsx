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
import Sponsored from '../../../../assets/Micro.png';

const renderElements = (item, index, isEdit, errors) => {
	// element type
	const { element_type: type } = item;

	const error = errors?.length > 0 ? errors[index] : null;

	// conditional rendering
	switch (type) {
  	case ARTICLE_ELEMENTS_TYPES.AD:
			return <AdPreviewer data={item} />;
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
  
	let previewData = [...data];

	let adBox = {
		element_type: 'AD',
		image: Sponsored,
		text: 'Sponsored'
	};

	const insertAd = (data) => {
		if (
			data.some((e) => {
				e.element_type === 'AD';
			})
		) {
			return data;
		} else if (data.length > 0) {
			if (data.length === 1) {
				replaceData(previewData);
			} else {
				addDataAfterSecondIndex(previewData);
			}
		}
	};

	const replaceData = (data) => {
		let newData;
		newData = data.splice(1, 0, adBox);
		return newData;
	};

	const addDataAfterSecondIndex = (data) => {
		let newData;
		newData = data.splice(2, 0, adBox);
		return newData;
	};

	//inserting ads
	insertAd(previewData);

	return (
		<Box px={2} className={classes.gridDivSmall}>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Preview</h2>
				<p>Review the result here before publishing</p>
			</Box>

			<ArticlePreviewWrapper form={form}>
				{previewData.map((item, index) => (
					<div key={index} className={classes.elementContainer}>
						{renderElements(item, index, isEdit, errors)}
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
