import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from '../../../data/features/mediaLibrary/mediaLibraryActions';
import useCommonParams from '../../useCommonParams';

export default function useGetAllMedia() {
	const dispatch = useDispatch();

	const { media, totalRecords, status } = useSelector(
		(state) => state.rootReducer.mediaLibrary
	);

	const { queryParams } = useCommonParams();

	useEffect(() => {
		dispatch(getMedia(queryParams));
	}, [queryParams]);

	return {
		data: media,
		totalRecords,
		isLoading: status === 'pending'
	};
}
