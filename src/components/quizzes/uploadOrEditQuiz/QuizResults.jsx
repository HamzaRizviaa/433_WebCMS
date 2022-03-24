import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import classes from './_uploadOrEditQuiz.module.scss';
import Button from '../../../components/button';
import Table from '../../../components/table';
// import { useStyles } from './quizStyles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getDateTime } from '../../../utils';
import LinearProgress, {
	linearProgressClasses
} from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

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

export default function QuizResults() {
	// const muiClasses = useStyles();
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [firstUserPercentage, setFirstUserPercentage] = useState(null);
	const [secondUserPercentage, setSecondtUserPercentage] = useState(null);
	const [ans1, setAns1] = useState('');
	const [ans2, setAns2] = useState('');
	const [ans1Users, setAns1Users] = useState(null);
	const [ans2Users, setAns2Users] = useState(null);
	const [totalParticipants, setTotalParticipants] = useState(null);

	const editQuestionResultDetail = useSelector(
		(state) => state.questionLibrary.questionResultDetail
	);

	const sortKeysMapping = {
		username: 'username',
		answers: 'postdate',
		date_time: 'enddate'
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
							col?.dataField === 'answers' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'date_time'
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
							col?.dataField === 'answers' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_time'
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
							col?.dataField === 'answers' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_time'
								? -7
								: -4
					}}
				/>
			);
		return null;
	};

	const data = [
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z'
		},

		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z'
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z'
		}
	];

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
			dataField: 'answers',
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
			dataField: 'date_time',
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

	const tableRowEvents = {
		onClick: (e, row) => {
			// if (!edit) {
			// dispatch(getSpecificPost(row.id));
			console.log(row);

			// }
		}
	};

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
		}
	}, [editQuestionResultDetail]);

	return (
		<div>
			<div className={classes.QuizQuestion}>
				{editQuestionResultDetail.question}
			</div>
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
								%{firstUserPercentage} | {ans1Users} Users
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
								%{secondUserPercentage} | {ans2Users} Users
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.QuizDetailstextUsers}>
				<span>{totalParticipants} Participants</span>
				<span>Ends 24.01.2022 </span>
			</div>
			<div className={classes.QuizDetailsHeading}>Participants</div>
			<div className={classes.QuizDetailstableContainer}>
				<Table rowEvents={tableRowEvents} columns={columns} data={data} />
			</div>
			<div style={{ width: '100%', paddingBottom: '10%' }}>
				<Button
					disabled={false}
					button2={true}
					onClick={() => {
						console.log('delete qquiz');
					}}
					text={'DELETE QUIZ'}
				/>
			</div>
		</div>
	);
}
