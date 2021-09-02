import React, { useEffect, useState } from "react";
import { Button, Card, Col, DatePicker, Form, Layout, Row, Select, Spin } from "antd";

import "./style.css";
import MonthlyTrendLine from "./charts/MonthlyTrendLine";
import QuerySummaryPie from "./charts/QuerySummaryPie";
import SentimentDonut from "./charts/SentimentDonut";
import TagsBar from "./charts/TagsBar";
import { BaseURL } from "../Api";
import CustomCard from "./CustomCard";

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function MainComponent() {
  const [form] = Form.useForm();
  const [monthlyTrendData, setMonthlyTrendData] = useState([])
  const [sentimentData, setSentimentData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [querySummaryData, setQuerySummaryData] = useState([]);
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    getSentimentData();
    getTagsData();
    getQuerySummary();
    getMonthlyTrendData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FUNCTIONS
  const onFinish = (values) => {
    console.log(values);
  };

  const getSentimentData = () => {
    BaseURL.post("/get-sentiments-by-account", {
      id: 6,
      startDate: "2020-05-05",
      endDate: "2020-06-30",
    })
      .then((res) => {
        console.log(res.data.body.data);
        setSentimentData(res.data.body.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const getTagsData = () => {
    BaseURL.post("/get-top-tags", {
      id: 6,
      startDate: "2021-09-01",
      endDate: "2021-09-02",
    })
      .then((res) => {
        console.log(res);
        setTagsData(res.data.body.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const getQuerySummary = () => {
    BaseURL.post("/get-query-summery", {
      id: 6,
      startDate: "2020-05-05",
      endDate: "2020-06-30",
    })
      .then((res) => {
        console.log(res);
        setQuerySummaryData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const getMonthlyTrendData = () => {
    BaseURL.post("/get-monthly-comparison", {
      id: 6,
      startDate: "2020-05-05",
      endDate: "2020-06-30",
    })
      .then((res) => {
        console.log(res.data.body);
        setMonthlyTrendData(res.data.body.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  

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
            <div style={{ marginTop: 10 }}>
              {/* CHARTS */}
              <Row gutter={[16, 16]}>
                {/* <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <CustomCard text="Incoming Queries" count={querySummaryData?.incoming[0].count || 0} fontColor="#018ffb" />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <CustomCard text="Incoming Queries Today" count={querySummaryData?.incomingToday[0].count || 0} fontColor="#FC8404" />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <CustomCard text="Unique Fans" count={querySummaryData?.uniqueFans[0].count || 0} fontColor="#6BB31B" />
                </Col> */}

                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card className="card">
                    <QuerySummaryPie querySummaryData={querySummaryData.types} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card className="card">
                    <MonthlyTrendLine monthlyTrendData={monthlyTrendData} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card className="card">
                    <SentimentDonut sentimentData={sentimentData} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card className="card">
                    <TagsBar tagsData={tagsData} />
                  </Card>
                </Col>
              </Row>
            </div>
        
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Smashboard © {new Date().getFullYear()}</Footer>
    </Layout>
  );
}
