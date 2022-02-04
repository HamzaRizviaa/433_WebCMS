import React, { useState } from 'react';
import Layout from '../../components/layout';
//import Table from '../../components/table';
import classes from './_quizLibrary.module.scss';
import Button from '../../components/button';
import UploadOrEditQuiz from '../../components/quizzes/uploadOrEditQuiz';

const QuizLibrary = () => {
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);

	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1 style={{ marginRight: '2rem' }}>QUIZ LIBRARY</h1>
					<Button
						onClick={() => {
							setEdit(false);
							setShowSlider(true);
						}}
						text={'UPLOAD QUIZ'}
					/>
				</div>
			</div>
			<div className={classes.tableContainer}>{/* <Table /> */}</div>

			<UploadOrEditQuiz
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				title={edit ? 'Quiz Detail' : 'Upload Quiz'}
				heading1={edit ? 'Media Type' : 'Add Background Image'}
				buttonText={edit ? 'SAVE CHANGES' : 'ADD QUIZ'}
			/>
		</Layout>
	);
};

export default QuizLibrary;
