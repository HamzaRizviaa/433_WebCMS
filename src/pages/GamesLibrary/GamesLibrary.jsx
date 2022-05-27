/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Markup } from 'interweave';
import DatePicker from 'react-datepicker';
import _debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllGames,
	getSpecificGame,
	resetCalendarError,
	resetNoResultStatus
} from './gamesLibrarySlice';

// Components
import GamesSlider from '../../components/games/uploadOrEditGame/GamesSlider';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';

// CSS / Material UI
import 'react-datepicker/dist/react-datepicker.css';
// import classes from './_gamesLibrary.module.scss';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../PostLibrary/_calender.scss';

// Utils
import { getDateTime, formatDate, getCalendarText } from '../../utils';
import { useStyles, useStyles2 } from './../../utils/styles';
import { useStyles as globalUseStyles } from '../../styles/global.style';
// Icons
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import DefaultImage from '../../assets/defaultImage.png';
import LoadingOverlay from 'react-loading-overlay';
const GamesLibrary = () => {
	const muiClasses = useStyles();
	const muiClasses2 = useStyles2();
	const classes = globalUseStyles();

	// Selector
	const games = useSelector((state) => state.GamesLibraryStore.gamesData);

	const gamesApiStatus = useSelector((state) => state.GamesLibraryStore);

	const totalRecords = useSelector(
		(state) => state.GamesLibraryStore.totalRecords
	);

	const noResultStatus = useSelector(
		(state) => state.GamesLibraryStore.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.GamesLibraryStore.noResultStatusCalendar
	);

	// State
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [page, setPage] = useState(1);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [paginationError, setPaginationError] = useState(false);
	const [search, setSearch] = useState('');
	const [noResultBorder, setNoResultBorder] = useState('#404040');
	const [noResultError, setNoResultError] = useState('');
	const [noResultCalendarBorder, setNoResultCalendarBorder] =
		useState('#404040');
	const [noResultCalendarError, setNoResultCalendarError] = useState('');
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [gameType, setGameType] = useState('');
	const [rowStatus, setrowStatus] = useState(''); //publish or draft

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		// console.log(current_date, 'curr');
		console.log(time_difference_minutes);
		if (time_difference_minutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

	const sortKeysMapping = {
		title: 'title',
		file_name: 'media',
		post_date: 'postdate',
		user: 'user',
		last_edit: 'lastedit',
		game_type: 'gametype',
		status: 'status'
	};

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
									getAllGames({
										q: search,
										page: 1,
										startDate,
										endDate,
										fromCalendar: true,
										...sortState
									})
								);
							} else {
								dispatch(
									getAllGames({
										q: search,
										page: 1,
										fromCalendar: true,
										...sortState
									})
								);
							}
							setPage(1);
						}}
					/>
				</span>
			</div>
		);
	});

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getAllGames({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getAllGames({
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
		if (search) {
			dispatch(
				getAllGames({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllGames({
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
							col?.dataField === 'gametype' || col?.dataField === 'game_type'
								? 10
								: col?.dataField === 'post_date' || col?.dataField === 'user'
								? 30
								: col?.dataField === 'status'
								? 28
								: col?.dataField === 'last_edit'
								? 21
								: -4,
						bottom: '-2px'
					}}
				/>
			);
		else if (order === 'asc')
			return (
				<ArrowDropUpIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'gametype' || col?.dataField === 'game_type'
								? 10
								: col?.dataField === 'post_date' || col?.dataField === 'user'
								? 30
								: col?.dataField === 'status'
								? 28
								: col?.dataField === 'last_edit'
								? 21
								: -4,
						bottom: '-2px'
					}}
				/>
			);
		else if (order === 'desc')
			return (
				<ArrowDropDownIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'gametype' || col?.dataField === 'game_type'
								? 10
								: col?.dataField === 'post_date' || col?.dataField === 'user'
								? 30
								: col?.dataField === 'status'
								? 28
								: col?.dataField === 'last_edit'
								? 21
								: -4,
						bottom: '-2px'
					}}
				/>
			);
		return null;
	};

	const columns = [
		{
			dataField: 'title',
			text: 'TITLE',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				return (
					<div className={classes.gamesTitleRow}>
						<Markup content={row?.title !== '' ? row?.title : '-'} />
					</div>
				);
			}
		},
		{
			dataField: 'file_name',
			text: 'MEDIA',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				return (
					<div className={classes.gamesMediaWrapper}>
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}

							title={
								<img
									className={
										row.width > row.height + 200
											? classes.virallandscapePreview
											: row.height > row.width + 200
											? classes.mediaIconPortraitPreview
											: classes.mediaIconPreview
										// row.width === row.height
										// 	? classes.mediaIconPreview
										// 	: row.width > row.height
										// 	? classes.virallandscapePreview
										// 	: classes.mediaIconPortraitPreview
									}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.game_image}`}
									alt='no img'
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.libraryToolTipArrow }
							}}
						>
							<span>
								{/* {row?.thumbnail_url ? (
									<PlayArrowIcon className={classes.playIcon} />
								) : (
									''
								)} */}
								{/* <PlayArrowIcon className={classes.playIcon} /> */}
								<img
									className={classes.mediaIcon}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.game_image}`}
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							</span>
						</Tooltip>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={
								<Markup
									content={row?.file_name?.length > 13 ? row?.file_name : ''}
								/>
							}
							arrow
							componentsProps={{
								tooltip: { className: classes.libraryToolTip },
								arrow: { className: classes.libraryToolTipArrow }
							}}
						>
							<div>
								<Markup
									className={classes.gamesFileName}
									content={row?.file_name !== '' ? row?.file_name : '-'}
								/>
							</div>
						</Tooltip>
					</div>
				);
			}
		},
		{
			dataField: 'game_type',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'GAME TYPE',
			formatter: (content) => {
				return (
					<div className={classes.rowType}>
						<Markup content={`${content} `} />
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '30px' };
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
			dataField: 'user',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'USER',
			formatter: (content) => {
				return (
					// <div className={classes.row}>{content}</div>
					<Markup className={classes.gamesRow} content={`${content}`} />
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
					<div className={`${classes.publish_draft_btn}`}>
						<Button
							onClick={() => {}}
							text={content == 'published' ? 'PUBLISHED' : 'DRAFT'}
							published={content == 'published' ? true : false}
						/>
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'last_edit',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LAST EDIT',
			formatter: (content) => {
				return <div className={classes.gamesRow}>{formatDate(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '38px' };
			}
		},
		{
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.gamesRow}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'EDIT GAMES'}
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
			dispatch(getSpecificGame(row.id));
			setEdit(true);
			setShowSlider(true);
			setrowStatus(row.status); // pass in slider
			setGameType(row.game_type);
		}
	};

	const handleDebounceFun = () => {
		let _search;
		setSearch((prevState) => {
			_search = prevState;
			return _search;
		});

		if (_search) {
			dispatch(
				getAllGames({
					q: _search,
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllGames({
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		setPage(1);
	};

	const debounceFun = useCallback(_debounce(handleDebounceFun, 600), []);

	const handleChangeSearch = (e) => {
		setSearch(e.target.value);
		debounceFun(e.target.value);
	};

	useEffect(() => {
		let tableBody = document.getElementsByTagName('tbody')[0];
		if (tableBody) {
			tableBody.scrollTop = 0;
		}
	}, [page]);

	return (
		<LoadingOverlay
			active={gamesApiStatus.status === 'pending' ? true : false}
			// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
			spinner={
				<img
					src={Four33Loader}
					className={classes.libraryLoader}
					alt='loader'
				/>
			}
		>
			<Layout>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1 style={{ marginRight: '2rem' }}>GAMES LIBRARY</h1>
						<Button
							onClick={() => {
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD GAME'}
						/>
					</div>
					<div className={classes.subheader2}>
						<div>
							<TextField
								className={`${classes.searchField} ${muiClasses2.root}`}
								value={search}
								// onKeyPress={(e) => {
								// 	if (e.key === 'Enter' && search) {
								// 		dispatch(
								// 			getAllGames({
								// 				q: search,
								// 				page,
								// 				startDate: formatDate(dateRange[0]),
								// 				endDate: formatDate(dateRange[1]),
								// 				...sortState
								// 			})
								// 		);
								// 	} else if (e.key === 'Enter' && !search) {
								// 		dispatch(
								// 			getAllGames({
								// 				page,
								// 				startDate: formatDate(dateRange[0]),
								// 				endDate: formatDate(dateRange[1]),
								// 				...sortState
								// 			})
								// 		);
								// 	}
								// }}
								onChange={handleChangeSearch}
								placeholder={'Search game'}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput,
									style: { borderColor: noResultBorder },
									endAdornment: (
										<InputAdornment>
											<Search className={classes.searchIcon} />
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
					<Table rowEvents={tableRowEvents} columns={columns} data={games} />
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
							setPaginationError(false);
							const value = Number(e.target.value);
							if (value > Math.ceil(totalRecords / 20)) {
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

				<GamesSlider
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
						// setTimeout(() => setEdit(false), 600);
					}}
					page={page}
					gameType={gameType}
					title={
						edit && gameType === 'JOGO'
							? 'Edit JOGO Game'
							: edit && gameType === 'ARCADE GAME'
							? 'Edit Arcade Game'
							: 'Upload Game'
					}
					heading1={edit ? 'Game Image' : 'Add Game Image'}
					buttonText={
						edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
					}
					status={rowStatus}
				/>
			</Layout>
		</LoadingOverlay>
	);
};

export default GamesLibrary;
