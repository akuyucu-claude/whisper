# Whisper Native - START HERE

Welcome! You have a complete Expo React Native app ready to run.

## What You Have

A production-ready ambient place discovery app with:
- Real-time location tracking
- AirPods audio delivery
- Smart trigger detection
- Beautiful dark UI
- Complete navigation

## In 3 Steps

### Step 1: Setup (2 minutes)
```bash
cd /sessions/serene-fervent-knuth/mnt/cowork/whisper-native
npm install
npx expo doctor
```

### Step 2: Run (1 minute)
```bash
npm start
# Scan QR code with Expo Go app or iPhone camera
```

### Step 3: Test (5 minutes)
1. Grant location permission
2. Tap "Begin"
3. Connect 2+ data sources
4. Walk slowly to trigger a whisper
5. Tap the whisper card to see venue details

## Documentation

Read in this order:

1. **This file** (you are here)
   - Quick orientation

2. **QUICKSTART.md** (8 min read)
   - Step-by-step setup guide
   - What to test on your phone
   - Troubleshooting tips

3. **README.md** (20 min read)
   - Full API documentation
   - Architecture details
   - All screens and components

4. **INTEGRATION.md** (15 min read)
   - How native integrates with web
   - Where to add real data

5. **FILE_MANIFEST.md** (10 min read)
   - Complete file listing
   - What each file does

## Key Files to Know

### Entry Points
- **App.js** - Main app entry, handles permissions
- **app.json** - Expo config with iOS/Android permissions

### Core Features
- **src/hooks/useLocation.js** - GPS tracking
- **src/hooks/useWhisperAudio.js** - AirPods/speech
- **src/hooks/useWhisperEngine.js** - Trigger detection

### User Interface
- **src/screens/MapScreen.js** - Main discovery map
- **src/screens/WhispersFeedScreen.js** - Whisper history
- **src/components/WhisperCard.js** - Floating discovery card

### Design
- **src/theme.js** - Colors, spacing, typography

## First Time Issues?

**"npm install fails"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Location permission denied"**
Go to Settings → Whisper → Location → select "Always"

**"App doesn't speak"**
- Check AirPods are connected
- Enable the 🎙 button on map
- Check volume is turned on

**"Map shows nothing"**
- Wait 5-10 seconds for GPS
- Move to outdoor area
- Allow location "Always" in permissions

See **QUICKSTART.md** for more troubleshooting.

## Next Steps

### Immediate (Today)
- [ ] Run `npm install`
- [ ] Test on Expo Go
- [ ] Walk around and trigger whispers
- [ ] Explore all screens and features

### Short Term (This Week)
- [ ] Read README.md for architecture details
- [ ] Review hook implementations
- [ ] Understand trigger logic
- [ ] Customize colors or copy if desired

### Medium Term (This Month)
- [ ] Connect real place data (Foursquare/Google)
- [ ] Add user authentication
- [ ] Implement persistent storage
- [ ] Add push notifications

### Long Term (Later)
- [ ] Deploy to App Store / Google Play
- [ ] Add analytics
- [ ] Build admin dashboard
- [ ] Scale to multiple cities

## Project Structure

```
whisper-native/
├── 📄 START_HERE.md          ← You are here
├── 📖 README.md              ← Full documentation
├── 🚀 QUICKSTART.md          ← Setup guide
├── 🔗 INTEGRATION.md         ← Web prototype integration
├── 📋 FILE_MANIFEST.md       ← Complete file listing
│
├── App.js                    ← App entry point
├── app.json                  ← Expo configuration
├── package.json              ← Dependencies
│
└── src/
    ├── theme.js              ← Design system
    ├── navigation/
    │   └── AppNavigator.js   ← Screen routing
    ├── screens/              ← 8 screens
    ├── components/           ← 3 reusable components
    ├── hooks/                ← 3 custom hooks
    └── data/                 ← Demo data
```

## Key Commands

| Command | What It Does |
|---------|----------|
| `npm install` | Install dependencies |
| `npm start` | Launch dev server + show QR code |
| `npx expo doctor` | Check for configuration issues |
| `npm run ios` | Open iOS simulator |
| `npm run android` | Open Android emulator |

## Files to Customize

If you want to change things:

| Change | File |
|--------|------|
| Colors | `src/theme.js` |
| Copy/messages | `src/data/whispers.js` |
| Navigation structure | `src/navigation/AppNavigator.js` |
| Add screens | Create in `src/screens/` |

## Architecture in 30 Seconds

1. **App.js** → Requests permissions, renders AppNavigator
2. **AppNavigator.js** → Routes between onboarding and main app
3. **Screens** → Each screen manages its own UI
4. **Hooks** → useLocation, useWhisperAudio, useWhisperEngine handle logic
5. **Components** → Reusable UI pieces (WhisperCard, etc.)
6. **Data** → Demo whispers and places
7. **Theme** → Centralized design tokens

## Performance Tips

- App works best on physical devices (GPS doesn't work well in simulator)
- Audio routes automatically to Bluetooth when connected
- Location tracking uses minimal battery if background location is disabled
- All data is demo data; production will need real API

## Support

If stuck:

1. **Read QUICKSTART.md** - Solves 90% of issues
2. **Check permissions** - Go to phone Settings
3. **Restart app** - Sometimes fixes connection issues
4. **Restart Expo server** - Stop and run `npm start` again
5. **Clean rebuild** - `rm -rf node_modules && npm install`

## What's Next?

Pick one:

**I want to understand the code**
→ Read README.md architecture section

**I want to deploy to app store**
→ Read section on EAS Build in README.md

**I want to add real data**
→ Read INTEGRATION.md and README.md extending section

**I want to customize the UI**
→ Modify src/theme.js and src/screens/

**I'm ready to go live**
→ Deploy with Expo EAS Build (detailed in README.md)

## Questions?

Check the relevant doc:

- **"How do I...?"** → QUICKSTART.md
- **"How does...work?"** → README.md
- **"Where is...?"** → FILE_MANIFEST.md
- **"How do I connect real data?"** → INTEGRATION.md

## Version

**Whisper Native v1.0.0**
- Complete Expo React Native implementation
- All features from requirements
- Ready for Expo Go testing and deployment
- Built February 28, 2025

---

**Next:** Open QUICKSTART.md to begin setup!