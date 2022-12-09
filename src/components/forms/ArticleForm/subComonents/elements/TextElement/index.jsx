import React from 'react';
import PropTypes from 'prop-types';
import FormikTextEditor from '../../../../../ui/inputs/formik/FormikRichTextEditor';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';

const TextElement = ({ index, item, handleDeleteSlide, ...restProps }) => (
	<DraggableLayoutWrapper>
		<DraggableCardLayout
			title={`Add Text`}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleDeleteSlide}
		>
			<FormikTextEditor name={`elements.${index}.description`} {...restProps} />
		</DraggableCardLayout>
	</DraggableLayoutWrapper>
);

TextElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleDeleteSlide: PropTypes.func
};

export default TextElement;
