import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getQuestions,
	resetCalendarError,
	resetNoResultStatus
} from '../../../data/features/questionsLibrary/questionsLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllQuestionsQuery() {
	const dispatch = useDispatch();

	const {
		questions,
		totalRecords,
		status,
		noResultStatus,
		noResultStatusCalendar
	} = useSelector((state) => state.rootReducer.questionsLibrary);

	const queryParams = useCommonParams();

	useEffect(() => {
		dispatch(getQuestions(queryParams));
	}, [queryParams]);

	useEffect(() => {
		if (noResultStatus) {
			setTimeout(() => {
				dispatch(resetNoResultStatus());
			}, [5000]);
		}

		if (noResultStatusCalendar) {
			setTimeout(() => {
				dispatch(resetCalendarError());
			}, [5000]);
		}
	}, [noResultStatus, noResultStatusCalendar]);

	useEffect(() => {
		return () => {
			dispatch(resetCalendarError());
			dispatch(resetNoResultStatus());
		};
	}, []);

	return {
		data: questions,
		totalRecords,
		isLoading: status === 'pending',
		noResultStatus,
		noResultStatusCalendar
	};
}
