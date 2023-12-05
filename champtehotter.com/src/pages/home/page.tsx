import { IResourceComponentsProps } from "@refinedev/core";
import { Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { MediaList } from "components";
import PageCounter from "components/pagecounter";
import { CONFIG_NEW_TAGDELTADAYS } from "configs";
import { MEDIA_SECTIONS } from "store";

export const HomePage: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <Row>
          <Col 
              xs={{ span: 22, offset: 1 }} 
              sm={{ span: 20, offset: 2 }} 
              md={{ span: 12, offset: 6 }} 
              // lg={{ span: 8, offset: 8}} 
              // xl={{ span: 4, offset: 10 }}
          >
              <Typography>
                <Title level={3} >Welcome to ChampTehOtter.com! I make diaper stories and audio! I hope you enjoy it!</Title>
              </Typography>
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
              <MediaList 
                postAgeLimit={CONFIG_NEW_TAGDELTADAYS}
                section={MEDIA_SECTIONS.STORIES}
                title="New Stories" 
              />
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
              <MediaList 
                postAgeLimit={CONFIG_NEW_TAGDELTADAYS} 
                section={MEDIA_SECTIONS.HYPNO}
                title="New Hypno" 
              />
          </Col>
      </Row>
      <Row>
          <Col 
              xs={{ span: 22, offset: 1 }} 
              sm={{ span: 20, offset: 2 }} 
              md={{ span: 12, offset: 6 }} 
              // lg={{ span: 8, offset: 8}} 
              // xl={{ span: 4, offset: 10 }}
          >
              You are the <PageCounter />th visitor since October 2023
          </Col>
      </Row>
    </>
  );
};
