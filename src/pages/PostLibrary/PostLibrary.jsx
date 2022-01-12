import React, { useEffect, useState } from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_postLibrary.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postLibrarySlice';
import { getSpecificPost } from '../../components/posts/uploadOrEditPost/editButtonSlice';
import moment from 'moment';
import UploadOrEditPost from '../../components/posts/uploadOrEditPost';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const sortRows = (order) => {
	if (!order) return <ArrowDropUpIcon className={classes.sortIcon} />;
	else if (order === 'asc')
		return <ArrowDropUpIcon className={classes.sortIconSelected} />;
	else if (order === 'desc')
		return <ArrowDropDownIcon className={classes.sortIconSelected} />;
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

const PostLibrary = () => {
	const posts = useSelector((state) => state.postLibrary.posts);
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, []);

	const columns = [
		{
			dataField: 'file_name',
			text: 'MEDIA',
			sort: true,
			sortCaret: sortRows,
			formatter: (content, row) => {
				return (
					<div
						className={
							row.orientation_type === 'landscape'
								? classes.mediaWrapperLandscape
								: classes.mediaWrapper
						}
					>
						{row.thumbnail_url ? (
							<PlayArrowIcon
								className={
									row.orientation_type === 'portrait'
										? classes.playIconPortrait
										: classes.playIcon
								}
							/>
						) : (
							<></>
						)}
						<img
							className={
								row.orientation_type === 'square'
									? classes.mediaIcon
									: row.orientation_type === 'landscape'
									? classes.mediaIconLandscape
									: classes.mediaIconPortrait
							}
							src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
								row.thumbnail_url ? row.thumbnail_url : row.media
							}`}
						/>
						<span className={classes.fileName}>
							{row.file_name.substring(0, 13) +
								`${row.file_name.length > 13 ? '...' : ''}`}
						</span>
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
				return <div className={classes.row}>{getDateTime(content)}</div>;
			}
		},
		{
			dataField: 'labels',
			sort: true,
			sortCaret: sortRows,
			text: 'LABEL',
			formatter: (content) => {
				return (
					<div className={classes.row}>{content[0] + `, ` + content[1]}</div>
				);
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
			formatter: (content, row) => {
				return (
					<div className={classes.row}>
						<Edit
							onClick={() => {
								setShowSlider(true);
								setEdit(true);
								dispatch(getSpecificPost(row.id));
							}}
							className={classes.editIcon}
						/>
					</div>
				);
			}
		}
	];

	return (
		<Layout>
			<div className={classes.header}>
				<h1 style={{ marginRight: '2rem' }}>POST LIBRARY</h1>
				<Button
					onClick={() => {
						setShowSlider(true);
					}}
					text={'UPLOAD POST'}
				/>
			</div>
			<div className={classes.tableContainer}>
				<Table columns={columns} data={posts} />
			</div>

			<UploadOrEditPost
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
					setTimeout(() => setEdit(false), 150);
				}}
				title={edit ? 'Edit Post' : 'Upload a Post'}
				heading1={edit ? 'Media Files' : 'Add Media Files'}
				buttonText={edit ? 'SAVE CHANGES' : 'POST'}
				//specificPostId
			/>

			{/* <Popup  closePopup={closeThePop} open={popped} title={'Upload a Post'}/> :   */}
		</Layout>
	);
};

export default PostLibrary;
