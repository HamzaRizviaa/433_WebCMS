import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@material-ui/core';
import Button from '../../../button';
import { useStyles } from '../../PreviewArticles/MatchPost/index.style';
import moment from 'moment';

const MatchPost = ({ item }) => {
	const data = {
		Day: moment(item?.data?.match?.data?.startdate).format('ddd, DD MMM'),
		Time: moment(item?.data?.match?.data?.startdate).format('HH:MM'),
		Team_1: {
			Name: item?.data?.match?.data?.participant_teams_data[0]?.name,
			Logo: item?.data?.match?.data?.participant_teams_data[0]?.team_logo,
			Team_Color:
				item?.data?.match?.data?.participant_teams_data[0]?.property
					?.home_shirt_color_1
		},
		Team_2: {
			Name: item?.data?.match?.data?.participant_teams_data[1]?.name,
			Logo: item?.data?.match?.data?.participant_teams_data[1]?.team_logo,
			Team_Color:
				item?.data?.match?.data?.participant_teams_data[1]?.property
					?.home_shirt_color_1
		}
	};
	const classes = useStyles();
	return (
		<Box
			style={{
				background: `linear-gradient(to right, ${data.Team_1.Team_Color} 0%, #000 50%, ${data.Team_2.Team_Color} 100%)`,
				padding: 0,
				borderRadius: 16
			}}
		>
			<Box py={3} px={2} className={classes.matchDiv}>
				<Box className={classes.matchBox} mb={3}>
					<Box className={classes.teamBox}>
						<img src={data.Team_1.Logo} className={classes.teamLogo} />
						<div>{data?.Team_1?.Name}</div>
					</Box>
					<Box className={classes.matchDetails}>
						<div>{data?.Day}</div>
						<Divider width='75%' style={{ background: '#999' }} />
						<div>{data?.Time}</div>
					</Box>
					<Box className={classes.teamBox}>
						<img src={data.Team_2.Logo} className={classes.teamLogo} />
						<div>{data?.Team_2?.Name}</div>
					</Box>
				</Box>
				<Button text='FOLLOW MATCH' onClick={() => {}} />
			</Box>
		</Box>
	);
};

export default MatchPost;

MatchPost.propTypes = {
	item: PropTypes.object.isRequired
};
