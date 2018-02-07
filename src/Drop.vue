<template>
	<component :is="tag"
		@dragenter="emitEvent(events.dragenter, $event)"
		@dragleave="emitEvent(events.dragleave, $event)"
		@dragover.prevent="emitEvent(events.dragover, $event)"
		@drop="emitEvent(events.drop, $event)"
	>
		<slot :transfer-data="transferData"></slot>
	</component>
</template>

<script>
	import { transferDataStore } from './stores';
	import { events, mimeType, mimeDelimiter, smuggleKeyMimeType } from './constants';

	const insideElements = new Set();

	export default {
		props: {
			tag: { type: String, default: 'div' },
		},
		data: () => ({ dataKey: null }),
		computed: {
			events: () => events,
			transferDataStore: () => transferDataStore,
			transferData() {
				return this.transferDataStore[this.dataKey];
			},
		},
		methods: {
			emitEvent(name, nativeEvent) {
				// Before emitting the event, set the transfer data.
				if (name === events.drop) {
					this.dataKey = nativeEvent.dataTransfer.getData(mimeType);
				} else {
					if (! this.dataKey) {
						// DOMStringList to array
						const types = nativeEvent.dataTransfer.types;
						const typesArray = [];
						for (let i = types.length >>> 0; i--;) {
							typesArray[i] = types[i];
						}

						const type = typesArray.find(
							t => t.startsWith(smuggleKeyMimeType)
						);
						if (type) {
							this.dataKey = type.split(mimeDelimiter)[1];
						}
					}
				}

				// Emit
				this.$emit(name, this.transferData, nativeEvent);

				/**
				 * After emitting the event, we need to determine if we're still
				 * dragging inside this Drop. We keep a Set of all elements that we've
				 * dragged into, then clear the data if that set is empty.
				 */

				// Add to the set on dragenter.
				if (name === events.dragenter) {
					if (insideElements.size || nativeEvent.target === this.$el) {
						insideElements.add(nativeEvent.target);
					}
				}

				// Remove from the set on dragleave.
				if (name === events.dragleave) {
					insideElements.delete(nativeEvent.target);

					// If we're no longer inside any elements, delete data.
					if (! insideElements.size) {
						this.dataKey = null;
					}
				}

				// A drop resets everything.
				if (name === events.drop) {
				  this.dataKey = null;
				  insideElements.clear();
				}
			},
		},
	};
</script>
