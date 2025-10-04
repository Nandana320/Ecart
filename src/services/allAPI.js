// src/services/allAPI.js
import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// --- Products ---
export const getAllProductsAPI = async () => {
    return await commonAPI("GET", `${serverURL}/products`, "");
};

// --- Cart ---
export const getCartAPI = async () => {
    return await commonAPI("GET", `${serverURL}/cart`, "");
};

export const addToCartAPI = async (product) => {
    return await commonAPI("POST", `${serverURL}/cart`, product);
};

export const removeFromCartAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/cart/${id}`, {});
};

// --- Wishlist ---
export const getWishlistAPI = async () => {
    return await commonAPI("GET", `${serverURL}/wishlist`, "");
};

export const addToWishlistAPI = async (product) => {
    return await commonAPI("POST", `${serverURL}/wishlist`, product);
};

export const removeFromWishlistAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/wishlist/${id}`, {});
};

// --- Orders ---
export const addOrderAPI = async (order) => {
    return await commonAPI("POST", `${serverURL}/orders`, order);
};

export const getOrdersAPI = async () => {
    return await commonAPI("GET", `${serverURL}/orders`, "");
};

//  new: update order (e.g., mark delivered/cancelled)
export const updateOrderAPI = async (id, order) => {
    return await commonAPI("PUT", `${serverURL}/orders/${id}`, order);
};

// new: remove order (if needed)
export const removeOrderAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/orders/${id}`, {});
};
