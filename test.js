import test from 'ava';
import gotGhr from './';

var path = 'ragingwind/grunt-chrome-manifest';

test('get archives', t => {
	return gotGhr(path).then(function (releases) {
		t.ok(releases.sortedIndex.length > 0);
		t.is('v' + releases.sortedIndex[0], releases.latest.tag_name);
	}).catch(function (err) {
		t.fail(err);
	});
});

test('get valid latest release with clear version name', t => {
	return gotGhr(path).then(function (releases) {
		var latestVersion = releases.sortedIndex[0];
		var latest = releases[latestVersion];

		t.ok(latestVersion);
		t.ok(latest);
		t.is(latest.tarball_url, 'https://api.github.com/repos/ragingwind/grunt-chrome-manifest/tarball/v' + latestVersion);
		t.is(latest.zipball_url, 'https://api.github.com/repos/ragingwind/grunt-chrome-manifest/zipball/v' + latestVersion);
	}).catch(function (err) {
		t.fail(err);
	});
});

test('no get release with wrong limited', t => {
	return gotGhr(path, {version: '>=10.0.0'}).then(function (releases) {
		t.is(releases.length, 0);
	}).catch(function (err) {
		t.fail(err);
	});
});

test('get release with limited', t => {
	return gotGhr(path, {version: '>=0.3.0'}).then(function (releases) {
		t.ok(releases.sortedIndex.length > 0);
		t.is(releases.sortedIndex[releases.sortedIndex.length - 1], '0.3.0');
	}).catch(function (err) {
		t.fail(err);
	});
});

test('get rlease with unclear version name', t => {
	return gotGhr(path, {
		version: '>=0.3.0',
		clean: false
	}).then(function (releases) {
		t.ok(releases.sortedIndex.length > 0);
		t.is(releases.sortedIndex[releases.sortedIndex.length - 1], 'v0.3.0');
	}).catch(function (err) {
		t.fail(err);
	});
});
