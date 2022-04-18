/*
 *
 * LanguageProvider reducer
 *
 */

import produce from "immer";
import { parse } from "qs";

import { CHANGE_LOCALE } from "./constants";
import { DEFAULT_LOCALE } from "../../i18n";

const { language } = parse(window.location.search, { ignoreQueryPrefix: true });

export const initialState = {
  locale: language && language.length > 0 ? language : DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
