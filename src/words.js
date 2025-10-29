const categories = await import.meta.glob('../assets/texts/categories/*.txt', { as: 'raw', eager: true });

export function getWordsByCategories(selectedCategories, count) {
  const output = [];

  const allWords = selectedCategories.flatMap(category => {
    const filePath = `../assets/texts/categories/${category}.txt`;
    const fileContent = categories[filePath];

    return fileContent.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  });

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const word = allWords.splice(randomIndex, 1)[0];

    output.push(word);
  }

  return output;
}