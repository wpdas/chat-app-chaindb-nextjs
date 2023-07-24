const normalizeUsername = (text: string) =>
  text
    .split(".")
    .map((str) => str[0].toUpperCase() + str.substring(1))
    .join(" ");

export default normalizeUsername;
