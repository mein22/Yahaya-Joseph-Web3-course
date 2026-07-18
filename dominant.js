const SCRIPTS = [
  {
    name: "Adlam",
    ranges: [[0x1E900, 0x1E94A], [0x1E950, 0x1E959], [0x1E95E, 0x1E95F]],
    direction: "rtl",
  },
  {
    name: "Arabic",
    ranges: [[0x600, 0x6FF], [0x750, 0x77F], [0x8A0, 0x8FF], [0xFB50, 0xFDFF], [0xFE70, 0xFEFF]],
    direction: "rtl",
  },
  {
    name: "Latin",
    ranges: [[0x0000, 0x007F], [0x0100, 0x017F], [0x0180, 0x024F]],
    direction: "ltr",
  },
];


function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find(c => c.name == name);
    if (!known) {
      counts.push({name, count: 1});
    } else {
      known.count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let scripts = text.split('').map(char => characterScript(char.codePointAt(0)));
  let directions = countBy(scripts.filter(s => s != null), script => script.direction);

  return directions.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!")); // → ltr
console.log(dominantDirection("Hey, مساء الخير")); // → rtl

