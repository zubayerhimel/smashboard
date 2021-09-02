import React from "react";
import { Card } from "antd";
import numeral from "numeral";
import "./style.css";

export default function CustomCard({ text, count, fontColor }) {
  return (
    <Card className="card">
      <div className="wrapper">
        <div className="text">{text}</div>
        <div className="count" style={{ color: fontColor }}>
          {count}
        </div>
      </div>
    </Card>
  );
}
