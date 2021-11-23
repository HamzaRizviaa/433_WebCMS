import React from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
import classes from './_postLibrary.module.scss';
// import classes from './_postLibary.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { decrement, increment } from '../../features/count/er/counterSlice';

const PostLibrary = () => {
	// const count = useSelector((state) => state.counter.count);
	// const dispatch = useDispatch();
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
