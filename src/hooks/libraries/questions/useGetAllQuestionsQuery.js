import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../data/features/questionsLibrary/questionsLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllQuestionsQuery() {
	const dispatch = useDispatch();

	const { questions, totalRecords, status } = useSelector(
		(state) => state.rootReducer.questionsLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getQuestions(queryParams));
	}, [queryParams]);

	return {
		data: questions,
		totalRecords,
		isLoading: status === 'pending'
	};
}
