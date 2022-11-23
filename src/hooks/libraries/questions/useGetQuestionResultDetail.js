import { useState, useEffect } from 'react';
import { QuestionsLibraryService } from '../../../data/services';

function useGetQuestionResultDetail(questionId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (questionId) {
			setIsLoading(true);
			QuestionsLibraryService.getQuestionResultDetail(questionId)
				.then((res) => {
					setData(res.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});
		}
		return () => {
			setData(null);
		};
	}, [questionId]);

	return { data, isLoading };
}

export default useGetQuestionResultDetail;
