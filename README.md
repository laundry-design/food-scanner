# Calories from image with Gemini AI

<img src="https://github.com/user-attachments/assets/f7d24ef1-a33c-4377-9c6b-26807f893bbe" alt="app screenshot" height="400">
<img src="https://github.com/user-attachments/assets/e73d1d46-471d-4c75-a30f-b03143896a81" alt="app screenshot" height="400">

[<img src="https://github.com/machiav3lli/oandbackupx/blob/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png" alt="Get it on GitHub" height="80">](https://github.com/antomanc/calories-from-image-gemini/releases/latest)

This is a React Native application that allows users to take a photo of their food and get nutritional information using Google's Generative AI Gemini.
Do not overestimate the AI accuracy, I plan to use it only for meals where it's impossible to get nutritional information by myself. Weighting your food will always be more accurate.

Currently the Google AI model Gemini 1.5 Flash has a very good 15 requests per minute and 1500 daily requests free limit, so you should be able to use it without worrying about costs.

## Features

- Take a photo or choose an image from the gallery to analyze the food.
- Get nutritional information including calories, protein, fat, carbohydrates, and name of the food.
- Use your own Gemini api key.
- Change the AI model in app during runtime

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
