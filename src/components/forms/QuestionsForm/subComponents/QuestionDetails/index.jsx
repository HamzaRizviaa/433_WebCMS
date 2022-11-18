/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ResultSliders from './ResultSliders';
import ParticipantsTable from './ParticipantsTable';

const QuestionDetails = () => {
	return (
		<>
			<ResultSliders />
			<ParticipantsTable />
		</>
	);
};

export default QuestionDetails;
