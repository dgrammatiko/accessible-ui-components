this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-alert'] = this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-alert'] || {};
this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-alert'].es6 = this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-alert'].es6 || {};
this['/Users/dgrammatiko/Code/desktop/joomla-ui-components/dist/js/accessible-alert'].es6.js = (function (exports) {
  'use strict';

  class AccessibleAlertContent extends HTMLElement { }

  class AccessibleAlert extends HTMLElement {
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
    static get observedAttributes() { return ['type', 'dismiss', 'auto-dismiss', 'button-text']; }

    get type() { return this.getAttribute('type'); }

    set type(value) { return this.setAttribute('type', value); }

    get dismiss() { return this.getAttribute('dismiss'); }

    set dismiss(value) { return this.setAttribute('type', value); }

    get autoDismiss() { return parseInt(this.getAttribute('auto-dismiss'), 10); }

    set autoDismiss(value) { return this.setAttribute('auto-dismiss', parseInt(value, 10)); }

    get buttonText() { return this.getAttribute('button-text') || 'Close'; }

    set buttonText(value) { return this.setAttribute('button-text', value); }

    /**
     * Respond to attribute changes
     */
    attributeChangedCallback(attr, oldValue, newValue) {
      switch (attr) {
        case 'type':
          if (!newValue || (newValue && ['info', 'warning', 'danger', 'success'].indexOf(newValue) === -1)) {
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

    constructor() {
      super();
      this.hasDismissButton = false;
      this.closeButton = '';
      this.timeoutFn = null;
      this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
      this.appendCloseButton = this.appendCloseButton.bind(this);
      this.removeCloseButton = this.removeCloseButton.bind(this);
      this.render = this.render.bind(this);
      this.close = this.close.bind(this);

      // Create the mutation observer instance.
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          this.handleMutations(mutation);
        });
      });

      // Configuration of the observer: only listen for children changes.
      const config = { childList: true };

      // The observed target is the grid element itself.
      observer.observe(this, config);
    }

    /**
     * Lifecycle, element appended to the DOM
     */
    connectedCallback() {
      if (!this.type || (this.type && ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1)) {
        this.type = 'info';
      }

      this.render();

      this.dispatchCustomEvent('accessible.alert.show');
    }

    /**
     * Lifecycle, element removed from the DOM
     */
    disconnectedCallback() {
      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this.close);
      }
    }

    /**
     * Method to dispatch events
     */
    dispatchCustomEvent(eventName) {
      const OriginalCustomEvent = new CustomEvent(eventName);
      this.dispatchEvent(OriginalCustomEvent);
    }

    /**
     * Method to close the alert
     */
    close() {
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
    appendCloseButton() {
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
    removeCloseButton() {
      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this.close);
        this.removeChild(this.closeButton);
      }
    }

    /**
     * Method to render the alert
     */
    render() {
      if (!this.hasAttribute('dismiss') || (this.dismiss && this.dismiss === 'false')) {
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
    handleMutations(record) {
      // Only update given nodes from the mutation.
      if (record instanceof MutationRecord) {
        Array.from(record.addedNodes).forEach((node) => {
          if (node.nodeName.toLowerCase() === 'accessible-alert-content') {
            this.render();
          }
        });
        Array.from(record.removedNodes).forEach((node) => {
          if (node.nodeName.toLowerCase() === 'accessible-alert-content') {
            this.render();
          }
        });
      }
    }
  }

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
