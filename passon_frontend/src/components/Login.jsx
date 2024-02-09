import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import video from "../assets/video.mp4";
import whiteLogo from "../assets/whiteLogo.png";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState({});

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
    },

    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="flex justify-start flex-col h-screen items-center">
      <div className="relative w-full h-full">
        <video
          src={video}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />{" "}
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5 ">
            <img src={whiteLogo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
