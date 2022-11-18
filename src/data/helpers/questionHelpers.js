/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { omit } from 'lodash';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateConstantTime, getDateTime } from '../utils';
import uploadFilesToS3 from '../utils/uploadFilesToS3';
import { getRelativePath } from './commonHelpers';

const { REACT_APP_MEDIA_ENDPOINT } = process.env;

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

export const questionSlideInitialValues = {
	question: '',
	uploadedFiles: [],
	labels: [],
	dropbox_url: '',
	pollAnswers: [
		{
			answer: '',
			type: 'poll'
		},
		{
			answer: '',
			type: 'poll'
		}
	],
	quizAnswers: [
		{
			answer: '',
			type: 'right_answer'
		},
		{
			answer: '',
			type: 'wrong_answer_1'
		}
	]
};

export const questionsFormInitialValues = {
	resultsUploadedFiles: [],
	positiveResultsUploadedFiles: [],
	negativeResultsUploadedFiles: [],
	general_info: {
		save_draft: true,
		question_type: 'poll',
		end_date: null,
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
	questions: []
};

export const questionDataFormatterForService = async (values, isDraft) => {
	const pollFilesToUpload = [values.resultsUploadedFiles[0] || null];
	const quizFilesToUpload = [
		values.positiveResultsUploadedFiles[0] || null,
		values.negativeResultsUploadedFiles[0] || null
	];

	values.questions.forEach((item) => {
		if (values.general_info.question_type === 'poll') {
			pollFilesToUpload.push(item.uploadedFiles[0] || null);
		} else {
			quizFilesToUpload.push(item.uploadedFiles[0] || null);
		}
	});

	let pollUploadedFiles = [null];
	let quizUploadedFiles = [null, null];

	if (values.general_info.question_type === 'poll') {
		pollUploadedFiles = await uploadFilesToS3(
			pollFilesToUpload,
			'questionLibrary'
		);
	} else {
		quizUploadedFiles = await uploadFilesToS3(
			quizFilesToUpload,
			'questionLibrary'
		);
	}

	const [resultsFile, ...pollSlideFiles] = pollUploadedFiles;
	const [positiveResultsFile, negativeResultFile, ...quizSlideFiles] =
		quizUploadedFiles;

	const payload = {
		general_info: {
			...values.general_info,
			save_draft: isDraft,
			end_date: dayjs(values.end_date).format('YYYY-MM-DD'),
			results_image: getRelativePath(resultsFile?.media_url),
			results_filename: resultsFile?.file_name || '',
			positive_results_image: getRelativePath(positiveResultsFile?.media_url),
			positive_results_filename: positiveResultsFile?.file_name || '',
			negative_results_image: getRelativePath(negativeResultFile?.media_url),
			negative_results_filename: negativeResultFile?.file_name || ''
		},
		questions: values.questions.map((item, index) => ({
			position: index + 1,
			...omit(item, ['uploadedFiles', 'pollAnswers', 'quizAnswers']),
			...(values.general_info.question_type === 'poll'
				? {
						image: getRelativePath(pollSlideFiles[index]?.media_url),
						file_name: pollSlideFiles[index]?.file_name || '',
						height: pollSlideFiles[index]?.height || 0,
						width: pollSlideFiles[index]?.width || 0
				  }
				: {
						image: getRelativePath(quizSlideFiles[index]?.media_url),
						file_name: quizSlideFiles[index]?.file_name || '',
						height: quizSlideFiles[index]?.height || 0,
						width: quizSlideFiles[index]?.width || 0
				  }),
			answers:
				values.general_info.question_type === 'poll'
					? item.pollAnswers.map((item, index) => ({
							...item,
							position: index + 1
					  }))
					: item.quizAnswers.map((item, index) => ({
							...item,
							position: index + 1,
							type: index > 1 ? `wrong_answer_${index + 1}` : item.type
					  }))
		})),
		...(values.question_id ? { question_id: values.question_id } : {})
	};

	return payload;
};

const updatingQuestionsSlides = (questionsSlides = [], type) => {
	return questionsSlides.map(({ answers, labels, ...rest }) => {
		const labelsArray = labels.map((item) => ({ id: -1, name: item }));

		if (type === 'poll') {
			return {
				...rest,
				uploadedFiles: rest.image
					? [
							{
								file_name: rest.file_name,
								media_url: `${REACT_APP_MEDIA_ENDPOINT}/${rest.image}`,
								height: rest.height,
								width: rest.width
							}
					  ]
					: [],
				labels: labelsArray,
				pollAnswers: answers,
				quizAnswers: questionSlideInitialValues.quizAnswers
			};
		} else {
			return {
				...rest,
				uploadedFiles: rest.image
					? [
							{
								file_name: rest.file_name,
								media_url: rest.image,
								height: rest.height,
								width: rest.width
							}
					  ]
					: [],
				labels: labelsArray,
				quizAnswers: answers,
				pollAnswers: questionSlideInitialValues.pollAnswers
			};
		}
	});
};

export const questionDataFormatterForForm = (question) => {
	const { id, summary, questions, ...rest } = question;

	const formattedQuestion = {
		question_id: id,
		...(question.question_type === 'poll'
			? {
					resultsUploadedFiles: summary.results_image
						? [
								{
									file_name: summary.results_filename,
									media_url: `${REACT_APP_MEDIA_ENDPOINT}/${summary.results_image}`
								}
						  ]
						: [],
					positiveResultsUploadedFiles: [],
					negativeResultsUploadedFiles: []
			  }
			: {
					resultsUploadedFiles: [],
					positiveResultsUploadedFiles: summary.positive_results_image
						? [
								{
									file_name: summary.positive_results_filename,
									media_url: `${REACT_APP_MEDIA_ENDPOINT}/${summary.positive_results_image}`
								}
						  ]
						: [],
					negativeResultsUploadedFiles: summary.negative_results_image
						? [
								{
									file_name: summary.negative_results_filename,
									media_url: `${REACT_APP_MEDIA_ENDPOINT}/${summary.negative_results_image}`
								}
						  ]
						: []
			  }),
		general_info: {
			...omit(rest, ['created_at', 'updated_at', 'status']),
			end_date: new Date(rest.end_date),
			...(question.question_type === 'poll'
				? {
						results: summary.results,
						results_dropbox_url: summary.results_dropbox_url
				  }
				: {
						negative_results: summary.negative_results,
						negative_results_dropbox_url: summary.negative_results_dropbox_url,
						positive_results: summary.positive_results,
						positive_results_dropbox_url: summary.positive_results_dropbox_url
				  })
		},
		questions: updatingQuestionsSlides(questions, question.question_type)
	};

	return formattedQuestion;
};
