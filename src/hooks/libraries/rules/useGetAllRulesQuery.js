import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRulesApi } from '../../../data/features/ruleLibrary/ruleLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllRulesQuery() {
	const dispatch = useDispatch();

	const { rulesList, totalRecords, status } = useSelector(
		(state) => state.rootReducer.rulesSlice
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getAllRulesApi(queryParams));
	}, [queryParams]);

	return {
		data: rulesList,
		totalRecords,
		isLoading: status === 'pending'
	};
}
