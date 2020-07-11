import { CREATE_MESSAGE } from "../actions/types";


const initialState = {
    message: "",
    id: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_MESSAGE:
            return {
                message: action.payload.message,
                id: action.payload.id
            };
        default:
            return state;
    }
}
