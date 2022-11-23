import { useState, useEffect } from 'react';
import { QuestionsLibraryService } from '../../../data/services';

function useGetQuestionParticipantList(questionId, sortBy, orderType) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const params = {
			id: questionId,
			sort_by: sortBy || null,
			order_type: orderType || null
		};

		if (questionId) {
			setIsLoading(true);
			QuestionsLibraryService.getQuestionParticipantListing(params)
				.then((res) => {
					setData(res?.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});
		}
	}, [questionId, sortBy, orderType]);

	return { data, isLoading };
}

export default useGetQuestionParticipantList;
