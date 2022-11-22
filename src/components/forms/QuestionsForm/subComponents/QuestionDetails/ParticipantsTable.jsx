/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../../../ui/Table';
import { useQuestionsStyles } from '../../index.style';
import { questionParticipantsTableColumns } from '../../../../../data/helpers/questionHelpers';

const ParticipantsTable = () => {
	const classes = useQuestionsStyles();
	const [edit, setEdit] = useState(false);
	// api call const { data, isLoading, totalRecords } = useGetAllQuestionsQuery();

	const handleRowClick = (_, row) => {
		setEdit(false);
	};

	//dummy data
	const data = [
		{
			username: 'abc',
			answer: 'answer',
			date_and_time: '2022-11-26T00:00:00.000Z'
		},
		{
			username: 'abc',
			answer: 'answer',
			date_and_time: '2022-11-26T00:00:00.000Z'
		},
		{
			username: 'abc',
			answer: 'answer',
			date_and_time: '2022-11-26T00:00:00.000Z'
		}
	];

	return (
		<>
			<div className={classes.QuizDetailsHeading}>Participants</div>
			<Table
				onRowClick={handleRowClick}
				columns={questionParticipantsTableColumns}
				data={data}
				totalRecords={200}
				isLoading={false}
				noDataText='No Results Found'
			/>
		</>
	);
};

export default ParticipantsTable;
