import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getQuestionEdit } from '../../data/features/questionsLibrary/questionsLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import useGetAllQuestionsQuery from '../../hooks/libraries/questions/useGetAllQuestionsQuery';
import { questionTableColumns } from '../../data/helpers/questionHelpers';
import QuestionsForm from '../../components/forms/QuestionsForm';
import QuestionGeneratorForm from '../../components/forms/QuestionsForm/QuestionGeneratorForm';
import QuestionModal from '../../components/ui/modals/QuestionModal';

const QuestionLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllQuestionsQuery();

	const [rowStatus, setRowStatus] = useState('draft');
	const [rowLocation, setRowLocation] = useState('');
	const [rowType, setRowType] = useState('');
	const [edit, setEdit] = useState(false);
	const [questionId, setQuestionId] = useState('');
	const [showSlider, setShowSlider] = useState(false);
	const [showQuestionModal, setShowQuestionModal] = useState(false);
	const [questionGeneratorSlider, setQuestionGeneratorSlider] = useState(false);

	const handleRowClick = (_, row) => {
		const questionTypeText = row.question_type?.replaceAll(/<[^>]*>/gi, '');

		setEdit(true);
		setRowType(questionTypeText); // quiz , poll
		setRowStatus(row.status); // active , closed , draft
		setRowLocation(row.location); // home page , article
		setQuestionId(row.question_id);

		//api calls
		dispatch(getQuestionEdit({ id: row.id, type: row.question_type }));

		setShowSlider(true);
	};

	const handleUploadQuestionClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowQuestionModal(true);
	};

	const handleEmptyQuestionClick = () => {
		setShowSlider(true); //open form drawer
		setShowQuestionModal(false); //closes the question modal
	};

	const handleSmartQuizClick = () => {
		setQuestionGeneratorSlider(true);
		setShowQuestionModal(false);
	};

	const handleClose = () => {
		setShowSlider(false);
		setQuestionGeneratorSlider(false);
		setEdit(false);
		setRowType('');
		setRowStatus('draft');
		setRowLocation('');
	};

	return (
		<DashboardLayout
			title='Question'
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

			<QuestionsForm
				open={showSlider}
				isEdit={edit}
				location={rowLocation}
				questionType={rowType}
				questionId={questionId}
				handleClose={handleClose}
				status={rowStatus}
			/>

			<QuestionGeneratorForm
				open={questionGeneratorSlider}
				handleClose={handleClose}
			/>

			<QuestionModal
				showQuestionModal={showQuestionModal}
				setShowQuestionModal={setShowQuestionModal}
				questionForm={handleEmptyQuestionClick}
				questionGeneratorForm={handleSmartQuizClick}
			/>
		</DashboardLayout>
	);
};

export default QuestionLibrary;
