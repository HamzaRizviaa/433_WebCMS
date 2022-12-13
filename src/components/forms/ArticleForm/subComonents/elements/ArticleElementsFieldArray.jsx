import React from 'react';
import PropTypes from 'prop-types';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../../data/helpers/articleHelpers';

// // Elements
import TextElement from './TextElement';
import ImageVideoElement from './ImageVideoElement';
import SocialMediaElement from './SocialMediaElement';
import MatchElement from './MatchElement';
import QuestionElement from './QuestionElement';

const ArticleElementsFieldArray = ({
	form,
	remove,
	matchesLoading,
	matchesData
}) => {
	const handleRemoveElement = (_, index) => {
		remove(index);
	};

	const renderArticleElement = (item, index) => {
		const { element_type: type } = item;

		switch (type) {
			case ARTICLE_ELEMENTS_TYPES.TEXT:
				return (
					<TextElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.MEDIA:
				return (
					<ImageVideoElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.TWITTER:
				return (
					<SocialMediaElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.IG:
				return (
					<SocialMediaElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.QUESTION:
				return (
					<QuestionElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.MATCH:
				return (
					<MatchElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
						loading={matchesLoading}
						data={matchesData}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			{form.values.elements.map((item, index) => (
				<div key={index}>{renderArticleElement(item, index)}</div>
			))}
		</div>
	);
};

ArticleElementsFieldArray.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired,
	matchesLoading: PropTypes.bool,
	matchesData: PropTypes.array
};

export default ArticleElementsFieldArray;
