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
    accessToken: null
}

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        // user Reducer ----------------------------------------------->
        case 'SET_USER':
            return {
                ...state,
                user: action.payload.user,
                Authorised: true,
                loading: action.payload.loading,
                accessToken: action.payload.accessToken
            };

        case 'CLEAR_USER':
            return {
                ...state,
                user: initialState.user,
                Authorised: false,
                loading: false,
                accessToken: null
            };

        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
                Authorised: true,
                loading: false
            };

        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };

        // item Reducer ------------------------------------------------------->
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
                loading: action.payload.loading,
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i._id !== action.payload),
                loading: action.payload.loading,
            };

        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items[state.items.findIndex((o => o._id === action.payload._id))] = action.payload,
                loading: action.payload.loading
            };
        case 'CREATE_ITEM':
            return {
                ...state,
                items: state.items.push(action.payload),
                loading: action.payload.loading
            };


        // lofo items Reducer ----------------------------------------------------->
        case 'SET_LOFOITEMS':
            return {
                ...state,
                lofoItems: action.payload,
                loading: action.payload.loading,
            };

        case 'DELETE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.filter(i => i._id !== action.payload),
                loading: action.payload.loading,
            };

        case 'UPDATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems[state.lofoItems.findIndex((o => o._id === action.payload._id))]
                    = action.payload,
                loading: action.payload.loading
            };
        case 'CREATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.push(action.payload),
                loading: action.payload.loading
            };

        default: return state;
    }

}


export default Reducers;