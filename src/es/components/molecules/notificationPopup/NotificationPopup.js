import { Prototype } from '../../web-components-toolbox/src/es/components/msrc/Prototype.js'
import { Intersection } from '../../web-components-toolbox/src/es/components/prototypes/Intersection.js'

export default class NotificationPopup extends Intersection(Prototype()) {
  constructor(options = {}, ...args) {
    super({
      importMetaUrl: import.meta.url,
      intersectionObserverInit: {},
      ...options
    }, ...args)
    this.closeClickListener = event => {
      this.setCookie(this.dataset.cookiename, this.dataset.cookielifetime);
      this.style.display = 'none';
    }
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.shouldRenderCSS()) this.renderCSS();
    this.root.querySelector('.close').addEventListener('click', this.closeClickListener)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderCSS() {
    return !this.root.querySelector(`${this.cssSelector} > style[_css]`)
  }

  /**
   * renders the css
   */
  renderCSS() {
    this.css = /* css */`
      :host {

      }
      :host .outer {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--overlay-background-color,rgba(52, 52, 52, .5));
        z-index: 99998;
      }
      :host .inner {
        position: relative;
        max-width: var(--max-width, 690px);
        max-height: var(--max-height, 75vh);
        background-color: var(--background-color, #fff);
        padding: var(--padding);
      }
      :host .icon {
        display: flex;
        justify-content: center;
        margin-bottom: var(--padding);
      }
      :host button.close {
        position: absolute;
        right: 0;
        top: 0;
        padding: var(--close-button-padding, 16px);
        cursor: pointer;
        background-color: var(--close-button-background-color, transparent);
        border: none;
        font-size: var(--close-button-font-size, inherit);
        font-weight: var(--close-button-font-weight, bold);
      }

      @media only screen and (max-width: _max-width_) {
        :host {
        }
      }
    `
    return this.fetchTemplate()
  }

  /**
   * fetches the template
   */
  fetchTemplate() {
    /** @type {import("../../web-components-toolbox/src/es/components/prototypes/Shadow.js").fetchCSSParams[]} */
    const styles = [
      {
        path: `${this.importMetaUrl}../../web-components-toolbox/src/css/reset.css`, // no variables for this reason no namespace
        namespace: false
      },
      {
        path: `${this.importMetaUrl}../../web-components-toolbox/src/css/style.css`, // apply namespace and fallback to allow overwriting on deeper level
        namespaceFallback: true
      }
    ]
    switch (this.getAttribute('namespace')) {
      case 'notification-popup-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }, ...styles])
      default:
        return this.fetchCSS(styles)
    }
  }

  setCookie(cookiename, cookielifetime) {
    var cookie = cookiename + "=" + "accepted;domain=" + this.getRootDomain() + "; max-age=" + cookielifetime * 86400 + "; path=/";
    document.cookie = cookie;
  }

  getRootDomain() {
    var host = location.host.split('.').reverse();
    var toplevel = host[0].split(':')[0];
    if (host.length === 1) {
      return toplevel;
    }

    return '.' + host[1] + '.' + toplevel;
  }
}