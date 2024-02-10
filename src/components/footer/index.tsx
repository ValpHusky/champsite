
import {
  Space, Typography
} from "antd";
import React from "react";


export const Footer: React.FC = () => {

  return (
      <Space>
        <div
          style={{
              textAlign: 'left',
              padding: '30px 10px'
          }}
        >
          <Typography.Text italic style={{ fontSize: '90%' }}>
            Copyright ChampTehOtter, 2023. All original concepts and characters in these works are licensed under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution 4.0 International License.</a> Champ content posted on this website is free to distribute – please share it with those who will appreciate it! But don’t forget to attribute to ChampTehOtter.
          </Typography.Text>
        </div>
      </Space>
  );
};
