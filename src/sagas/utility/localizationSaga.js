import { put } from 'redux-saga/effects';
import { LOAD_TRANSLATIONS, SET_LOCALE } from 'react-redux-i18n';

import localizations from 'src/localization';

export default function* localizationSaga() {
  const lang = 'ru';
  yield put({
    type: LOAD_TRANSLATIONS,
    translations: localizations,
  });
  yield put({
    type: SET_LOCALE,
    locale: lang,
  });
}
