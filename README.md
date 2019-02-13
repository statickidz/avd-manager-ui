<p align="center">
AVD Manager UI allows you to run Android Studio emulators externally.
</p>

This app is the work of a afternoon that I decided to switch from Genymotion to official Android Studio emulators for my React Native projects.

Build with <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> using <a href="https://github.com/electron-react-boilerplate">Electron React Boilerplate</a> for rapid application development (HMR).

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
![AVD Manager UI](resources/screenshot.gif?raw=true)
</div>

## Download

Pending to add in release tab.

## Platforms tested

- [x] Windows 10 x64
- [x] Mac OSX
- [ ] Linux

## Install & Run

First, clone the repo via git and install the depencencies with yarn:

```bash
$ git clone https://github.com/statickidz/avd-manager-ui.git
$ cd avd-manager-ui
$ yarn
```

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

## TODO

- [x] Display emulator
- [x] Run emulators
- [ ] Checker for ANDROID_HOME env variable
- [ ] Display emulator details
- [ ] Add app icon
- [ ] Releases tab
- [ ] Test in linux and adapt it
- [ ] Create emulators basic

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
