# got-github-releases [![Build Status](https://travis-ci.org/ragingwind/node-got-github-releases.svg?branch=master)](https://travis-ci.org/ragingwind/node-got-github-releases)

> Got releases of github as accessible data


## Install

```
$ npm install --save got-github-releases
```


## Usage

```js
var ghReleases = require('got-github-releases');

ghReleases('users/repo').then(function (releases) {
	console.log(releases.latest.tarball_url);
	//=> https://api.github.com/repos/users/repo/tarball/v0.0.1

	console.log(releases[releases.sortedIndex[0].tarball_url);
	//=> https://api.github.com/repos/users/repo/tarball/v0.0.1

	console.log(releases['v0.0.1'].tarball_url);
	//=> https://api.github.com/repos/users/repo/tarball/v0.0.1
}));
```


## API

### ghReleases(ownerAndRepo, [options])

#### ownerAndRepo

Type: `string`

In part of address of repo, using owner and repo name, which is you want to know a list of releases.

#### options

##### version

Type: `string`

semver, you can also use with comparators. will get all of releases if it is not set.

##### sort

Type: boolean

Returns index sorted in descent by tag version name on releases

## License

MIT © [Jimmy Moon](http://ragingwind.me)
