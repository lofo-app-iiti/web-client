import axios from "axios";

export const baseURL = process.env.REACT_APP_baseURL;

export const admin = ["lofo@iiti.ac.in"]


// auth
export const googleLogin = (googleToken) => axios.post(baseURL + '/api/googlelogin', { googleToken })

export const getUser = () => axios.get(baseURL + "/api/user/getUser", { headers: { authorization: localStorage.getItem('accessToken') } })

// items
export const fetchItems = axios.get(baseURL + "/api/items");
export const fetchItemById = (id) => axios.get(baseURL + "/api/items/" + id);
export const deleteItem = (id) => axios.delete(baseURL + "/api/items/" + id);
export const createItem = (doc) => axios.post(baseURL + "/api/items/", doc);
export const buyItem = (id, title, mobile, imageUrl) => axios.put(baseURL + `/api/items/buy/${id}`, {
    notification: {
        message: "wants to buy",
        itemTitle: title,
        mobile: mobile,
        dp: imageUrl,
        itemId: id
    }
})
export const addToWishlist = (id) => axios.put(baseURL + `/api/user/favourites/${id}`)
export const removeFromWishlist = (id) => axios.delete(baseURL + `/api/user/favourites/${id}`)


// lost found items
export const fetchLofoItems = axios.get(baseURL + "/api/lost-found");
export const createLofoItem = (doc) => axios.post(baseURL + "/api/lost-found", doc);
export const deleteLofoItem = (id) => axios.delete(baseURL + "/api/lost-found/" + id);


// orders
// export const fetchOrders = axios.get(baseURL + `/api/user/orders`)


// profile
export const setMobileNumber = (mobile) => axios.put(baseURL + `/api/user`, { mobile })

// notifications
export const notify = (id, notification) => axios.put(baseURL + `/api/lost-found/notify/${id}`, { notification })
export const deleteNotif = (id) => axios.delete(baseURL + `/api/user/notif/${id}`)
export const updateNotifBell = () => axios.put(baseURL + `/api/user/notifbell`)
export const approve = (user, buyerEmail, itemId, itemTitle, notifId) => axios.put(baseURL + `/api/user/approve/${buyerEmail}`,
    {
        _id: user._id,
        notification: {
            message: `accepted your buy request for`,
            itemTitle: itemTitle,
            mobile: user.mobile,
            dp: user.imageUrl,
            itemId: itemId,
        },
        notifId
    })
