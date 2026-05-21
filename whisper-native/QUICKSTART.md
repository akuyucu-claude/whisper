# Whisper - Ambient Place Discovery App

A complete Expo React Native app for discovering extraordinary places through ambient, context-aware whispers delivered via AirPods.

## Project Overview

**Whisper** is a mobile app that uses real-time location tracking, speed detection, and time-of-day context to deliver ambient "whispers" about nearby places that match your taste profile.

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Expo Go app installed on your phone (iOS App Store / Google Play)
- A phone with GPS capabilities

### Installation

1. Navigate to the project directory:
   ```bash
   cd /sessions/serene-fervent-knuth/mnt/cowork/whisper-native
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify setup:
   ```bash
   npx expo doctor
   ```

### Running the App

1. Start the Expo development server:
   ```bash
   npm start
   ```

2. On your phone:
   - **iOS**: Open Camera app, scan the QR code, tap the Expo link
   - **Android**: Open Expo Go app, scan the QR code

3. Grant permissions when prompted (Location)

### Testing on Your Phone

1. Walk around slowly (< 1.2 m/s) to trigger a whisper
2. Enable AirPods - tap the 🎧 button on the map screen
3. Tap the whisper card to see detailed venue information
4. Switch to "Whispers" tab to see discovery history

## Key Features to Try

#### Map Screen (Discover Tab)
- Real-time map showing your location
- Discovery radius circle (500m)
- Venue pins automatically generated
- Whisper cards slide up when triggered

#### Whispers Feed (Whispers Tab)
- Time-grouped discovery history
- Filter by type
- Tap any whisper to see full details

#### Profile Tab
- Your taste insights
- Connected preference tags
- Statistics

## Troubleshooting

**"Location permission denied"**
- Go to Settings > Whisper > Location (should be "Always")
- Restart the app

**"App doesn't speak"**
- Verify AirPods/headphones are connected
- Check volume is not muted
- Enable AirPods toggle (🎧) on map

**"Map not showing location"**
- Check location permission (should be "Always")
- Move phone around to trigger updates
- Wait 5-10 seconds for initial lock

## Architecture

```
whisper-native/
  ├── App.js
  └── src/
      ├── navigation/ (AppNavigator.js)
      ├── screens/ (8 screens)
      ├── components/ (3 components)
      ├── hooks/ (3 custom hooks)
      ├── data/ (demo data)
      └── theme.js (design system)
```

## Performance Tips

- App works best on physical devices
- Audio routes automatically to Bluetooth
- Location tracking uses minimal battery when background disabled

## Next Steps

1. Replace demo data with real API
2. Connect real Google Maps / Instagram data
3. Add place database (Foursquare, Google Places)
4. Implement saved venues
5. Add notifications

## Support

For issues:
- Check the console in Expo debugger: `npm start` then press 'j'
- Verify permissions in Settings
- Restart the Expo server with `npm start`
- Reinstall with `npm install`

Enjoy discovering amazing places!