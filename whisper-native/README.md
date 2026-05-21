# Whisper: Ambient Place Discovery for React Native

A complete, production-ready Expo React Native app implementing ambient place discovery with real-time location tracking and AirPods audio delivery.

## Features

### Core Capabilities

- **Map Discovery**: Live map view with user location, nearby venue pins, and discovery radius
- **AirPods Integration**: Seamless Bluetooth audio delivery via expo-speech
- **Background Location**: Continuous GPS tracking even with app backgrounded (expo-location)
- **Smart Trigger Engine**: Multiple detection triggers for contextual discovery
- **Whisper Feed**: Time-grouped history of all discovered places
- **Taste Profile**: AI-powered preference system with insights
- **Dark Theme UI**: Carefully designed design system matching web prototype

### Trigger Types

The app detects multiple contextual triggers to deliver whispers:

- **Slow Walk** (< 1.2 m/s): User slowed down to explore
- **Golden Hour** (6-7am, 5-7pm): Perfect light for outdoor venues
- **Stopped** (< 0.3 m/s): Vehicle or standing still
- **New Location**: First visit to an area
- **Late Night** (9pm-4am): Evening mood context
- **Pattern Detection**: Regular visits to same location

## Installation

### Prerequisites

- Node.js 16+ with npm
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)
- Phone with GPS capabilities

### Setup

```bash
cd /sessions/serene-fervent-knuth/mnt/cowork/whisper-native
npm install
npx expo doctor
```

## Running

```bash
npm start
# Scan QR code with Camera app (iOS) or Expo Go (Android)
```

## Architecture

Complete details in the project structure with 21 JavaScript files, 8 screens, 3 components, and 3 custom hooks.

## See Also

- **Web Prototype**: `/sessions/serene-fervent-knuth/mnt/cowork/whisper-app/`
- **Expo Docs**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org