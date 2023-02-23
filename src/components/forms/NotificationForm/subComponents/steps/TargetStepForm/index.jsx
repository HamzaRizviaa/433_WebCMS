import React from 'react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import TargetApp from './TargetApp';

const TargetStepForm = ({ status, isFieldInteractionAllowed }) => {
	return (
		<div>
			<FieldArray name='target'>
				{(props) => (
					<TargetApp status={status} isFieldInteractionAllowed={isFieldInteractionAllowed} {...props} />
				)}
			</FieldArray>
		</div>
	);
};

export default TargetStepForm;

TargetStepForm.propTypes = {
	status: PropTypes.string,
	isFieldInteractionAllowed: PropTypes.bool
};
