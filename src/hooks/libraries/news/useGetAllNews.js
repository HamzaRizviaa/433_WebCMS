import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../../data/features/newsLibrary/newsLibraryActions';
import {
	resetCalendarError,
	resetNoResultStatus
} from '../../../data/features/newsLibrary/newsLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllNews() {
	const dispatch = useDispatch();

	const { news, totalRecords, status, noResultStatus, noResultStatusCalendar } =
		useSelector((state) => state.rootReducer.newsLibrary);

	const queryParams = useCommonParams();

	useEffect(() => {
		dispatch(getAllNews(queryParams));
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
		data: news,
		totalRecords,
		isLoading: status === 'pending',
		noResultStatus,
		noResultStatusCalendar
	};
}
