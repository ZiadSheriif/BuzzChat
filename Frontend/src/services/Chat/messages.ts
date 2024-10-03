import { baseAPI } from 'src/api/axios.api';

export const getMessages = async (groupId: string) => {
    return await baseAPI({
        method: 'GET',
        url: `/api/messages/${groupId}`
    });
}


export const createMessage = async (username: string, image: string, text: string, group: string, date: string) => {
    const dataObj = { username: username, image: image, text: text, group: group, date: date };

    return await baseAPI({
        method: 'POST',
        url: '/api/messages/create',
        requestConfig: { data: dataObj }
    });
}