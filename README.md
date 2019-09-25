# Cities Test [react-native version]

* Download or clone the code.
* Then run `yarn install` or `npm install`.
* `cd ios && pod install` (for Mac only)
* Run Android or iOS emulator or connent an appropriate device.
* Put `TOKEN_API` and `TOKEN_USER` [to appropriate places in the code](https://github.com/VS-work/test-cities/blob/master/src/pages/Cities.js#L20-L22)
* Run Merto bundler `react-native start`.
* Run the project `react-native run-ios` or `react-native run-android`
* if you have an issue with build then you can fix it via the following command: `react-native upgrade --legacy` (say 'No' to package.json recreation)

## How to use the application

* Run `Test Cities` the app on your device
* Tap `Signup` at on the bottom of the screen
* Enter and remember an appropriate email (it can be fake) and password. Don't scare! They will be stored on the Local Storage of your device.
* Tap `Sign in` at on the bottom of the screen (move backward to Login Screen)
* Enter email (it can be fake) and password and tap `Login`.
* You will see Cities Screen after successful login.

