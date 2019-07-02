define(['jquery', 'format_grid/modal'], function($, modal) {
'use strict';

const GRIDSECTIONS = document.querySelector(`.gridicons`);
const MAXCOUNTSECTION = 4;

const pinnedWapper = GRIDSECTIONS.querySelector(`.pinnedsections`);
const actionBlock = document.querySelector(`#gridshadebox`);
const sections = Array.from(GRIDSECTIONS.querySelectorAll(`.gridicons li`));

let pinnedSections = Array.from(GRIDSECTIONS.querySelectorAll(`.gridicons .pinned`));


const refreshPinnedSection = () => {
  // find pinned section
  pinnedSections = Array.from(GRIDSECTIONS.querySelectorAll(`.gridicons .pinned`));
  pinnedWapper.innerHTML = ``;
  pinnedSections.forEach((item)=>{
    pinnedWapper.appendChild(item);
  });
}

const getSectionId = (target) => {
  while(!target.classList.contains(`section`)) {
    target = target.parentNode;
  }
  return target.id.replace(/\D+/,'');
}

const addPinnedSection = (target) => {
  let sectionnumber = getSectionId(target);
  let targetSection = document.querySelector(`a[id=gridsection-${sectionnumber}]`);
  targetSection.parentNode.classList.add('pinned');

  refreshPinnedSection();
}

const removePinnedSection = (target) => {
  let sectionnumber = getSectionId(target);
  let targetSection = document.querySelector(`a[id=gridsection-${sectionnumber}]`);
  targetSection.parentNode.classList.remove('pinned');

  refreshPinnedSection();
}


/**
 * change pinned section indecation
 *
 * @param {Node} target element
 * @returns {Integer}
 */
const togglePinnedSectionIndicator = (target) => {
  let pinBefore;
  let pinAfter;
  let title;
  let action;
  let text;
  let classBefore;
  let classAfter;
// TODO remove this function 
  if(target.dataset.action === `topinsection`){
    pinBefore = 0;
    pinAfter = 1;
    title = 'This section is pinned';
    action = 'tounpinsection';
    text = 'Unpun section';
    classBefore = 'fa-lock';
    classAfter = 'fa-unlock';
  } else {
    pinBefore = 1;
    pinAfter = 0;
    title = 'Pin this section to show it in the front';
    action = 'topinsection';
    text = 'Pin Section';
    classBefore = 'fa-unlock';
    classAfter = 'fa-lock';
  }

// TODO remove setTimeout
    target.href = target.href.replace(`pinned=${pinBefore}`, `pinned=${pinAfter}`);
    target.title = title;
    setTimeout(function(){target.dataset.action = action;}, 2000)
    target.firstChild.classList.replace(classBefore, classAfter);
    target.lastChild.innerHTML = text;

}

/**
 * checking the allowed number of sections
 *
 * @param {}
 * @returns {bool}
 */
const checkMaxCountOfPinnedSection = () => {
  return (pinnedWapper.childElementCount < MAXCOUNTSECTION)? 1 : 0;
}


    return {
        init: function() {

          refreshPinnedSection();
          actionBlock.addEventListener('click', function(e){
            let target = e.target;
            while(!target.classList.contains(`gridcursor`)) {
              // set pinned section

              if (target.dataset.action === `topinsection`) {
                if (!checkMaxCountOfPinnedSection()) {
                  // modal.setModal();
                  return;
                }
                togglePinnedSectionIndicator(target);
                addPinnedSection(target);
                return
              }
              // unset pinned section
              if (target.dataset.action === `tounpinsection`) {
                togglePinnedSectionIndicator(target);
                removePinnedSection(target);
                return
              }
              target = target.parentNode;
            }
          });

        }
    };
});
