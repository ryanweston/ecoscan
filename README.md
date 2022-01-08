# Application
Mobile application using React Native.

# Environment
Use homebrew for optimal install.

Open a terminal outside of VSCode:
`brew install watchman`

Ensure XCode is installed. Double check and go to preferences > locations in Xcode and select the latest command line version.

In the same terminal as earlier: 
`sudo gem install cocoapods`


If this doesn't run, clean your homebrew: 
`brew cleanup -d -v`

If again, it doesn't work, ensure your paths are exported correctly.

# Install
`npm install`
`cd ios && pod install && cd ..`
open xcode, build

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

