import {
    fetchIndexPending,
    fetchIndexSuccess,
    fetchIndexError
} from '@/actions';
import { API_URL } from '@/constants';
import url from 'url';

function fetchIndex(nextPath='') {
    return dispatch => {
        dispatch(fetchIndexPending());
        const reqURL = url.resolve(API_URL, nextPath);
        fetch(reqURL)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                dispatch(fetchIndexSuccess(res));
            })
            .catch(error => {
                dispatch(fetchIndexError(error));
            });
    };
}

export default fetchIndex;
