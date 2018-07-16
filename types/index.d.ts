import Vue, { PluginObject, VueConstructor } from 'vue';

export type DropEffect = 'copy' | 'move' | 'link' | 'none';
export type EffectsAllowed = 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized';
export type DragEventName = 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragstart' | 'dragover' | 'drop';
export type DragEventObject = { [s: string]: DragEventName };

declare class Drag extends Vue {
	// props
	draggable: boolean;
	transferData: Record<string, any>;
	dropEffect: { validator: (value: DropEffect) => boolean };
	effectAllowed: { validator: (value: EffectsAllowed) => boolean };
	image: string;
	imageXOffset: number;
	imageYOffset: number;
	hideImageHtml: boolean;
	tag: string;

	// data
	dragging: boolean;

	// computed
	events: DragEventObject;
	scopedData: Record<string, any> | boolean;
	hideImageStyle: Record<string, string>;

	// methods
	emitEvent: (name: DragEventName, event: DragEvent) => void;
}

declare class Drop extends Vue {
	// props
	tag: string;

	// data
	transferData: Record<string, any> | undefined;
	isDraggingOver: boolean;

	// computed
	events: DragEventObject;
	scopedData: Record<string, any> | boolean;

	// methods
	emitEvent: (name: DragEventName, event: DragEvent) => void;
}

declare const VueDragDrop: PluginObject<any>;

export { Drag, Drop };

export default VueDragDrop;
