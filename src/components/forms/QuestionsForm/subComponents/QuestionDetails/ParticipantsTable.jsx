import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Table from '../../../../ui/Table';
import { questionParticipantsTableColumns } from '../../../../../data/helpers/questionHelpers';
import useGetQuestionParticipantList from '../../../../../hooks/libraries/questions/useGetQuestionParticipantList';
import { useQuestionsStyles } from '../../index.style';

const ParticipantsTable = ({ questionId }) => {
	const [sortBy, setSortBy] = useState('');
	const [orderType, setOrderType] = useState('');

	const { data, isLoading } = useGetQuestionParticipantList(
		questionId,
		sortBy,
		orderType
	);

	const handleSort = (sortOrder, sortField) => {
		if (sortOrder !== orderType || sortField !== sortBy) {
			setSortBy(sortField);
			setOrderType(sortOrder);
		}
	};

	const classes = useQuestionsStyles();

	return (
		<>
			<div className={classes.QuizDetailsHeading}>Participants</div>
			<Table
				columns={questionParticipantsTableColumns}
				data={data}
				totalRecords={data?.length || 0}
				isLoading={isLoading}
				noDataText='No Participants Found'
				formTable
				customSortBy={sortBy}
				customOrderType={orderType}
				onSort={handleSort}
			/>
		</>
	);
};

ParticipantsTable.propTypes = {
	questionId: PropTypes.string
};

export default ParticipantsTable;
