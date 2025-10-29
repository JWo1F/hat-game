import { escape as $escape } from "vjs";

const templates = import.meta.glob('../views/**/*.vjs', { eager: true });
const renderer = {};

for (const path in templates) {
  const template = templates[path];
  const name = path
    .replace('../views/', '')
    .replace('.vjs', '');

  renderer[name] = async (params, content) => {
    let output = '';

    const append = (str) => output += str;
    const escape = (str) => append($escape(str));

    template.default(params, append, escape, content);

    return output;
  };
}

export const render = (name, params = {}, content) => {
  return renderer[name](params, content);
};
