const keyMirror = keys => keys.reduce((acc, k) => (acc[k] = k) && acc, {});

export const events = keyMirror([
	'drag', 'dragend',  'dragenter', 'dragleave', 'dragstart', 'dragover', 'drop',
]);
export const dropEffects = keyMirror(['copy', 'move', 'link', 'none']);
export const effectsAllowed = keyMirror([
	'none', 'copy', 'copyLink', 'copyMove', 'link', 'linkMove', 'move', 'all',
	'uninitialized',
]);
