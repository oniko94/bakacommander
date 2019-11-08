import {
    fetchIndexPending,
    fetchIndexSuccess,
    fetchIndexError
} from '@/actions';
import { API_URL } from '@/constants';
import path from 'path';

export function fetchIndex(url='') {
    return dispatch => {
        dispatch(fetchIndexPending());
        fetch(path.join(API_URL, url))
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                dispatch(fetchIndexSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchIndexError(error));
            });
    };
}
