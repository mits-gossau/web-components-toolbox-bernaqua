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

    this.forwardsNavigationButtonListener = (event) => {
      this.scrollToNextColumn(true);
    }

    this.backwardsNavigationButtonListener = (event) => {
      this.scrollToNextColumn(false);
    }

    this.windowResizeListener = (event) => {
      this.navigationButtons.style.display = this.table.scrollWidth > this.table.clientWidth ? 'flex' : 'none'
    }
  }

  connectedCallback() {
    if (this.shouldRenderCSS()) this.renderCSS();
    if (this.shouldRenderHTML()) this.renderHTML();

    this.aButtonBackward?.addEventListener('click', this.backwardsNavigationButtonListener);
    this.aButtonForward?.addEventListener('click', this.forwardsNavigationButtonListener);
    window.addEventListener('resize', this.windowResizeListener);

    // timeout to make sure component has rendered
    setTimeout(() => {
      const timeColumnWidth = this.tableHeaders[0].getBoundingClientRect().width;
      this.tableHeaders.forEach(th => {
        // set left scroll offset for columns because of fixed first column
        th.style.scrollMarginLeft = `${timeColumnWidth}px`;
      });

      // determine if navigation buttons need to be shown
      this.navigationButtons.style.display = this.table.scrollWidth > this.table.clientWidth ? 'flex' : 'none'
    }, 1000);
  }

  disconnectedCallback() {
    this.aButtonBackward?.removeEventListener('click', this.backwardsNavigationButtonListener);
    this.aButtonForward?.removeEventListener('click', this.forwardsNavigationButtonListener);
    window.removeEventListener('resize', this.windowResizeListener);
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
    this.css = /* css */`
      :host .button-group {
        justify-content: var(--buttons-justify-content);
      }

      :host .button-group :first-child {
        margin-right: 0.8em;
      }

      :host .table > table {
        width: 100%;
        background: var(--background);
        color: var(--color);
        border-collapse: separate;
        border-spacing: 0;
      }

      :host .table > table th {
        color: var(--header-color);
        border-bottom: var(--header-border);
        box-sizing: border-box;
        text-wrap: nowrap;
      }

      :host .table > table th:not(:first-child),
      :host .table > table tr th:first-child:empty {
        border-color: var(--header-background);
        background: var(--header-background);
      }

      :host .table>table th,
      :host .table>table td {
        padding: var(--cell-padding);
      }

      :host .table>table td {
        border-top: 0;
        border-bottom: var(--border);
        border-left: 0;
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
    // this.html = ''
  }

  scrollToNextColumn(isScrollingForward = true) {
    // gets all vertical border positions of columns
    let columnBorders = [];
    for (let i = 0; i < this.tableHeaders.length; i++) {
      if (i === 0)
        columnBorders.push(0)
      else
        columnBorders.push(columnBorders[i - 1] + this.tableHeaders[i].getBoundingClientRect().width)
    }

    // checks which column is in view on the left of the table, after the fixed first column
    // if scrolling forwards: scroll to next column, if scrolling backwards: go to previous column or scroll current column into view if it's cut off
    for (let i = 0; i < columnBorders.length - 1; i++) {
      if (this.table.scrollLeft >= Math.round(columnBorders[i]) && this.table.scrollLeft < Math.round(columnBorders[i + 1])) {
        const isCurrentColumnCutOff = Math.abs(this.table.scrollLeft - columnBorders[i]) >= 1;
        const scrollDistanceLeft = isScrollingForward ? columnBorders[i + 1] : isCurrentColumnCutOff ? columnBorders[i] : columnBorders[i - 1];

        this.table.scroll({ left: scrollDistanceLeft, behavior: "smooth" })
        break;
      }
    }
  }

  get table() {
    return this.root.querySelector('.table');
  }

  get navigationButtons() {
    return this.root.querySelector('.button-group')
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