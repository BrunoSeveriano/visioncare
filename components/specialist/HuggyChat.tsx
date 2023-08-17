import useLogin from "@/hooks/useLogin";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Huggy: any;
  }
}

export const showChats = () => {
  if (window.Huggy) {
    window.Huggy.openBox();
  }
};

const HuggyChat = () => {
  const login = useLogin();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const loginInfo = {
      role: login.role,
    };

    setUserRole(loginInfo.role);

    const huggyChatInit = {
      contextID: "15f91584cbf3e1d1357ce07db31cc7bf",
      defaultCountry: "+55",
      uuid: "ad453d34-ab0e-4278-9a7e-db25dba475f2",
      company: "7617",
      userIdentifier: login.email,
      userHash: "ca6c1180981fddbe82c978f7f93728bb",
    };

    if (userRole === "Patient VisionCare") {
      if (window.Huggy) {
        window.Huggy.init(huggyChatInit);
      } else {
        const script = document.createElement("script");
        script.src = "https://js.huggy.chat/widget.min.js";
        script.async = true;
        script.onload = () => {
          window.Huggy.init(huggyChatInit);
        };
        document.body.appendChild(script);
      }
    }

    // return () => {
    //   if (window.Huggy) {
    //     window.Huggy.logout();
    //   }
    // };
  }, [userRole, login.email]);

  return <div></div>;
};

export default HuggyChat;
