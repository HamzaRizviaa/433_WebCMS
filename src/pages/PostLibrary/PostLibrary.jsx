import React, { useEffect } from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_postLibrary.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postLibrarySlice';
import moment from 'moment';
import UploadOrEditPost from '../../components/posts/uploadOrEditPost';
// import Popup from '../../components/popup';

//import Slide from '../../components/slide';

// const getFileName = (content) => {
// 	let returnValue = '-';
// 	if (content) {
// 		let splitted = content.split('/');
// 		if (splitted[2]) {
// 			returnValue = splitted[2];
// 		}
// 	}
// 	return returnValue;
// };

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
	// const [popped, setPopped] = useState(false);

	// const closeThePop = () => {
	// 	setPopped(false);
	// };

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
					<div className={classes.mediaWrapper}>
						<img
							className={classes.mediaIcon}
							src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row.media}`}
						/>
						<span className={classes.fileName}>{row.file_name}</span>
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
						<Edit className={classes.editIcon} />
					</div>
				);
			}
		}
	];
	//state would be used with onlclick
	return (
		<Layout>
			<div className={classes.header}>
				<h1>POST LIBRARY</h1>
				<Button onClick={() => {}} text={'UPLOAD POST'} />
			</div>
			<div className={classes.tableContainer}>
				<Table columns={columns} data={posts} />
			</div>

			<UploadOrEditPost open={true} />

			{/* <Popup  closePopup={closeThePop} open={popped} title={'Upload a Post'}/> :   */}
			{/* <Slide /> */}
		</Layout>
	);
};

export default PostLibrary;
