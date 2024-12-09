# Calories from image with Gemini AI
![photo_5961074566153487927_y](https://github.com/user-attachments/assets/f7d24ef1-a33c-4377-9c6b-26807f893bbe)

This is a React Native application that allows users to take a photo of their food and get nutritional information using Google's Generative AI Gemini.

## Features

- Take a photo or choose an image from the gallery to analyze the food.
- Get nutritional information including calories, protein, fat, carbohydrates, and name of the food.
- Use your own Gemini api key.

## Installation

You can use a prebuilt APK in the releases or you can build the app yourself following this steps:

1. Clone the repository:

```sh
git clone https://github.com/antomanc/calories-from-image-gemini.git
cd calories-from-image-gemini 
```

2. Install dependencies:

```sh
bun install
```

3. Setup the android build environment:

```sh
bun run expo prebuild
```

4. Build the APK

```sh
cd android
./gradlew assembleRelease
```
The output APK will be in this path:
android/app/build/outputs/apk/release/app-release.apk

## Usage
You can apply your Gemini API KEY directly inside the app, in the settings page.

## Feel free to ask for features or open issues
