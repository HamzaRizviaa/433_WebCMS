import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedia } from "../../../data/features/mediaLibrary/mediaLibraryActions";
import useCommonParams from "../../useCommonParams";
import { resetCalendarError, resetNoResultStatus } from "../../../data/features/mediaLibrary/mediaLibrarySlice";

export default function useGetAllMedia() {
    const dispatch = useDispatch()

    const { media, totalRecords, status, noResultStatus, noResultStatusCalendar } = useSelector((state) => state.rootReducer.mediaLibrary)
    const queryParams = useCommonParams()

    useEffect(() => {
        dispatch(getMedia(queryParams))
    },[queryParams])

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
		data: media,
		totalRecords,
		isLoading: status === 'pending',
		noResultStatus,
		noResultStatusCalendar
	};
}