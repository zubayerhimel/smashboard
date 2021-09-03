import React, { useEffect, useState } from "react";
import { Button, Card, Col, DatePicker, Form, Layout, Row, Select } from "antd";

import "./style.css";
import MonthlyTrendLine from "./charts/MonthlyTrendLine";
import QuerySummaryPie from "./charts/QuerySummaryPie";
import SentimentDonut from "./charts/SentimentDonut";
import TagsBar from "./charts/TagsBar";
import Notification from "./Notification";
import { BaseURL } from "../Api";
import CustomCard from "./CustomCard";

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function MainComponent() {
  const [form] = Form.useForm();
  const [accountsData, setAccountsData] = useState([]);
  const [monthlyTrendData, setMonthlyTrendData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [querySummaryData, setQuerySummaryData] = useState([]);
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    getAccounts();
    getSentimentData();
    getTagsData();
    getQuerySummary();
    getMonthlyTrendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FUNCTIONS
  const onFinish = (values) => {
    const account = values.account;
    const startDate = values.dateRange[0].format("YYYY-MM-DD");
    const endDate = values.dateRange[1].format("YYYY-MM-DD");
    getSentimentData(account, startDate, endDate);
    getTagsData(account, startDate, endDate);
    getQuerySummary(account, startDate, endDate);
    getMonthlyTrendData(account, startDate, endDate);
  };

  const getAccounts = () => {
    BaseURL.get(`/accounts/get-accounts/1`)
      .then((res) => {
        console.log(res);
        setAccountsData(res.data.body.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSentimentData = (id = 6, startDate = "2020-05-05", endDate = "2020-06-30") => {
    BaseURL.post("/dashboard/get-sentiments-by-account", {
      id,
      startDate,
      endDate,
    })
      .then((res) => {
        console.log(res.data.body.data);
        setSentimentData(res.data.body.data);
      })
      .catch((err) => {
        Notification("Error", "Something went wrong! Please select different date and id", "error");
      });
  };

  const getTagsData = (id = 6, startDate = "2021-09-01", endDate = "2021-09-02") => {
    BaseURL.post("/dashboard/get-top-tags", {
      id,
      startDate,
      endDate,
    })
      .then((res) => {
        console.log(res);
        setTagsData(res.data.body.data);
      })
      .catch((err) => {
        Notification("Error", "Something went wrong! Please select different date and id", "error");
      });
  };

  const getQuerySummary = (id = 6, startDate = "2020-05-05", endDate = "2020-06-30") => {
    BaseURL.post("/dashboard/get-query-summery", {
      id,
      startDate,
      endDate,
    })
      .then((res) => {
        console.log(res);
        setQuerySummaryData(res.data.body);
      })
      .catch((err) => {
        Notification("Error", "Something went wrong! Please select different date and id", "error");
      });
  };

  const getMonthlyTrendData = (id = 6, startDate = "2020-05-05", endDate = "2020-06-30") => {
    BaseURL.post("/dashboard/get-monthly-comparison", {
      id,
      startDate,
      endDate,
    })
      .then((res) => {
        console.log(res.data.body);
        setMonthlyTrendData(res.data.body.data);
      })
      .catch((err) => {
        Notification("Error", "Something went wrong! Please select different date and id", "error");
      });
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <img src="https://smashboard.co/img/smashboard-logo.png" alt="logo" className="logo" />
        <span className="heading">Dashboard</span>
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
                      <Select placeholder="Select Account" style={{ borderRadius: "6px !important" }}>
                        {accountsData?.map((el, i) => (
                          <Option key={i} value={el.id}>
                            {el.name}
                          </Option>
                        ))}
                      </Select>
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
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <CustomCard text="Incoming Queries" count={querySummaryData.incoming ? querySummaryData.incoming[0].count : 0} fontColor="#018ffb" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <CustomCard text="Incoming Queries Today" count={querySummaryData.incomingToday ? querySummaryData.incomingToday[0].count : 0} fontColor="#FC8404" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <CustomCard text="Unique Fans" count={querySummaryData.uniqueFans ? querySummaryData.uniqueFans[0].count : 0} fontColor="#6BB31B" />
              </Col>

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
