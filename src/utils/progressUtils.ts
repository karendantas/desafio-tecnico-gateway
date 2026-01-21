export function calculateProgress(
  title: string,
  listingType: string,
  value: string,
  images: string[],
) {
  let completed = 0;

  if (title.trim().length > 0) completed++;
  if (listingType) completed++;
  if (value && value !== "0.0") completed++;
  if (images.length > 0) completed++;

  return completed;
}
