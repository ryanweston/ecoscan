# Application
Mobile application using React Native.

# Installation & setup

## Prerequisites:
 - XCode ^13.00 installed (you may need to ensure your apple ID is a developer account for this)
 - Double check XCode and go to preferences > locations in Xcode and select the latest command line version.
 - If you do have node installed already, ensure it’s node 16 or newer. We recommend using n to help manage n versions if necessary.

## Development Environment

Open your terminal application.

You’ll need Homebrew installed for the next steps. Follow the homebrew installation guide found here.

Or just run: 

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

If you don’t already have Node installed, React native recommends installing node through homebrew
Disclaimer: I haven’t tried this with a homebrew node installation
`brew install node`

In your terminal:

`brew install watchman`

In the same terminal as earlier: 

`sudo gem install cocoapods`

If this doesn't run, clean your homebrew: 

`brew cleanup -d -v`

If again, it doesn't work, ensure your paths are exported correctly.

Ensure yarn is installed globally.
`npm i -g yarn`

## Installation
At the top level, install packages with yarn.
`yarn`

Install pods in the ios folder.
`cd ios && pod install && cd ..`

Create a .env file at root level and replace with your information: 

`API_URL=‘EXAMPLE URL’
GOOGLE_WEB_CLIENT=‘EXAMPLE WEB CLIENT ID’
GOOGLE_IOS_CLIENT=‘EX’AMPLE IOS CLIENT ID’`

# Running the simulator

## Run simulator on M1

Project settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64

Pod settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64

## Run simulator on external device

XCode > Accounts > Add personal account

# Commit style
Commit messages must conform to the to the conventional commit format.

`type(scope?): subject  #scope is optional`

Message types
chore
feat
fix
refactor
revert
style
test

# How to deploy
We're currently running on TestFlight. Ensure your account is linked to the app's developer team.


# Errors
If your metro fails from closing incorrectly with a cache error: 
So far, running `yarn clean -cache` works.

# Component guide
Until there's a comprehensive design system doc with integrated design tokens. Please follow these
higher-tier rules in regards to utilising components and themes.

