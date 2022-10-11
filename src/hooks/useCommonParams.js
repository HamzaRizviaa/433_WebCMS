import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sanitizeDates } from '../data/utils';

const orderTypes = ['ASC', 'DESC'];

function useCommonParams() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get('page');
	const query = searchParams.get('q');
	const sortBy = searchParams.get('sortBy');
	const orderType = searchParams.get('orderType');
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');

	const queryParams = useMemo(() => {
		const { formattedStartDate, formattedEndDate } = sanitizeDates(
			startDate,
			endDate
		);

		return {
			page: Number(page) || 1,
			q: query || null,
			sort_by: sortBy || null,
			order_type: orderTypes.includes(orderType) ? orderType : null,
			start_date: formattedStartDate,
			end_date: formattedEndDate,
			...(!!query && { is_search: true })
		};
	}, [page, query, sortBy, orderType, startDate, endDate]);

	return queryParams;
}

export default useCommonParams;
