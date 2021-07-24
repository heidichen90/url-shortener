function generateShorteUrl(url) {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";

  const options = {
    length: "5",
    lowercase: "on",
    uppercase: "on",
    numbers: "on",
  };

  let collection = [];

  if (options.lowercase === "on") {
    collection = collection.concat([...lowerCaseLetters]);
  }

  if (options.uppercase === "on") {
    collection = collection.concat([...upperCaseLetters]);
  }

  if (options.numbers === "on") {
    collection = collection.concat([...numbers]);
  }

  if (options.symbols === "on") {
    collection = collection.concat([...symbols]);
  }

  //if it's empty collection, return error
  if (collection.length === 0) {
    return "This is not a valid option";
  }

  let result = "";

  for (let i = 1; i <= options.length; i++) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    result += collection[randomIndex];
    collection.splice(randomIndex, 1);
  }

  return result;
}

module.exports = { generateShorteUrl };
