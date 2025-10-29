import { Vjs } from "vjs";

const fileRegex = /\.(vjs)$/;
const compiler = new Vjs();

export default function vjsPlugin() {
  return {
    name: 'jvs-plugin',

    async transform(src, id) {
      if (fileRegex.test(id)) {
        const code = fnWrapper(await compiler.compiler.compile(src));

        return { code, map: null }
      }
    },
  }
}

function fnWrapper(code) {
  let index = 0;
  let header = '';

  code = code.replace(/vite_asset_src\((.+?)\)/g, (_, param) => {
    const varName = `__vjs_asset_src_${index++}__`;
    header += `import ${varName} from ${param}\n`;
    return varName;
  });

  return [
    header,
    `export default function($, append, escape, yield2) { ${code} }`
  ].join('\n');
}
