import { createContext, useContext } from 'react';

export const SURVEY_ROOT_PATH = '/survey';

export const SURVEY_QUESTION_TYPE = {
  RADIO: 1,
  CHECKBOX: 2,
  SELECT_SINGLE: 3,
  SELECT_MULTIPLE: 4,
  INPUT: 5,
};

export const LANGUAGE_TYPE = [
  { id: 1, code: 'en', name: 'English' },
  { id: 2, code: 'ja', name: 'Japanese' },
  { id: 3, code: 'vn', name: 'Vietnamese' },
];

export const SurveyContext = createContext({});

export function useSurveyContext() {
  return useContext(SurveyContext);
}
