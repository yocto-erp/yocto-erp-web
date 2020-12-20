import produce from 'immer';

const initialState = {
  sidebarOpened: false,
  activeItem: window.location.pathname,
  activeMenu: '',
  sidebarPosition: 'left',
  sidebarVisibility: 'show',
};

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const CHANGE_ACTIVE_SIDEBAR_ITEM = 'CHANGE_ACTIVE_SIDEBAR_ITEM';
export const CHANGE_ACTIVE_MENU_ITEM = 'CHANGE_ACTIVE_MENU_ITEM';
export const CHANGE_SIDEBAR_POSITION = 'CHANGE_SIDEBAR_POSITION';
export const CHANGE_SIDEBAR_VISIBILITY = 'CHANGE_SIDEBAR_VISIBILITY';

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function changeSidebarPosition(nextPosition) {
  return {
    type: CHANGE_SIDEBAR_POSITION,
    payload: nextPosition,
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}

export function changeActiveSidebarMenu(activeItem) {
  return {
    type: CHANGE_ACTIVE_MENU_ITEM,
    payload: activeItem,
  };
}

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY,
  };
}

export const selectActiveItem = (state = initialState) =>
  state.navigation.activeItem;
export const selectActiveMenu = (state = initialState) =>
  state.navigation.activeMenu;

/* eslint-disable default-case, no-param-reassign */
export const navigationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_SIDEBAR:
        draft.sidebarOpened = true;
        break;
      case CLOSE_SIDEBAR:
        draft.sidebarOpened = false;
        break;
      case CHANGE_SIDEBAR_POSITION:
        draft.sidebarPosition = action.payload;
        break;
      case CHANGE_SIDEBAR_VISIBILITY:
        draft.sidebarVisibility =
          state.sidebarVisibility === 'hide' ? 'show' : 'hide';
        break;
      case CHANGE_ACTIVE_SIDEBAR_ITEM:
        draft.activeItem = action.activeItem;
        draft.activeMenu = action.activeItem;
        break;
      case CHANGE_ACTIVE_MENU_ITEM:
        if (state.activeMenu === action.payload) {
          draft.activeMenu = '';
        } else {
          draft.activeMenu = action.payload;
        }
        break;
    }
  });

export function runtime(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case CHANGE_SIDEBAR_POSITION:
      return Object.assign({}, state, {
        sidebarPosition: action.payload,
      });
    case CHANGE_SIDEBAR_VISIBILITY:
      return Object.assign({}, state, {
        sidebarVisibility: action.payload,
      });
    case CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem,
      };
    default:
      return state;
  }
}
