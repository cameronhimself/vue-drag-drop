<template>
	<div
		:draggable="true"
		@drag="emitEvent(events.drag, $event)"
		@dragstart="emitEvent(events.dragstart, $event)"
		@dragenter="emitEvent(events.dragenter, $event)"
		@dragleave="emitEvent(events.dragleave, $event)"
		@dragend="emitEvent(events.dragend, $event)"
	>
		<slot></slot>
		<div v-if="hideImageHtml" :style="hideImageStyle">
			<slot name="image"></slot>
		</div>
		<slot v-else name="image"></slot>
	</div>
</template>

<script>
	import uniqid from 'uniqid';
	import { transferDataStore, smuggledDataCache } from './stores';
	import {
		dropEffects, effectsAllowed, events, mimeType, smuggleKeyMimeType,
	} from './constants';

	export default {
		props: {
			transferData: {},
			dropEffect: { validator: (value) => value in dropEffects },
			effectAllowed: { validator: (value) => value in effectsAllowed },
			image: String,
			imageXOffset: { type: Number, default: 0 },
			imageYOffset: { type: Number, default: 0 },
			hideImageHtml: { type: Boolean, default: true },
		},
		data() {
			return { id: uniqid() };
		},
		computed: {
			events: () => events,
			hideImageStyle: () => ({ position: 'fixed', top: '-1000px' }),
		},
		methods: {
			emitEvent(name, nativeEvent) {
				const transfer = nativeEvent.dataTransfer;

				// Set drop effect on dragenter and dragover
				if ([events.dragenter, events.dragover].includes(name)) {
					if (this.dropEffect) {
						transfer.dropEffect = this.dropEffect;
					}
				}

				// A number of things need to happen on drag start
				if (name === events.dragstart) {
					// Set the allowed effects
					if (this.effectsAllowed) {
						transfer.effectsAllowed = this.effectsAllowed;
					}

					// Set the drag image
					if (this.image || this.$slots.image) {
						let image;
						if (this.image) {
							image = new Image();
							image.src = this.image;
						} else if (this.$slots.image) {
							image = this.$slots.image[0].elm;
						}
						transfer.setDragImage(image, this.imageXOffset, this.imageYOffset);
					}

					// Set the transfer data
					if (this.transferData !== undefined) {
						transferDataStore[this.id] = this.transferData;
						transfer.setData(mimeType, this.id);
						transfer.setData(`${smuggleKeyMimeType}${this.id}`, this.id);
					}
				}

				// Clean up stored data on drag end.
				if (name === events.dragend) {
					delete transferDataStore[this.id];
					smuggledDataCache.destroy();
				}

				this.$emit(name, this.transferData, nativeEvent);
			},
		},
	};
</script>
