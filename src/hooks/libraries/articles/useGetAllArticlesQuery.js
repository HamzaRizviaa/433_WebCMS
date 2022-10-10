import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllArticlesApi,
	resetCalendarError,
	resetNoResultStatus
} from '../../../data/features/articleLibrary/articleLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllArticlesQuery() {
	const dispatch = useDispatch();

	const {
		articles,
		totalRecords,
		status,
		noResultStatus,
		noResultStatusCalendar
	} = useSelector((state) => state.rootReducer.articleLibrary);

	const queryParams = useCommonParams();

	useEffect(() => {
		dispatch(getAllArticlesApi(queryParams));
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
		data: articles,
		totalRecords,
		isLoading: status === 'pending',
		noResultStatus,
		noResultStatusCalendar
	};
}
