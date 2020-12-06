import { useState } from 'react';

const useManageUser = () => {
    const [user, setUser] = useState(null);

    return { user, setUser };
}

export default useManageUser;