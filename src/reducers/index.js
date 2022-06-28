const initialState = {
    user: {
        _id: '',
        name: '',
        imageUrl: '',
        email: '',
        mobile: 0,
        program: '',
        department: '',
        graduationYear: 0,
        notifications: [],
        orders: [],
        ads: [],
        wishlist: [],
    },
    lofoItems: [],
    items: [],
    authorised: false,
    loading: false,
    authLoading: localStorage.getItem('authLoading') === 'true' ? true : false,
    accessToken: null
}

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        // user Reducer ----------------------------------------------->
        case 'SET_USER':
            localStorage.setItem('authLoading', true)
            return {
                ...state,
                user: action.payload.user,
                authorised: true,
                authLoading: false,
                accessToken: action.payload.accessToken
            };

        case 'CLEAR_USER':
            localStorage.setItem('authLoading', false)
            return {
                ...state,
                user: initialState.user,
                authorised: false,
                authLoading: false,
                accessToken: null
            };

        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
                authorised: true
            };

        // item Reducer ------------------------------------------------------->
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i._id !== action.payload),
            };

        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items[state.items.findIndex((o => o._id === action.payload._id))] = action.payload,
            };
        case 'CREATE_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
            };


        // lofo items Reducer ----------------------------------------------------->
        case 'SET_LOFOITEMS':
            return {
                ...state,
                lofoItems: action.payload,
            };

        case 'DELETE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.filter(i => i._id !== action.payload),
            };

        case 'UPDATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems[state.lofoItems.findIndex((o => o._id === action.payload._id))]
                    = action.payload,
            };
        case 'CREATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.push(action.payload),
            };

        default: return state;
    }

}


export default Reducers;