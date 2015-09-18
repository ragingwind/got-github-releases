import test from 'ava';
import ghaGot from './';

var path = 'sindresorhus/got';

test('get archives', t => {
	ghaGot(path).then(function (releases) {
		t.ok(releases.sortedIndex.length > 0);
		t.end();
	});
});

test('get valid latest release', t => {
	ghaGot(path).then(function (releases) {
		var latestVersion = releases.sortedIndex[0];
		var latest = releases[latestVersion];

		t.ok(latestVersion);
		t.ok(latest);
		t.is(latest.tarball_url, 'https://api.github.com/repos/sindresorhus/got/tarball/' + latestVersion);
		t.is(latest.zipball_url, 'https://api.github.com/repos/sindresorhus/got/zipball/' + latestVersion);
		t.end();
	});
});

test('get archives with limited', t => {
	ghaGot(path, {version: '>=v3.0.0'}).then(function (releases) {
		t.ok(releases.sortedIndex.length > 0);
		t.is(releases.sortedIndex[releases.sortedIndex.length - 1], 'v3.0.0');
		t.end();
	});
});
