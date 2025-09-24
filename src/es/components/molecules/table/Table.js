// @ts-check
import { Shadow } from '../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
 * Table
* @export
* @class Table
* @type {CustomElementConstructor}
*/
export default class Table extends Shadow() {
  constructor(options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args);
  }

  connectedCallback() {
    if (this.shouldRenderCSS()) this.renderCSS();
    if (this.shouldRenderHTML()) this.renderHTML();

    this.aButtonBackward?.addEventListener('click', () => this.scrollToNextColumn(false));
    this.aButtonForward?.addEventListener('click', () => this.scrollToNextColumn(true));
    window.addEventListener('resize', () => {
      this.css = /* css */`
      :host .button-group {
        ${this.table.scrollWidth > this.table.clientWidth ? 'display: flex' : ' display: none'};
      }`
    });

    setTimeout(() => {
      const timeColumnWidth = this.tableHeaders[0].getBoundingClientRect().width;
      this.tableHeaders.forEach(th => {
        th.style.scrollMarginLeft = `${timeColumnWidth}px`;
      });
    }, 600);
  }

  disconnectedCallback() {
    // TODO check if this is right
    this.aButtonBackward?.removeEventListener('click', () => this.scrollToNextColumn(false));
    this.aButtonForward?.removeEventListener('click', () => this.scrollToNextColumn(true));
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderHTML() {
    return !this.div
  }

  /**
   * renders the css
   */
  renderCSS() {
    let accentColorsCSS = "";
    if (this.getAttribute('accent-colors')) {
      const accentColors = this.getAttribute('accent-colors')?.split(" ");
      accentColors?.forEach((color, i) => {
        accentColorsCSS += /* css */`
          :host .accent-${i + 1} {
            background: ${color} !important;
          }`
      });
    }

    this.css = /* css */`

      :host .button-group {
        ${this.table.scrollWidth > this.table.clientWidth ? 'display: flex' : ' display: none'};
      }

      ${accentColorsCSS}

      @media only screen and (max-width: _max-width_) {
        :host {}
      }
    `

    return this.fetchTemplate()
  }

  /**
   * fetches the template
   */
  fetchTemplate() {
    switch (this.getAttribute('namespace')) {
      case 'table-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }])
      case 'table-memberships-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./memberships-/memberships-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }])
      case 'table-timetable-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./timetable-/timetable-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }])
      default:
        return Promise.resolve()
    }
  }

  /**
   * Render HTML
   * @returns void
   */
  renderHTML() {
    // this.html = 'Content rendered from Component: Example'
  }

  scrollToNextColumn(isScrollingForward = true) {
    let columnPositions = [];
    for (let i = 0; i < this.tableHeaders.length; i++) {
      if (i === 0)
        columnPositions.push(0)
      else
        columnPositions.push(columnPositions[i - 1] + this.tableHeaders[i].getBoundingClientRect().width)
    }

    for (let i = 0; i < columnPositions.length - 1; i++) {
      if (this.table.scrollLeft >= Math.round(columnPositions[i]) && this.table.scrollLeft < Math.round(columnPositions[i + 1])) {
        const isCurrentColumnCutOff = Math.abs(this.table.scrollLeft - columnPositions[i]) >= 1;
        const scrollDistanceLeft = isScrollingForward ? columnPositions[i + 1] : isCurrentColumnCutOff ? columnPositions[i] : columnPositions[i - 1];

        this.table.scroll({ left: scrollDistanceLeft, behavior: "smooth" })
        break;
      }
    }
  }

  get table() {
    return this.root.querySelector('.table');
  }

  get aButtonBackward() {
    return this.root.querySelector('.button-backward')
  }

  get aButtonForward() {
    return this.root.querySelector('.button-forward')
  }

  get tableHeaders() {
    return this.root.querySelectorAll('th');
  }
}