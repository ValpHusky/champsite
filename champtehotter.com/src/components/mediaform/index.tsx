import React, { useCallback, useMemo, useState } from "react";
import { Button, Form, Input, Select, Spin, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib";
import { mediaInsert, mediaUpload } from "utility/services";
import { MEDIA_SECTIONS, mediaSectionsArray, useReloadMedia } from "store";

  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};


export const MediaForm: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const reloadMedia = useReloadMedia()

    const uploadprops: UploadProps = useMemo(() => ({
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
          setFileList([file]);
    
          return false;
        },
        fileList,
        multiple: false,
        maxCount: 1
      }), [fileList]);

      const isDisabled = useMemo(() => !fileList.length, [fileList])

      const handleSubmit = useCallback(async (values:any) => {
        const { content, ...rest } = values
        setUploading(true)
        const upload_meta = await mediaUpload(content.file, rest.section)
        const media = { ...rest, ...upload_meta }
        const result = await mediaInsert(media)
        setUploading(false)
        if (result) {
            reloadMedia()
        }
      }, [])

    return (
        <Spin spinning={uploading} tip="Uploading...">
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
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
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
                    label="Section"
                    name="section"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={mediaSectionsArray.map(ms => ({ label: ms, value: ms }))}
                    />
                </Form.Item>
                <Form.Item
                    label="File"
                    name="content"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Upload {...uploadprops}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button disabled={isDisabled} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};