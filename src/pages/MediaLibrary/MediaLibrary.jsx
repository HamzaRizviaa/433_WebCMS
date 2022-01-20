import React, { useEffect, useState } from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
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
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const sortRows = (order, row) => {
	if (!order)
		return (
			<ArrowDropUpIcon
				className={classes.sortIcon}
				style={{
					left:
						row?.dataField === 'type' ||
						row?.dataField === 'post_date' ||
						row?.dataField === 'labels'
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
						row?.dataField === 'type' ||
						row?.dataField === 'post_date' ||
						row?.dataField === 'labels'
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
						row?.dataField === 'type' ||
						row?.dataField === 'post_date' ||
						row?.dataField === 'labels'
							? 30
							: -4
				}}
			/>
		);
	return null;
};

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
	console.log(media);
	// const media = [];
	const totalRecords = useSelector((state) => state.mediaDropdown.totalRecords);
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [page, setPage] = useState(1);
	const [paginationError, setPaginationError] = useState(false);

	const dispatch = useDispatch();

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		dispatch(getMedia(page));
	}, [page]);

	const columns = [
		{
			dataField: 'title',
			text: 'TITLE',
			sort: true,
			sortCaret: sortRows,
			formatter: (content) => {
				return <div className={classes.row}>{content}</div>;
			}
		},
		{
			dataField: 'file_name',
			text: 'MEDIA',
			sort: true,
			sortCaret: sortRows,
			formatter: (content, row) => {
				return (
					<div className={classes.mediaWrapper}>
						<img
							className={classes.mediaIcon}
							src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row.thumbnail_url}`}
						/>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={row?.file_name?.length > 13 ? row?.file_name : ''}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<span className={classes.fileName}>
								{row?.file_name?.substring(0, 13) +
									`${row?.file_name?.length > 13 ? '...' : ''}`}
							</span>
						</Tooltip>
					</div>
				);
			}
		},
		{
			dataField: 'post_date',
			sort: true,
			sortCaret: sortRows,
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
			text: 'LABEL',
			formatter: (content) => {
				return (
					<div className={classes.rowType}>
						{content[0] + `, ` + content[1]}
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
			text: 'TYPE',
			formatter: (content) => {
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
			text: 'USER',
			formatter: (content) => {
				return <div className={classes.row}>{content}</div>;
			}
		},
		{
			dataField: 'last_edit',
			sort: true,
			sortCaret: sortRows,
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
							<Edit
								// onClick={() => {
								// 	setShowSlider(true);
								// 	setEdit(true);
								// 	dispatch(getSpecificMedia(row.id));
								// }}
								className={classes.editIcon}
							/>
						</Tooltip>
					</div>
				);
			}
		}
	];

	const tableRowEvents = {
		onClick: (e, row) => {
			setEdit(true);
			setShowSlider(true);
			dispatch(getSpecificMedia(row.id));
		}
	};

	return (
		<Layout>
			<div className={classes.header}>
				<h1 style={{ marginRight: '2rem' }}>MEDIA LIBRARY</h1>
				<Button
					onClick={() => {
						setShowSlider(true);
					}}
					text={'UPLOAD MEDIA'}
				/>
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
					setTimeout(() => setEdit(false), 20);
				}}
				title={edit ? 'Edit Media' : 'Upload Media'}
				heading1={edit ? 'Media Type' : 'Select Media Type'}
				buttonText={edit ? 'SAVE CHANGES' : 'ADD MEDIA'}
			/>
		</Layout>
	);
};

export default MediaLibrary;
