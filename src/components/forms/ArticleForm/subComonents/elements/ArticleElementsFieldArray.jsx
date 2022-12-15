import React from 'react';
import PropTypes from 'prop-types';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../../data/helpers/articleHelpers';

// Elements
import TextElement from './TextElement';
import ImageVideoElement from './ImageVideoElement';
import SocialMediaElement from './SocialMediaElement';
import MatchElement from './MatchElement';
import QuestionElement from './QuestionElement';
import DraggableLayoutWrapper from '../../../../layouts/DraggableLayoutWrapper';
import { reorder } from '../../../../../data/helpers';

const ArticleElementsFieldArray = ({
	isEdit,
	status,
	elementsWrapperRef,
	matchesData,
	form,
	remove
}) => {
	const isPublished = isEdit && status === 'published';

	const handleRemoveElement = (_, index) => {
		remove(index);
	};

	const handleDragData = ({ source, destination }) => {
		if (!destination) {
			return;
		}

		if (source.index !== destination.index) {
			const items = reorder(
				form.values.elements, //data
				source.index, // pick
				destination.index // drop
			);

			form.setFieldValue('elements', items);
		}
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
						name={`elements.${index}.twitter_post_url`}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.IG:
				return (
					<SocialMediaElement
						index={index}
						item={item}
						name={`elements.${index}.instagram_post_url`}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.QUESTION:
				return (
					<QuestionElement
						index={index}
						item={item}
						handleRemoveElement={handleRemoveElement}
						isEdit={isEdit}
						status={status}
					/>
				);
			case ARTICLE_ELEMENTS_TYPES.MATCH:
				return (
					<MatchElement
						isEdit={isEdit}
						status={status}
						isPublished={isPublished}
						index={index}
						item={item}
						data={matchesData}
						handleRemoveElement={handleRemoveElement}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<DraggableLayoutWrapper onDragEnd={handleDragData}>
				{form.values.elements.map((item, index) => (
					<div ref={elementsWrapperRef} key={index}>
						{renderArticleElement(item, index)}
					</div>
				))}
			</DraggableLayoutWrapper>
		</div>
	);
};

ArticleElementsFieldArray.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	elementsWrapperRef: PropTypes.any,
	matchesData: PropTypes.array,
	form: PropTypes.object.isRequired,
	remove: PropTypes.func.isRequired
};

export default ArticleElementsFieldArray;
