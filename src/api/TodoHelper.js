import useAjax from "./useAjax";
import { commonHeaders } from "./HelperMethods";

export const TodoHelper = {
    /**
     * List todo itmes
     * 
     * @returns 
     */
    list: () => {
        return useAjax.get("api/v1/todo", {
            headers: commonHeaders()
        });
    },
    /**
     * Handle add new item
     * 
     * @param {Object} form 
     * @returns 
     */
    add: (form) => {
        return useAjax.post('api/v1/todo', form, {
            headers: commonHeaders()
        });
    },
    /**
     * Handle update todo item
     * 
     * @param {string} id 
     * @param {Object} form 
     * @returns 
     */
    update: (id, form) => {
        return useAjax.put(`api/v1/todo/${id}`, form, {
            headers: commonHeaders()
        })
    },
    /**
     * Handle delete todo item
     * 
     * @param {string} id 
     * @returns 
     */
    delete: (id) => {
        return useAjax.delete(`api/v1/todo/${id}`, {
            headers: commonHeaders()
        });
    }
}