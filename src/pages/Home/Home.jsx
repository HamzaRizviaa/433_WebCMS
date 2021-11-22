import React from 'react';
import Button from '../../components/button';
// import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar';
// import { decrement, increment } from '../../features/count/er/counterSlice';

const Home = () => {
	// const count = useSelector((state) => state.counter.count);
	// const dispatch = useDispatch();
	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<div
				style={{
					padding: '3.5rem 2rem',
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					height: '100%'
				}}
			>
				<h1>POST LIBRARY</h1>
				<Button text={'UPLOAD POST'} />
			</div>
		</div>
	);
};

export default Home;
