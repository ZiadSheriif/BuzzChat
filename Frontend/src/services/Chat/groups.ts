import { baseAPI } from 'src/api/axios.api';

export const getGroups = async () => {
    return await baseAPI({
        method: 'GET',
        url: '/api/groups'
    });
}

export const getGroupDetails = async (groupId: string) => {
    return await baseAPI({
        method: 'GET',
        url: `/api/groups/${groupId}`
    });
}