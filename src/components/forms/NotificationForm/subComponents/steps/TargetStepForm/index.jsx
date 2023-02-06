import React from 'react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import TargetApp from './TargetApp';

const TargetStepForm = ({ status }) => {
	return (
		<div>
			<FieldArray name='target'>
				{(props) => {
					return <TargetApp status={status} {...props} />;
				}}
			</FieldArray>
		</div>
	);
};

export default TargetStepForm;

TargetStepForm.propTypes = {
	status: PropTypes.string
};
