import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import { resetQuestionEdit } from '../../../../data/features/questionsLibrary/questionsLibrarySlice';
import { questionsFormInitialValues } from '../../../../data/helpers';
import { getRules } from '../../../../data/selectors';

const QuestionFormWrapper = ({ children }) => {
	const dispatch = useDispatch();
	const { rules } = useSelector(getRules);

	const { validateForm, resetForm } = useFormikContext();

	useEffect(() => {
		validateForm();
		return () => {
			dispatch(resetQuestionEdit());
			resetForm({ values: questionsFormInitialValues(rules) });
		};
	}, []);

	return <div>{children}</div>;
};

QuestionFormWrapper.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	])
};

export default QuestionFormWrapper;
