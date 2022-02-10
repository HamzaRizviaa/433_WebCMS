import React, { useState } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_quizLibrary.module.scss';
import Button from '../../components/button';
import UploadQuiz from '../../components/quizzes/uploadOrEditQuiz/UploadQuiz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getDateTime } from '../../utils';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import QuizDetails from '../../components/quizzes/uploadOrEditQuiz/QuizDetails';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Pagination from '@mui/material/Pagination';
import { useStyles } from './../../utils/styles';

const QuizLibrary = () => {
	const muiClasses = useStyles();
	const [showSlider, setShowSlider] = useState(false);
	const [showQuizSlider, setShowQuizSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [paginationError, setPaginationError] = useState(false);
	const [page, setPage] = useState(1);
	const sortKeysMapping = {
		question: 'question',
		post_date: 'postdate',
		end_date: 'enddate',
		labels: 'label',
		status: 'status',
		participants: 'participant',
		user: 'user'
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
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'end_date' ||
							col?.dataField === 'status'
								? 30
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
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'end_date' ||
							col?.dataField === 'status'
								? 30
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
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'end_date' ||
							col?.dataField === 'status'
								? 30
								: -4
					}}
				/>
			);
		return null;
	};

	const columns = [
		{
			dataField: 'question',
			text: 'QUESTION',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content) => {
				return <div className={classes.row}>{content}</div>;
			}
		},
		{
			dataField: 'post_date',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'POST DATE | TIME',
			formatter: (content) => {
				return <div className={classes.rowType}>{getDateTime(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'end_date',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'END DATE | TIME',
			formatter: (content) => {
				return <div className={classes.rowType}>{getDateTime(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'labels',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LABELS',
			formatter: (content) => {
				//let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				return <div className={classes.rowType}>{content}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'status',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'STATUS',
			formatter: (content) => {
				return (
					<div className={`${classes.active_closed_btn}`}>
						<Button
							onClick={() => {}}
							text={content == 'active' ? 'ACTIVE' : 'CLOSED'}
							active={content == 'active' ? true : false}
						/>
						{/* <Edit className={classes.editIcon} /> */}
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'participants',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'PARTICIPANTS',
			formatter: (content) => {
				return (
					<div className={classes.row}>{content}</div>
					// <Markup className={classes.row} content={`${content}`} />
				);
			}
		},
		{
			dataField: 'user',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'USER',
			formatter: (content) => {
				return (
					<div className={classes.row}>{content}</div>
					// <Markup className={classes.row} content={`${content}`} />
				);
			}
		},
		{
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.row}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'QUIZ DETAIL'}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<Edit className={classes.editIcon} />
						</Tooltip>
					</div>
				);
			}
		}
	];

	const data = [
		{
			question: 'Who will win the El Classico?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'closed',
			user: 'Lorem Ipsum'
		},
		{
			question: 'Que Pasa Harmano?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'active',
			user: 'Lorem Ipsum'
		},
		{
			question: 'Pakistannnnnnnnnnn <3?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'active',
			user: 'Lorem Ipsum'
		},
		{
			question: 'PAKISTAN vs INDIA?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'active',
			user: 'Lorem Ipsum'
		},
		{
			question: 'CRISTIANO?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'closed',
			user: 'Lorem Ipsum'
		},
		{
			question: 'RONALDO?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'active',
			user: 'Lorem Ipsum'
		},
		{
			question: 'THE BEST?',
			post_date: '2021-11-25T17:00:08.000Z',
			end_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			participants: 123,
			status: 'closed',
			user: 'Lorem Ipsum'
		}
	];

	const tableRowEvents = {
		onClick: (e, row) => {
			// if (!edit) {
			// dispatch(getSpecificPost(row.id));
			console.log(row);
			setEdit(true);
			setShowQuizSlider(true);
			// }
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1 style={{ marginRight: '2rem' }}>QUIZ LIBRARY</h1>
					<Button
						onClick={() => {
							setEdit(false);
							setShowSlider(true);
						}}
						text={'UPLOAD QUIZ'}
					/>
				</div>
				
			</div>
			<div className={classes.tableContainer}>
				<Table rowEvents={tableRowEvents} columns={columns} data={data} />
			</div>
			<div className={classes.paginationRow}>
				<Pagination
					className={muiClasses.root}
					page={page}
					onChange={handleChange}
					//	count={Math.ceil(totalRecords / 20)}
					count={Math.ceil(60 / 20)}
					variant='outlined'
					shape='rounded'
				/>
				<div className={classes.gotoText}>Go to page</div>
				<input
					style={{
						border: `${paginationError ? '1px solid red' : '1px solid #808080'}`
					}}
					type={'number'}
					min={1}
					onChange={(e) => {
						console.log(e, 'onchange', page);
						setPaginationError(false);
						const value = Number(e.target.value);
						//if (value > Math.ceil(totalRecords / 20)) {
						if (value > Math.ceil(60 / 20)) {
							setPaginationError(true);
							setPage(1);
						} else if (value) {
							setPage(value);
						} else {
							setPage(1);
						}
					}}
					className={classes.gotoInput}
				/>
			</div>

			<UploadQuiz
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				title={edit ? 'Quiz Detail' : 'Upload Quiz'}
				heading1={edit ? ' ' : 'Add Background Image'}
				buttonText={edit ? 'SAVE CHANGES' : 'ADD QUIZ'}
			/>
			<QuizDetails
				open={showQuizSlider}
				isEdit={edit}
				handleClose={() => {
					setShowQuizSlider(false);
				}}
				title={'Quiz Detail'}
			/>
		</Layout>
	);
};

export default QuizLibrary;
