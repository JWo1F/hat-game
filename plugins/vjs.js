import { Compiler } from "vjs";

const fileRegex = /\.(vjs)$/;
const compiler = new Compiler();

export default function vjsPlugin() {
  return {
    name: 'jvs-plugin',

    async transform(src, id) {
      if (fileRegex.test(id)) {
        const code = fnWrapper(await compiler.compile(src));

        return { code, map: null }
      }
    },
  }
}

function fnWrapper(code) {
  return `export default function($, append, escape, children) {\n${code}\n}`
}
