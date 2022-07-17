import {ValueOf} from "../../../store/store";
import {To} from "history";

export const prefix = 'NAVIGATE_';

export const navigateActions = {
    navigate: (to: To | number) => ({
        type: `${prefix}NAVIGATE`,
        payload: to,
    } as const),
    removeNavigate: () => ({
        type: `${prefix}REMOVE_NAVIGATE`,
    } as const),
};

export type NavigateActionCreatorTypes = ValueOf<typeof navigateActions>;
export type NavigateActionTypes = ReturnType<NavigateActionCreatorTypes>;
