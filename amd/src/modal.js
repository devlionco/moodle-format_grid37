define(['jquery'], function($) {
`use strict`

  const LANG = {
    en: {
      content: `too many pinned sections`,
      button: 'ok',
    },
    he: {
      content: `יותר מדי יחידות נעוצות `,
      button: 'אישור'
    }
  }

  textMain = (document.querySelector('html').lang === `he`)? LANG.he.content : LANG.en.content;
  textBtn = (document.querySelector('html').lang === `he`)? LANG.he.button : LANG.en.button;

  const BODY = document.querySelector('body');
  const content = `
    <div class = "rmodal_content">${textMain}</div>
    <button data-handler = "removeModal" class = "rmodal_confirm">${textBtn}</button>
  `;

  const STYLE = document.createElement(`style`);
  STYLE.innerHTML = `
    .rmodal {
      position: fixed;
      padding: 16px 20px;
      z-index: 10000;
      width: 600px;
      right: calc(50% - 300px);
      border: 1px solid #9c9c9c;
      top: calc(50% - 100px);
      background-color: #fff;
      border-radius: 5px;
      display: -ms-flexbox;
      display: flex;
      font-style: normal;
      font-variant: normal;
      font-weight: 400;
      font-stretch: normal;
      font-size: 24px;
      line-height: normal;
      font-family: assistant;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-pack: center;
      justify-content: center;
      box-shadow: 0 0 10px 0 #7b7b7b;
    }
    .rmodal_content {
      text-align: center;
    }
    .rmodal_confirm {
      cursor: pointer;
      display: block;
      margin: 20px auto;
      margin-bottom: 0;
      background: transparent;
      border: 1px solid #3f1c7a;
      color: #3f1c7a;
      border-radius: 5px;
      padding: 4px 30px;
      transition: .2s;
    }
    .rmodal_confirm:hover {
      background: #3f1c7a;
      color: #fff;
    }
  `;
  BODY.appendChild(STYLE);

  const modalWindow = {

    setModal: function() {

      let modal = document.createElement(`div`);

        modal.classList.add(`rmodal`);
        modal.innerHTML = content;
        BODY.appendChild(modal);
        console.dir('addModal');
    },

    removeModal: function () {
      if (document.querySelector(`.rmodal`)) {
        document.querySelector(`.rmodal`).remove();
      }
    }
  }

  document.addEventListener('click', function(e){
    if (e.target.dataset.handler === 'removeModal') {
      modalWindow.removeModal();
    }
  });

  return modalWindow;

});
