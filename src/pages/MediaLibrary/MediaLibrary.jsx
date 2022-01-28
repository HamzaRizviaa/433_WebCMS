import React, { useEffect, useState } from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_mediaLibrary.module.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from '../../components/posts/uploadOrEditPost/mediaDropdownSlice';
import UploadOrEditMedia from '../../components/media/uploadOrEditMedia';
import { getSpecificMedia } from '../../components/media/uploadOrEditMedia/uploadOrEditMediaSlice';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Markup } from 'interweave';

import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const getDateTime = (dateTime) => {
	let formatted = new Date(dateTime);
	return `${moment(formatted).format(
		'DD-MM-YYYY'
	)} | ${formatted.toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	})}`;
};

const useStyles = makeStyles(() => ({
	root: {
		'& .MuiPagination-ul': {
			display: 'flex',
			justifyContent: 'flex-end',
			'& > li:first-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			},
			'& > li:last-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			}
		},
		'& .Mui-selected': {
			backgroundColor: 'transparent !important',
			color: 'yellow',
			border: '1px solid yellow',
			borderRadius: '8px',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		},
		'& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)':
			{
				background: 'transparent',
				border: '1px solid #808080',
				color: '#ffffff',
				height: '32px',
				width: '32px',
				borderRadius: '8px',
				fontSize: '12px',
				fontWeight: '700',
				lineHeight: '16px',
				letterSpacing: '0.03em'
			},
		'& .MuiPaginationItem-ellipsis': {
			color: '#ffffff',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		}
	}
}));

const MediaLibrary = () => {
	const muiClasses = useStyles();
	const media = useSelector((state) => state.mediaDropdown.media);
	const totalRecords = useSelector((state) => state.mediaDropdown.totalRecords);
	const noResultStatus = useSelector(
		(state) => state.mediaDropdown.noResultStatus
	);

	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [page, setPage] = useState(1);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [paginationError, setPaginationError] = useState(false);
	const [search, setSearch] = useState('');
	const [noResultBorder, setNoResultBorder] = useState('#404040');
	const [noResultError, setNoResultError] = useState('');

	const dispatch = useDispatch();
	const sortKeysMapping = {
		title: 'title',
		file_name: 'media',
		post_date: 'postdate',
		labels: 'label',
		user: 'user',
		last_edit: 'lastedit',
		type: 'type'
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(getMedia({ page, ...sortState }));
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(getMedia({ q: search, page, ...sortState }));
		}
	}, [sortState]);

	useEffect(() => {
		if (search) {
			dispatch(getMedia({ q: search, page, ...sortState }));
		} else {
			dispatch(getMedia({ page, ...sortState }));
		}
	}, [page]);

	useEffect(() => {
		if (noResultStatus) {
			setNoResultBorder('#FF355A');
			setNoResultError('No Results Found');
			setTimeout(() => {
				setNoResultBorder('#404040');
				setNoResultError('');
			}, [5000]);
		}
	}, [noResultStatus]);

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
							col?.dataField === 'type' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels'
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
							col?.dataField === 'type' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels'
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
							col?.dataField === 'type' ||
							col?.dataField === 'post_date' ||
							col?.dataField === 'labels'
								? 30
								: -4
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
			formatter: (content) => {
				return (
					<div className={classes.row}>
						<Markup content={`${content} `} />
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
					<div className={classes.mediaWrapper}>
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}
							title={
								<img
									className={classes.mediaIconPreview}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.thumbnail_url ? row?.thumbnail_url : ''
									}`}
									alt='no img'
								/>
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
							}}
						>
							<img
								className={classes.mediaIcon}
								src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.thumbnail_url}`}
							/>
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
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							{/* <span className={classes.fileName}>
								{row?.file_name?.substring(0, 13) +
									`${row?.file_name?.length > 13 ? '...' : ''}`}
							</span> */}
							<div>
								<Markup
									className={classes.fileName}
									content={`${
										row?.file_name?.substring(0, 13) +
										`${row?.file_name?.length > 13 ? '...' : ''}`
									}`}
								/>
							</div>
						</Tooltip>
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
				let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				return (
					// <div className={classes.rowType}>
					// 	{content[0] + `, ` + content[1]}
					// </div>
					<div className={classes.rowType}>
						<Markup content={`${content[0]} ${secondLabel}`} />
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'type',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'TYPE',
			formatter: (content) => {
				return (
					<div className={classes.rowType}>
						<Markup content={`${content} `} />
					</div>
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
							title={'EDIT MEDIA'}
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

	const tableRowEvents = {
		onClick: (e, row) => {
			dispatch(getSpecificMedia(row.id));
			setEdit(true);
			setShowSlider(true);
		}
	};

	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1 style={{ marginRight: '2rem' }}>MEDIA LIBRARY</h1>
					<Button
						onClick={() => {
							setEdit(false);
							setShowSlider(true);
						}}
						text={'UPLOAD MEDIA'}
					/>
				</div>
				<div className={classes.subheader2}>
					<TextField
						className={classes.searchField}
						value={search}
						onKeyPress={(e) => {
							if (e.key === 'Enter' && search) {
								dispatch(getMedia({ q: search, page, ...sortState }));
							} else if (e.key === 'Enter' && !search) {
								dispatch(getMedia({ page, ...sortState }));
							}
						}}
						onChange={(e) => setSearch(e.target.value)}
						placeholder={'Search post, user, label'}
						InputProps={{
							disableUnderline: true,
							className: classes.textFieldInput,
							style: { borderColor: noResultBorder },
							endAdornment: (
								<InputAdornment>
									<Search
										onClick={() => {
											if (search) {
												dispatch(getMedia({ q: search, page, ...sortState }));
											} else {
												dispatch(getMedia({ page, ...sortState }));
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
			</div>
			<div className={classes.tableContainer}>
				<Table rowEvents={tableRowEvents} columns={columns} data={media} />
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

			<UploadOrEditMedia
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
					// setTimeout(() => setEdit(false), 600);
				}}
				title={edit ? 'Edit Media' : 'Upload Media'}
				heading1={edit ? 'Media Type' : 'Select Media Type'}
				buttonText={edit ? 'SAVE CHANGES' : 'ADD MEDIA'}
			/>
		</Layout>
	);
};

export default MediaLibrary;
