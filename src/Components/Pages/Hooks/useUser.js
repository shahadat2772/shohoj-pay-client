import { useEffect, useState } from "react";

const useUser = (email) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (email) {
            fetch("http://localhost:5000/getUserInfo", {
                method: "GET",
                headers: {
                    email
                },

            }).then(res => res.json()).then(data => {
                console.log("useUser", data)
                setUser(data)
            })
        }
    }, [email]);

    return [user];
};

export default useUser;
