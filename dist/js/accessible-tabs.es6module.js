this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-tabs'] = this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-tabs'] || {};
this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-tabs'].es6 = this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-tabs'].es6 || {};
this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-tabs'].es6.js = (function (exports) {
  'use strict';

  class AccessibleTab extends HTMLElement { }

  class AccessibleTabs extends HTMLElement {
    /**
     * Attributes to monitor
     */
    static get observedAttributes() { return ['recall', 'orientation']; }

    get recall() { return this.getAttribute('recall'); }

    set recall(value) { this.setAttribute('recall', value); }

    /**
     * Respond to attribute changes
     */
    attributeChangedCallback(attr, oldValue, newValue) {
      switch (attr) {
        case 'recall':
        case 'orientation':
          this.render();
          break;
      }
    }

    constructor() {
      super();

      // Setup configuration
      this.hasActive = false;
      this.currentActive = '';
      this.hasNested = false;
      this.isNested = false;
      this.ulElement = '';
      this.tabs = [];
      this.tabsLinks = [];
      this.panels = [];
      this.tabLinkHash = [];

      // Create the mutation observer instance.
      const observer = new MutationObserver(mutations => mutations.forEach(mutation => this.handleMutations(mutation)));

      // Configuration of the observer: only listen for children changes.
      const config = { childList: true };

      // The observed target is the grid element itself.
      observer.observe(this, config);
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      if (this.ulElement) {
        const links = Array.from(this.ulElement.querySelectorAll('a'));

        links.forEach((link) => {
          link.removeEventListener('click', this.activateTabFromLink);
        });

        this.ulElement.removeEventListener('keydown', this.keyBehaviour);
      }
    }

    render() {
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
    handleMutations(record) {
      // Only update given nodes from the mutation.
      if (record instanceof MutationRecord) {
        Array.from(record.addedNodes).forEach((node) => {
          if (node instanceof AccessibleTab) {
            this.render();
          }
        });
        Array.from(record.removedNodes).forEach((node) => {
          if (node instanceof AccessibleTab) {
            this.render();
          }
        });
      }
    }

    /**
     * Method to build the needed navigation
     *
     * @param MutationRecord record
     */
    buildNavigation() {
      this.tabElements = Array.from(this.children);
      console.log(this.tabElements);
      if (this.tabElements.length) {
        /** Activate Tab */
        const activateTabFromLink = (e) => {
          e.preventDefault();
          debugger;
          if (this.hasActive) {
            this.hideCurrent();
          }

          const currentTabLink = this.currentActive;

          // Set the selected tab as active
          // Emit show event
          this.dispatchCustomEvent('joomla.tab.show', e.target, this.querySelector(`#${currentTabLink.replace('tab-', '')}`));
          e.target.setAttribute('active', '');
          e.target.setAttribute('aria-selected', 'true');
          e.target.setAttribute('tabindex', '0');
          this.querySelector(`#${e.target.id}`).setAttribute('active', '');
          this.querySelector(`#${e.target.id}`).removeAttribute('aria-hidden');
          this.currentActive = e.target.id;
          // Emit shown event
          this.dispatchCustomEvent('joomla.tab.shown', e.target, this.querySelector(`#${currentTabLink.replace('tab-', '')}`));
          this.saveState(`#tab-${e.target.id}`);
        };

        // Remove the existing navigation
        if (this.firstElementChild.nodeName === 'UL') {
          this.removeChild(this.firstElementChild);
        }

        // Recreate the navigation
        this.ulElement = document.createElement('ul');
        this.ulElement.setAttribute('role', 'tablist');

        this.tabElements.forEach((tab) => {
          if (tab.parentNode !== this) {
            return;
          }

          const active = tab.hasAttribute('active') || false;
          const name = tab.getAttribute('name');
          if (tab.id && name) {
            const liElement = document.createElement('li');
            liElement.setAttribute('role', 'presentation');
            const linkElement = document.createElement('a');

            linkElement.setAttribute('role', 'tab');
            linkElement.setAttribute('aria-selected', active ? 'true' : 'false');
            linkElement.setAttribute('aria-controls', tab.id);
            linkElement.setAttribute('tabindex', active ? '0' : '-1');
            linkElement.setAttribute('href', `#${tab.id}`);
            linkElement.setAttribute('id', `tab-${tab.id}`);
            linkElement.textContent = tab.getAttribute('name');

            if (active) {
              this.hasActive = true;
              this.currentActive = tab.id;
            }

            const linkClass = tab.getAttribute('link-class');
            if (linkClass) {
              linkElement.setAttribute('class', linkClass);
            }

            linkElement.addEventListener('click', activateTabFromLink);

            liElement.appendChild(linkElement);
            this.ulElement.appendChild(liElement);
          }
        });

        this.insertAdjacentElement('afterbegin', this.ulElement);
      }
    }

    hideCurrent() {
      // Unset the current active tab
      if (this.currentActive) {
        // Emit hide event
        const el = this.querySelector(`a[aria-controls="${this.currentActive}"]`);
        this.dispatchCustomEvent('accessible.tabs.hide', el, this.querySelector(`#${this.currentActive}`));
        el.removeAttribute('active');
        el.setAttribute('tabindex', '-1');
        this.querySelector(`#${this.currentActive}`).removeAttribute('active');
        this.querySelector(`#${this.currentActive}`).setAttribute('aria-hidden', 'true');
        el.removeAttribute('aria-selected');
        // Emit hidden event
        this.dispatchCustomEvent('accessible.tabs.hidden', el, this.querySelector(`#${this.currentActive}`));
      }
    }

    /** Activate Tab */
    activateTabFromLink(e) {
      e.preventDefault();
      const currentTabLink = this.currentActive;

      if (this.hasActive) {
        this.hideCurrent();
      }

      // Set the selected tab as active
      // Emit show event
      this.dispatchCustomEvent('accessible.tabs.show', e.target, this.querySelector(`#tab-${currentTabLink}`));
      e.target.setAttribute('active', '');
      e.target.setAttribute('aria-selected', 'true');
      e.target.setAttribute('tabindex', '0');
      this.querySelector(e.target.hash).setAttribute('active', '');
      this.querySelector(e.target.hash).removeAttribute('aria-hidden');
      this.currentActive = e.target.hash.substring(1);
      // Emit shown event
      this.dispatchCustomEvent('accessible.tabs.shown', e.target, this.querySelector(`#tab-${currentTabLink}`));
      this.saveState(`#tab-${e.target.hash.substring(1)}`);
    }

    showTab(tab) {
      const tabLink = document.querySelector(`#tab-${tab.id}`);
      tabLink.click();
    }

    show(link) {
      link.click();
    }

    keyBehaviour(e) {
      // collect tab targets, and their parents' prev/next (or first/last)
      const currentTab = this.querySelector(`#tab-${this.currentActive}`);

      const previousTabItem = currentTab.parentNode.previousElementSibling ||
        currentTab.parentNode.parentNode.lastElementChild;
      const nextTabItem = currentTab.parentNode.nextElementSibling ||
        currentTab.parentNode.parentNode.firstElementChild;

      // Don't catch key events when ⌘ or Alt modifier is present
      if (e.metaKey || e.altKey) {
        return;
      }

      if (this.tabs.indexOf(`#${document.activeElement.id}`) === -1) {
        return;
      }

      // catch left/right and up/down arrow key events
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
    findAncestorByTagNme(el, tagName) {
      while ((el = el.parentElement) && el.nodeName.toLowerCase() !== tagName);
      return el;
    }
    /* eslint-enable */

    /* Method to dispatch events */
    dispatchCustomEvent(eventName, element, related) {
      const OriginalCustomEvent = new CustomEvent(eventName, { bubbles: true, cancelable: true });
      if (related) {
        OriginalCustomEvent.relatedTarget = related;
      }

      element.dispatchEvent(OriginalCustomEvent, { once: true });
      // element.removeEventListener(eventName, element);
    }
  }

  customElements.define('accessible-tab', AccessibleTab);
  customElements.define('accessible-tabs', AccessibleTabs);

  exports.AccessibleTab = AccessibleTab;
  exports.AccessibleTabs = AccessibleTabs;

  return exports;

}({}));
