import {
    FETCH_INDEX_PENDING,
    FETCH_INDEX_SUCCESS,
    FETCH_INDEX_ERROR
} from '@/actions/action-types';

export function fetchIndexPending() {
    return { type: FETCH_INDEX_PENDING };
}

export function fetchIndexSuccess(payload) {
    return { type: FETCH_INDEX_SUCCESS, payload }
}

export function fetchIndexError(error) {
    return { type: FETCH_INDEX_ERROR, error }
}
