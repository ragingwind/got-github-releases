'use strict';

var ghGot = require('gh-got');
var semver = require('semver');
var semverSort = require('semver-sort');
var oassign = require('object-assign');

module.exports = function (repo, opts) {
	if (typeof repo !== 'string' || repo.indexOf('/') < 0) {
		throw new TypeError('Invalid type of repo');
	}

	opts = oassign({
		version: '>=v0.0.0',
		sort: true
	}, opts);

	var comparator = /(^[<>=]?[<>=])(d*)/.exec(opts.version)[0] || '=';
	var version = semver.clean(opts.version.split(comparator)[1]);

	if (!version || !semver.valid(version)) {
		throw new TypeError('Invalid type of version');
	}

	return ghGot('repos/' + repo + '/releases').then(function (res) {
		var releases = [];
		var sortedIndex = [];

		res.body = res.body || [];

		res.body.forEach(function (re) {
			if (semver.cmp(re.tag_name, comparator, version)) {
				releases[re.tag_name] = re;
				if (opts.sort) {
					sortedIndex.push(re.tag_name);
				}
			}
		});

		if (sortedIndex.length > 0) {
			releases.sortedIndex = semverSort.desc(sortedIndex);
			releases.latest = releases.sortedIndex[0];
		}

		return releases;
	});
};
