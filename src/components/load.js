import AbstractComponent from './abstract-component';

class Load extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

export {Load as default};
