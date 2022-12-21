import React from 'react';
import PropTypes from 'prop-types';
import { useFormStyles } from '../../../../forms.style';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const SocialMediaElement = ({ index, item, name, handleRemoveElement }) => {
	const classes = useFormStyles();

	return (
		<DraggableCardLayout
			title={item.element_type === 'IG' ? 'Add IG post' : 'Add Tweet'}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleRemoveElement}
		>
			<div className={classes.fieldContainer}>
				<FormikField
					name={name}
					label='URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
					required
				/>
			</div>
		</DraggableCardLayout>
	);
};

SocialMediaElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	name: PropTypes.string,
	handleRemoveElement: PropTypes.func
};

export default SocialMediaElement;
