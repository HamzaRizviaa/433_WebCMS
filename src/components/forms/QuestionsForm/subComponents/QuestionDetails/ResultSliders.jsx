/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ResultSliders = () => {
	const [edit, setEdit] = useState(false);
	// api call const { data, isLoading, totalRecords } = useGetAllQuestionsQuery();

	const handleRowClick = (_, row) => {
		setEdit(false);
	};
	return <></>;
};

export default ResultSliders;
