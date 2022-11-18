import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNewsApi } from '../../../data/features/newsLibrary/newsLibraryActions';
import useCommonParams from '../../useCommonParams';

export default function useGetAllNews() {
	const dispatch = useDispatch();

	const { news, totalRecords, status } = useSelector(
		(state) => state.rootReducer.newsLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getAllNewsApi(queryParams));
	}, [queryParams]);

	return {
		data: news,
		totalRecords,
		isLoading: status === 'pending'
	};
}
