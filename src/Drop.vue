<template>
	<div
		@dragenter="emitEvent(events.dragenter, $event)"
		@dragleave="emitEvent(events.dragleave, $event)"
		@dragover.prevent="emitEvent(events.dragover, $event)"
		@drop="emitEvent('drop', $event)"
	><slot></slot></div>
</template>

<script>
	import { smuggledDataCache, transferDataStore } from './stores';
	import { events, mimeType, mimeDelimiter, smuggleKeyMimeType } from './constants';

	export default {
		computed: { events: () => events },
		methods: {
			emitEvent(name, nativeEvent) {
				let data;
				if (name === events.drop) {
					const key = nativeEvent.dataTransfer.getData(mimeType);
					data = key && transferDataStore[key];
				} else {
					if (! smuggledDataCache.isSet) {
						const type = nativeEvent.dataTransfer.types.find(
							t => t.startsWith(smuggleKeyMimeType)
						);
						if (type) {
							const key = type.split(mimeDelimiter)[1];
							smuggledDataCache.set(key && transferDataStore[key]);
						}
					}
					data = smuggledDataCache.data;
				}
				this.$emit(name, data, nativeEvent);
			},
		},
	};
</script>
