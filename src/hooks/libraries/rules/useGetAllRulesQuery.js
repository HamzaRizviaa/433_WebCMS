import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRulesApi } from '../../../data/features/ruleLibrary/ruleLibrarySlice';
import useCommonParams from '../../useCommonParams';

export default function useGetAllRulesQuery() {
	const dispatch = useDispatch();

	const { rules, totalRecords, status } = useSelector(
		(state) => state.rootReducer.ruleLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getAllRulesApi(queryParams));
	}, [queryParams]);

	return {
		data: rules,
		totalRecords,
		isLoading: status === 'pending'
	};
}
