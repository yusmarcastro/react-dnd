import without from 'lodash/without'
import {
	BEGIN_DRAG,
	PUBLISH_DRAG_SOURCE,
	HOVER,
	END_DRAG,
	DRAG,
	DROP,
} from '../actions/dragDrop'
import { REMOVE_TARGET } from '../actions/registry'
import {
	Identifier,
	Action,
	BeginDragOptions,
	SentinelAction,
} from '../interfaces'

export interface State {
	itemType: Identifier | Identifier[] | null
	item: any
	sourceId: string | null
	targetIds: string[]
	dropResult: any
	dropEffect: string | null
	didDrop: boolean
	isSourcePublic: boolean | null
}

const initialState: State = {
	itemType: null,
	item: null,
	sourceId: null,
	targetIds: [],
	dropResult: null,
	dropEffect: null,
	didDrop: false,
	isSourcePublic: null,
}

export default function dragOperation(
	state: State = initialState,
	action: Action<{
		itemType: Identifier | Identifier[]
		item: any
		sourceId: string
		targetId: string
		targetIds: string[]
		isSourcePublic: boolean
		dropResult: any
		dropEffect: string
	}>,
) {
	const { payload } = action
	switch (action.type) {
		case BEGIN_DRAG:
			return {
				...state,
				itemType: payload.itemType,
				item: payload.item,
				sourceId: payload.sourceId,
				isSourcePublic: payload.isSourcePublic,
				dropResult: null,
				didDrop: false,
			}
		case DRAG:
			return {
				...state,
				dropEffect: payload.dropEffect,
			}
		case PUBLISH_DRAG_SOURCE:
			return {
				...state,
				isSourcePublic: true,
			}
		case HOVER:
			return {
				...state,
				targetIds: payload.targetIds,
			}
		case REMOVE_TARGET:
			if (state.targetIds.indexOf(payload.targetId) === -1) {
				return state
			}
			return {
				...state,
				targetIds: without(state.targetIds, payload.targetId),
			}
		case DROP:
			return {
				...state,
				dropResult: payload.dropResult,
				didDrop: true,
				targetIds: [],
			}
		case END_DRAG:
			return {
				...state,
				itemType: null,
				item: null,
				sourceId: null,
				dropResult: null,
				dropEffect: null,
				didDrop: false,
				isSourcePublic: null,
				targetIds: [],
			}
		default:
			return state
	}
}
