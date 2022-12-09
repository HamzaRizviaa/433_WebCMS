import React from 'react';
import PropTypes from 'prop-types';
import FormikTextEditor from '../../../../../ui/inputs/formik/FormikRichTextEditor';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';

const TextElement = ({ index, item, handleRemoveElement, ...restProps }) => (
	<DraggableLayoutWrapper>
		<DraggableCardLayout
			title={`Add Text`}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleRemoveElement}
		>
			<FormikTextEditor name={`elements.${index}.description`} {...restProps} />
		</DraggableCardLayout>
	</DraggableLayoutWrapper>
);

TextElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleRemoveElement: PropTypes.func
};

export default TextElement;
