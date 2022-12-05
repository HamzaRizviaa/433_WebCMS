import React from 'react';
import PropTypes from 'prop-types';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import { useState } from 'react';
import {
	getLeagueOptions,
	getTeamOptions,
	getMatchName
} from '../../../../../../data/utils';

const ArticleMatchElement = ({ index, initialData, data, isPublished }) => {
	const [leagues, setLeagues] = useState([]);
	const [teams, setTeams] = useState([]);
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		if (isPublished) {
			setLeagues([
				{ name: initialData?.league_name, id: initialData?.league_name }
			]);
			return;
		}
		data && setLeagues(data);
	}, [data]);

	const handleLeagueChange = (val) => {
		const leagueTeams = getTeamOptions(leagues, val);
		setTeams(leagueTeams);
	};
	const handleTeamChange = (val) => {
		const teamMatches = teams.map((value) => value.name === val.name)?.matches;
		teamMatches.map((match) => {
			match.name = getMatchName(match.startdate, match.name);
		});
		setMatches(teamMatches);
	};

	return (
		<div>
			<FormikSelect
				name={`elements.${index}.league`}
				placeholder='SELECT LEAGUE'
				options={getLeagueOptions(leagues)}
				disabled={isPublished}
				onChange={handleLeagueChange}
			/>
			<FormikSelect
				name={`elements.${index}.team`}
				placeholder='SELECT TEAM'
				options={teams}
				disabled={isPublished || teams.length === 0}
				onChange={handleTeamChange}
			/>
			<FormikSelect
				name={`elements.${index}.match`}
				placeholder='SELECT MATCH'
				options={matches}
				disabled={isPublished || matches.length === 0}
			/>
		</div>
	);
};

ArticleMatchElement.propTypes = {
	index: PropTypes.number.isRequired,
	initialData: PropTypes.object,
	data: PropTypes.array,
	isPublished: PropTypes.bool
};

export default ArticleMatchElement;
