const modules = import.meta.glob('/clubs/**/*.{png,jpg,jpeg,webp,gif,mp4,webm,ogg}', {
  eager: true,
  as: 'url',
});

function fileExt(path) {
  const m = path.match(/\.([a-z0-9]+)$/i);
  return m ? m[1].toLowerCase() : '';
}

function clubFromPath(path) {
  const m = path.match(/\/clubs\/([^/]+)\//);
  return m ? m[1] : 'Unknown';
}

export const FEED_POSTS = Object.entries(modules)
  .filter(([path]) => !/\/profile\.(png|jpe?g|webp|gif|mp4|webm|ogg)$/i.test(path))
  .map(([path, url]) => {
    const ext = fileExt(path);
    const type = ['mp4', 'webm', 'ogg'].includes(ext) ? 'video' : 'image';
    return {
      url,
      type,
      club: clubFromPath(path),
      path,
      ext,
    };
  })
  .sort((a, b) => (a.path < b.path ? 1 : a.path > b.path ? -1 : 0));
