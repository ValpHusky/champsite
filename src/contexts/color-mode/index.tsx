import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";
import theme from '../../theme.json'

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {

  return (
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={theme}
      >
        {children}
      </ConfigProvider>
  );
};
