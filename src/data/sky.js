// Gather all non-profile images from the clubs directory for the Explore/Sky grid.
// Uses Vite's import.meta.glob to emit static URLs at build time.

const modules = import.meta.glob('/clubs/**/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

// Filter out any profile.* images; keep only post/media images
export const SKY_IMAGES = Object.entries(modules)
  .filter(([path]) => !/\/profile\.(png|jpe?g|webp|gif)$/i.test(path))
  .map(([, url]) => url);
