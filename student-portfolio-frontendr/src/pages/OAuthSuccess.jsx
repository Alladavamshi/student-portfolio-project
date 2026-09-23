import { useEffect } from "react";

function OAuthSuccess() {

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    console.log("TOKEN =", token);

    if (token) {

      localStorage.setItem("token", token);
      localStorage.setItem("role", "STUDENT");

      window.location.href = "/dashboard";
    }

  }, []);

  return <h1>OAuth Success Page</h1>;
}

export default OAuthSuccess;