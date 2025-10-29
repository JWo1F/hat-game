import { Compiler } from "vjs";

const fileRegex = /\.(vjs)$/;
const compiler = new Compiler();

export default function vjsPlugin() {
  return {
    name: 'jvs-plugin',

    async transform(src, id) {
      if (fileRegex.test(id)) {
        const code = toModule(await compiler.compile(src));

        return { code, map: null }
      }
    },
  }
}

function toModule(code) {
  const [header, body] = extractRequire(code);

  return `
    import { escape } from "vjs";
    ${header}
    
    export default function($, children) {
      let output = "";
      const append = (str) => { output += str; };
      
      ${body}
    
      return output;
    }
  `;
}

function extractRequire(code) {
  const headers = [];
  let index = 0;

  code = code.replace(/require\((.+?)\)/g, (match, p1) => {
    const name = `__require_${index++}__`;
    headers.push(`import ${name} from ${p1};`);
    return name;
  });

  return [headers.join('\n'), code];
}
