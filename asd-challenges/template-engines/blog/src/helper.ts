export function slugify(str: string) {
  return str
    .normalize("NFD") // é → e + ́
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/['']/g, "") // Remove apostrophes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}

export function deslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function indefiniteArticle(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}
