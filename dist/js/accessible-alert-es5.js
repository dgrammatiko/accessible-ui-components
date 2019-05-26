;

(function () {
  "use strict";

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var AccessibleAlertTitle = function (_HTMLElement) {
    _inherits(AccessibleAlertTitle, _HTMLElement);

    function AccessibleAlertTitle() {
      _classCallCheck(this, AccessibleAlertTitle);

      return _possibleConstructorReturn(this, _getPrototypeOf(AccessibleAlertTitle).apply(this, arguments));
    }

    return AccessibleAlertTitle;
  }(_wrapNativeSuper(HTMLElement));

  var AccessibleAlertContent = function (_HTMLElement2) {
    _inherits(AccessibleAlertContent, _HTMLElement2);

    function AccessibleAlertContent() {
      _classCallCheck(this, AccessibleAlertContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(AccessibleAlertContent).apply(this, arguments));
    }

    return AccessibleAlertContent;
  }(_wrapNativeSuper(HTMLElement));

  var AccessibleAlert = function (_HTMLElement3) {
    _inherits(AccessibleAlert, _HTMLElement3);

    _createClass(AccessibleAlert, [{
      key: "type",
      get: function get() {
        return this.getAttribute('type');
      },
      set: function set(value) {
        return this.setAttribute('type', value);
      }
    }, {
      key: "dismiss",
      get: function get() {
        return this.getAttribute('dismiss');
      },
      set: function set(value) {
        return this.setAttribute('type', value);
      }
    }, {
      key: "autoDismiss",
      get: function get() {
        var val = parseInt(this.getAttribute('auto-dismiss'), 10);
        return val > 0 ? val : false;
      },
      set: function set(value) {
        return this.setAttribute('auto-dismiss', parseInt(value, 10));
      }
    }, {
      key: "buttonText",
      get: function get() {
        return this.getAttribute('button-text') || 'Close';
      },
      set: function set(value) {
        return this.setAttribute('button-text', value);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['type', 'dismiss'];
      }
    }]);

    function AccessibleAlert() {
      var _this;

      _classCallCheck(this, AccessibleAlert);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AccessibleAlert).call(this));
      _this.hasDismissButton = false;
      _this.closeButton = '';
      _this.dispatchCustomEvent = _this.dispatchCustomEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.appendCloseButton = _this.appendCloseButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.removeCloseButton = _this.removeCloseButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.render = _this.render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.close = _this.close.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }
    /* Lifecycle, element appended to the DOM */


    _createClass(AccessibleAlert, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.type || this.type && ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1) {
          this.type = 'info';
        }

        this.render();
        this.dispatchCustomEvent('accessible.alert.show');
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case 'type':
            if (!newValue || newValue && ['info', 'warning', 'danger', 'success'].indexOf(newValue) === -1) {
              this.type = 'info';
            }

            break;

          case 'dismiss':
          case 'title':
          case 'message':
          case 'button-text':
          case 'auto-dismiss':
            this.render();
            break;

          default:
            break;
        }
      }
    }, {
      key: "dispatchCustomEvent",
      value: function dispatchCustomEvent(eventName) {
        var OriginalCustomEvent = new CustomEvent(eventName);
        this.dispatchEvent(OriginalCustomEvent);
        this.removeEventListener(eventName, OriginalCustomEvent);
      }
    }, {
      key: "close",
      value: function close() {
        this.dispatchCustomEvent('accessible.alert.hide');
        this.removeAttribute('show');
        this.parentNode.removeChild(this);
      }
    }, {
      key: "appendCloseButton",
      value: function appendCloseButton() {
        this.setAttribute('role', 'alert');
        this.closeButton = this.querySelector('button');

        if (!this.closeButton) {
          this.closeButton = document.createElement('button');
        }

        this.closeButton.textContent = this.buttonText;
        this.closeButton.setAttribute('aria-label', this.buttonText);
        this.closeButton.setAttribute('type', 'button');
        this.insertAdjacentElement('afterbegin', this.closeButton);
        this.closeButton.addEventListener('click', this.close);
        this.closeButton.focus();
      }
    }, {
      key: "removeCloseButton",
      value: function removeCloseButton() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
          this.removeChild(this.closeButton);
        }
      }
    }, {
      key: "timeout",
      value: function timeout() {
        this.timeoutFn = setTimeout(this.close, this.autoDismmiss);
      }
    }, {
      key: "setDismissTimeout",
      value: function setDismissTimeout() {
        this.timeoutFn();
      }
    }, {
      key: "unsetDismissTimeout",
      value: function unsetDismissTimeout() {
        clearTimeout(this.timeoutFn);
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.hasAttribute('dismiss') || this.dismiss && this.dismiss !== 'false') {
          this.removeCloseButton();
        } else {
          this.appendCloseButton();
        }

        if (!this.hasAttribute('auto-dismiss') || this.autoDismiss && this.autoDismiss < 0) {
          this.unsetDismissTimeout();
        } else {
          this.setDismissTimeout();
        }
      }
    }]);

    return AccessibleAlert;
  }(_wrapNativeSuper(HTMLElement));

  document.customElements.define('accessible-alert-title', AccessibleAlertTitle);
  document.customElements.define('accessible-alert-content', AccessibleAlertContent);
  document.customElements.define('accessible-alert', AccessibleAlert);
})();