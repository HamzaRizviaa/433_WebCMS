/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_articleLibrary.module.scss';
import Button from '../../components/button';
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
	resetNoResultStatus
} from './articleLibrarySlice';

const ArticleLibrary = () => {
	// Selectors
	const articles = useSelector((state) => state.ArticleLibraryStore.articles);
	console.log(articles, 'articles');

	const totalRecords = useSelector(
		(state) => state.ArticleLibraryStore.totalRecords
	);
	console.log(totalRecords, 'totalRecords');
	const noResultStatus = useSelector(
		(state) => state.postLibrary.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.postLibrary.noResultStatusCalendar
	);

	const muiClasses = useStyles();

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
		article_title: 'articleTitle',
		post_date: 'postdate',
		labels: 'label',
		user: 'user',
		last_edit: 'lastedit'
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
							col?.dataField === 'article_title' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'last_edit' ||
							col?.dataField === 'user'
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
							col?.dataField === 'article_title' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'last_edit' ||
							col?.dataField === 'user'
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
							col?.dataField === 'article_title' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'last_edit' ||
							col?.dataField === 'user'
								? 30
								: -4
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
				console.log(content, row, 'abc');
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
						{console.log(row.width, row.height)}
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}

							title={
								row?.thumbnail_url ? (
									<video
										id={'my-video'}
										poster={row.thumbnail_url}
										autoPlay
										muted
										className={
											row.width === row.height
												? classes.mediaIconPreview
												: row.width > row.height
												? classes.virallandscapePreview
												: classes.mediaIconPortraitPreview
										}
										controls={true}
									>
										<source
											src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.media}`}
										/>
									</video>
								) : (
									<img
										className={
											row.width === row.height
												? classes.mediaIconPreview
												: row.width > row.height
												? classes.virallandscapePreview
												: classes.mediaIconPortraitPreview
										}
										src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
											row?.thumbnail_url ? row?.thumbnail_url : row?.image
										}`}
										alt='no img'
									/>
								)
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
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
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.thumbnail_url ? row?.thumbnail_url : row?.media
									}`}
								/>
							</span>
						</Tooltip>
						<div className={classes.fileName}>
							<Markup className={classes.fileName} content={row.title} />
						</div>
						{/* <Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={
								<Markup
									content={row?.file_name}
									// content={
									// 	row?.file_name?.includes('...') ? row?.file_name : ''
									// }
								/>
							}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<div className={classes.fileName}>
								<Markup
									className={classes.fileName}
									content={row.article_title}
								/>
							</div>
						</Tooltip> */}
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
				return <div className={classes.rowType}>{content}</div>;
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
					<div className={classes.row}>{content}</div>
					// <Markup className={classes.row} content={`${content}`} />
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
				return <div className={classes.rowType}>{getDateTime(content)}</div>;
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
					<div className={classes.row}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'Edit Article'}
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
			article_title: 'Who will win the El Classico?',
			media:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplustopper.com%2F10-lines-on-football%2F&psig=AOvVaw0Ar-IiuU6vKTJmnO-E0LA_&ust=1647328925207000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCL58-IxfYCFQAAAAAdAAAAABAD',
			post_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			user: 'Lorem Ispum',
			last_edit: '2021-11-25T17:00:08.000Z'
		},
		{
			article_title: 'Who will win the El Classico?',
			media:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplustopper.com%2F10-lines-on-football%2F&psig=AOvVaw0Ar-IiuU6vKTJmnO-E0LA_&ust=1647328925207000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCL58-IxfYCFQAAAAAdAAAAABAD',
			post_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			user: 'Lorem Ispum',
			last_edit: '2021-11-25T17:00:08.000Z'
		},
		{
			article_title: 'Who will win the El Classico?',
			media:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplustopper.com%2F10-lines-on-football%2F&psig=AOvVaw0Ar-IiuU6vKTJmnO-E0LA_&ust=1647328925207000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCL58-IxfYCFQAAAAAdAAAAABAD',
			post_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			user: 'Lorem Ispum',
			last_edit: '2021-11-25T17:00:08.000Z'
		},
		{
			article_title: 'Who will win the El Classico?',
			media:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplustopper.com%2F10-lines-on-football%2F&psig=AOvVaw0Ar-IiuU6vKTJmnO-E0LA_&ust=1647328925207000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCL58-IxfYCFQAAAAAdAAAAABAD',
			post_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			user: 'Lorem Ispum',
			last_edit: '2021-11-25T17:00:08.000Z'
		},
		{
			article_title: 'Who will win the El Classico?',
			media:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplustopper.com%2F10-lines-on-football%2F&psig=AOvVaw0Ar-IiuU6vKTJmnO-E0LA_&ust=1647328925207000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCL58-IxfYCFQAAAAAdAAAAABAD',
			post_date: '2021-11-25T17:00:08.000Z',
			labels: 'Label1 , Label 2',
			user: 'Lorem Ispum',
			last_edit: '2021-11-25T17:00:08.000Z'
		}
	];

	const tableRowEvents = {
		onClick: (e, row) => {
			// if (!edit) {
			// dispatch(getSpecificPost(row.id));
			setEdit(true);
			setShowSlider(true);

			// }
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		console.log('sort state use effect');
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
		console.log('search use effect');
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
				// dispatch(resetNoResultStatus());
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
				// dispatch(resetCalendarError());
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
			// dispatch(resetCalendarError());
			// dispatch(resetNoResultStatus());
		};
	}, []);

	return (
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
												console.log('search onclick');
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
						border: `${paginationError ? '1px solid red' : '1px solid #808080'}`
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
				title={edit ? 'Edit Article' : 'Upload Article'}
				heading1={edit ? 'Media File' : 'Add Media File'}
				buttonText={edit ? 'SAVE CHANGES' : 'POST ARTICLE'}
			/>
		</Layout>
	);
};

export default ArticleLibrary;
