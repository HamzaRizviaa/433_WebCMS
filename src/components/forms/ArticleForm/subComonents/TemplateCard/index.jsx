/* eslint-disable no-unused-vars */
import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import TemplateSVG from '../../../../../assets/TemplateAdd.svg';

const TemplateCard = ({ newArticleClick }) => {
	const dummyData = [
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Matches of the week',
			last_edited: '21-12-2022, 12:05'
		},
		{
			user: 'Alexander jordaan',
			title: 'Template 2 but with longer name',
			last_edited: '21-12-2022, 12:05'
		}
	];
	const classes = useStyles();
	return (
		<div className={classes.cardModal}>
			<div className={classes.newCard} onClick={() => newArticleClick()}>
				<img src={TemplateSVG} className={classes.templateSVG} />
				Empty Article
			</div>

			{dummyData.map((data, index) => {
				return (
					<div className={classes.card} key={index}>
						<div>
							<div className={classes.author}>{data.user}</div>
							<div className={classes.title}>{data.title}</div>
						</div>
						<div className={classes.dateBlock}>
							Last edited
							<div className={classes.date}>{data.last_edited}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TemplateCard;

TemplateCard.propTypes = {
	newArticleClick: PropTypes.bool.isRequired
};
