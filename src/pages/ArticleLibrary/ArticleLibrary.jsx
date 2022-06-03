/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';
// import classes from './_articleLibrary.module.scss';
import Button from '../../components/button';
import _debounce from 'lodash/debounce';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Pagination from '@mui/material/Pagination';
import { useStyles } from './../../utils/styles';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getDateTime, formatDate, getCalendarText } from '../../utils';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import UploadOrEditArticle from '../../components/articles/uploadOrEditArticle';
import { useNavigate } from 'react-router-dom';
import { Markup } from 'interweave';
import {
	getAllArticlesApi,
	resetCalendarError,
	resetNoResultStatus,
	getSpecificArticle
} from './articleLibrarySlice';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import LoadingOverlay from 'react-loading-overlay';
import DefaultImage from '../../assets/defaultImage.png';
import { useStyles as globalUseStyles } from '../../styles/global.style';
const ArticleLibrary = () => {
	// Selectors
	const articles = useSelector((state) => state.ArticleLibraryStore.articles);

	const statusArticlesApi = useSelector((state) => state.ArticleLibraryStore);

	const totalRecords = useSelector(
		(state) => state.ArticleLibraryStore.totalRecords
	);

	const noResultStatus = useSelector(
		(state) => state.ArticleLibraryStore.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.ArticleLibraryStore.noResultStatusCalendar
	);

	const muiClasses = useStyles();
	const classes = globalUseStyles();
	const [showSlider, setShowSlider] = useState(false);
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
	const [rowStatus, setRowStatus] = useState('');

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
		//check
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
									getAllArticlesApi({
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
									getAllArticlesApi({
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
		article_title: 'title',
		post_date: 'postdate',
		labels: 'label',
		user: 'user',
		last_edit: 'lastedit',
		status: 'status'
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
							col?.dataField === 'article_title'
								? 0
								: col?.dataField === 'labels' ||
								  col?.dataField === 'post_date' ||
								  col?.dataField === 'last_edit' ||
								  col?.dataField === 'user' ||
								  col?.dataField === 'status'
								? 30
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
							col?.dataField === 'article_title'
								? 0
								: col?.dataField === 'labels' ||
								  col?.dataField === 'post_date' ||
								  col?.dataField === 'last_edit' ||
								  col?.dataField === 'user' ||
								  col?.dataField === 'status'
								? 30
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
							col?.dataField === 'article_title'
								? 0
								: col?.dataField === 'labels' ||
								  col?.dataField === 'post_date' ||
								  col?.dataField === 'last_edit' ||
								  col?.dataField === 'user' ||
								  col?.dataField === 'status'
								? 30
								: -4,
						bottom: '-2px'
					}}
				/>
			);
		return null;
	};

	const columns = [
		{
			dataField: 'article_title',
			text: 'ARTICLE TITLE',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				return (
					<div
						className={
							row.height < row.width
								? classes.virallandscape
								: // : row.width > row.height
								  // ? classes.viralpotrait
								  classes.mediaWrapper
						}
					>
						<Tooltip
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
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.thumbnail_url ? row?.thumbnail_url : row?.image
									}`}
									alt='no img'
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
							}}
						>
							<span>
								<img
									className={classes.mediaIcon}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.image}`}
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							</span>
						</Tooltip>

						<div className={classes.noWrapLibraryFileName}>
							<Markup
								// className={classes.noWrapLibraryFileName}
								content={row?.title}
							/>
						</div>
					</div>
				);
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
			dataField: 'labels',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LABELS',
			formatter: (content) => {
				//let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				// return <div className={classes.rowType}>{content}</div>;
				let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				return (
					// <div className={classes.labelsWrapper}>
					// 	{`${content[0]} ${secondLabel}`}
					// </div>
					<Markup
						className={classes.row}
						content={`${content[0]} ${secondLabel}`}
					/>
				);
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
					<Markup className={classes.row} content={`${content}`} />
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
				return <div className={classes.row}>{getDateTime(content)}</div>;
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
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.articlOptionRow}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'EDIT ARTICLE'}
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
			dispatch(getSpecificArticle(row.id));
			setEdit(true);
			setShowSlider(true);
			setRowStatus(row?.status);
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		// console.log('sort state use effect');
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getAllArticlesApi({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getAllArticlesApi({
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
				getAllArticlesApi({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllArticlesApi({
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

	useEffect(() => {
		//page switch and get scroll on top
		let tableBody = document.getElementsByTagName('tbody')[0];
		if (tableBody) {
			tableBody.scrollTop = 0;
		}
	}, [page]);

	const handleDebounceFun = () => {
		let _search;
		setSearch((prevState) => {
			_search = prevState;
			return _search;
		});
		if (_search) {
			dispatch(
				getAllArticlesApi({
					q: _search,
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllArticlesApi({
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
	const handleChangeSearch = (e) => {
		setSearch(e.target.value);
		debounceFun(e.target.value);
	};

	return (
		<LoadingOverlay
			active={statusArticlesApi.status === 'pending' ? true : false}
			// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
			spinner={
				<img
					src={Four33Loader}
					className={classes.libraryLoader}
					alt='loader'
				/>
			}
		>
			<Layout className={classes.articleLibrary}>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1 style={{ marginRight: '2rem' }}>ARTICLE LIBRARY</h1>
						<Button
							onClick={() => {
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD ARTICLE'}
						/>
					</div>
					<div className={classes.subheader2}>
						<div>
							<TextField
								className={classes.searchField}
								value={search}
								onKeyPress={(e) => {
									console.log(e, 'on key press');
									if (e.key === 'Enter' && search) {
										dispatch(
											getAllArticlesApi({
												q: search,
												page,
												startDate: formatDate(dateRange[0]),
												endDate: formatDate(dateRange[1]),
												...sortState
											})
										);
									} else if (e.key === 'Enter' && !search) {
										dispatch(
											getAllArticlesApi({
												page,
												startDate: formatDate(dateRange[0]),
												endDate: formatDate(dateRange[1]),
												...sortState
											})
										);
									}
								}}
								// onChange={(e) => {

								// 	setSearch(e.target.value);
								// 	//setIsSearch(true);
								// }}
								onChange={handleChangeSearch}
								placeholder={'Search post, user, label'}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput,
									style: { borderColor: noResultBorder },
									endAdornment: (
										<InputAdornment>
											<Search
												// onClick={() => {
												// 	console.log('search onclick');
												// 	if (search) {
												// 		dispatch(
												// 			getAllArticlesApi({
												// 				q: search,
												// 				page,
												// 				startDate: formatDate(dateRange[0]),
												// 				endDate: formatDate(dateRange[1]),
												// 				...sortState
												// 			})
												// 		);
												// 	} else {
												// 		dispatch(
												// 			getAllArticlesApi({
												// 				page,
												// 				startDate: formatDate(dateRange[0]),
												// 				endDate: formatDate(dateRange[1]),
												// 				...sortState
												// 			})
												// 		);
												// 	}
												// }}
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
					<Table rowEvents={tableRowEvents} columns={columns} data={articles} />
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
								paginationError
									? '1px solid red !important'
									: '1px solid #808080 !important'
							}`
						}}
						type={'number'}
						min={1}
						onChange={(e) => {
							console.log(e, 'onchange', page);
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
				<UploadOrEditArticle
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
						// setTimeout(() => setEdit(false), 600);
					}}
					title={edit ? 'Edit Article' : 'Article Builder'}
					heading1={edit ? 'Media File' : 'Add Media File'}
					buttonText={
						edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
					}
					status={rowStatus}
				/>
			</Layout>
		</LoadingOverlay>
	);
};

export default ArticleLibrary;
