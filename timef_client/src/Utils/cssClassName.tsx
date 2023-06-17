import store from "../State/store";

export const cssName = (className : string) => {
    const state = store.getState().color
    return `${className} `
}