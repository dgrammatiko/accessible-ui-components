var alert = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var AccessibleAlertContent =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(AccessibleAlertContent, _HTMLElement);

    function AccessibleAlertContent() {
      _classCallCheck(this, AccessibleAlertContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(AccessibleAlertContent).apply(this, arguments));
    }

    return AccessibleAlertContent;
  }(_wrapNativeSuper(HTMLElement)); // eslint-disable-next-line import/prefer-default-export

  var AccessibleAlert =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(AccessibleAlert, _HTMLElement);

    _createClass(AccessibleAlert, [{
      key: "attributeChangedCallback",

      /**
       * Respond to attribute changes
       */
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
        }
      }
    }, {
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
        return parseInt(this.getAttribute('auto-dismiss'), 10);
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

      /**
       * Attributes
       *
       * type: controls the color of the alert
       * dismiss: Sets a close button for discarding the alert
       * button-text: The text of the button (for i18n)
       * auto-dismiss: The time to automatically dismiss the alert (in milliseconds)
       */

      /**
       * Events
       *
       * accessible.alert.show: fired on alert display
       * accessible.alert.hide: fired on alert dismiss
       *
       */

      /**
       * Methods
       *
       * close: dismisses the alert
       *
       */

      /* Attributes to monitor */
      get: function get() {
        return ['type', 'dismiss', 'auto-dismiss', 'button-text'];
      }
    }]);

    function AccessibleAlert() {
      var _this;

      _classCallCheck(this, AccessibleAlert);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AccessibleAlert).call(this));
      _this.hasDismissButton = false;
      _this.closeButton = '';
      _this.timeoutFn = null;
      _this.dispatchCustomEvent = _this.dispatchCustomEvent.bind(_assertThisInitialized(_this));
      _this.appendCloseButton = _this.appendCloseButton.bind(_assertThisInitialized(_this));
      _this.removeCloseButton = _this.removeCloseButton.bind(_assertThisInitialized(_this));
      _this.render = _this.render.bind(_assertThisInitialized(_this));
      _this.close = _this.close.bind(_assertThisInitialized(_this)); // Create the mutation observer instance.

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          _this.handleMutations(mutation);
        });
      }); // Configuration of the observer: only listen for children changes.

      var config = {
        childList: true
      }; // The observed target is the grid element itself.

      observer.observe(_assertThisInitialized(_this), config);
      return _this;
    }
    /**
     * Lifecycle, element appended to the DOM
     */


    _createClass(AccessibleAlert, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.type || this.type && ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1) {
          this.type = 'info';
        }

        this.render();
        this.dispatchCustomEvent('accessible.alert.show');
      }
      /**
       * Lifecycle, element removed from the DOM
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
        }
      }
      /**
       * Method to dispatch events
       */

    }, {
      key: "dispatchCustomEvent",
      value: function dispatchCustomEvent(eventName) {
        var OriginalCustomEvent = new CustomEvent(eventName);
        this.dispatchEvent(OriginalCustomEvent);
      }
      /**
       * Method to close the alert
       */

    }, {
      key: "close",
      value: function close() {
        this.dispatchCustomEvent('accessible.alert.hide');

        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
        }

        if (this.timeoutFn && typeof this.timeoutFn === 'function') {
          clearTimeout(this.timeoutFn);
        }

        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      }
      /**
       * Method to create the close button
       */

    }, {
      key: "appendCloseButton",
      value: function appendCloseButton() {
        // this.setAttribute('role', 'alert');
        this.closeButton = this.querySelector('button.oiuofdgj3425');

        if (!this.closeButton) {
          this.closeButton = document.createElement('button');
        }

        this.closeButton.setAttribute('aria-label', this.buttonText);
        this.closeButton.setAttribute('class', 'oiuofdgj3425');
        this.closeButton.setAttribute('type', 'button');
        this.insertAdjacentElement('beforeend', this.closeButton);
        this.closeButton.addEventListener('click', this.close);
      }
      /**
       * Method to remove the close button
       */

    }, {
      key: "removeCloseButton",
      value: function removeCloseButton() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
          this.removeChild(this.closeButton);
        }
      }
      /**
       * Method to render the alert
       */

    }, {
      key: "render",
      value: function render() {
        if (!this.hasAttribute('dismiss') || this.dismiss && this.dismiss === 'false') {
          this.removeCloseButton();
        } else {
          this.appendCloseButton();
        }

        if (this.timeoutFn > 0) {
          clearTimeout(this.timeoutFn);
          this.timeoutFn = null;
        }

        if (this.hasAttribute('auto-dismiss') && this.autoDismiss) {
          if (this.timeoutFn === null) {
            this.timeoutFn = setTimeout(this.close, this.autoDismiss);
          }
        }
      }
      /**
       * Method to handle the mutations
       *
       * @param MutationRecord record
       */

    }, {
      key: "handleMutations",
      value: function handleMutations(record) {
        var _this2 = this;

        // Only update given nodes from the mutation.
        if (record instanceof MutationRecord) {
          Array.from(record.addedNodes).forEach(function (node) {
            if (node.nodeName.toLowerCase() === 'accessible-alert-content') {
              _this2.render();
            }
          });
          Array.from(record.removedNodes).forEach(function (node) {
            if (node.nodeName.toLowerCase() === 'accessible-alert-content') {
              _this2.render();
            }
          });
        }
      }
    }]);

    return AccessibleAlert;
  }(_wrapNativeSuper(HTMLElement));

  if (!window.customElements.get('accessible-alert-content')) {
    customElements.define('accessible-alert-content', AccessibleAlertContent);
  }

  if (!window.customElements.get('accessible-alert')) {
    customElements.define('accessible-alert', AccessibleAlert);
  }

  exports.AccessibleAlert = AccessibleAlert;
  exports.AccessibleAlertContent = AccessibleAlertContent;

  return exports;

}({}));
