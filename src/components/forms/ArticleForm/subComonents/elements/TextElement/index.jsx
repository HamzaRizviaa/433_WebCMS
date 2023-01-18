import React from 'react';
import PropTypes from 'prop-types';
import FormikRichTextEditor from '../../../../../ui/inputs/formik/FormikRichTextEditor';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const TextElement = ({
	index,
	item,
	handleRemoveElement,
	readOnly,
	...restProps
}) => (
	<DraggableCardLayout
		title={`Add Text`}
		key={index}
		index={index}
		item={item}
		onDeleteIconClick={handleRemoveElement}
		disableActions={readOnly}
	>
		<FormikRichTextEditor
			id={index}
			name={`elements.${index}.description`}
			disabled={readOnly}
			{...restProps}
		/>
	</DraggableCardLayout>
);

TextElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleRemoveElement: PropTypes.func,
	readOnly: PropTypes.bool
};

export default TextElement;
