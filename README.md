<p align="center">
AVD Manager UI allows you to run Android Studio emulators outside of it. Build with <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<hr>

<div align="center">

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Dependency Status][david_img]][david_site]
[![DevDependency Status][david_img_dev]][david_site_dev]
[![Github Tag][github-tag-image]][github-tag-url]
</div>

<div align="center">

![Electron Boilerplate Demo](https://cloud.githubusercontent.com/assets/3382565/10557547/b1f07a4e-74e3-11e5-8d27-79ab6947d429.gif)

</div>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/statickidz/avd-manager-ui/issues/400)**

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/statickidz/avd-manager-ui.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## Maintainers

- [Adrián Barrio](https://github.com/statickidz)

## License

MIT © [AVD Manager UI](https://github.com/statickidz/avd-manager-ui)

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[github-tag-image]: https://img.shields.io/github/tag/statickidz/avd-manager-ui.svg
[github-tag-url]: https://github.com/statickidz/avd-manager-ui/releases/latest
[travis-image]: https://travis-ci.com/statickidz/avd-manager-ui.svg?branch=master
[travis-url]: https://travis-ci.com/statickidz/avd-manager-ui
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/statickidz/avd-manager-ui?svg=true
[appveyor-url]: https://ci.appveyor.com/project/statickidz/avd-manager-ui/branch/master
[david_img]: https://img.shields.io/david/statickidz/avd-manager-ui.svg
[david_site]: https://david-dm.org/statickidz/avd-manager-ui
[david_img_dev]: https://david-dm.org/statickidz/avd-manager-ui/dev-status.svg
[david_site_dev]: https://david-dm.org/statickidz/avd-manager-ui?type=dev
