import { useReducer } from "react";
import { PageInfo } from "@/components/docunemts/pageController";

export interface PageState {
  filterMenu: { [key: string]: string[] };
  filterInput: string;
  sort: { [key: string]: number };
  columnVisible: { [key: string]: boolean };
  pageInfo: PageInfo;
}

function handleReducer(state: PageState, action: {type: string, payload: any} ) {
  let newState: PageState;
  switch (action.type) {
    case 'FILTER_MENU':
      newState = {
        ...state,
        filterMenu: {
          ...state.filterMenu,
          ...action.payload,
        }
      }
      break;
    case 'CLEAR_MENU':
      const clearMenu: {[key: string]: string[]} = {};
      Object.keys(state.filterMenu).forEach(key => {
        clearMenu[key] = [];
      })
      newState = {
        ...state,
        filterMenu: clearMenu
      }
      break;
    case 'SET_SORTTING':
      newState = {
        ...state,
        sort: {
          ...state.sort,
          ...action.payload,
        } 
      }
      break;
    case 'FILTER_INPUT':
      newState = {
        ...state,
        filterInput: action.payload,
      }
      break;
    case 'SET_VISIBLE':
      newState = {
        ...state,
        columnVisible: {...state.columnVisible, ...action.payload},
      }
      break;
    case 'SET_PAGE_INFO':
      newState = {
        ...state,
        pageInfo: {...state.pageInfo, ...action.payload},
      }
      break;
    default:
      console.log(`invalid resucer type: ${action.type}`);
      newState = state;
      break;
  }
  return newState;
}

export function usePageReducer() {
  const initState: PageState = {
    filterInput: '',
    filterMenu: {
      status: [],
      category: [],
      tag: [],
    },
    sort: {
      category: 0,
      title: 0,
      status: 0,
      updated: 0,
    },
    columnVisible: {
      category: true,
      title: true,
      status: true,
      updated: true,
    },
    pageInfo: {
      currentPage: 1,
      rowLimit: 10,
      totalRows: 0,
    }
  }
  const reducer = useReducer(handleReducer, initState);
  return reducer;
}