const initialState = {
    token: null,
    user:{
        role:0,
        email:null
    },
    authLoaded:false
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case "SET_AUTH_LOADED":
            return {
                ...state, authLoaded:true
            }
        case "LOAD_USER":
            return {
                ...state, ...payload ,authLoaded:true
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,...payload
            }

        case "LOGIN_FAILED":
            return {
                ...payload
            }
        case "SIGNUP_SUCCESS":
            return {
                ...payload
            }
        case "SIGNUP_FAILED":
            return {
                ...payload
            }
        case "REFRESH_SIGNUP":
            return {
                ...state,
                signup: false
            }
        case "LOGOUT":
            return {
                token: null
            }


        default:
            return state
    }

}


export default authReducer