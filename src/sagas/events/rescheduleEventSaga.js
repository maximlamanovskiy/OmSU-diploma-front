import { takeLatest, put, call } from 'redux-saga/effects';

import { update } from 'src/fetcher/fetcher';
import {
  rescheduleEventRequest,
  rescheduleEventSuccess,
  rescheduleEventFail,
} from 'src/actions/event/rescheduleEvent';
import { closeDialogWindow } from 'src/actions/utility/dialogWindow';
import { clearReschedule } from 'src/actions/utility/reschedule';
import { RESCHEDULE_EVENT_FETCH } from 'src/actions/event/actionTypes';
import { convertPeriods } from '../../utils/date';
import { getEventSuccess } from '../../actions/event/getEvent';

function* rescheduleEvent(payload) {
  const { body } = payload;
  const request = {
    eventPeriodId: body.period.eventPeriodId,
    newClassroomId: body.classroomId,
    newTimeBlockId: body.timeBlockId,
    rescheduleFrom: body.from,
    rescheduleTo: body.to,
  };

  try {
    yield put(rescheduleEventRequest());
    const response = yield call(update, payload.url, request);
    const dates = [];
    response.eventPeriods.forEach(convertPeriods(dates));
    yield put(
      getEventSuccess({
        event: {
          ...response,
          periods: response.eventPeriods,
          dates,
        },
      })
    );
    yield put(rescheduleEventSuccess());
    yield put(clearReschedule());
    yield put(closeDialogWindow());
  } catch (error) {
    yield put(rescheduleEventFail(error));
  }
}

export default function* watchFetchRescheduleEvent() {
  yield takeLatest(RESCHEDULE_EVENT_FETCH, rescheduleEvent);
}
