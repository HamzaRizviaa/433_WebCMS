/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useStyles } from './index.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import SelectField from '../../ui/inputs/SelectField';
import { useLazyGetMatchesTreeQuery } from '../../../data/features/articleLibrary/articleLibrary.query';
// import { FormControl, InputLabel } from '@mui/material';

const defaultState = {
	league: {
		value: '42',
		name: 'Champions League',
		childs: [
			{
				id: '9925',
				name: 'Celtic',
				countryFK: '15',
				country_name: 'Scotland',
				country_code: 'SCO',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9925.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488d0',
						name: 'Celtic-Shakhtar Donetsk',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '9925',
								name: 'Celtic',
								countryFK: '15',
								country_name: 'Scotland',
								country_code: 'SCO',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9925.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.celticfc.com/'
								}
							},
							{
								id: '9728',
								name: 'Shakhtar Donetsk',
								countryFK: '53',
								country_name: 'Ukraine',
								country_code: 'UKR',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9728.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://shakhtar.com/'
								}
							}
						]
					}
				]
			},
			{
				id: '178475',
				name: 'RB Leipzig',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/178475.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488d3',
						name: 'RB Leipzig-Real Madrid',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '178475',
								name: 'RB Leipzig',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/178475.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://rbleipzig.com/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8633',
								name: 'Real Madrid',
								countryFK: '8',
								country_name: 'Spain',
								country_code: 'ESP',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8633.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.realmadrid.com',
									home_shirt_color_1: '#ffffff'
								}
							}
						]
					}
				]
			},
			{
				id: '9789',
				name: 'Borussia Dortmund',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9789.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488f7',
						name: 'Borussia Dortmund-Manchester City',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '9789',
								name: 'Borussia Dortmund',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9789.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.bvb.de',
									home_shirt_color_1: '#fde100'
								}
							},
							{
								id: '8456',
								name: 'Manchester City',
								countryFK: '2',
								country_name: 'England',
								country_code: 'ENG',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8456.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.mancity.com/',
									home_shirt_color_1: '#97c1e7'
								}
							}
						]
					}
				]
			},
			{
				id: '9885',
				name: 'Juventus',
				countryFK: '4',
				country_name: 'Italy',
				country_code: 'ITA',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9885.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf64893c',
						name: 'Benfica-Juventus',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '9772',
								name: 'Benfica',
								countryFK: '12',
								country_name: 'Portugal',
								country_code: 'POR',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9772.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.slbenfica.pt/',
									home_shirt_color_1: '#e83030'
								}
							},
							{
								id: '9885',
								name: 'Juventus',
								countryFK: '4',
								country_name: 'Italy',
								country_code: 'ITA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9885.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.juventus.com/',
									home_shirt_color_1: '#000000'
								}
							}
						]
					}
				]
			},
			{
				id: '10185',
				name: 'Maccabi Haifa',
				countryFK: '38',
				country_name: 'Israel',
				country_code: 'ISR',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/10185.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf64893f',
						name: 'Paris Saint-Germain-Maccabi Haifa',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '9847',
								name: 'Paris Saint-Germain',
								countryFK: '5',
								country_name: 'France',
								country_code: 'FRA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9847.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.psg.fr/',
									home_shirt_color_1: '#004170'
								}
							},
							{
								id: '10185',
								name: 'Maccabi Haifa',
								countryFK: '38',
								country_name: 'Israel',
								country_code: 'ISR',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10185.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://mhaifafc.com/'
								}
							}
						]
					}
				]
			},
			{
				id: '10156',
				name: 'Dinamo Zagreb',
				countryFK: '44',
				country_name: 'Croatia',
				country_code: 'CRO',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/10156.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648963',
						name: 'Dinamo Zagreb-AC Milan',
						startdate: '2022-10-25T19:00:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '10156',
								name: 'Dinamo Zagreb',
								countryFK: '44',
								country_name: 'Croatia',
								country_code: 'CRO',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10156.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://gnkdinamo.hr/EN'
								}
							},
							{
								id: '8564',
								name: 'AC Milan',
								countryFK: '4',
								country_name: 'Italy',
								country_code: 'ITA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8564.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.acmilan.com/',
									home_shirt_color_1: '#fb090b'
								}
							}
						]
					}
				]
			},
			{
				id: '8391',
				name: 'FC Copenhagen',
				countryFK: '1',
				country_name: 'Denmark',
				country_code: 'DEN',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8391.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488f4',
						name: 'Sevilla-FC Koebenhavn',
						startdate: '2022-10-25T16:45:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8302',
								name: 'Sevilla',
								countryFK: '8',
								country_name: 'Spain',
								country_code: 'ESP',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8302.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.sevillafc.es/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8391',
								name: 'FC Copenhagen',
								countryFK: '1',
								country_name: 'Denmark',
								country_code: 'DEN',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8391.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fck.dk/'
								}
							}
						]
					}
				]
			},
			{
				id: '10013',
				name: 'Salzburg',
				countryFK: '34',
				country_name: 'Austria',
				country_code: 'AUT',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/10013.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648960',
						name: 'Salzburg-Chelsea',
						startdate: '2022-10-25T16:45:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '10013',
								name: 'Salzburg',
								countryFK: '34',
								country_name: 'Austria',
								country_code: 'AUT',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10013.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.redbullsalzburg.at/en'
								}
							},
							{
								id: '8455',
								name: 'Chelsea',
								countryFK: '2',
								country_name: 'England',
								country_code: 'ENG',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8455.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.chelseafc.com/',
									home_shirt_color_1: '#034694'
								}
							}
						]
					}
				]
			},
			{
				id: '8650',
				name: 'Liverpool',
				countryFK: '2',
				country_name: 'England',
				country_code: 'ENG',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8650.png',
				matches: [
					{
						_id: '630b0b24a0cc911bdf648861',
						name: 'Rangers-Liverpool',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8548',
								name: 'Rangers',
								countryFK: '15',
								country_name: 'Scotland',
								country_code: 'SCO',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8548.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.rangers.co.uk/'
								}
							},
							{
								id: '8650',
								name: 'Liverpool',
								countryFK: '2',
								country_name: 'England',
								country_code: 'ENG',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8650.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.liverpoolfc.com/',
									home_shirt_color_1: '#d00027'
								}
							}
						]
					}
				]
			},
			{
				id: '9773',
				name: 'FC Porto',
				countryFK: '12',
				country_name: 'Portugal',
				country_code: 'POR',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9773.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648882',
						name: 'Bayer Leverkusen-FC Porto',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8178',
								name: 'Bayer Leverkusen',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8178.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.bayer04.de/',
									home_shirt_color_1: '#e32221'
								}
							},
							{
								id: '9773',
								name: 'FC Porto',
								countryFK: '12',
								country_name: 'Portugal',
								country_code: 'POR',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9773.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fcporto.pt/',
									home_shirt_color_1: '#213560'
								}
							}
						]
					}
				]
			},
			{
				id: '8636',
				name: 'Inter',
				countryFK: '4',
				country_name: 'Italy',
				country_code: 'ITA',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8636.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488a6',
						name: 'Barcelona-Inter',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8634',
								name: 'Barcelona',
								countryFK: '8',
								country_name: 'Spain',
								country_code: 'ESP',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8634.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fcbarcelona.cat',
									home_shirt_color_1: '#a50044'
								}
							},
							{
								id: '8636',
								name: 'Inter',
								countryFK: '4',
								country_name: 'Italy',
								country_code: 'ITA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8636.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.inter.it/en/',
									home_shirt_color_1: '#0267ab'
								}
							}
						]
					}
				]
			},
			{
				id: '9823',
				name: 'Bayern Munich',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9823.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf6488a9',
						name: 'Viktoria Plzen-Bayern Munich',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '6033',
								name: 'Viktoria Plzen',
								countryFK: '19',
								country_name: 'Czech Republic',
								country_code: 'CZE',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/6033.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fcviktoria.cz/'
								}
							},
							{
								id: '9823',
								name: 'Bayern Munich',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9823.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://fcbayern.com',
									home_shirt_color_1: '#dc052d'
								}
							}
						]
					}
				]
			},
			{
				id: '9810',
				name: 'Eintracht Frankfurt',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9810.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648912',
						name: 'Tottenham Hotspur-Eintracht Frankfurt',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8586',
								name: 'Tottenham',
								countryFK: '2',
								country_name: 'England',
								country_code: 'ENG',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8586.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.tottenhamhotspur.com/home/',
									home_shirt_color_1: '#132257'
								}
							},
							{
								id: '9810',
								name: 'Eintracht Frankfurt',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9810.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.eintracht.de/',
									home_shirt_color_1: '#e1000f'
								}
							}
						]
					}
				]
			},
			{
				id: '9768',
				name: 'Sporting CP',
				countryFK: '12',
				country_name: 'Portugal',
				country_code: 'POR',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9768.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648915',
						name: 'Sporting CP-Marseille',
						startdate: '2022-10-12T19:00:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9768',
								name: 'Sporting CP',
								countryFK: '12',
								country_name: 'Portugal',
								country_code: 'POR',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9768.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.sporting.pt/',
									home_shirt_color_1: '#008057'
								}
							},
							{
								id: '8592',
								name: 'Marseille',
								countryFK: '5',
								country_name: 'France',
								country_code: 'FRA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8592.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.om.net/',
									home_shirt_color_1: '#ffffff'
								}
							}
						]
					}
				]
			},
			{
				id: '9875',
				name: 'SSC Napoli',
				countryFK: '4',
				country_name: 'Italy',
				country_code: 'ITA',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9875.png',
				matches: [
					{
						_id: '630b0b24a0cc911bdf64885e',
						name: 'SSC Napoli-Ajax',
						startdate: '2022-10-12T16:45:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9875',
								name: 'SSC Napoli',
								countryFK: '4',
								country_name: 'Italy',
								country_code: 'ITA',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9875.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.sscnapoli.it/default.aspx?lingua=en-EN',
									home_shirt_color_1: '#199fd6'
								}
							},
							{
								id: '8593',
								name: 'Ajax',
								countryFK: '9',
								country_name: 'Netherlands',
								country_code: 'NED',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8593.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.ajax.nl/',
									home_shirt_color_1: '#d2122e'
								}
							}
						]
					}
				]
			},
			{
				id: '9906',
				name: 'Atletico Madrid',
				countryFK: '8',
				country_name: 'Spain',
				country_code: 'ESP',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9906.png',
				matches: [
					{
						_id: '630b0b25a0cc911bdf648885',
						name: 'Atletico Madrid-Club Brugge',
						startdate: '2022-10-12T16:45:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9906',
								name: 'Atletico Madrid',
								countryFK: '8',
								country_name: 'Spain',
								country_code: 'ESP',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9906.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.atleticodemadrid.com/',
									home_shirt_color_1: '#ce3524'
								}
							},
							{
								id: '8342',
								name: 'Club Bruges',
								countryFK: '14',
								country_name: 'Belgium',
								country_code: 'BEL',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8342.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.clubbrugge.be',
									home_shirt_color_1: '#0078bf'
								}
							}
						]
					}
				]
			}
		]
	},
	team: {
		value: '9925',
		name: 'Celtic',
		childs: [
			{
				_id: '630b0b25a0cc911bdf6488d0',
				name: 'Celtic-Shakhtar Donetsk',
				startdate: '2022-10-25T19:00:00.000Z',
				status_type: 'Not started',
				participant_teams_data: [
					{
						id: '9925',
						name: 'Celtic',
						countryFK: '15',
						country_name: 'Scotland',
						country_code: 'SCO',
						team_logo:
							'https://enetpulse-images.s3.amazonaws.com/team/9925.png',
						property: {
							IsNationalTeam: 'no',
							ToBeDecided: 'no',
							HomePage: 'https://www.celticfc.com/'
						}
					},
					{
						id: '9728',
						name: 'Shakhtar Donetsk',
						countryFK: '53',
						country_name: 'Ukraine',
						country_code: 'UKR',
						team_logo:
							'https://enetpulse-images.s3.amazonaws.com/team/9728.png',
						property: {
							IsNationalTeam: 'no',
							ToBeDecided: 'no',
							HomePage: 'http://shakhtar.com/'
						}
					}
				]
			}
		]
	},
	match: {
		value: '630b0b25a0cc911bdf6488d0',
		name: 'Celtic-Shakhtar Donetsk',
		childs: [],
		data: {
			_id: '630b0b25a0cc911bdf6488d0',
			name: 'Celtic-Shakhtar Donetsk',
			startdate: '2022-10-25T19:00:00.000Z',
			status_type: 'Not started',
			participant_teams_data: [
				{
					id: '9925',
					name: 'Celtic',
					countryFK: '15',
					country_name: 'Scotland',
					country_code: 'SCO',
					team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9925.png',
					property: {
						IsNationalTeam: 'no',
						ToBeDecided: 'no',
						HomePage: 'https://www.celticfc.com/'
					}
				},
				{
					id: '9728',
					name: 'Shakhtar Donetsk',
					countryFK: '53',
					country_name: 'Ukraine',
					country_code: 'UKR',
					team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9728.png',
					property: {
						IsNationalTeam: 'no',
						ToBeDecided: 'no',
						HomePage: 'http://shakhtar.com/'
					}
				}
			]
		}
	}
};
const AddMatchElement = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	handleDeleteFile,
	initialData
}) => {
	// hook
	// console.table(initialData);
	// console.table(item);
	const [getMatchesTree, { isFetching, data, ...response }] =
		useLazyGetMatchesTreeQuery();

	const [matchState, setMatchState] = useState({});
	const [allLeagues, setAllLeagues] = useState([]);

	// const [isEdit] = useState(false);
	// let isError = false;
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	// const [postUrl, setPostUrl] = useState(
	// 	initialData ? initialData?.ig_post_url || initialData.twitter_post_url : ''
	// );

	useEffect(() => {
		if (allLeagues.length > 0) return;
		getMatchesTree();
	}, []);
	useEffect(() => {
		response.isSuccess && setAllLeagues(data);
		// console.log(matchState);
	}, [data]);

	useEffect(() => {
		if (allLeagues.length <= 0 && !initialData) return;
		console.log('hello', buildInitialData(initialData));
		setMatchState(buildInitialData(initialData));
	}, [allLeagues]);



	useEffect(() => {
		if (isFetching) return;
		sendDataToParent(matchState, index);
	}, [matchState]);
	
	
	// useEffect(() => {
	// 	if (!item?.data) return;
	// 	// delete data["0"]
	// 	setMatchState(item?.data)
	// }, [item]);





	const handleSelect = (value, name, data) => {
		console.log(name, value, data, matchState);

		switch (name) {
			case 'league':
				setMatchState({
					league: { value, name: data?.name, childs: data?.teams || [] }
				});
				break;
			case 'team':
				setMatchState({
					...matchState,
					team: { value, name: data?.name, childs: data?.matches },
					match: []
				});
				break;
			case 'match':
				setMatchState({
					...matchState,
					match: { value, name: data?.name, data, childs: [] }
				});
				break;

			default:
				break;
		}
	};

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

	const buildInitialData = (data) => {
		if (!data) return;
		let obj = {};
		allLeagues.forEach((league) => {
			if (league.name === data.league_name) {
				obj.league = {
					value: league?.id,
					name: league?.name,
					childs: league?.teams
				};
				league?.teams.forEach((team) => {
					if (team.name === data.team_name) {
						obj = {
							...obj,
							team: { value: team?.id, name: team?.name, childs: team?.matches }
						};
						team?.matches.forEach((match) => {
							if (match._id === data.match_id) {
								obj = {
									...obj,
									match: {
										value: match?._id,
										name: match?.name,
										childs: [],
										data: match
									}
								};
							}
						});
					}
				});
			}
		});

		return obj;
	};

	const classes = useStyles();

	// const globalClasses = globalUseStyles();

	return (
		<>
			<Draggable
				draggableId={`draggable-${index}`}
				index={index}
				key={key}
				//	isDragDisabled={uploadeddatas.length <= 1}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
						className={classes.articleBuilder}
					>
						<div className={classes.draggableWrapperHead}>
							<div className={classes.leftDiv}>
								<div className={classes.grabIconDiv}>
									<span {...provided.dragHandleProps}>
										<Union
											style={{ cursor: 'grab' }}
											className={classes.grabIcon}
										/>
									</span>
								</div>
								<div onClick={()=>{console.log(matchState)}} className={classes.wrapperHeading}>{item.heading}</div>
							</div>
							<div className={classes.rightDiv}>
								<div className={classes.deleteIconDiv}>
									<Deletes
										className={classes.deleteIcon}
										onClick={() => {
											handleDeleteFile(item.sortOrder);
										}}
									/>
								</div>
								<div
									className={classes.expandIconDiv}
									onClick={() => {
										clickExpand();
									}}
								>
									{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</div>
							</div>
						</div>
						{(allLeagues.length > 0 || !isFetching) && clickExpandIcon && (
							<div>
								{/* <CustomSelect
									isEdit={false}
									isError={false}
									status='dra'
									label='SELECT LEAGUE'
								/>
								<CustomSelect
									isEdit={false}
									isError={false}
									status='dra'
									label='SELECT TEAM'
								/> */}
								<SelectField
									label='SELECT LEAGUE'
									name='league'
									value={matchState?.league?.value}
									// defaultValue={defaultState?.league?.value}
									options={(allLeagues || []).map((league) => ({
										label: league.name,
										value: league.id,
										data: league
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
								/>
								<SelectField
									label='SELECT TEAM'
									name='team'
									value={matchState?.team?.value}
									// defaultValue={defaultState?.team?.value}
									options={(matchState?.league?.childs || []).map((team) => ({
										label: team.name,
										value: team.id,
										data: team
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
								/>
								<SelectField
									label='SELECT MATCH'
									name='match'
									value={matchState?.match?.value}
									// defaultValue={defaultState?.match?.value}
									options={(matchState?.team?.childs || []).map((match) => ({
										label: match.name,
										value: match._id,
										data: match
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
									// disabled
								/>
							</div>
						)}
					</div>
				)}
			</Draggable>
		</>
	);
};

AddMatchElement.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	handleDeleteFile: PropTypes.func,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func
};

export default AddMatchElement;

const CustomSelect = ({ isError, isEdit, status, name = '', label = '' }) => {
	const classes = useStyles();

	const globalClasses = globalUseStyles();

	return (
		<div className={classes.mainCategory}>
			<h6
				className={[
					isError ? globalClasses.errorState : globalClasses.noErrorState
				].join(' ')}
			>
				{label}
			</h6>
			<Select
				// onOpen={() => {
				// 	setDisableDropdown(false);
				// }}
				onClose={() => {
					// setDisableDropdown(true);
				}}
				// disabled={true}//isEdit && status === 'published' ? true : false}
				style={{
					backgroundColor:
						isEdit && status === 'published' ? '#404040' : '#000000'
				}}
				name={name}
				// value={isEdit ? form.mainCategory : form.mainCategory?.name}
				// onChange={(event) => {
				// 	setDisableDropdown(true);
				// 	mainCategoryId(event.target.value);
				// 	if (form.uploadedFiles.length) {
				// 		form.uploadedFiles.map((file) =>
				// 			handleDeleteFile(file.id)
				// 		);
				// 	}
				// 	if (isEdit) {
				// 		setForm((prev) => {
				// 			return { ...prev, subCategory: '' };
				// 		});
				// 	}
				// }}
				className={`${classes.select} ${
					isEdit && status === 'published' ? `${classes.isEditSelect}` : ''
				}`}
				disableUnderline={true}
				IconComponent={(props) => (
					<KeyboardArrowDownIcon
						{...props}
						style={{
							display: isEdit && status === 'published' ? 'none' : 'block',
							top: '4'
						}}
					/>
				)}
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left'
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'left'
					},
					getContentAnchorEl: null
				}}
				displayEmpty={true}
				// renderValue={(value) => {
				// 	return value ? value?.name || value : 'Please Select';
				// }}
			>
				{new Array(10).fill({ name: 'hello' }).map((category, index) => {
					return (
						<MenuItem key={index} value={category.name}>
							{category.name}
						</MenuItem>
					);
				})}
			</Select>

			{/* <div className={classes.catergoryErrorContainer}>
										<p className={globalClasses.uploadMediaError}>
											{isError.mainCategory
												? 'You need to select main category'
												: ''}
										</p>
									</div> */}
		</div>
	);
};

CustomSelect.propTypes = {
	isEdit: PropTypes.bool,
	status: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	isError: PropTypes.bool
};
