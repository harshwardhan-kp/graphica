const modules = import.meta.glob('/clubs/**/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
});

export const SKY_IMAGES = Object.entries(modules)
  .filter(([path]) => !/\/profile\.(png|jpe?g|webp|gif)$/i.test(path))
  .map(([, url]) => url);
