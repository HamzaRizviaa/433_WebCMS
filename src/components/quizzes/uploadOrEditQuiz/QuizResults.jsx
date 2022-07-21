import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import classes from './_uploadOrEditQuiz.module.scss';
import Button from '../../../components/button';
import Table from '../../../components/table';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getDateTime, formatDate } from '../../../utils';
import LinearProgress, {
	linearProgressClasses
} from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';

import {
	getQuestions,
	getQuestionResulParticipant
} from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import PrimaryLoader from '../../PrimaryLoader';
import axios from 'axios';
import DeleteModal from '../../DeleteModal';
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

export default function QuizResults({
	handleClose,
	page,
	type,
	status,
	quiz,
	dialogWrapper
}) {
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [firstUserPercentage, setFirstUserPercentage] = useState(null);
	const [secondUserPercentage, setSecondtUserPercentage] = useState(null);
	const [ans1, setAns1] = useState('');
	const [ans2, setAns2] = useState('');
	const [ans1Users, setAns1Users] = useState(null);
	const [ans2Users, setAns2Users] = useState(null);
	const [totalParticipants, setTotalParticipants] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const dispatch = useDispatch();

	const editQuestionResultDetail = useSelector(
		(state) => state.questionLibrary.questionResultDetail
	);

	const participants = useSelector(
		(state) => state.questionLibrary.questionResultParticipant
	);

	const { questionEditStatus } = useSelector((state) => state.questionLibrary);

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
			dispatch(
				getQuestionResulParticipant({
					id: editQuestionResultDetail?.id,
					type: editQuestionResultDetail?.question_type,
					...sortState
				})
			);
		}
	}, [sortState]);

	useEffect(() => {
		if (editQuestionResultDetail?.answers) {
			setTotalParticipants(editQuestionResultDetail?.total_participants);
			setAns1Users(editQuestionResultDetail?.answers[0]?.users_count);
			setAns2Users(editQuestionResultDetail?.answers[1]?.users_count);
			setFirstUserPercentage(
				editQuestionResultDetail?.total_participants !== 0
					? Math.round(
							(editQuestionResultDetail?.answers[0]?.users_count /
								editQuestionResultDetail?.total_participants) *
								100
					  )
					: 0
			);
			setSecondtUserPercentage(
				editQuestionResultDetail?.total_participants !== 0
					? Math.round(
							(editQuestionResultDetail?.answers[1]?.users_count /
								editQuestionResultDetail?.total_participants) *
								100
					  )
					: 0
			);

			setAns1(editQuestionResultDetail?.answers[0]?.answer);
			setAns2(editQuestionResultDetail?.answers[1]?.answer);
			setEndDate(
				formatDate(
					editQuestionResultDetail?.poll_end_date ??
						editQuestionResultDetail?.quiz_end_date
				)
			);
		}
	}, [editQuestionResultDetail]);

	return (
		<div>
			{questionEditStatus === 'loading' ? <PrimaryLoader /> : <></>}
			<div className={classes.QuizQuestion}>
				{editQuestionResultDetail.question}
			</div>
			<div className='articlesQuizDetails'></div>
			<div className={classes.QuizDetailsProgressBars}>
				<div className={classes.progressBars}>
					<BorderLinearProgress
						variant='determinate'
						value={firstUserPercentage}
					/>
					<div className={classes.progressbarTextBox}>
						<div>
							<span className={classes.leftprogressbarText}>{ans1}</span>
							<span className={classes.rightProgressText}>
								%{firstUserPercentage} | {ans1Users}{' '}
								{ans1Users === 1 ? 'User' : 'Users'}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.QuizDetailsProgressBars}>
				<div className={classes.progressBars}>
					<BorderLinearProgress
						variant='determinate'
						value={secondUserPercentage}
					/>
					<div className={classes.progressbarTextBox}>
						<div>
							<span className={classes.leftprogressbarText}>{ans2}</span>
							<span className={classes.rightProgressText}>
								%{secondUserPercentage} | {ans2Users}{' '}
								{ans2Users === 1 ? 'User' : 'Users'}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.QuizDetailstextUsers}>
				<span>
					{totalParticipants}{' '}
					{totalParticipants === 1 ? 'Participant' : 'Participants'}
				</span>
				<span>Ends {endDate} </span>
			</div>
			<div className={classes.QuizDetailsHeading}>Participants</div>
			<div className={classes.QuizDetailstableContainer}>
				<Table
					// rowEvents={tableRowEvents}
					columns={columns}
					data={participants}
				/>
			</div>
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
	quiz: PropTypes.bool,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired
};
