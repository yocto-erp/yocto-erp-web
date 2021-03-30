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

export const AGE_RANGES = [
  'Under 20',
  '21-30',
  '31-40',
  '41-50',
  '51-60',
  'Over 60',
];

export const LANGUAGE = {
  ja: {
    title: '調査を行うためにあなたの情報を記入してください',
    firstName: 'ファーストネーム',
    lastName: '苗字',
    email: 'Eメール',
    gender: '性別を選択',
    age: '年齢を選択',
    location: '都市を選択',
    btn: {
      submit: '参加する',
      back: 'バック',
    },
  },
  en: {
    title: 'Please fill in your information to conduct a survey',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    gender: 'Select Gender',
    age: 'Select Age',
    location: 'Select City',
    btn: {
      submit: 'Submit',
      back: 'Back',
    },
  },
};
export const SurveyContext = createContext({});

export function useSurveyContext() {
  return useContext(SurveyContext);
}
