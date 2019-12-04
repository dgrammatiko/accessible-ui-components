var tabs = (function (exports) {
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

  var AccessibleTab =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(AccessibleTab, _HTMLElement);

    function AccessibleTab() {
      _classCallCheck(this, AccessibleTab);

      return _possibleConstructorReturn(this, _getPrototypeOf(AccessibleTab).apply(this, arguments));
    }

    return AccessibleTab;
  }(_wrapNativeSuper(HTMLElement)); // eslint-disable-next-line import/prefer-default-export

  var AccessibleTabs =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(AccessibleTabs, _HTMLElement);

    _createClass(AccessibleTabs, [{
      key: "attributeChangedCallback",

      /**
       * Respond to attribute changes
       */
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case 'recall':
          case 'orientation':
            this.render();
            break;
        }
      }
    }, {
      key: "recall",
      get: function get() {
        return this.getAttribute('recall');
      },
      set: function set(value) {
        this.setAttribute('recall', value);
      }
    }], [{
      key: "observedAttributes",

      /**
       * Attributes to monitor
       */
      get: function get() {
        return ['recall', 'orientation'];
      }
    }]);

    function AccessibleTabs() {
      var _this;

      _classCallCheck(this, AccessibleTabs);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AccessibleTabs).call(this)); // Setup configuration

      _this.hasActive = false;
      _this.currentActive = '';
      _this.hasNested = false;
      _this.isNested = false;
      _this.ulElement = '';
      _this.tabs = [];
      _this.tabsLinks = [];
      _this.panels = [];
      _this.tabLinkHash = []; // Create the mutation observer instance.

      var observer = new MutationObserver(function (mutations) {
        return mutations.forEach(function (mutation) {
          return _this.handleMutations(mutation);
        });
      }); // Configuration of the observer: only listen for children changes.

      var config = {
        childList: true
      }; // The observed target is the grid element itself.

      observer.observe(_assertThisInitialized(_this), config);
      return _this;
    }

    _createClass(AccessibleTabs, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.render();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this2 = this;

        if (this.ulElement) {
          var links = Array.from(this.ulElement.querySelectorAll('a'));
          links.forEach(function (link) {
            link.removeEventListener('click', _this2.activateTabFromLink);
          });
          this.ulElement.removeEventListener('keydown', this.keyBehaviour);
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (this.firstElementChild.nodeName === 'UL') {
          this.removeChild(this.firstElementChild);
        }

        this.buildNavigation();
      }
      /**
       * Method to handle the mutations
       *
       * @param MutationRecord record
       */

    }, {
      key: "handleMutations",
      value: function handleMutations(record) {
        var _this3 = this;

        // Only update given nodes from the mutation.
        if (record instanceof MutationRecord) {
          Array.from(record.addedNodes).forEach(function (node) {
            if (node instanceof AccessibleTab) {
              _this3.render();
            }
          });
          Array.from(record.removedNodes).forEach(function (node) {
            if (node instanceof AccessibleTab) {
              _this3.render();
            }
          });
        }
      }
      /**
       * Method to build the needed navigation
       *
       * @param MutationRecord record
       */

    }, {
      key: "buildNavigation",
      value: function buildNavigation() {
        var _this4 = this;

        this.tabElements = Array.from(this.children);
        console.log(this.tabElements);

        if (this.tabElements.length) {
          /** Activate Tab */
          var activateTabFromLink = function activateTabFromLink(e) {
            e.preventDefault();
            debugger;

            if (_this4.hasActive) {
              _this4.hideCurrent();
            }

            var currentTabLink = _this4.currentActive; // Set the selected tab as active
            // Emit show event

            _this4.dispatchCustomEvent('joomla.tab.show', e.target, _this4.querySelector("#".concat(currentTabLink.replace('tab-', ''))));

            e.target.setAttribute('active', '');
            e.target.setAttribute('aria-selected', 'true');
            e.target.setAttribute('tabindex', '0');

            _this4.querySelector("#".concat(e.target.id)).setAttribute('active', '');

            _this4.querySelector("#".concat(e.target.id)).removeAttribute('aria-hidden');

            _this4.currentActive = e.target.id; // Emit shown event

            _this4.dispatchCustomEvent('joomla.tab.shown', e.target, _this4.querySelector("#".concat(currentTabLink.replace('tab-', ''))));

            _this4.saveState("#tab-".concat(e.target.id));
          }; // Remove the existing navigation


          if (this.firstElementChild.nodeName === 'UL') {
            this.removeChild(this.firstElementChild);
          } // Recreate the navigation


          this.ulElement = document.createElement('ul');
          this.ulElement.setAttribute('role', 'tablist');
          this.tabElements.forEach(function (tab) {
            if (tab.parentNode !== _this4) {
              return;
            }

            var active = tab.hasAttribute('active') || false;
            var name = tab.getAttribute('name');

            if (tab.id && name) {
              var liElement = document.createElement('li');
              liElement.setAttribute('role', 'presentation');
              var linkElement = document.createElement('a');
              linkElement.setAttribute('role', 'tab');
              linkElement.setAttribute('aria-selected', active ? 'true' : 'false');
              linkElement.setAttribute('aria-controls', tab.id);
              linkElement.setAttribute('tabindex', active ? '0' : '-1');
              linkElement.setAttribute('href', "#".concat(tab.id));
              linkElement.setAttribute('id', "tab-".concat(tab.id));
              linkElement.textContent = tab.getAttribute('name');

              if (active) {
                _this4.hasActive = true;
                _this4.currentActive = tab.id;
              }

              var linkClass = tab.getAttribute('link-class');

              if (linkClass) {
                linkElement.setAttribute('class', linkClass);
              }

              linkElement.addEventListener('click', activateTabFromLink);
              liElement.appendChild(linkElement);

              _this4.ulElement.appendChild(liElement);
            }
          });
          this.insertAdjacentElement('afterbegin', this.ulElement);
        }
      }
    }, {
      key: "hideCurrent",
      value: function hideCurrent() {
        // Unset the current active tab
        if (this.currentActive) {
          // Emit hide event
          var el = this.querySelector("a[aria-controls=\"".concat(this.currentActive, "\"]"));
          this.dispatchCustomEvent('accessible.tabs.hide', el, this.querySelector("#".concat(this.currentActive)));
          el.removeAttribute('active');
          el.setAttribute('tabindex', '-1');
          this.querySelector("#".concat(this.currentActive)).removeAttribute('active');
          this.querySelector("#".concat(this.currentActive)).setAttribute('aria-hidden', 'true');
          el.removeAttribute('aria-selected'); // Emit hidden event

          this.dispatchCustomEvent('accessible.tabs.hidden', el, this.querySelector("#".concat(this.currentActive)));
        }
      }
      /** Activate Tab */

    }, {
      key: "activateTabFromLink",
      value: function activateTabFromLink(e) {
        e.preventDefault();
        var currentTabLink = this.currentActive;

        if (this.hasActive) {
          this.hideCurrent();
        } // Set the selected tab as active
        // Emit show event


        this.dispatchCustomEvent('accessible.tabs.show', e.target, this.querySelector("#tab-".concat(currentTabLink)));
        e.target.setAttribute('active', '');
        e.target.setAttribute('aria-selected', 'true');
        e.target.setAttribute('tabindex', '0');
        this.querySelector(e.target.hash).setAttribute('active', '');
        this.querySelector(e.target.hash).removeAttribute('aria-hidden');
        this.currentActive = e.target.hash.substring(1); // Emit shown event

        this.dispatchCustomEvent('accessible.tabs.shown', e.target, this.querySelector("#tab-".concat(currentTabLink)));
        this.saveState("#tab-".concat(e.target.hash.substring(1)));
      }
    }, {
      key: "showTab",
      value: function showTab(tab) {
        var tabLink = document.querySelector("#tab-".concat(tab.id));
        tabLink.click();
      }
    }, {
      key: "show",
      value: function show(link) {
        link.click();
      }
    }, {
      key: "keyBehaviour",
      value: function keyBehaviour(e) {
        // collect tab targets, and their parents' prev/next (or first/last)
        var currentTab = this.querySelector("#tab-".concat(this.currentActive));
        var previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
        var nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild; // Don't catch key events when ⌘ or Alt modifier is present

        if (e.metaKey || e.altKey) {
          return;
        }

        if (this.tabs.indexOf("#".concat(document.activeElement.id)) === -1) {
          return;
        } // catch left/right and up/down arrow key events


        switch (e.keyCode) {
          case 37:
          case 38:
            e.preventDefault();
            e.stopPropagation();
            previousTabItem.querySelector('a').focus();
            previousTabItem.querySelector('a').click();
            break;

          case 39:
          case 40:
            e.preventDefault();
            e.stopPropagation();
            nextTabItem.querySelector('a').focus();
            nextTabItem.querySelector('a').click();
            break;
        }
      }
      /* eslint-disable */

    }, {
      key: "findAncestorByTagNme",
      value: function findAncestorByTagNme(el, tagName) {
        while ((el = el.parentElement) && el.nodeName.toLowerCase() !== tagName) {
        }

        return el;
      }
      /* eslint-enable */

      /* Method to dispatch events */

    }, {
      key: "dispatchCustomEvent",
      value: function dispatchCustomEvent(eventName, element, related) {
        var OriginalCustomEvent = new CustomEvent(eventName, {
          bubbles: true,
          cancelable: true
        });

        if (related) {
          OriginalCustomEvent.relatedTarget = related;
        }

        element.dispatchEvent(OriginalCustomEvent, {
          once: true
        }); // element.removeEventListener(eventName, element);
      }
    }]);

    return AccessibleTabs;
  }(_wrapNativeSuper(HTMLElement)); // eslint-disable-next-line import/prefer-default-export
  customElements.define('accessible-tab', AccessibleTab);
  customElements.define('accessible-tabs', AccessibleTabs);

  exports.AccessibleTab = AccessibleTab;
  exports.AccessibleTabs = AccessibleTabs;

  return exports;

}({}));
