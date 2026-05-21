# Integration Guide: Whisper React Native App

This document explains how the Whisper React Native app integrates with the web prototype design system.

## Design System Integration

### Colors
All colors from the web prototype are implemented in `src/theme.js`:

```javascript
ink:     #0e0c0a (dark background)
warm:    #c8a96e (accent warm)
accent:  #d4a853 (primary yellow)
surface: #1a1714 (card background)
text:    #e8e0d0 (primary text)
muted:   #6b6355 (tertiary text)
green:   #6a9e6a (success/live)
blue:    #5a7fa0 (secondary)
```

### Typography
- System fonts (Helvetica/San Francisco) match CSS specifications
- Sizes and weights match the web prototype

### Spacing
Theme spacing (4, 8, 12, 16, 20, 24, 32) matches CSS values.

## Component Mapping: Web → Native

| Web Page | Native Screen |
|----------|---------------|
| Splash | SplashScreen.js |
| Connect | ConnectSourcesScreen.js |
| Profile | TasteProfileScreen.js |
| Map | MapScreen.js |
| Whispers Feed | WhispersFeedScreen.js |
| Venue Detail | VenueDetailScreen.js |

## Navigation Structure

```
AppNavigator
├── OnboardingStack (Splash → Connect → Profile)
└── MainStack (Map, Feed, Saved, Profile + VenueDetail modal)
```

## Hook Integration

### useLocation
- Uses `expo-location` for background tracking
- Same speed calculation as web version
- Same reverse geocoding via Nominatim

### useWhisperAudio
- Uses `expo-speech` for TTS
- Automatic routing to Bluetooth/AirPods
- 30-second cooldown between whispers

### useWhisperEngine
- Identical trigger detection logic
- Same distance calculation
- Same whisper generation

## Extended Features (Mobile-Only)

- **Background Location**: Continuous tracking when backgrounded
- **AirPods Integration**: Auto-routes speech to Bluetooth
- **Real-time Map**: Native map rendering with markers
- **Bottom Tab Nav**: Standard mobile UX

## Progressive Enhancement

### Phase 1: Demo (Current)
- Demo data and places
- Local trigger detection
- Text-to-speech delivery

### Phase 2: Real Data
- Real API integration for whispers
- Connect real place sources
- User authentication

### Phase 3: Advanced
- Persistent storage (saved venues)
- Push notifications
- Analytics
- Offline mode

## Testing Checklist

- [ ] Splash screen renders correctly
- [ ] Location permission flow works
- [ ] Map shows user location
- [ ] Whisper card slides up when triggered
- [ ] Audio/speech works on device
- [ ] Feed shows time-grouped whispers
- [ ] All colors match web prototype

## Key Files to Modify

| Feature | File |
|---------|------|
| Add real places API | src/data/places.js |
| Add real whispers | src/data/whispers.js |
| Change colors | src/theme.js |
| Add notifications | src/hooks/useWhisperEngine.js |
| Add persistence | src/screens/SavedScreen.js |

## Documentation References

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **expo-location**: https://docs.expo.dev/versions/latest/sdk/location/
- **expo-speech**: https://docs.expo.dev/versions/latest/sdk/speech/