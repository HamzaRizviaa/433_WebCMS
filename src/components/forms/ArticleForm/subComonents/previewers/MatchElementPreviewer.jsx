import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@material-ui/core';
import Button from '../../../../button';
import { useStyles } from './elementPreviewers.styles';
import moment from 'moment';

const MatchElementPreviewer = ({ item }) => {
	const data = {
		Day: moment(item?.data?.match?.data?.startdate).format('ddd, DD MMM'),
		Time: moment(item?.data?.match?.data?.startdate).format('HH:mm'),
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
	const classes = useStyles({
		team1Color: data.Team_1.Team_Color, //|| 'white',
		team2Color: data.Team_2.Team_Color //|| 'white'
	});
	return (
		<Box className={classes.MatchContainer}>
			<Box py={3} px={2} className={classes.matchDiv}>
				<Box className={classes.matchBox} mb={3}>
					<Box className={classes.teamBox}>
						<img src={data.Team_1.Logo} className={classes.teamLogo} />
						<div>{data?.Team_1?.Name}</div>
					</Box>
					<Box className={classes.matchDetails}>
						<div>{data?.Day}</div>
						<Divider />
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

export default MatchElementPreviewer;

MatchElementPreviewer.propTypes = {
	item: PropTypes.object.isRequired
};
