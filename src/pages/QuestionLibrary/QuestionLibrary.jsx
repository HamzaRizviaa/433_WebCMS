/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import Layout from '../../components/layout';
import _debounce from 'lodash/debounce';
import Table from '../../components/table';
import Button from '../../components/button';
import { ReactComponent as MenuIcon } from '../../assets/Union.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import UploadOrEditQuiz from '../../components/Questions/UploadEditQuestion/UploadOrEditQuiz';
import QuizDetails from '../../components/Questions/QuestionDetails/QuizDetails';
import PollDetails from '../../components/Questions/QuestionDetails/PollDetails';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Pagination from '@mui/material/Pagination';
import { useStyles } from '../../utils/styles';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	getDateTime,
	getDateConstantTime,
	formatDate,
	getCalendarText
} from '../../utils';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import { Markup } from 'interweave';
import { useStyles as globalUseStyles } from '../../styles/global.style';
// import './_calender.scss';
import {
	getQuestions,
	resetCalendarError,
	resetNoResultStatus,
	getQuestionEdit
} from './questionLibrarySlice';
import { getAllNewLabels } from '../PostLibrary/postLibrarySlice';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import LoadingOverlay from 'react-loading-overlay';
import { useNavigate } from 'react-router-dom';

const QuestionLibrary = () => {
	// Selectors
	const questions = useSelector((state) => state.questionLibrary.questions);
	const statusQuestionApi = useSelector((state) => state.questionLibrary);
	const totalRecords = useSelector(
		(state) => state.questionLibrary.totalRecords
	);
	const noResultStatus = useSelector(
		(state) => state.questionLibrary.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.questionLibrary.noResultStatusCalendar
	);

	const navigate = useNavigate();
	const muiClasses = useStyles();
	const classes = globalUseStyles();
	const [showSlider, setShowSlider] = useState(false);
	const [showQuizSlider, setShowQuizSlider] = useState(false);
	const [showPollSlider, setShowPollSlider] = useState(false);
	const [rowStatus, setrowStatus] = useState('');
	const [rowLocation, setrowLocation] = useState('');
	const [rowType, setRowType] = useState('');
	const [edit, setEdit] = useState(false);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [paginationError, setPaginationError] = useState(false);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [noResultBorder, setNoResultBorder] = useState('#404040');
	const [noResultError, setNoResultError] = useState('');
	const [noResultCalendarBorder, setNoResultCalendarBorder] =
		useState('#404040');
	const [noResultCalendarError, setNoResultCalendarError] = useState('');
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [notifID, setNotifID] = useState('');
	const [editSlider, showEditSlider] = useState(false);
	const [questionId, setQuestionId] = useState('');

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		console.log(time_difference_minutes);
		if (time_difference_minutes <= 1.5) {
			// setLogout(true);
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
		const startDate = formatDate(dateRange[0]);
		const endDate = formatDate(dateRange[1]);
		return (
			<div
				className={classes.customDateInput}
				onClick={onClick}
				ref={ref}
				style={{ borderColor: noResultCalendarBorder }}
			>
				{getCalendarText(startDate, endDate)}
				<span
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<Calendar
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (startDate && endDate) {
								dispatch(
									getQuestions({
										q: search,
										page,
										startDate,
										endDate,
										fromCalendar: true,
										...sortState
									})
								);
							} else {
								dispatch(
									getQuestions({
										q: search,
										page,
										fromCalendar: true,
										...sortState
									})
								);
							}
						}}
					/>
				</span>
			</div>
		);
	});

	const dispatch = useDispatch();

	const sortKeysMapping = {
		question: 'question',
		question_type: 'questiontype',
		post_date: 'postdate',
		end_date: 'enddate',
		labels: 'label',
		status: 'status',
		participants: 'participants',
		user: 'user',
		location: 'location'
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
								: -4,
						bottom: '6px'
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
								: -4,
						bottom: '6px'
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
								: -4,
						bottom: '6px'
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
			formatter: (content, row) => {
				return (
					//<div className={classes.questionRow}>{content}</div>
					<div
						className={classes.questionRow}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						{row.total_questions > 1 ? (
							<MenuIcon style={{ marginRight: '10px', minWidth: '20px' }} />
						) : (
							<div style={{ marginRight: '10px', minWidth: '20px' }}></div>
						)}

						<Markup content={`${content}`} />
					</div>
				);
			}
		},
		{
			dataField: 'question_type',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'QUESTION TYPE',
			formatter: (content) => {
				return (
					//<div className={classes.questionRow}>{content}</div>
					<div className={classes.questionRow} style={{ paddingLeft: '18px' }}>
						<Markup content={`${content}`} />
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '18px' };
			}
		},
		{
			dataField: 'post_date',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'POST DATE | TIME',
			formatter: (content) => {
				return (
					<div className={classes.questionRowType}>{getDateTime(content)}</div>
				);
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
				return (
					<div className={classes.questionRowType}>
						{content === '-' ? '-' : getDateConstantTime(content)}
					</div>
				);
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
				let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				return (
					<div className={classes.questionRowType}>
						<Markup content={`${content[0]} ${secondLabel}`} />
					</div>
				);
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
					<div className={classes.active_closed_btn}>
						<Button onClick={() => {}} text={content} active={content} />
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
					<div className={classes.questionRow} style={{ paddingLeft: '10px' }}>
						<Markup content={`${content}`} />
					</div>
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
					<div className={classes.questionRow}>
						<Markup content={`${content}`} />
					</div>
				);
			}
		},
		{
			dataField: 'location',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LOCATION',
			formatter: (content) => {
				return (
					<div className={classes.questionRow}>
						<div className={classes.questionLocation}>{content}</div>
					</div>
				);
			}
		},
		{
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.questionRow}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'QUIZ DETAIL'}
							arrow
							componentsProps={{
								tooltip: { className: classes.libraryToolTip },
								arrow: { className: classes.libraryToolTipArrow }
							}}
						>
							<Edit className={classes.editIcon} />
						</Tooltip>
					</div>
				);
			}
		}
	];

	const tableRowEvents = {
		onClick: (e, row) => {
			// if (!edit) {
			// dispatch(getSpecificPost(row.id));
			setEdit(true);
			setNotifID(row.id);
			setRowType(row.question_type); // quiz , poll
			setrowStatus(row.status); // active , closed , draft
			setrowLocation(row.location); // home page , article
			setQuestionId(row.question_id);

			//api calls
			row.status === 'draft' && dispatch(getAllNewLabels());
			dispatch(getQuestionEdit({ id: row.id, type: row.question_type }));

			//slider calls
			if (rowLocation === 'article') {
				row.question_type === 'quiz'
					? setShowQuizSlider(true)
					: setShowPollSlider(true);
			} else if (rowLocation === 'homepage') {
				showEditSlider(true);
			}
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		console.log('sort state use effect');
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getQuestions({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getQuestions({
					q: search,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					page,
					...sortState
				})
			);
		}
	}, [sortState]);

	useEffect(() => {
		// console.log('search use effect');
		if (search) {
			dispatch(
				getQuestions({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getQuestions({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
	}, [page]);

	useEffect(() => {
		if (noResultStatus) {
			setNoResultBorder('#FF355A');
			setNoResultError('No Results Found');
			setTimeout(() => {
				dispatch(resetNoResultStatus());
				setNoResultBorder('#404040');
				setNoResultError('');
			}, [5000]);
		}
	}, [noResultStatus]);

	useEffect(() => {
		if (noResultStatusCalendar) {
			setNoResultCalendarBorder('#FF355A');
			setNoResultCalendarError('No Results Found');
			setTimeout(() => {
				dispatch(resetCalendarError());
				setNoResultCalendarBorder('#404040');
				setNoResultCalendarError('');
			}, [5000]);
		}
	}, [noResultStatusCalendar]);

	useEffect(() => {
		return () => {
			setNoResultBorder('#404040');
			setNoResultError('');
			setNoResultCalendarBorder('#404040');
			setNoResultCalendarError('');
			dispatch(resetCalendarError());
			dispatch(resetNoResultStatus());
		};
	}, []);

	const handleDebounceFun = () => {
		let _search;
		setSearch((prevState) => {
			_search = prevState;
			return _search;
		});
		if (_search) {
			dispatch(
				getQuestions({
					q: _search,
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getQuestions({
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		setPage(1);
	};

	const debounceFun = useCallback(_debounce(handleDebounceFun, 1000), []);

	return (
		<LoadingOverlay
			active={statusQuestionApi.status === 'pending' ? true : false}
			// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
			spinner={
				<img
					src={Four33Loader}
					className={classes.libraryLoader}
					alt='loader'
				/>
			}
		>
			{/* {logout ? (
				<LogoutToaster text={'Your session has expired!'} enabled={enabled} />
			) : (
				<> </>
			)} */}

			<Layout>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1 style={{ marginRight: '2rem' }}>QUESTION LIBRARY</h1>
						<Button
							onClick={() => {
								dispatch(getAllNewLabels());
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD QUESTION'}
						/>
					</div>
					<div className={classes.subheader2}>
						<div>
							<TextField
								className={classes.searchField}
								value={search}
								onKeyPress={(e) => {
									console.log(e, 'on key press');
									// if (e.key === 'Enter' && search) {
									// 	dispatch(
									// 		getQuestions({
									// 			q: search,
									// 			page,
									// 			startDate: formatDate(dateRange[0]),
									// 			endDate: formatDate(dateRange[1]),
									// 			...sortState
									// 		})
									// 	);
									// } else if (e.key === 'Enter' && !search) {
									// 	dispatch(
									// 		getQuestions({
									// 			page,
									// 			startDate: formatDate(dateRange[0]),
									// 			endDate: formatDate(dateRange[1]),
									// 			...sortState
									// 		})
									// 	);
									// }
								}}
								onChange={(e) => {
									setSearch(e.target.value);
									//setIsSearch(true);
								}}
								placeholder={'Search post, user, label'}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput,
									style: { borderColor: noResultBorder },
									endAdornment: (
										<InputAdornment>
											<Search
												onClick={() => {
													// console.log('search onclick');
													if (search) {
														dispatch(
															getQuestions({
																q: search,
																page,
																startDate: formatDate(dateRange[0]),
																endDate: formatDate(dateRange[1]),
																...sortState
															})
														);
													} else {
														dispatch(
															getQuestions({
																page,
																startDate: formatDate(dateRange[0]),
																endDate: formatDate(dateRange[1]),
																...sortState
															})
														);
													}
												}}
												className={classes.searchIcon}
											/>
										</InputAdornment>
									)
								}}
							/>
							<p className={classes.noResultError}>{noResultError}</p>
						</div>
						<div className={classes.calendarWrapper}>
							<DatePicker
								customInput={<ExampleCustomInput />}
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								maxDate={new Date()}
								onChange={(update) => {
									setDateRange(update);
								}}
								placement='center'
								isClearable={true}
							/>
							<p className={classes.noResultError}>{noResultCalendarError}</p>
						</div>
					</div>
				</div>
				<div className={classes.tableContainer}>
					<Table
						rowEvents={tableRowEvents}
						columns={columns}
						data={questions}
					/>
				</div>

				<div className={classes.paginationRow}>
					<Pagination
						className={muiClasses.root}
						page={page}
						onChange={handleChange}
						count={Math.ceil(totalRecords / 20)}
						variant='outlined'
						shape='rounded'
					/>
					<div className={classes.gotoText}>Go to page</div>
					<input
						style={{
							border: `${
								paginationError ? '1px solid red' : '1px solid #808080'
							}`
						}}
						type={'number'}
						min={1}
						onChange={(e) => {
							// console.log(e, 'onchange', page);
							setPaginationError(false);
							const value = Number(e.target.value);
							if (value > Math.ceil(totalRecords / 20)) {
								// if (value > Math.ceil(60 / 20)) {
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
				{/* upload */}
				<UploadOrEditQuiz
					open={showSlider}
					location={rowLocation}
					status={rowStatus} //active closed draft
					handleClose={() => {
						setShowSlider(false);
					}}
					isEdit={false}
					buttonText={
						edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'
					}
				/>
				{/* edit question */}
				<UploadOrEditQuiz
					isEdit={edit}
					open={editSlider}
					notifID={notifID}
					location={rowLocation}
					rowType={rowType}
					status={rowStatus} //active closed draft
					handleClose={() => {
						showEditSlider(false);
					}}
					buttonText={
						edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'
					}
				/>

				<QuizDetails
					page={page}
					open={showQuizSlider}
					isEdit={edit}
					handleClose={() => {
						setShowQuizSlider(false);
					}}
					questionId={questionId}
					questionType={rowType}
					status={rowStatus} //open closed
					location={rowLocation} //Article / HomePage
					title={rowStatus === 'draft' ? 'Edit Quiz' : 'Quiz Detail'}
					heading1={edit ? 'Add Background Image' : 'Add Background Image'}
					buttonText={
						edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'
					}
					notifID={notifID}
				/>
				<PollDetails
					page={page}
					open={showPollSlider}
					isEdit={edit}
					handleClose={() => {
						setShowPollSlider(false);
					}}
					questionId={questionId}
					questionType={rowType}
					status={rowStatus} //open / closed
					location={rowLocation} //Article / HomePage
					title={rowStatus === 'draft' ? 'Edit Poll' : 'Poll Detail'}
					heading1={edit ? 'Add Background Image' : 'Add Background Image'}
					buttonText={
						edit && rowStatus === 'draft' ? 'PUBLISH' : 'SAVE CHANGES'
					}
					notifID={notifID}
				/>
			</Layout>
		</LoadingOverlay>
	);
};

export default QuestionLibrary;
