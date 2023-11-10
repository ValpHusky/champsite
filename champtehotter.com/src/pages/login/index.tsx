import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { ThemedTitleV2 } from "@refinedev/antd";
import { Layout, Space, Typography } from "antd";

declare global {
    interface Window { google: any; }
}

type CredentialResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLECLIENTID;

export const LoginPage: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>();

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            console.log('CREDENTIALS', res)
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, []);

        return <div ref={divRef} id="login-with-google-button" />;
    };

    return (
        <Layout
            style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Space direction="vertical" align="center" size="large">
                <ThemedTitleV2
                    collapsed={false}
                    wrapperStyles={{
                        fontSize: "22px",
                    }}
                />
                <GoogleButton />
                <Typography.Text type="secondary">
                    Powered by Google
                </Typography.Text>
            </Space>
        </Layout>
    );
};