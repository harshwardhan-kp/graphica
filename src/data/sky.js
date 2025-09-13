// This file handles gathering all the photos from club folders for the Sky/Explore page.
// Think of it like gathering all Instagram posts, but from our local club folders.

// Find any photo in the clubs folder EXCEPT profile photos
// This uses Vite's special import.meta.glob feature which:
// 1. Looks through all clubs/** folders
// 2. Finds files ending in .png, .jpg, etc.
// 3. Gives us URLs we can use in <img src="...">
const modules = import.meta.glob('/clubs/**/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

// Convert the raw list of files into a clean array of image URLs
// We skip any file named "profile.*" since those are for club avatars, not posts
export const SKY_IMAGES = Object.entries(modules)
  .filter(([path]) => !/\/profile\.(png|jpe?g|webp|gif)$/i.test(path))
  .map(([, url]) => url);
