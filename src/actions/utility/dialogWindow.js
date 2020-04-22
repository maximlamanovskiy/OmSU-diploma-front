import { OPEN_DIALOG_WINDOW, CLOSE_DIALOG_WINDOW } from './actionTypes';

export const openDialogWindow = () => ({
  type: OPEN_DIALOG_WINDOW,
});

export const closeDialogWindow = () => ({
  type: CLOSE_DIALOG_WINDOW,
});
