import {
    FETCH_INDEX_PENDING,
    FETCH_INDEX_SUCCESS,
    FETCH_INDEX_ERROR
} from '@/actions/action-types';

const initialState = {
    pending: false,
    payload: {},
    error: null
};

function rootReducer(state=initialState, action) {
    switch(action.type) {
        case FETCH_INDEX_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_INDEX_SUCCESS:
            return {
                ...state,
                pending: false,
                payload: action.payload
            };
        case FETCH_INDEX_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}

export const getPayload = state => state.payload;
export const getPayloadPending = state => state.pending;
export const getPayloadError = state => state.error;

export default rootReducer;
