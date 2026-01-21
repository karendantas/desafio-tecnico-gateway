export function calculateProgress(
  title: String,
  listingType: String,
  value: String,
  images: String[],
) {
  let completed = 0;

  if (title.trim().length > 0) completed++;
  if (listingType) completed++;
  if (value && value !== "0.0") completed++;
  if (images.length > 0) completed++;

  return completed;
}
