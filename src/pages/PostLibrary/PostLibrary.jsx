import React, { useEffect } from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
import classes from './_postLibrary.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postLibrarySlice';

const PostLibrary = () => {
	const posts = useSelector((state) => state.postLibrary.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	console.log(posts);
	return (
		<Layout>
			<div className={classes.header}>
				<h1>POST LIBRARY</h1>
				<Button text={'UPLOAD POST'} />
			</div>
		</Layout>
	);
};

export default PostLibrary;
