import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormikContext } from 'formik';

import { resetQuestionEdit } from '../../../../data/features/questionsLibrary/questionsLibrarySlice';

const QuestionFormWrapper = ({ children }) => {
	const dispatch = useDispatch();

	const { validateForm } = useFormikContext();

	useEffect(() => {
		validateForm();
		return () => {
			dispatch(resetQuestionEdit());
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
