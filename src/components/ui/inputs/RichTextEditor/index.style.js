import { makeStyles } from '@material-ui/core';

export const useTextEditorStyles = makeStyles(() => ({
	editor: {
		margin: '10px 0px',
		'& > div': {
			border: `1px solid #404040 !important`,
			borderRadius: '8px',
			'& > div.tox-editor-container': {
				backgroundColor: '#404040 !important',
				'& > div.tox-editor-header': {
					'& > div.tox-menubar': {
						backgroundColor: `#404040 !important`,
						background: `#404040 !important`,
						'& > button.tox-mbtn': {
							color: 'white !important',
							'&:focus': {
								background: `#404040 !important`
							},
							'&:hover': {
								background: `#404040 !important`
							},
							'&:active': {
								background: `#404040 !important`
							}
						}
					},
					'& > div.tox-toolbar': {
						display: 'none !important',
						backgroundColor: `#404040 !important`,
						background: `#404040 !important`,
						'&  >div.tox-toolbar__group': {
							'& >button.tox-tbtn': {
								'& > span.tox-icon': {
									color: ` white !important`,
									'& > svg': {
										fill: `white !important`
									}
								},
								'&:focus': {
									background: `#404040 !important`
								},
								'&:hover': {
									background: `#404040 !important`
								},
								'&:active': {
									background: `#404040 !important`
								}
							},
							'& >button.tox-tbtn--select': {
								'& >span.tox-tbtn__select-label': {
									color: `white !important`
								},
								'& >div.tox-tbtn__select-chevron': {
									color: ` white !important`,
									'& > svg': {
										fill: `white !important`
									}
								}
							}
						}
					},
					'& >div.tox .tox-toolbar--scrolling': {
						display: 'none !important'
					},
					'& > div.tox-toolbar-overlord': {
						display: 'none !important'
					}
				},
				'& > div.tox-sidebar-wrap': {
					'& > div.tox-edit-area': {
						'& > iframe.tox-edit-area__iframe': {
							backgroundColor: `black !important`
						}
					}
				}
			},
			'& > div.tox-statusbar': {
				background: `#404040 !important`,
				'& > div.tox-statusbar__text-container': {
					'& > div.tox-statusbar__path': {
						'& > div.tox-statusbar__path-item': {
							color: ` white !important`
						}
					},
					'& > button.tox-statusbar__wordcount': {
						color: `white !important`
					}
				}
			}
		}
	}
}));
