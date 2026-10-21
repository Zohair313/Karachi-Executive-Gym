// Convert a CSS declaration string (as found in an HTML style="..." attribute)
// into a React style object, so the rendered inline styles stay identical.
export function s(css) {
  if (!css) return undefined;
  const out = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    let key = decl.slice(0, i).trim();
    let val = decl.slice(i + 1).trim();
    if (!key || !val) continue;
    // custom properties (--x) must stay as-is
    if (key.startsWith("--")) {
      out[key] = val;
      continue;
    }
    // vendor prefixes: -webkit-x -> WebkitX
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = val;
  }
  return out;
}
