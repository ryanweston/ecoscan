# EcoScan application

Repository for the mobile application, EcoScan. 

Currently only built for iOS using React Native. 

# Installation & setup

## Prerequisites:
 - [XCode v13+](https://nodejs.org/en/) You may need to ensure your apple ID is a developer account for this)
 - [Command line tools](https://nodejs.org/en/) In XCode go to preferences > locations in Xcode and select the latest command line version.
 - [Node v16+](https://nodejs.org/en/) We recommend using n to help manage n versions if necessary.

## Development Environment

Open your terminal application.

Install Homebrew:

``` bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If you don’t already have Node installed, React Native docs recommends installing Node through homebrew.
Disclaimer: This has yet to be tested with a Homebrew Node installation

```bash 
brew install node
```

Install watchman in a new terminal:

```bash
brew install watchman
```

Install cocoapods in another new terminal: 

```bash
sudo gem install cocoapods
```

If this doesn't run, cleanup your homebrew: 

```bash
brew cleanup -d -v
```

If again, it doesn't work, ensure your paths are exported correctly.

Ensure yarn is installed globally.
```bash
npm i -g yarn
```

## Installation

At the top level, install packages with yarn.
```bash 
yarn
```

Install pods in the ios folder.
```bash 
cd ios && pod install && cd ..
```

Create a .env file at root level and replace with your information: 

```bash 
API_URL=‘EXAMPLE URL’
GOOGLE_WEB_CLIENT=‘EXAMPLE WEB CLIENT ID’
GOOGLE_IOS_CLIENT=‘EX’AMPLE IOS CLIENT ID’
```

# Running the simulator

## Run simulator on M1

XCode has a few issues with running simulators on ARM64 architectures. You can resolve this in XCode build settings:

Project settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64

Pod settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64

## Run simulator on external device

XCode > Accounts > Add personal account

# Commit style
Commit messages must conform to the to the [conventional commits format](https://www.conventionalcommits.org/en/v1.0.0/#summary).

```bash 
type(scope?): subject  #scope is optional
```

Message types:
- chore
- feat
- fix
- refactor
- revert
- style
- test

# How to deploy

We're currently running on TestFlight. 

Ensure your apple developer account is linked to the app's development team.

## Set schema to release

Select project in the toolbar, select edit schemas, as shown:

![Schema open menu](https://i.ibb.co/xfYF6Mj/Screenshot-2022-01-09-at-18-39-06.png)

Set build configuration in the popup to release, as shown:

![Schema set](https://i.ibb.co/NYKkN9h/Screenshot-2022-01-09-at-18-39-23.png)

## Archive and release

Go to product menu and select archive: Product > Archive

After the archive has finished, a screen will popup showing all your previous builds:

![Schema set](https://i.ibb.co/zN2vYNL/Screenshot-2022-01-09-at-18-48-43.png)

Here you want to select 'distribute app' and click through with all the default options.

# Common errors

If your metro fails from closing incorrectly with a cache error: 
```bash
yarn clean -cache
```
