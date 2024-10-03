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

export const createGroup = async (group: { title: string, description: string, avatar?: string }) => {
    console.log('Group:', group);
    return await baseAPI({
        method: 'POST',
        url: '/api/groups/create',
        requestConfig: { data: group }
    });
}