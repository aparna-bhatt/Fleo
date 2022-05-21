import data from "./org-chart.json";
let children_data = [];
const dfs = (curr, id, level) => {
  if (curr === undefined || curr.attributes.level > level) {
    console.log("In First");
  } else if (curr.attributes.level === level && curr.attributes.id === id) {
    console.log("HERE");
    console.log(curr);
    if (curr.children !== undefined) {
      const curr_data = [];
      curr.children.forEach((element) => {
        curr_data.push({
          category: element.category,
          attributes: { ...element.attributes },
        });
      });
      children_data = curr_data;
    }
  } else {
    curr.children?.forEach((child) => {
      dfs(child, id, level);
    });
  }
};

const getData = (id, level) => {
  children_data = [];
  const id1 = id,
    level1 = level;
  dfs({ ...data }, id1, level1);
  return children_data;
};

export default getData;
