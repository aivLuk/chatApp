import axios from 'axios';

const baseUrl = 'https://api.jsonbin.io/b/5fc9ed5e516f9d127027e6c9';
const secret = '$2b$10$WKJVZoOFSC8ex.cZpcR1C.rbV74jycT8WgbFFiyO7ffB4dz0gqXpO';

export const fetchUpdateData = async (updateData) => {
    const response = await axios.put(baseUrl, updateData, {
        headers: {
            'Content-Type': 'application/json',
            'secret-key': secret
        }
    })
    return response;
}

export const fetchData = async () => {
    const response = await axios.get(`${baseUrl}/latest`, {
        headers: {
            'secret-key': secret
        }
    })
    return response;
}

