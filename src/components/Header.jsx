import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space } from "antd";
import Netflix_Logo from "../assets/Netflix_Logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Styles/header.css";


const Header = () => {
  
  const navigate = useNavigate();
  const user = useSelector(store=> store.user);
  const handleMenuClick = (e) => {
    if (e.key == 1) {
      
    }
    if (e.key == 2) {
      message.info("Sign Out User");
      signOut(auth)
        .then(() => {
          // Sign-out successful.

          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          navigate("/error");
        });
    }
  };
  
  
  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },

    {
      label: "SignOut",
      key: "2",
      danger: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className=" absolute w-screen h-20 px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-row items-center justify-between">
      <img className="w-auto h-16" src={Netflix_Logo} alt="logo" />
      {user &&<Space >
        <Dropdown menu={menuProps} overlayClassName="dark-dropdown">
          <Button className="  border-none rounded-sm">
            <Space>
              Button
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>} 
      
    </div>
  );
};

export default Header;
