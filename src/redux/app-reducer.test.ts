import {appReducer, initializedSuccess} from "./app-reducer";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        initialized: false
    }
})

test('initialized should be set correctly', () => {
    const endState = appReducer(initialState, initializedSuccess())

    expect(endState.initialized).toBeTruthy()
})