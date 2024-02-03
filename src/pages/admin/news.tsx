import { IResourceComponentsProps } from "@refinedev/core";
import { Col, Row } from "antd";
import { NewsList } from "components/newlist";
import { NewsForm } from "components/newsform";

export const NewsDashboard: React.FC<IResourceComponentsProps> = () => {
    return (
        <>
            <Row>
                <Col 
                    xs={{ span: 22, offset: 1 }} 
                    sm={{ span: 18, offset: 3}} 
                    // lg={{ span: 8, offset: 8}} 
                    // xl={{ span: 4, offset: 10 }}
                >
                    <NewsForm />
                </Col>
            </Row>
            <Row>
                <Col 
                    xs={{ span: 22, offset: 1 }} 
                    sm={{ span: 18, offset: 3}} 
                    // lg={{ span: 8, offset: 8}} 
                    // xl={{ span: 4, offset: 10 }}
                >
                    <NewsList />
                </Col>
            </Row>
        </>
    );
};
  