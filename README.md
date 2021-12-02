# Himama test

This app is a simple demo for Himama. Teachers can see the list of classrooms, switch between classrooms (if enabled), see the children in each classroom (if the option is allowed), their attendance status, and can move children from one classroom to another if the feature is enabled.

## Running the App

To install, please clone the repo. I'm assuming you have `node` installed and you already know how so setup a `react native` app. If you don't, kindly check the official docs [here](https://reactnative.dev/docs/environment-setup). The app is setup for **ios** as per the instructions but it should run on android as well

Install dependencies by running

```bash
yarn
```

Install pod dependencies using

```bash
npx pod install
```

If you run into errors relating to firebase, this additional script should help

```bash
cd ios && pod repo update && pod install && cd ..
```

Run the app using

```bash
yarn ios
```

Additionally, you can run e2e tests with detox using

```bash
 yarn detox:build && yarn detox:test
```

If you don't know about detox, learn more [here](https://github.com/wix/Detox) and follow [this tutorial](https://reactnativetesting.io/e2e/setup.html#installing-detox) to learn how to setup detox

### Folder structure

- `screens` - Contains App screens
- `components` - Contains reusable components such as `ClassroomListItem`
- `@types` - Contains custom types and interfaces
- `context` - Contains App wide context data and relevant computation
- `e2e` - Contains App end-to-end test
- `App.tsx` - is the app entry point

## Planning

- I first went through the problem statement to understand expectations
- I Set up the realtime database to better understand the project workflow and the user journey
- I broke down the app development process into smaller steps
  - Setup base structures and installing necessary tools (firebase, react navigation)
  - Consume Api
  - Build base components
  - Build Screens
  - Add functionalities
  - Test
- I took some time to determine which tools, how best to propagate data from screen to screen, etc. For example, I chose to use the `Context API` or instead of complex prop tunnelling or redux because it's easy to setup and effecient
- Write code

My flow didn't change much because i did a lot of planning before writing code so things were pretty straight forward

## Improvements

If I had more time for the project, I would

- Fix all type issues
- Add `id` to IChildren type to ensure data integrity
- Make use of `useCallback` in my api calls
- Implement better UI, UX, Error handling and feedback
- modify the structure of classroom
- I would test properly on android
