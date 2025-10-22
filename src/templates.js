import { Vjs } from "vjs";

const templates = import.meta.glob('../views/**/*.vjs', { as: 'raw', eager: true });
const vjs = new Vjs();

const renderer = {};

for (const path in templates) {
  const templateText = templates[path];
  const compiled = await vjs.compile(templateText);
  const name = path.replace('../views/', '').replace('.vjs', '');

  renderer[name] = async (params) => vjs.render(compiled, params);
}

export const render = (name, params = {}) => {
  return renderer[name](params);
};
