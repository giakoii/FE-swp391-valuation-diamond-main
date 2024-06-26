import {
  require_classnames,
  useBootstrapPrefix
} from "./chunk-3OHQZPKY.js";
import {
  require_jsx_runtime
} from "./chunk-WXMDZE62.js";
import {
  require_react
} from "./chunk-XQBRC4K7.js";
import {
  __toESM
} from "./chunk-3EJPJMEH.js";

// node_modules/react-bootstrap/esm/Table.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Table = React.forwardRef(({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "table");
  const classes = (0, import_classnames.default)(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === "string" ? `striped-${striped}` : "striped"}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = (0, import_jsx_runtime.jsx)("table", {
    ...props,
    className: classes,
    ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === "string") {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return (0, import_jsx_runtime.jsx)("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
var Table_default = Table;

export {
  Table_default
};
//# sourceMappingURL=chunk-62XFWA46.js.map
