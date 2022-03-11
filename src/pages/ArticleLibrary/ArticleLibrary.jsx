import React from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
//import Table from '../../components/table';
import classes from './_articleLibrary.module.scss';

const ArticleLibrary = () => {
	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1 style={{ marginRight: '2rem' }}>ARTICLE LIBRARY</h1>
					<Button onClick={() => {}} text={'UPLOAD ARTICLE'} />
				</div>
			</div>

			{/* <div className={classes.tableContainer}>
				<Table />
			</div> */}
		</Layout>
	);
};

export default ArticleLibrary;
