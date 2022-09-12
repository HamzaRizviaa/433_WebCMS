import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
	getAllViralsApi,
	resetCalendarError,
	resetNoResultStatus
} from '../viralLibararySlice';

export default function useGetAllViralsQuery() {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();

	const {
		virals,
		totalRecords,
		status,
		noResultStatus,
		noResultStatusCalendar
	} = useSelector((state) => state.ViralLibraryStore);

	const page = searchParams.get('page');
	const query = searchParams.get('q');
	const sortby = searchParams.get('sortby');
	const orderType = searchParams.get('order_type');
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');

	useEffect(() => {
		dispatch(
			getAllViralsApi({
				page,
				query,
				sortby,
				orderType,
				startDate,
				endDate,
				...((!!startDate || !!endDate) && { fromCalendar: true })
			})
		);
	}, [page, query, sortby, orderType, startDate, endDate]);

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
