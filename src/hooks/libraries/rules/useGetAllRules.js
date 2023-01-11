import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRules } from '../../../data/features/ruleLibrary/ruleLibrarySlice';
// import useCommonParams from '../../useCommonParams';

export default function useGetAllRulesQuery() {
	const dispatch = useDispatch();

	const { rules, totalRecords, status } = useSelector(
		(state) => state.rootReducer.rulesSlice
	);
	console.log('RULESSS', rules);

	// const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(fetchRules());
	}, []);

	return {
		data: rules,
		totalRecords,
		isLoading: status === 'pending'
	};
}
