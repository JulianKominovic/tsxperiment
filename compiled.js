let buffer = "";
const bufferLines = buffer.split("\n");

const PADDING_BOTTOM = 20;
function logger(log, loc = "") {
  const { start, end } = JSON.parse(loc);

  const startLine = start.line;
  const endLine = end.line;

  // const startColumn = start.column;
  // const endColumn = end.column;

  for (let i = 0; i <= startLine; i++) {
    if (!bufferLines[i]) {
      bufferLines.push("\n");
    }
  }

  for (let i = 0; i <= endLine; i++) {
    if (i === startLine - 1) {
      bufferLines[i] = buffer + " " + JSON.stringify(log);
    }
  }

  return log;
}
function flushBuffer() {
  console.log(bufferLines.join("\n"));
}

//=================
(logger(logger(function abc() {
  return 1
}(), '{"start":{"line":2,"column":2},"end":{"line":4,"column":6}}');, '{"start":{"line":2,"column":2},"end":{"line":4,"column":6}}'))
const example = {
  name: 'example',
  age: 12,
  address: {
      street: 'example',
      city: 'example',
      country: 'example'
  }
};
const {
  name,
  age,
  address: {street, city, country}
} = example;
(logger(logger(logger(Object.entries(example), '{"start":{"line":15,"column":2},"end":{"line":15,"column":25}}').forEach(([key, value]) => {
  logger(console.log(key, value), '{"start":{"line":16,"column":4},"end":{"line":16,"column":26}}')
}), '{"start":{"line":15,"column":2},"end":{"line":17,"column":4}}');, '{"start":{"line":15,"column":2},"end":{"line":17,"column":4}}'))
const a = 123;
(logger(a + 12;, '{"start":{"line":20,"column":2},"end":{"line":20,"column":6}}'))
(logger(a;, '{"start":{"line":21,"column":2},"end":{"line":21,"column":3}}'))

//=================
flushBuffer();





/*


fetch("https://pokeapi.co/api/v2/pokemon/ditto",{}).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))

console.log(1)


console.log({a:1,b:{f:"asijasa",ekoko:["323232"]}})

*/