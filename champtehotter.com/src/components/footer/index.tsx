
import {
  Space, Typography
} from "antd";
import React from "react";


export const Footer: React.FC = () => {

  const footerStyles: React.CSSProperties = {
    backgroundColor: 'white',
    backgroundImage: 'url(/assets/orlandofox_banner.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };


  return (
      <Space>
        <div
          style={{
              height: "64px",
              textAlign: 'center'
          }}
        >
          <Typography.Text italic>
            C ChampTehOtter, 2023. All original concepts and characters in these works are licensed under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution 4.0 International License.</a> Champ content posted on this website is free to distribute – please share it with those who will appreciate it! But don’t forget to attribute to ChampTehOtter.
          </Typography.Text>
        </div>
      </Space>
  );
};
