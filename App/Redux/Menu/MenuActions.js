export const FETCH_MENU = 'FETCH_MENU';

export function fetchMenuCreator(){
    console.log("Fetch Menu Dispatched")
    return {
        type: FETCH_MENU
    };
}

