/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { useState, useEffect } from 'react';
import Button from '../../button';
import Table from '../../table';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getDateTime, formatDate } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import PrimaryLoader from '../../PrimaryLoader';
import axios from 'axios';
import DeleteModal from '../../DeleteModal';
import DefaultImage from '../../../assets/defaultImage.png';
import PropTypes from 'prop-types';
import { getQuestions } from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { styled } from '@mui/material/styles';
import classes from '../UploadEditQuestion/_uploadOrEditQuiz.module.scss';
import { useStyles } from '../UploadEditQuestion/UploadOrEditQuiz.style';

import LinearProgress, {
	linearProgressClasses
} from '@mui/material/LinearProgress';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: '54px',
	borderRadius: '8px',
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === '#404040' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: '8px',
		backgroundColor: theme.palette.mode === '#404040' ? 'red' : '#808080'
	}
}));

// quiz and polls results tables

export default function QuizResults({
	handleClose,
	page,
	type,
	endDate,
	location,
	quiz,
	status,
	dialogWrapper,
	initialData,
	questionType,
	questionId
}) {
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [articleText, setArticleText] = useState('');
	const [articleImage, setArticleImage] = useState('');
	const [totalParticipants, setTotalParticipants] = useState(null);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [loading, setLoading] = useState(false);
	//api responses
	const [editQuestionResultDetail, setEditQuestionResultDetail] = useState('');
	const [participants, setParticipants] = useState([]);

	const dispatch = useDispatch();
	const articleQuestion = useStyles();

	useEffect(() => {
		if (initialData?.id) {
			getQuestionResultDetail(initialData?.id);
			getQuestionResulParticipant(initialData?.id);
		}
	}, [initialData]);

	useEffect(() => {
		if (questionType) {
			getQuestionResultDetail(questionId);
			getQuestionResulParticipant(questionId);
		}
	}, [questionId]);

	const getQuestionResultDetail = async (id) => {
		setLoading(true);
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/question/get-question-result-detail?question_id=${id}`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);

		if (response?.data?.data) {
			setLoading(false);
			return setEditQuestionResultDetail(response.data.data);
		} else {
			return [];
		}
	};

	const getQuestionResulParticipant = async (id, sortby, order_type) => {
		let response = [];

		if (id) {
			response = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/question/get-question-participant-listing?question_id=${id}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
		}
		if (id && order_type && sortby) {
			response = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/question/get-question-participant-listing?question_id=${id}&order_type=${order_type}&sort_by=${sortby}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
		}

		if (response?.data?.data) {
			return setParticipants(response.data.data);
		} else {
			return [];
		}
	};

	const sortKeysMapping = {
		username: 'username',
		answer: 'answer',
		date_and_time: 'datetime'
	};

	const sortRows = (order, col) => {
		if (order && col.dataField) {
			if (
				order.toUpperCase() != sortState.order_type ||
				sortKeysMapping[col.dataField] != sortState.sortby
			) {
				setSortState({
					sortby: sortKeysMapping[col.dataField],
					order_type: order.toUpperCase()
				});
			}
		}
		if (!order)
			return (
				<ArrowDropUpIcon
					className={classes.sortIcon}
					style={{
						backgroundColor: 'transparent',
						left:
							col?.dataField === 'answer' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'date_and_time'
								? -7
								: -4
					}}
				/>
			);
		else if (order === 'asc')
			return (
				<ArrowDropUpIcon
					className={classes.sortIconSelected}
					style={{
						backgroundColor: 'transparent',
						left:
							col?.dataField === 'answer' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_and_time'
								? -7
								: -4
					}}
				/>
			);
		else if (order === 'desc')
			return (
				<ArrowDropDownIcon
					className={classes.sortIconSelected}
					style={{
						backgroundColor: 'transparent',
						left:
							col?.dataField === 'answer' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_and_time'
								? -7
								: -4
					}}
				/>
			);
		return null;
	};

	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

	const deleteQuiz = async (id, draft, qtype) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/delete-question`,
				{
					question_id: id,
					is_draft: draft,
					question_type: qtype
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Question has been deleted!');
				handleClose();

				//setting a timeout for getting post after delete.
				dispatch(getQuestions({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Question!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
		setOpenDeletePopup(!openDeletePopup);
	};

	const columns = [
		{
			dataField: 'username',
			text: 'USERNAME',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content) => {
				return <div className={classes.rowData}>{content}</div>;
			}
		},
		{
			dataField: 'answer',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'ANSWER',
			formatter: (content) => {
				return <div className={classes.rowData}>{content}</div>;
			}
			// headerStyle: () => {
			// 	return { paddingLeft: '20px' };
			// }
		},
		{
			dataField: 'date_and_time',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'DATE AND TIME',
			formatter: (content) => {
				return <div className={classes.rowData}>{getDateTime(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '12px' };
			}
		}
	];

	// in case : we need to click on rows of table
	// const tableRowEvents = {
	// 	onClick: (e, row) => {
	// 		console.log(row);
	// 	}
	// };

	useEffect(() => {
		if (sortState.sortby && sortState.order_type) {
			getQuestionResulParticipant(
				editQuestionResultDetail?.id,
				sortState.sortby,
				sortState.order_type
			);
		}
	}, [sortState]);

	useEffect(() => {
		if (editQuestionResultDetail?.answers) {
			setTotalParticipants(editQuestionResultDetail?.total_participants);
			setArticleImage(
				`${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionResultDetail?.article_image}`
			);
			setArticleText(editQuestionResultDetail?.article_title);
			setAnswers(editQuestionResultDetail?.answers);
		}
	}, [editQuestionResultDetail]);

	return (
		<div>
			{/* {loading === true ? <PrimaryLoader /> : <></>} */}
			{location === 'article' ? (
				<div className={articleQuestion.articlesQuizDetails}>
					<div className={articleQuestion.articlesbox}>
						<div>
							<img
								src={articleImage}
								className={articleQuestion.articlesImagebox}
								alt='no img'
								onError={(e) => (
									(e.target.onerror = null), (e.target.src = DefaultImage)
								)}
							/>
						</div>
						<div className={articleQuestion.articlesTextbox}>
							<div className={articleQuestion.articleText}>ARTICLE</div>
							<div className={articleQuestion.articleTitle}>{articleText}</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
			<div className={classes.QuizQuestion}>
				{editQuestionResultDetail.question}
			</div>
			{answers?.length > 0 &&
				answers.map((data, index) => {
					return (
						<div className={classes.QuizDetailsProgressBars} key={index}>
							<div className={classes.progressBars}>
								<BorderLinearProgress
									variant='determinate'
									value={
										totalParticipants !== 0
											? Math.round(data?.users_count / totalParticipants) * 100
											: 0
									}
								/>
								<div className={classes.progressbarTextBox}>
									<div>
										<span className={classes.leftprogressbarText}>
											{data?.answer}
										</span>
										<span className={classes.rightProgressText}>
											%
											{totalParticipants !== 0
												? Math.round(data?.users_count / totalParticipants) *
												  100
												: 0}
											| {data?.users_count}
											{data?.users_count === 1 ? 'User' : 'Users'}
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}

			<div className={classes.QuizDetailstextUsers}>
				<span>
					{totalParticipants}{' '}
					{totalParticipants === 1 ? 'Participant' : 'Participants'}
				</span>
				{location === 'article' ? '' : <span>Ends {formatDate(endDate)} </span>}
			</div>
			<div className={classes.QuizDetailsHeading}>Participants</div>
			<div className={classes.QuizDetailstableContainer}>
				<Table
					// rowEvents={tableRowEvents}
					columns={columns}
					data={participants.length > 0 ? participants : ''}
				/>
			</div>

			<div className={classes.questionRow}>
				{totalParticipants === 0 && 'No Data Found'}
			</div>
			<br />
			<br />

			{location === 'article' || status !== 'draft' ? (
				<></>
			) : (
				<div style={{ width: '100%', paddingBottom: '10%' }}>
					<Button
						disabled={deleteBtnStatus}
						button2={true}
						onClick={() => {
							if (!deleteBtnStatus) {
								toggleDeleteModal();
							}
						}}
						text={type === 'quiz' ? 'DELETE QUIZ' : 'DELETE POLL'}
					/>
				</div>
			)}

			<DeleteModal
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteQuiz(
						editQuestionResultDetail?.id,
						status.toLowerCase(),
						quiz ? 'quiz' : 'poll'
					);
				}}
				text={type === 'quiz' ? 'Quiz' : 'Poll'}
				wrapperRef={dialogWrapper}
			/>
		</div>
	);
}

QuizResults.propTypes = {
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	type: PropTypes.string,
	status: PropTypes.string,
	questionType: PropTypes.string,
	questionId: PropTypes.number,
	quiz: PropTypes.bool,
	initialData: PropTypes.obj,
	location: PropTypes.string,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	endDate: PropTypes.any
};
