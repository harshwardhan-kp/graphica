// Club list derived from the folders under /clubs
// We URL-encode names when building image paths to support spaces and symbols
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

// Use a glob to include any profile image per club folder; generates file URLs
const profileModules = import.meta.glob('/clubs/**/profile.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

const PROFILE_MAP = new Map(); // folderName -> url
for (const [path, url] of Object.entries(profileModules)) {
  const m = path.match(/\/clubs\/([^/]+)\/profile\.(png|jpe?g|webp|gif)$/i);
  if (m) PROFILE_MAP.set(m[1], url);
}

export function clubImageSrc(name) {
  // Prefer bundled url via glob; fallback to direct /clubs path for dev
  if (PROFILE_MAP.has(name)) return PROFILE_MAP.get(name);
  const seg = encodeURIComponent(name);
  return `/clubs/${seg}/profile.jpg`;
}
