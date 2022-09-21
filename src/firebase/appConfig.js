/** Application runtime configuration driven by engineering as well as product */

const AppConfig = {
	bypassEnvironments: ['development', 'devlocal', 'local', 'test'],
	updatedSchemas: {
		question: {
			version: '1.1.0',
			revision: 1
		},
		news: {
			version: '1.1.0',
			revision: 1
		}
	},
	features: {
		topBanners: {
			slots_number: 10,
			getContent: {
				paginationLimit: 3
			}
		},
		pagination: {
			rateLimitingForLimit: 100
		},
		disabled: {
			middlewares: [
				{
					name: 'paginationRateLimiter',
					environments: ['*']
				}
			]
		}
	}
};

module.exports = {
	AppConfig
};
