import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    console.log(email);
    const currentUser = { email: email };
    if (email) {
      fetch(`https://shohoj-pay-server.herokuapp.com/jwtUser/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
          console.log(data);
          console.log(data.accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
