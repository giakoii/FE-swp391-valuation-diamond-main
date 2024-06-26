import {
  require_client
} from "./chunk-XELLVQOQ.js";
import "./chunk-GNS54DMT.js";
import {
  require_prop_types
} from "./chunk-NFSFVOD6.js";
import "./chunk-64KT7IG5.js";
import {
  require_react
} from "./chunk-XQBRC4K7.js";
import {
  __commonJS
} from "./chunk-3EJPJMEH.js";

// node_modules/react-confirm-alert/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-confirm-alert/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _class;
    var _temp2;
    exports.confirmAlert = confirmAlert;
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _client = require_client();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ReactConfirmAlert = (_temp2 = _class = function(_Component) {
      _inherits(ReactConfirmAlert2, _Component);
      function ReactConfirmAlert2() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ReactConfirmAlert2);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactConfirmAlert2.__proto__ || Object.getPrototypeOf(ReactConfirmAlert2)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickButton = function(button) {
          if (button.onClick)
            button.onClick();
          _this.close();
        }, _this.handleClickOverlay = function(e) {
          var _this$props = _this.props, closeOnClickOutside = _this$props.closeOnClickOutside, onClickOutside = _this$props.onClickOutside;
          var isClickOutside = e.target === _this.overlay;
          if (closeOnClickOutside && isClickOutside) {
            onClickOutside();
            _this.close();
          }
          e.stopPropagation();
        }, _this.close = function() {
          var afterClose = _this.props.afterClose;
          removeBodyClass();
          removeElementReconfirm(_this.props);
          removeSVGBlurReconfirm(afterClose);
        }, _this.keyboard = function(event) {
          var _this$props2 = _this.props, closeOnEscape = _this$props2.closeOnEscape, onKeypressEscape = _this$props2.onKeypressEscape, onkeyPress = _this$props2.onkeyPress, keyCodeForClose = _this$props2.keyCodeForClose;
          var keyCode = event.keyCode;
          var isKeyCodeEscape = keyCode === 27;
          if (keyCodeForClose.includes(keyCode)) {
            _this.close();
          }
          if (closeOnEscape && isKeyCodeEscape) {
            onKeypressEscape(event);
            _this.close();
          }
          if (onkeyPress) {
            onkeyPress();
          }
        }, _this.componentDidMount = function() {
          document.addEventListener("keydown", _this.keyboard, false);
        }, _this.componentWillUnmount = function() {
          document.removeEventListener("keydown", _this.keyboard, false);
          _this.props.willUnmount();
        }, _this.renderCustomUI = function() {
          var _this$props3 = _this.props, title = _this$props3.title, message = _this$props3.message, buttons = _this$props3.buttons, customUI = _this$props3.customUI;
          var dataCustomUI = {
            title,
            message,
            buttons,
            onClose: _this.close
          };
          return customUI(dataCustomUI);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(ReactConfirmAlert2, [{
        key: "render",
        value: function render() {
          var _this2 = this;
          var _props = this.props, title = _props.title, message = _props.message, buttons = _props.buttons, childrenElement = _props.childrenElement, customUI = _props.customUI, overlayClassName = _props.overlayClassName;
          return _react2.default.createElement(
            "div",
            {
              className: "react-confirm-alert-overlay " + overlayClassName,
              ref: function ref(dom) {
                return _this2.overlay = dom;
              },
              onClick: this.handleClickOverlay
            },
            _react2.default.createElement(
              "div",
              { className: "react-confirm-alert" },
              customUI ? this.renderCustomUI() : _react2.default.createElement(
                "div",
                { className: "react-confirm-alert-body" },
                title && _react2.default.createElement(
                  "h1",
                  null,
                  title
                ),
                message,
                childrenElement(),
                _react2.default.createElement(
                  "div",
                  { className: "react-confirm-alert-button-group" },
                  buttons.map(function(button, i) {
                    return _react2.default.createElement(
                      "button",
                      _extends({
                        key: i,
                        className: button.className
                      }, button, {
                        onClick: function onClick(e) {
                          return _this2.handleClickButton(button);
                        }
                      }),
                      button.label
                    );
                  })
                )
              )
            )
          );
        }
      }]);
      return ReactConfirmAlert2;
    }(_react.Component), _class.propTypes = {
      title: _propTypes2.default.string,
      message: _propTypes2.default.string,
      buttons: _propTypes2.default.array.isRequired,
      childrenElement: _propTypes2.default.func,
      customUI: _propTypes2.default.func,
      closeOnClickOutside: _propTypes2.default.bool,
      closeOnEscape: _propTypes2.default.bool,
      keyCodeForClose: _propTypes2.default.arrayOf(_propTypes2.default.number),
      willUnmount: _propTypes2.default.func,
      afterClose: _propTypes2.default.func,
      onClickOutside: _propTypes2.default.func,
      onKeypressEscape: _propTypes2.default.func,
      onkeyPress: _propTypes2.default.func,
      overlayClassName: _propTypes2.default.string
    }, _class.defaultProps = {
      buttons: [{
        label: "Cancel",
        onClick: function onClick() {
          return null;
        },
        className: null
      }, {
        label: "Confirm",
        onClick: function onClick() {
          return null;
        },
        className: null
      }],
      childrenElement: function childrenElement() {
        return null;
      },
      closeOnClickOutside: true,
      closeOnEscape: true,
      keyCodeForClose: [],
      willUnmount: function willUnmount() {
        return null;
      },
      afterClose: function afterClose() {
        return null;
      },
      onClickOutside: function onClickOutside() {
        return null;
      },
      onKeypressEscape: function onKeypressEscape() {
        return null;
      }
    }, _temp2);
    exports.default = ReactConfirmAlert;
    var root = null;
    var targetId = "react-confirm-alert";
    function createSVGBlurReconfirm() {
      var svg = document.getElementById("react-confirm-alert-firm-svg");
      if (svg)
        return;
      var svgNS = "http://www.w3.org/2000/svg";
      var feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
      feGaussianBlur.setAttribute("stdDeviation", "0.3");
      var filter = document.createElementNS(svgNS, "filter");
      filter.setAttribute("id", "gaussian-blur");
      filter.appendChild(feGaussianBlur);
      var svgElem = document.createElementNS(svgNS, "svg");
      svgElem.setAttribute("id", "react-confirm-alert-firm-svg");
      svgElem.setAttribute("class", "react-confirm-alert-svg");
      svgElem.appendChild(filter);
      document.body.appendChild(svgElem);
    }
    function removeSVGBlurReconfirm(afterClose) {
      var svg = document.getElementById("react-confirm-alert-firm-svg");
      if (svg) {
        svg.parentNode.removeChild(svg);
      }
      document.body.children[0].classList.remove("react-confirm-alert-blur");
      afterClose();
    }
    function createElementReconfirm(properties) {
      var divTarget = document.getElementById(properties.targetId || targetId);
      if (properties.targetId && !divTarget) {
        console.error("React Confirm Alert:", "Can not get element id (#" + properties.targetId + ")");
      }
      if (divTarget) {
        root = (0, _client.createRoot)(divTarget);
        root.render(_react2.default.createElement(ReactConfirmAlert, properties));
      } else {
        document.body.children[0].classList.add("react-confirm-alert-blur");
        divTarget = document.createElement("div");
        divTarget.id = targetId;
        document.body.appendChild(divTarget);
        root = (0, _client.createRoot)(divTarget);
        root.render(_react2.default.createElement(ReactConfirmAlert, properties));
      }
    }
    function removeElementReconfirm(properties) {
      var target = document.getElementById(properties.targetId || targetId);
      if (target) {
        root.unmount(target);
      }
    }
    function addBodyClass() {
      document.body.classList.add("react-confirm-alert-body-element");
    }
    function removeBodyClass() {
      document.body.classList.remove("react-confirm-alert-body-element");
    }
    function confirmAlert(properties) {
      addBodyClass();
      createSVGBlurReconfirm();
      createElementReconfirm(properties);
    }
  }
});
export default require_lib();
//# sourceMappingURL=react-confirm-alert.js.map
