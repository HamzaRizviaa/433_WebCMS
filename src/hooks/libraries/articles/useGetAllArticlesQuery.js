import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticlesApi } from '../../../data/features/articleLibrary/articleLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllArticlesQuery() {
	const dispatch = useDispatch();

	const { articles, totalRecords, status } = useSelector(
		(state) => state.rootReducer.articleLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getAllArticlesApi(queryParams));
	}, [queryParams]);

	return {
		data: articles,
		totalRecords,
		isLoading: status === 'pending'
	};
}
