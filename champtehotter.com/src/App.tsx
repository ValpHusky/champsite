import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, Menu } from "antd";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { LoginPage } from "pages/login";
import { FilePdfOutlined, GoogleCircleFilled, HomeOutlined, SettingOutlined, SoundOutlined } from "@ant-design/icons";
import { AdminDashboard } from "pages/admin";
import { StoriesPage } from "pages/stories";
import { HypnoPage } from "pages/hypno";
import { HomePage } from "pages/home";
import Item from "antd/es/list/Item";
import MenuItem from "antd/lib/menu/MenuItem";
import Over18Disclaimer from "components/over18disclaimer";
import { Title } from "components/title";

const ThemedLayout = () => (
  <ThemedLayoutV2
    Header={() => <Header />}
    Sider={() => (
      <ThemedSiderV2
          Title={() => <Title />}
          render={({ items, logout, collapsed }) => {
              return (
                  <>
                      <MenuItem icon={<HomeOutlined />} title="Home">
                        <Link to="/">Home</Link>
                      </MenuItem>
                      <MenuItem icon={<FilePdfOutlined />} title="Stories">
                        <Link to="/stories">Stories</Link>
                      </MenuItem>
                      <MenuItem icon={<SoundOutlined />} title="Hypno">
                        <Link to="/hypno">Hypno</Link>
                      </MenuItem>
                      <Authenticated fallback={<></>}>
                        <Menu>
                          <MenuItem icon={<SettingOutlined />} title="Admin">
                            <Link to="/admin">Admin</Link>
                          </MenuItem>
                          {logout}
                        </Menu>
                      </Authenticated>
                      
                  </>
              );
          }}
      />
    )}
  >
    <Outlet />
  </ThemedLayoutV2>
)

function App() {
  return (
    <>
      <Over18Disclaimer />
      <BrowserRouter>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    projectId: "7OMXxw-OhVwFE-4XOGYp",
                    liveMode: "auto",
                  }}
                >
                  <Routes>
                  <Route
                      element={
                        <ThemedLayout />
                      }
                    >
                      <Route path="/stories">
                        <Route index element={<StoriesPage />} />
                      </Route>
                      <Route path="/hypno">
                        <Route index element={<HypnoPage />} />
                      </Route>
                      <Route path="/">
                        <Route index element={<HomePage />} />
                      </Route>
                      
                    </Route>
                    <Route
                      path="/login"
                      element={
                        <Authenticated
                        key="authenticated-outer"
                        fallback={
                          <AuthPage
                          type="login"
                          providers={[{name:"google", label:"Sign in with Google", icon: <GoogleCircleFilled /> }]}
                          formProps={{ disabled: true }}
                        />
                        }
                      >
                        <Navigate replace to="/admin" />
                      </Authenticated>
                      }
                    />
                    <Route path="/admin" element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout />
                      </Authenticated>
                    }>
                      <Route index element={<AdminDashboard />} />
                      {/* <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} /> */}
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
