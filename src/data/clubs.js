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

const profileModules = import.meta.glob('/clubs/**/profile.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

const PROFILE_MAP = new Map();
for (const [path, url] of Object.entries(profileModules)) {
  const m = path.match(/\/clubs\/([^/]+)\/profile\.(png|jpe?g|webp|gif)$/i);
  if (m) PROFILE_MAP.set(m[1], url);
}

export function clubImageSrc(name) {
  if (PROFILE_MAP.has(name)) return PROFILE_MAP.get(name);

  const seg = encodeURIComponent(name);
  return `/clubs/${seg}/profile.jpg`;
}
