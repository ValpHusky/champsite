import React, { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input, Spin } from "antd";
import { newsInsert } from "utility/services";
import { useReloadMedia, useReloadNews } from "store";

  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};


export const NewsForm: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const reloadNews = useReloadNews()

    const handleSubmit = useCallback(async (values:any) => {
        
        setUploading(true)
        const result = await newsInsert(values)
        setUploading(false)
        if (result) {
            reloadNews()
        }
      }, [reloadNews])

    return (
        <Spin spinning={uploading} tip="Posting...">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: false }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: false,
                            max: 512
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Publish date (optional)"
                    name="published_at"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <DatePicker name="published_at" placeholder="Today" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};