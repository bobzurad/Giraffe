# Giraffe

Giraffe is an app that lets you log data points and chart them on a graph. 

This project was bootstrapped [without a framework](https://reactnative.dev/docs/getting-started-without-a-framework) using  `npx @react-native-community/cli@latest init`

### Libraries

Some important libraries/packages that this app uses includes:
- Navigation/Routing: [React Navigation](https://reactnavigation.org/)
- UI Framework: [React Native Paper](https://callstack.github.io/react-native-paper/)
- State Management: [Jotai](https://jotai.org/)
- HTTP client: [Axios](https://github.com/axios/axios)
- Charts: [React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)
- Storage: [Jotai Storage](https://jotai.org/docs/utilities/storage)
  - Other options:
    - Local Storage when not signed in: https://rnmmkv.vercel.app/#/
    - or this? https://github.com/mrousavy/react-native-mmkv
    - Cloud Storage when signed in: Firebase?
    - Use Firebase OAuth2 for sign in.

## Prerequisites and Dev Setup

This project requires Java 17 and Node 18.18 or later. To set up your dev environment, follow the [React Native Guide](https://reactnative.dev/docs/set-up-your-environment). This project **DOES NOT** use Expo.

This project contains a `.tool-versions` file, so if you have [asdf](https://asdf-vm.com/) installed, you can run the following to make sure you have the proper versions of Java and NodeJS installed for this project:
```sh
asdf install java
asdf install nodejs
```

Once Java and NodeJS are installed, run `npm install`

~~If you're on macOS, also run `cd ios` and `pod install`~~

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

#### React Native Paper Setup for iOS

Since this project uses [React Native Paper](https://callstack.github.io/react-native-paper/docs/guides/getting-started), there are some additional steps needed for iOS:

```sh
npx pod-install
```

After adding a new font, [following these instructions](https://github.com/oblador/react-native-vector-icons/blob/master/docs/SETUP-REACT-NATIVE.md) for iOS.

### VS Code

If using VSCode, make sure the following extensions are installed:

- React Native Tools (msjsdiag.vscode-react-native)
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)

## Starting/Running the App

To start the app, first run `npm start` to start the React Native runtime. Then open another terminal and run `npm run android` to start the app in an Android simulator or `npm run ios` to start the app in an iOS simulator.

Note: If you get an exception when starting the app that the simulator was not running, it's possible that the runtime tried to connect before the emulator was finished starting up, so just run npm run android or npm run ios again after the emulator is started.

## Debugging the App

Debugging React Native apps requires Chrome to be installed. Once the app is running, press `Ctrl-M` or `Command-M` to bring up the Dev Menu. Then select `Debug`. This will open a debugging window in your browser. You can also connect to the debugger by navigating to http://localhost:8081/debugger-ui in your browser. Then open the browser Dev Tools, and select Sources. You will find the sources available to debug under debuggerWorker. For more information about debugging see here: https://reactnative.dev/docs/debugging#chrome-developer-tools

Note: Depending on which browser you use to debug, you may see an exception from a browser extension. This is most likely caused by the fact that the React Native debugger is incompatible with the React Dev Tools browser extension. So try debugging with a Chromium based browser that doesn't have the React Dev Tools extension installed, or disable the React Dev Tools extension in the browser.

### React Dev Tools

Since the React Dev Tools browser extension is incompatible with React Native, you can use `npx react-devtools` to run a stand-alone instance of React Dev Tools which is compatible with both React and React Native.

## Building an Android Debug APK

To build an apk file that you can debug on your device (or emulator), run the following commands:
```bash
  npm run build-android
  cd android
  ./gradlew assembleDebug
```

This will put a file named `app-debug.apk` in `android/app/build/outputs/apk/debug/`

## Building an Android Release APK

To make a release build to install on your device (or emulator), run the following commands:
```bash
  npm run build-android
  cd android
  ./gradlew assemble
```

This will put a file named `app-release-unsigned.apk` in `android/app/build/outputs/apk/release/`

## Signing an Android Release APK

Note: `zipalign` and `apksigner` will be in `$ANDROID_HOME/build-tools/<version>`
```
zipalign -v -p 4 app-release-unsigned.apk app-release-unsigned-aligned.apk
apksigner sign --ks <path_to_your_private_key>.jks --out app-release.apk app-release-unsigned-aligned.apk
apksigner verify app-release.apk
```

You can then upload `app-release.apk` to the Play Console when creating a Production Release.

For more information on building, deploying, and signing the apk file, see here: https://developer.android.com/build/building-cmdline
