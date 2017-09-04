import keykey from 'keykey';

export const mimeType = 'text/x-vue-drag-drop-key';
export const mimeDelimiter = ':';
export const smuggleKeyMimeType = `${mimeType}${mimeDelimiter}`;
export const events = keykey([
  'drag', 'dragend',  'dragenter', 'dragleave', 'dragstart', 'dragover', 'drop',
]);
export const dropEffects = keykey(['copy', 'move', 'link', 'none']);
export const effectsAllowed = keykey([
  'none', 'copy', 'copyLink', 'copyMove', 'link', 'linkMove', 'move', 'all',
  'uninitialized',
]);
