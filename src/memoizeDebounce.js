import _ from 'lodash';
import { debounceEventsMilliseconds } from "./constants";
export default function memoizeDebounce(func, wait=debounceEventsMilliseconds, options={leading: true}) {
	const mem = _.memoize(function () {
		return _.debounce(func, wait, options);
	}, options.resolver);
	return function () {
		mem.apply(this, arguments).apply(this, arguments);
	};
}

