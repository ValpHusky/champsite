
import React from "react";


export const Title: React.FC = () => {

  return (
    <div>
      <img alt="Champ Logo" style={{ width: '100%' }} src={`${process.env.REACT_APP_PUBLIC_URL}/assets/champ_logo.png`} />
    </div>
  );
};
