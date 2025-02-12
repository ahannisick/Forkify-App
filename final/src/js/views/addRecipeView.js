import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    // Below we need to use our .bind() method to bind the correct
    // 'this' keyword.
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Into the below FormData() constructor, we have to pass in an
      // element that is a form. That form, in this case is the 'this'
      // keyword. Because we're inside of a handler function and so 'this'
      // points to 'this._parentElement' which is of course the UPLOAD form
      // class container. Since below will return a weird object we can't
      // actually use, we'll spread that object into an array.
      const dataArr = [...new FormData(this)];
      // Above will give us an array which contains ALL the fields with
      // ALL the values in there.
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
