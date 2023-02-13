import React from 'react';
import PropTypes from 'prop-types';
import { useFormStyles } from '../../../../forms.style';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const SocialMediaElement = ({
	index,
	item,
	name,
	required = false,
	handleRemoveElement,
	readOnly
}) => {
	const classes = useFormStyles();

	const elementTitle =
		item.element_type === 'IG'
			? 'Add IG post'
			: item.element_type === 'YOUTUBE'
			? 'Add Youtube video'
			: item.element_type === 'TIKTOK'
			? 'Add Tiktok post'
			: 'Add Tweet';

	return (
		<DraggableCardLayout
			title={elementTitle}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleRemoveElement}
			disableActions={readOnly}
		>
			<div className={classes.fieldContainer}>
				<FormikField
					name={name}
					label='URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
					required={required}
					readOnly={readOnly}
				/>
			</div>
		</DraggableCardLayout>
	);
};

SocialMediaElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	name: PropTypes.string,
	required: PropTypes.bool,
	handleRemoveElement: PropTypes.func,
	readOnly: PropTypes.bool
};

export default SocialMediaElement;
