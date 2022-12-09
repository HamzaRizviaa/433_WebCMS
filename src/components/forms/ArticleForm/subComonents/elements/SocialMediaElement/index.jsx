import React from 'react';
import PropTypes from 'prop-types';
import { useFormStyles } from '../../../../forms.style';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const SocialMediaElement = ({ index, item, handleRemoveElement }) => {
	const classes = useFormStyles();

	return (
		<DraggableLayoutWrapper>
			<DraggableCardLayout
				title={item.element_type === 'IG' ? 'Add IG post' : 'Add Tweet'}
				key={index}
				index={index}
				item={item}
				onDeleteIconClick={handleRemoveElement}
			>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`elements.${index}.${item.element_type}_post_url`}
						label='URL'
						placeholder='Please drop the URL here'
						multiline
						maxRows={2}
					/>
				</div>
			</DraggableCardLayout>
		</DraggableLayoutWrapper>
	);
};

SocialMediaElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleRemoveElement: PropTypes.func
};

export default SocialMediaElement;
