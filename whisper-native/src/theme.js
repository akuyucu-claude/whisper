export const theme = {
  colors: {
    ink: '#0e0c0a',
    warm: '#c8a96e',
    warmDim: '#8a6e42',
    surface: '#1a1714',
    surface2: '#242018',
    surface3: '#2e2820',
    muted: '#6b6355',
    text: '#e8e0d0',
    textDim: '#a09080',
    accent: '#d4a853',
    green: '#6a9e6a',
    blue: '#5a7fa0',
    red: '#b05050',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  borderRadius: { sm: 8, md: 12, lg: 16, xl: 20, round: 50 },
  typography: {
    title: { fontSize: 34, fontWeight: '300', lineHeight: 41 },
    subtitle: { fontSize: 17, fontWeight: '300', lineHeight: 22 },
    body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
    caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
    tiny: { fontSize: 11, fontWeight: '400', lineHeight: 15 },
  },
}

export const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242018' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242018' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a6e42' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6b6355' }] },
]
