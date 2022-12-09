import React from 'react';
import PropTypes from 'prop-types';
import { ElementTypes } from '../../../../../data/helpers/articleHelpers';

// // Elements
import TextElement from './TextElement';
import ImageVideoElement from './ImageVideoElement';
import SocialMediaElement from './SocialMediaElement';
import MatchElement from './MatchElement';
import QuestionElement from './QuestionElement';

const ArticleElementsFieldArray = ({ form }) => {
	const renderArticleElement = (item, index) => {
		const { element_type: type } = item;
		console.log(item, 'ITEM INN FIELD ARRAY');

		switch (type) {
			case ElementTypes.TEXT:
				return <TextElement index={index} item={item} />;
			case ElementTypes.MEDIA:
				return <ImageVideoElement index={index} item={item} />;
			case ElementTypes.TWITTER:
				return <SocialMediaElement index={index} item={item} />;
			case ElementTypes.IG:
				return <SocialMediaElement index={index} item={item} />;
			case ElementTypes.QUESTION:
				return <QuestionElement index={index} item={item} />;
			case ElementTypes.MATCH:
				return <MatchElement index={index} item={item} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div>
				{form.values.elements.map((item, index) => (
					<div key={index}>{renderArticleElement(item, index)}</div>
				))}
			</div>
		</>
	);
};

ArticleElementsFieldArray.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired
};

export default ArticleElementsFieldArray;
