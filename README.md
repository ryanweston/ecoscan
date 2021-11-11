# Application
Mobile application using React Native.

# Environment
Use homebrew for optimal install.

Open a terminal outside of VSCode:
brew install watchman

Ensure XCode is installed. Double check and go to preferences in Xcode and select the latest command line version.

In the same terminal as earlier: 
sudo gem install cocoapods

# Install
npm install
cd ios && pod install && cd ..
open xcode, build

## Run simulator on M1

Project settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64

Pod settings > Build Settings > Excluded Architecture > Set both emulator values to ARM64
