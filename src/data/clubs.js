// This is our master list of all clubs in the system
// It matches the folder names inside /clubs exactly
export const CLUBS = [
  'Culture board',
  'DDQ',
  'Gdsc',
  'ISDF',
  'Magboard',
  'ossClub',
  'R&D',
  'Sipiritual club',
  'SportsClub',
  'Technical Board',
];

// Find every profile picture in club folders (profile.jpg, profile.png, etc.)
// This helps us bundle images with our app or serve them from the right place
const profileModules = import.meta.glob('/clubs/**/profile.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

// Make a quick lookup table: club name → profile picture URL
// Example: "DDQ" → "/assets/clubs/DDQ/profile.jpg"
const PROFILE_MAP = new Map();
for (const [path, url] of Object.entries(profileModules)) {
  const m = path.match(/\/clubs\/([^/]+)\/profile\.(png|jpe?g|webp|gif)$/i);
  if (m) PROFILE_MAP.set(m[1], url);
}

// Given a club name, get its profile picture URL
// This is used in the stories strip and Nest page for club avatars
export function clubImageSrc(name) {
  // First try to find a bundled profile image
  if (PROFILE_MAP.has(name)) return PROFILE_MAP.get(name);
  // If not found, try looking in /public/clubs
  const seg = encodeURIComponent(name);
  return `/clubs/${seg}/profile.jpg`;
}
