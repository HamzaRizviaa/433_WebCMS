/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../../../ui/Table';
import { questionParticipantsTableColumns } from '../../../../../data/helpers/questionHelpers';

const ParticipantsTable = () => {
	const [edit, setEdit] = useState(false);
	// api call const { data, isLoading, totalRecords } = useGetAllQuestionsQuery();

	const handleRowClick = (_, row) => {
		setEdit(false);
	};
	return (
		<>
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
