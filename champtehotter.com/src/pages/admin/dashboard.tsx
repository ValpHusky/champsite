import { IResourceComponentsProps } from "@refinedev/core";
import { Col, Row } from "antd";
import { MediaForm, MediaList } from "components";
import { MEDIA_SECTIONS } from "store";

export const AdminDashboard: React.FC<IResourceComponentsProps> = () => {
    return (
        <>
            <Row>
                <Col 
                    xs={{ span:22, offset: 1 }} 
                    sm={{ span: 20, offset: 2}} 
                    md={{ span: 12, offset: 6}} 
                    // lg={{ span: 8, offset: 8}} 
                    // xl={{ span: 4, offset: 10 }}
                >
                    <MediaForm />
                </Col>
            </Row>
            <Row>
                <Col 
                    xs={{ span:22, offset: 1 }} 
                    sm={{ span: 20, offset: 2}} 
                    md={{ span: 12, offset: 6}} 
                    // lg={{ span: 8, offset: 8}} 
                    // xl={{ span: 4, offset: 10 }}
                >
                    <MediaList section={MEDIA_SECTIONS.STORIES} />
                </Col>
            </Row>
            <Row>
                <Col 
                    xs={{ span:22, offset: 1 }} 
                    sm={{ span: 20, offset: 2}} 
                    md={{ span: 12, offset: 6}} 
                    // lg={{ span: 8, offset: 8}} 
                    // xl={{ span: 4, offset: 10 }}
                >
                    <MediaList section={MEDIA_SECTIONS.HYPNO} />
                </Col>
            </Row>
        </>
    );
};
  