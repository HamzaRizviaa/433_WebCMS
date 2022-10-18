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
		value: '54',
		childs: [
			{
				id: '9823',
				name: 'Bayern Munich',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9823.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c30c5',
						name: 'Bayern Munich-Freiburg',
						startdate: '2022-10-16T17:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
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
							},
							{
								id: '8358',
								name: 'Freiburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.scfreiburg.com/',
									home_shirt_color_1: '#eb1923'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c3067',
						name: 'Borussia Dortmund-Bayern Munich',
						startdate: '2022-10-08T16:30:00.000Z',
						status_type: 'Finished',
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
				id: '9789',
				name: 'Borussia Dortmund',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9789.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c30c7',
						name: 'Union Berlin-Borussia Dortmund',
						startdate: '2022-10-16T15:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8149',
								name: 'Union Berlin',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8149.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fc-union-berlin.de',
									home_shirt_color_1: '#eb1923'
								}
							},
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
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c3067',
						name: 'Borussia Dortmund-Bayern Munich',
						startdate: '2022-10-08T16:30:00.000Z',
						status_type: 'Finished',
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
				id: '8722',
				name: 'FC Koln',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8722.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c306d',
						name: 'FC Koeln-Augsburg',
						startdate: '2022-10-16T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8722',
								name: 'FC Koln',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8722.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fc-koeln.de/fc-info/startseite/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8406',
								name: 'Augsburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8406.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.fcaugsburg.de/',
									home_shirt_color_1: '#ba3733'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c30c3',
						name: 'Borussia Moenchengladbach-FC Koeln',
						startdate: '2022-10-09T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9788',
								name: 'Borussia Moenchengladbach',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9788.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.borussia.de/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8722',
								name: 'FC Koln',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8722.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fc-koeln.de/fc-info/startseite/',
									home_shirt_color_1: '#ffffff'
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
						_id: '62e396bfc47a131b855c301d',
						name: 'RB Leipzig-Hertha Berlin',
						startdate: '2022-10-15T16:30:00.000Z',
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
								id: '8177',
								name: 'Hertha Berlin',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8177.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.herthabsc.com/',
									home_shirt_color_1: '#004d9e'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c30c1',
						name: 'Mainz 05-RB Leipzig',
						startdate: '2022-10-08T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9905',
								name: 'Mainz 05',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9905.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.mainz05.de/',
									home_shirt_color_1: '#c3141e'
								}
							},
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
							}
						]
					}
				]
			},
			{
				id: '10269',
				name: 'VfB Stuttgart',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/10269.png',
				matches: [
					{
						_id: '62e396bfc47a131b855c2fbf',
						name: 'VfB Stuttgart-Bochum',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '10269',
								name: 'VfB Stuttgart',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10269.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfb.de/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '9911',
								name: 'Bochum',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9911.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfl-bochum.de/',
									home_shirt_color_1: '#050A30'
								}
							}
						]
					},
					{
						_id: '62e396bfc47a131b855c3019',
						name: 'VfB Stuttgart-Union Berlin',
						startdate: '2022-10-09T17:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '10269',
								name: 'VfB Stuttgart',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10269.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfb.de/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8149',
								name: 'Union Berlin',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8149.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fc-union-berlin.de',
									home_shirt_color_1: '#eb1923'
								}
							}
						]
					}
				]
			},
			{
				id: '9788',
				name: 'Borussia Moenchengladbach',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9788.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c306f',
						name: 'Wolfsburg-Borussia Moenchengladbach',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8721',
								name: 'Wolfsburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8721.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vflwolfsburg.de/',
									home_shirt_color_1: '#65b32e'
								}
							},
							{
								id: '9788',
								name: 'Borussia Moenchengladbach',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9788.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.borussia.de/',
									home_shirt_color_1: '#ffffff'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c30c3',
						name: 'Borussia Moenchengladbach-FC Koeln',
						startdate: '2022-10-09T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9788',
								name: 'Borussia Moenchengladbach',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9788.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.borussia.de/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '8722',
								name: 'FC Koln',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8722.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.fc-koeln.de/fc-info/startseite/',
									home_shirt_color_1: '#ffffff'
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
						_id: '62e396c0c47a131b855c30c9',
						name: 'Eintracht Frankfurt-Bayer Leverkusen',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
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
							},
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
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c3069',
						name: 'Bochum-Eintracht Frankfurt',
						startdate: '2022-10-08T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9911',
								name: 'Bochum',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9911.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfl-bochum.de/',
									home_shirt_color_1: '#050A30'
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
				id: '9905',
				name: 'Mainz 05',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9905.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c3071',
						name: 'Werder Bremen-Mainz 05',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8697',
								name: 'Werder Bremen',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8697.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.werder.de/'
								}
							},
							{
								id: '9905',
								name: 'Mainz 05',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9905.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.mainz05.de/',
									home_shirt_color_1: '#c3141e'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c30c1',
						name: 'Mainz 05-RB Leipzig',
						startdate: '2022-10-08T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9905',
								name: 'Mainz 05',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9905.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.mainz05.de/',
									home_shirt_color_1: '#c3141e'
								}
							},
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
							}
						]
					}
				]
			},
			{
				id: '10189',
				name: 'Schalke 04',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/10189.png',
				matches: [
					{
						_id: '62e396bfc47a131b855c2fc1',
						name: 'Schalke 04-Hoffenheim',
						startdate: '2022-10-14T18:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '10189',
								name: 'Schalke 04',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10189.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.schalke04.de/'
								}
							},
							{
								id: '8226',
								name: 'Hoffenheim',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8226.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.achtzehn99.de/home',
									home_shirt_color_1: '#1961b5'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c30bf',
						name: 'Bayer Leverkusen-Schalke 04',
						startdate: '2022-10-08T13:30:00.000Z',
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
								id: '10189',
								name: 'Schalke 04',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10189.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.schalke04.de/'
								}
							}
						]
					}
				]
			},
			{
				id: '8358',
				name: 'Freiburg',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c30c5',
						name: 'Bayern Munich-Freiburg',
						startdate: '2022-10-16T17:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
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
							},
							{
								id: '8358',
								name: 'Freiburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.scfreiburg.com/',
									home_shirt_color_1: '#eb1923'
								}
							}
						]
					},
					{
						_id: '62e396bfc47a131b855c301b',
						name: 'Hertha Berlin-Freiburg',
						startdate: '2022-10-09T15:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8177',
								name: 'Hertha Berlin',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8177.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.herthabsc.com/',
									home_shirt_color_1: '#004d9e'
								}
							},
							{
								id: '8358',
								name: 'Freiburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.scfreiburg.com/',
									home_shirt_color_1: '#eb1923'
								}
							}
						]
					}
				]
			},
			{
				id: '9911',
				name: 'Bochum',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9911.png',
				matches: [
					{
						_id: '62e396bfc47a131b855c2fbf',
						name: 'VfB Stuttgart-Bochum',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '10269',
								name: 'VfB Stuttgart',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/10269.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfb.de/',
									home_shirt_color_1: '#ffffff'
								}
							},
							{
								id: '9911',
								name: 'Bochum',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9911.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfl-bochum.de/',
									home_shirt_color_1: '#050A30'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c3069',
						name: 'Bochum-Eintracht Frankfurt',
						startdate: '2022-10-08T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '9911',
								name: 'Bochum',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9911.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vfl-bochum.de/',
									home_shirt_color_1: '#050A30'
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
				id: '8721',
				name: 'Wolfsburg',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8721.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c306f',
						name: 'Wolfsburg-Borussia Moenchengladbach',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8721',
								name: 'Wolfsburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8721.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vflwolfsburg.de/',
									home_shirt_color_1: '#65b32e'
								}
							},
							{
								id: '9788',
								name: 'Borussia Moenchengladbach',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9788.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.borussia.de/',
									home_shirt_color_1: '#ffffff'
								}
							}
						]
					},
					{
						_id: '62e396c0c47a131b855c306b',
						name: 'Augsburg-Wolfsburg',
						startdate: '2022-10-08T13:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8406',
								name: 'Augsburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8406.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.fcaugsburg.de/',
									home_shirt_color_1: '#ba3733'
								}
							},
							{
								id: '8721',
								name: 'Wolfsburg',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8721.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.vflwolfsburg.de/',
									home_shirt_color_1: '#65b32e'
								}
							}
						]
					}
				]
			},
			{
				id: '8697',
				name: 'Werder Bremen',
				countryFK: '3',
				country_name: 'Germany',
				country_code: 'GER',
				team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8697.png',
				matches: [
					{
						_id: '62e396c0c47a131b855c3071',
						name: 'Werder Bremen-Mainz 05',
						startdate: '2022-10-15T13:30:00.000Z',
						status_type: 'Not started',
						participant_teams_data: [
							{
								id: '8697',
								name: 'Werder Bremen',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8697.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.werder.de/'
								}
							},
							{
								id: '9905',
								name: 'Mainz 05',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/9905.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.mainz05.de/',
									home_shirt_color_1: '#c3141e'
								}
							}
						]
					},
					{
						_id: '62e396bfc47a131b855c2fbd',
						name: 'Hoffenheim-Werder Bremen',
						startdate: '2022-10-07T18:30:00.000Z',
						status_type: 'Finished',
						participant_teams_data: [
							{
								id: '8226',
								name: 'Hoffenheim',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8226.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'http://www.achtzehn99.de/home',
									home_shirt_color_1: '#1961b5'
								}
							},
							{
								id: '8697',
								name: 'Werder Bremen',
								countryFK: '3',
								country_name: 'Germany',
								country_code: 'GER',
								team_logo:
									'https://enetpulse-images.s3.amazonaws.com/team/8697.png',
								property: {
									IsNationalTeam: 'no',
									ToBeDecided: 'no',
									HomePage: 'https://www.werder.de/'
								}
							}
						]
					}
				]
			}
		]
	},
	team: {
		value: '9823',
		childs: [
			{
				_id: '62e396c0c47a131b855c30c5',
				name: 'Bayern Munich-Freiburg',
				startdate: '2022-10-16T17:30:00.000Z',
				status_type: 'Not started',
				participant_teams_data: [
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
					},
					{
						id: '8358',
						name: 'Freiburg',
						countryFK: '3',
						country_name: 'Germany',
						country_code: 'GER',
						team_logo:
							'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
						property: {
							IsNationalTeam: 'no',
							ToBeDecided: 'no',
							HomePage: 'http://www.scfreiburg.com/',
							home_shirt_color_1: '#eb1923'
						}
					}
				]
			},
			{
				_id: '62e396c0c47a131b855c3067',
				name: 'Borussia Dortmund-Bayern Munich',
				startdate: '2022-10-08T16:30:00.000Z',
				status_type: 'Finished',
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
	match: {
		value: '62e396c0c47a131b855c30c5',
		data: {
			_id: '62e396c0c47a131b855c30c5',
			name: 'Bayern Munich-Freiburg',
			startdate: '2022-10-16T17:30:00.000Z',
			status_type: 'Not started',
			participant_teams_data: [
				{
					id: '9823',
					name: 'Bayern Munich',
					countryFK: '3',
					country_name: 'Germany',
					country_code: 'GER',
					team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/9823.png',
					property: {
						IsNationalTeam: 'no',
						ToBeDecided: 'no',
						HomePage: 'https://fcbayern.com',
						home_shirt_color_1: '#dc052d'
					}
				},
				{
					id: '8358',
					name: 'Freiburg',
					countryFK: '3',
					country_name: 'Germany',
					country_code: 'GER',
					team_logo: 'https://enetpulse-images.s3.amazonaws.com/team/8358.png',
					property: {
						IsNationalTeam: 'no',
						ToBeDecided: 'no',
						HomePage: 'http://www.scfreiburg.com/',
						home_shirt_color_1: '#eb1923'
					}
				}
			]
		},
		childs: []
	}
};
const AddMatchElement = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	handleDeleteFile
	// initialData
}) => {
	// hook
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
		sendDataToParent(matchState, index);
	}, [matchState]);

	const handleSelect = (value, name, data) => {
		console.log(name, value, data, matchState);

		switch (name) {
			case 'league':
				setMatchState({ league: { value, childs: data.teams || [] } });
				break;
			case 'team':
				setMatchState({
					...matchState,
					team: { value, childs: data.matches },
					match: []
				});
				break;
			case 'match':
				setMatchState({ ...matchState, match: { value, data, childs: [] } });
				break;

			default:
				break;
		}
	};

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
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
								<div className={classes.wrapperHeading}>{item.heading}</div>
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
