const MIN_PAGE = 1;
const MAX_PAGE = 4;

let main_list_page = MIN_PAGE;

function setListPage(value) {
  main_list_page = value;
}

export { setListPage, main_list_page, MIN_PAGE, MAX_PAGE };
