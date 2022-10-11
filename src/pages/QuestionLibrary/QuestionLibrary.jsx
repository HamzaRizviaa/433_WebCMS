/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import UploadOrEditQuiz from '../../components/Questions/UploadEditQuestion/UploadOrEditQuiz';
import QuizDetails from '../../components/Questions/QuestionDetails/QuizDetails';
import PollDetails from '../../components/Questions/QuestionDetails/PollDetails';
import { getQuestionEdit } from '../../data/features/questionsLibrary/questionsLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import useGetAllQuestionsQuery from '../../hooks/libraries/questions/useGetAllQuestionsQuery';
import { questionTableColumns } from '../../data/helpers/questionHelpers';

const QuestionLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllQuestionsQuery();

	const [showSlider, setShowSlider] = useState(false);
	const [showQuizSlider, setShowQuizSlider] = useState(false);
	const [showPollSlider, setShowPollSlider] = useState(false);
	const [rowStatus, setrowStatus] = useState('');
	const [rowLocation, setrowLocation] = useState('');
	const [rowType, setRowType] = useState('');
	const [edit, setEdit] = useState(false);
	const [notifID, setNotifID] = useState('');
	const [editSlider, showEditSlider] = useState(false);
	const [questionId, setQuestionId] = useState('');

	const handleRowClick = (_, row) => {
		setEdit(true);
		setNotifID(row.id);
		setRowType(row.question_type); // quiz , poll
		setrowStatus(row.status); // active , closed , draft
		setrowLocation(row.location); // home page , article
		setQuestionId(row.question_id);

		//api calls
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getQuestionEdit({ id: row.id, type: row.question_type }));

		//slider calls
		if (
			row.location === 'article' &&
			row.question_type === 'quiz' &&
			row.status === 'ACTIVE'
		) {
			setShowQuizSlider(true);
		} else if (
			row.location === 'article' &&
			row.question_type === 'poll' &&
			row.status === 'ACTIVE'
		) {
			setShowPollSlider(true);
		} else {
			showEditSlider(true);
		}
	};

	const handleUploadQuestionClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Question Library'
			isLoading={isLoading}
			onButtonClick={handleUploadQuestionClick}
		>
			<Table
				onRowClick={handleRowClick}
				columns={questionTableColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Questions Found'
			/>
			{/* upload */}
			<UploadOrEditQuiz
				open={showSlider}
				location={rowLocation}
				status={rowStatus} //active closed draft
				rowType={rowType}
				isEdit={false}
				handleClose={() => {
					setShowSlider(false);
				}}
				buttonText={edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'}
			/>
			{/* edit question */}
			<UploadOrEditQuiz
				isEdit={edit}
				open={editSlider}
				notifID={notifID}
				location={rowLocation}
				rowType={rowType}
				status={rowStatus} //active closed draft
				handleClose={() => {
					showEditSlider(false);
				}}
				buttonText={edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'}
			/>

			<QuizDetails
				open={showQuizSlider}
				isEdit={edit}
				handleClose={() => {
					setShowQuizSlider(false);
				}}
				questionId={questionId}
				questionType={rowType}
				status={rowStatus} //open closed
				location={rowLocation} //Article / HomePage
				title={rowStatus === 'draft' ? 'Edit Quiz' : 'Quiz Detail'}
				heading1={edit ? 'Add Background Image' : 'Add Background Image'}
				buttonText={edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'}
				notifID={notifID}
			/>
			<PollDetails
				open={showPollSlider}
				isEdit={edit}
				handleClose={() => {
					setShowPollSlider(false);
				}}
				questionId={questionId}
				questionType={rowType}
				status={rowStatus} //open / closed
				location={rowLocation} //Article / HomePage
				title={rowStatus === 'draft' ? 'Edit Poll' : 'Poll Detail'}
				heading1={edit ? 'Add Background Image' : 'Add Background Image'}
				buttonText={edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'}
				notifID={notifID}
			/>
		</DashboardLayout>
	);
};

export default QuestionLibrary;
