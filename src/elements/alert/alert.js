class AccessibleAlertTitle extends HTMLElement {}

class AccessibleAlertContent extends HTMLElement {}

class AccessibleAlert extends HTMLElement {
  /*
   * Attributes
   *
   * type: controls the color of the alert
   * dismiss: Sets a close button for discarding the alert
   * button-text: The text of the button (for i18n)
   * auto-dismiss: The time to automatically dismiss the alert (in milliseconds)
   * 
   */

  /*
   * Events
   *
   * accessible.alert.show: fired on alert display
   * accessible.alert.hide: fired on alert dismiss
   *
   */

  /*
   * Methods
   *
   * close: dismisses the alert
   *
   */

  /* Attributes to monitor */
  static get observedAttributes() { return ['type', 'dismiss']; }

  get type() { return this.getAttribute('type'); }

  set type(value) { return this.setAttribute('type', value); }

  get dismiss() { return this.getAttribute('dismiss'); }

  set dismiss(value) { return this.setAttribute('type', value); }

  get autoDismiss() {
  	const val = parseInt(this.getAttribute('auto-dismiss'), 10);
  	return val > 0 ? val ? false;
  }

  set autoDismiss(value) { return this.setAttribute('auto-dismiss', parseInt(value, 10)); }
  
  get buttonText() { return this.getAttribute('button-text') || 'Close'; }

  set buttonText(value) { return this.setAttribute('button-text', value); }

  constructor() {
    super();
    this.hasDismissButton = false;
    this.closeButton = '';

    this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
    this.appendCloseButton = this.appendCloseButton.bind(this);
    this.removeCloseButton = this.removeCloseButton.bind(this);
    this.render = this.render.bind(this);
    this.close = this.close.bind(this);
  }

  /* Lifecycle, element appended to the DOM */
  connectedCallback() {
    if (!this.type || (this.type && ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1)) {
      this.type = 'info';
    }

    this.render();

    this.dispatchCustomEvent('accessible.alert.show');
  }

  /* Lifecycle, element removed from the DOM */
  disconnectedCallback() {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.close);
    }
  }

  /* Respond to attribute changes */
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
      default:
        break;
    }
  }

  /* Method to dispatch events */
  dispatchCustomEvent(eventName) {
    const OriginalCustomEvent = new CustomEvent(eventName);
    this.dispatchEvent(OriginalCustomEvent);
    this.removeEventListener(eventName, OriginalCustomEvent);
  }

  /* Method to close the alert */
  close() {
    this.dispatchCustomEvent('accessible.alert.hide');
    this.removeAttribute('show');
    this.parentNode.removeChild(this);
  }

  /* Method to create the close button */
  appendCloseButton() {
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

  /* Method to remove the close button */
  removeCloseButton() {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.close);
      this.removeChild(this.closeButton);
    }
  }

  timeout() {
	this.timeoutFn = setTimeout(this.close, this.autoDismmiss);
  }

  setDismissTimeout() {
  	this.timeoutFn()
  }
 
 unsetDismissTimeout() {
 	clearTimeout(this.timeoutFn);
 }
  /* Method to render the alert */
  render() {
    if (!this.hasAttribute('dismiss') || (this.dismiss && this.dismiss !== 'false')) {
      this.removeCloseButton();
    } else {
      this.appendCloseButton();
    }
    
    if (!this.hasAttribute('auto-dismiss') || (this.autoDismiss && this.autoDismiss < 0)) {
      this.unsetDismissTimeout();
    } else {
      this.setDismissTimeout();
    }
  }
}

document.customElements.define('accessible-alert-title', AccessibleAlertTitle);
document.customElements.define('accessible-alert-content', AccessibleAlertContent);
document.customElements.define('accessible-alert', AccessibleAlert);
