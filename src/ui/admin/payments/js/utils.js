export const pagesTree = (
  items, 
  parent = 0, 
  level = 0, 
  result = []
) => {
  items
    .filter(item => item.parent === parent)
    .forEach(item => {
      result.push({
        value: item.id,
        label: `${"— ".repeat(level)}${item.title}`
      });

      pagesTree(items, item.id, level + 1, result);
    });

  return result;
}