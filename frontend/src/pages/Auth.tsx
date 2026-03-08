import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function Auth() {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // Get the token from Google response
      const token = credentialResponse.credential;
      if (!token) {
        console.error("No token returned from Google!");
        return;
      }

      // Send token to backend
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth",
        { token },
        { headers: { "Content-Type": "application/json" } },
      );
      console.log(res);
      // Store JWT or session token
      localStorage.setItem("token", res.data.token);

      console.log("User logged in:", res.data.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Login with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
