import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllViralsApi } from '../../../data/features/viralLibrary/viralLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllViralsQuery() {
	const dispatch = useDispatch();

	const { virals, totalRecords, status } = useSelector(
		(state) => state.rootReducer.viralLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getAllViralsApi(queryParams));
	}, [queryParams]);

	return {
		data: virals,
		totalRecords,
		isLoading: status === 'pending'
	};
}
