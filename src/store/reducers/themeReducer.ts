import { Reducer, AnyAction } from 'redux';

interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode: false,
};

export const themeReducer: Reducer<ThemeState, AnyAction> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        default:
            return state;
    }
};
