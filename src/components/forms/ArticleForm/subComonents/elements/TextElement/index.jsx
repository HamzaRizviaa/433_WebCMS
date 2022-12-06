import React from 'react';
import PropTypes from 'prop-types';
import FormikTextEditor from '../../../../../ui/inputs/formik/FormikRichTextEditor';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const ArticleTextElement = ({ index, item, handleDeleteSlide, ...restProps}) => {
    return (
        <DraggableCardLayout
			title={`Add Text`}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleDeleteSlide}
		>
            <FormikTextEditor 
                name={`elements.${index}.text`}
                {...restProps}
            />
        </DraggableCardLayout>
    )
}

ArticleTextElement.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object,
    handleDeleteSlide: PropTypes.func
}

export default ArticleTextElement;