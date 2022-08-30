const initialState = {
    isLoading: false
}
const loaderReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: payload.state
            }
        default:
            return state
    }

}


export default loaderReducer