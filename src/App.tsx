import { Authenticated, Refine } from "@refinedev/core";
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
import { App as AntdApp, Divider, Menu } from "antd";
import { HashRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { FilePdfOutlined, GoogleCircleFilled, HomeOutlined, LinkOutlined, SettingOutlined, SoundOutlined } from "@ant-design/icons";
import { AdminDashboard, NewsDashboard } from "pages/admin";
import { StoriesPage } from "pages/stories";
import { HypnoPage } from "pages/hypno";
import { HomePage } from "pages/home";
import MenuItem from "antd/lib/menu/MenuItem";
import Over18Disclaimer from "components/over18disclaimer";
import { Title } from "components/title";
import { Footer } from "components/footer";



const ThemedLayout = () => (
  <ThemedLayoutV2
    Footer={() => <Footer />}
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
                      <div>
                        <Divider>Links</Divider>
                      </div>
                      <MenuItem icon={<LinkOutlined />} title="Twitter">
                        <Link target="_blank" to="https://twitter.com/ChampTehOtter">X (Twitter)</Link>
                      </MenuItem>
                      <MenuItem icon={<LinkOutlined />} title="Ko-fi">
                        <Link target="_blank" to="https://ko-fi.com/champtehotter">Ko-fi</Link>
                      </MenuItem>
                      <MenuItem icon={<LinkOutlined />} title="SubscribeStar">
                        <Link target="_blank" to="https://subscribestar.adult/champtehotter">SubscribeStar</Link>
                      </MenuItem>
                      <MenuItem icon={<LinkOutlined />} title="Bluesky">
                        <Link target="_blank" to="https://bsky.app/profile/champtehotter.bsky.social">Bluesky</Link>
                      </MenuItem>
                      <MenuItem icon={<LinkOutlined />} title="Furaffinity">
                        <Link target="_blank" to="https://www.furaffinity.net/user/champtehotter">Furaffinity</Link>
                      </MenuItem>
                      <Authenticated fallback={<></>}>
                        <Menu>
                          <div>
                            <Divider>Admin tools</Divider>
                          </div>
                          <MenuItem icon={<SettingOutlined />} title="Media">
                            <Link to="/admin/media">Media</Link>
                          </MenuItem>
                          <MenuItem icon={<SettingOutlined />} title="News">
                            <Link to="/admin/news">News</Link>
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
    {/* <ThemeContextProvider> */}
        <Over18Disclaimer />
        <HashRouter>
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
                          <Route path="news" element={<NewsDashboard />} />
                          <Route path="media" element={<AdminDashboard />} />
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
        </HashRouter>
      {/* </ThemeContextProvider> */}
    </>
  );
}

export default App;
