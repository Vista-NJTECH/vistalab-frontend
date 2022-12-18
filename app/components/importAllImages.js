function importImagesCache(r) {
  return r.keys().map(r);
}

export default function importAllImages() {
  const imagesCache = importImagesCache(require.context("../../data/images/slider", false, /\.(png|jpe?g|svg|webp)$/));
  return Object.entries(imagesCache).map((module) => module[1].default);
}
