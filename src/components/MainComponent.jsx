import React, { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Layout, Row, Select } from "antd";

import "./style.css";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Header, Content, Footer } = Layout;

export default function MainComponent() {
  const [form] = Form.useForm();
  const [showFilter, setShowFilter] = useState(false);

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Layout className="layout">
      <Header className="header">
        <img src="https://smashboard.co/img/smashboard-logo.png" alt="logo" className="logo" />
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <Row justify="end" style={{ marginBottom: 10 }}>
            <Button onClick={() => setShowFilter(!showFilter)} style={{ borderRadius: 6 }} type="primary">
              {showFilter ? "Hide" : "Show"} Filter
            </Button>
          </Row>
          {showFilter && (
            <Form form={form} name="search" onFinish={onFinish}>
              <Card className="card filter-card" style={{ margin: "15px 0" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item name="account">
                      <Select placeholder="Select Account" style={{ borderRadius: "6px !important" }}></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item name="dateRange">
                      <RangePicker style={{ width: "100%", borderRadius: 6 }} />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block style={{ borderRadius: 6 }}>
                        Filter
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Form>
          )}

          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card className="card"></Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
