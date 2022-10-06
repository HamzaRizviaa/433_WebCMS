import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllViralsApi,
	resetCalendarError,
	resetNoResultStatus
} from '../../../data/features/viralLibrary/viralLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllViralsQuery() {
	const dispatch = useDispatch();

	const {
		virals,
		totalRecords,
		status,
		noResultStatus,
		noResultStatusCalendar
	} = useSelector((state) => state.rootReducer.viralLibrary);

	const queryParams = useCommonParams();

	useEffect(() => {
		dispatch(getAllViralsApi(queryParams));
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
		data: virals,
		totalRecords,
		isLoading: status === 'pending',
		noResultStatus,
		noResultStatusCalendar
	};
}
