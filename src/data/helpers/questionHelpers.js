import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateConstantTime, getDateTime } from '../utils';

export const questionTableColumns = [
	{
		dataField: 'question',
		text: 'QUESTION',
		sort: true,
		formatter: (content, row) =>
			getFormatter('textWithIcon', {
				content,
				showIcon: row.total_questions > 1
			})
	},
	{
		dataField: 'question_type',
		text: 'QUESTION TYPE',
		sort: true,
		formatter: (content) =>
			getFormatter('markup', { content: content?.toUpperCase() })
	},
	{
		dataField: 'post_date',
		text: 'POST DATE | TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('markup', { content: getDateTime(content) })
	},
	{
		dataField: 'end_date',
		text: 'END DATE | TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('markup', {
				content: content === '-' ? '-' : getDateConstantTime(content)
			})
	},
	{
		dataField: 'labels',
		text: 'LABELS',
		sort: true,
		formatter: (content) =>
			getFormatter('markup', {
				content: `${content[0]}${content[1] ? `, ${content[1]}` : ''}`
			})
	},
	{
		dataField: 'status',
		sort: true,
		text: 'STATUS',
		formatter: (content) => getFormatter('status', { status: content })
	},

	{
		dataField: 'participants',
		sort: true,
		text: 'PARTICIPANTS',
		formatter: (content) => getFormatter('markup', { content: `${content}` })
	},
	{
		dataField: 'user',
		sort: true,
		text: 'USER',
		formatter: (content) => getFormatter('markup', { content: `${content}` })
	},
	{
		dataField: 'location',
		text: 'LOCATION',
		sort: true,
		formatter: (content) => getFormatter('wrapper', { content })
	},
	{
		dataField: 'options',
		text: 'OPTIONS',
		formatter: () => getFormatter('options', { title: 'QUIZ DETAIL' })
	}
];

export const questionsFormInitialValues = {
	resultsUploadedFiles: [],
	positiveResultsUploadedFiles: [],
	negativeResultsUploadedFiles: [],
	general_info: {
		save_draft: true,
		question_type: 'poll',
		end_date: '',
		results: '',
		results_image: '',
		results_filename: '',
		results_dropbox_url: '',
		positive_results: '',
		positive_results_image: '',
		positive_results_filename: '',
		positive_results_dropbox_url: '',
		negative_results: '',
		negative_results_image: '',
		negative_results_filename: '',
		negative_results_dropbox_url: ''
	},
	questions: [
		{
			question: '',
			uploadedFiles: [],
			position: 1,
			labels: [],
			dropbox_url: '',
			pollAnswers: [
				{
					answer: '',
					type: 'poll',
					position: 0
				},
				{
					answer: '',
					type: 'poll',
					position: 1
				}
			],
			quizAnswers: [
				{
					answer: '',
					type: 'right_answer',
					position: 0
				},
				{
					answer: '',
					type: 'wrong_answer_1',
					position: 1
				}
			]
		}
	]
};
