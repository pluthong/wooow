var config = {
	local: {
		mode: 'local',
		port: 3000,
		mysql: {
			host: '127.0.0.1',
			port: 3306
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mysql: {
			host: '127.0.0.1',
			port: 3306
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mysql: {
			host: '127.0.0.1',
			port: 3306
		}
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}