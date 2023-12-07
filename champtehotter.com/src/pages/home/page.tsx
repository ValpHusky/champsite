import { LinkOutlined } from "@ant-design/icons";
import { IResourceComponentsProps } from "@refinedev/core";
import { Button, Col, Divider, Row, Typography } from "antd";
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
              style={{ textAlign: 'center' }}
          >
              <Typography>
                <Title level={2} >Welcome to ChampTehOtter.com!</Title>
                <Title level={3}>I make diaper stories and audio! I hope you enjoy it!</Title>
              </Typography>
          </Col>
      </Row>
      <Row>
          <Col 
              xs={{ span: 22, offset: 1 }} 
              sm={{ span: 20, offset: 2 }} 
              md={{ span: 12, offset: 6 }} 
              // lg={{ span: 8, offset: 8}} 
              // xl={{ span: 4, offset: 10 }}
              style={{ padding: '20px 0px 60px 0' }}
          >
              <Divider>Support Champ!</Divider>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'space-between' }}>
                <Button style={{ flex: '1', margin: '0px 10px' }} target="_blank" href="https://ko-fi.com/champtehotter" type="primary" icon={<LinkOutlined />}>
                  Ko-fi
                </Button>
                <Button style={{ flex: '1', margin: '0px 10px' }} target="_blank" href="https://www.patreon.com/ChampTehOtter" type="primary" icon={<LinkOutlined />}>
                  Patreon
                </Button>
                <Button style={{ flex: '1', margin: '0px 10px' }} target="_blank" href="https://subscribestar.adult/champtehotter" type="primary" icon={<LinkOutlined />}>
                  Subscribestar
                </Button>
              </div>
              {/* <Typography>
                <Title level={4} >Support Champ!</Title>
              </Typography> */}
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
      <Row style={{ padding: '60px 0px' }}>
          <Col 
              xs={{ span: 22, offset: 1 }} 
              sm={{ span: 20, offset: 2 }} 
              md={{ span: 12, offset: 6 }} 
              // lg={{ span: 8, offset: 8}} 
              // xl={{ span: 4, offset: 10 }}
          >
              You are the <PageCounter />th visitor since December 2023
          </Col>
      </Row>
    </>
  );
};
