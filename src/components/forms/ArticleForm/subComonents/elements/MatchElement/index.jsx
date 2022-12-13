import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import { getTeamOptions, getMatchName } from '../../../../../../data/utils';
import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const MatchElement = ({
	index,
	item,
	initialData,
	data,
	isPublished,
	handleRemoveElement
}) => {
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
		const teamMatches = teams.find((value) => value.id === val)?.matches;
		const mappedMatches = teamMatches?.map((match) => ({
			...match,
			name : getMatchName(match.startdate, match.name)
		}));
		setMatches(mappedMatches);
	};

	return (
		<DraggableLayoutWrapper>
			<DraggableCardLayout
				title={`Add Match`}
				key={index}
				index={index}
				item={item}
				onDeleteIconClick={handleRemoveElement}
			>
				<FormikSelect
					name={`elements.${index}.league_name`}
					placeholder='SELECT LEAGUE'
					options={leagues}
					mapOptions={{labelKey: 'name', valueKey: 'id'}}
					disabled={isPublished}
					onChange={handleLeagueChange}
				/>
				<FormikSelect
					name={`elements.${index}.team_name`}
					placeholder='SELECT TEAM'
					options={teams}
					mapOptions={{labelKey: 'name', valueKey: 'id'}}
					disabled={isPublished || teams?.length === 0}
					onChange={handleTeamChange}
				/>
				<FormikSelect
					name={`elements.${index}.match_title`}
					placeholder='SELECT MATCH'
					options={matches}
					mapOptions={{labelKey: 'name', valueKey: '_id'}}
					disabled={isPublished || matches?.length === 0}
				/>
			</DraggableCardLayout>
		</DraggableLayoutWrapper>
	);
};

MatchElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	initialData: PropTypes.object,
	data: PropTypes.array,
	isPublished: PropTypes.bool,
	handleRemoveElement: PropTypes.func
};

export default MatchElement;
