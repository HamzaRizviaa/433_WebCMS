import rootRtkQuery from '../rootRTKQuery';

const questionsQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getFilterOptions: build.query({
			query: () =>
				'https://obceavskna.execute-api.eu-west-2.amazonaws.com/dev/quiz-builder/options'
		}),
		generateQuestions: build.query({
			query: (body) => ({
				url: `https://obceavskna.execute-api.eu-west-2.amazonaws.com/dev/quiz-builder/${
					body?.mode === 'players' ? 'players' : 'teams'
				}`,
				method: 'post',
				body: {
					year: body.year,
					stat: body.stat,
					...(body.mode === 'players'
						? { player: body.player }
						: { team: body.team })
				}
			})
		})
	})
});

export const { useGetFilterOptionsQuery, useLazyGenerateQuestionsQuery } =
	questionsQuery;
