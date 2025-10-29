import { escape } from "vjs";

const templates = import.meta.glob('../views/**/*.vjs', {
  eager: true,
  import: 'default',
});

const renderer = {};

for (const path in templates) {
  const template = templates[path];
  const name = path
    .replace('../views/', '')
    .replace('.vjs', '');

  renderer[name] = async (params, content) => {
    let output = '';

    template(params, (str) => { output += str }, escape, content);

    return output;
  };
}

export const render = (name, params = {}, content) => {
  return renderer[name](params, content);
};
