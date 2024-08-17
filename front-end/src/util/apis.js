import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:9090/api/',
    timeout: 1000
});

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const saveRole = async (data) => {
    try {
        const response = await instance.post('roles', data);
        console.info('Role data in Model v1 ', response);
        return true;
    } catch (err) {
        console.error('Error response data: ', err.status);
        return false;
    }
}

export const updateRole = async (data) => {
    try {
        const response = await instance.put(`roles/${data.id}`, data);
        console.info('Role data in Model v1 ', response);
        return true;
    } catch (err) {
        console.error('Error response data: ', err);
        return false;
    }
}

export const getAllQuotes = async (searchData) => {
    try {
        const response = await instance.post('quotes/v2/search/v2', searchData);
        console.info(response.data);
        return response.data;
    } catch (err) {
        console.error('Error', err);
        return [];
    }
}

export const getMetrics = async (searchData) => {
    try {
        const response = await instance.post('quotes/tags-metrics', searchData);
        console.info(response.data);
        return response.data;
    } catch (err) {
        console.error('Error', err);
        return [];
    }
}

export const deleteQuote = async (id) => {
    try {
        const response = await instance.delete(`quotes/${id}`);
        console.info(response.data);
        return response.data;
    } catch (err) {
        console.error('Error', err);
        return [];
    }
}

export const saveDept = async (data) => {
    try {
        const response = await instance.post('departments', data);
        console.info('Role data in Model v1 ', response);
        return true;
    } catch (err) {
        console.error('Error response data: ', err.status);
        return false;
    }
}

export const deleteDept = async (deptId) => {
    try {
        const response = await instance.delete(`departments/${deptId}`);
        return true;
    } catch (err) {
        return false;
    }
}

export const deleteRole = async (roleId) => {
    try {
        const response = await instance.delete(`roles/${roleId}`);
        return true;
    } catch (err) {
        return false;
    }
}



export const getAllRoles = async () => {
    try {
        const response = await instance.get('roles');
        console.info('All roles ', response.data);
        return response.data;
    } catch (err) {
        console.error('Error response data: ', err.response.data);
        toast.error(err.response.data.message);
        return [];
    }
}

export const getAllDepts = async () => {
    try {
        const response = await instance.get('departments');
        console.info('All Departments ', response.data);
        return response.data;
    } catch (err) {
        console.error('Error response data: ', err.response.data);
        toast.error(err.response.data.message);
        return [];
    }
}

export const saveAllQuotes = async (listOfQuotes) => {
    try {
        const response = await instance.post('quotes/json-load', listOfQuotes);
        console.info('Role data in Model v1 ', response.data);
        return response.data;
    } catch (err) {
        console.error('Error response data: ', err.status);
        return null;
    }
}

export const removeDuplicates = async (listOfQuotes) => {
    try {
        const response = await instance.post('quotes/remove-dupes', listOfQuotes);
        console.info('Role data in Model v1 ', response.data);
        return response.data;
    } catch (err) {
        console.error('Error response data: ', err.status);
        return null;
    }
}