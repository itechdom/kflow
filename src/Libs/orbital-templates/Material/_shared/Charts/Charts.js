/**
 * @file FILEPATH
 * @description This file contains the implementation of various chart components using the recharts library.
 * @module Charts
 */

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Label,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import React from "react";

/**
 * Renders a customized axis tick for the chart.
 *
 * @param {Object} props - The component props.
 * @param {number} props.x - The x-coordinate of the tick.
 * @param {number} props.y - The y-coordinate of the tick.
 * @param {string} props.stroke - The stroke color of the tick.
 * @param {Object} props.payload - The payload of the tick.
 * @returns {JSX.Element} The rendered CustomizedAxisTick component.
 */
const CustomizedAxisTick = props => {
  const { x, y, stroke, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

/**
 * Renders a bar chart component to display count data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.count - The count data to be displayed in the chart.
 * @param {string} props.label - The label for the x-axis of the chart.
 * @returns {JSX.Element} The rendered CountChart component.
 */
export const CountChart = ({ count, label }) => (
  <BarChart
    width={600}
    height={300}
    data={count}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis>
      <Label value={label} offset={0} position="insideBottom" />
    </XAxis>
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Bar type="monotone" dataKey="res" stroke="#8884d8"></Bar>
  </BarChart>
);

/**
 * Renders a radar chart component to display count data with a specific field.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.count - The count data to be displayed in the chart.
 * @param {string} props.label - The label for the x-axis of the chart.
 * @param {string} props.field - The field to be displayed in the chart.
 * @returns {JSX.Element} The rendered CountChartWithField component.
 */
export const CountChartWithField = ({ count, label, field }) => {
  return (
    <RadarChart outerRadius={90} width={730} height={250} data={count}>
      <PolarGrid />
      <PolarAngleAxis dataKey="_id" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar
        name="Mike"
        dataKey="total"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

/**
 * Renders a bar chart component to display sum data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.sum - The sum data to be displayed in the chart.
 * @returns {JSX.Element} The rendered SumChart component.
 */
export const SumChart = ({ sum }) => (
  <BarChart
    width={600}
    height={300}
    data={sum}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="_id.year" />
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar type="monotone" dataKey="re" stroke="#8884d8"></Bar>
  </BarChart>
);

/**
 * Renders a line chart component to display average data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.average - The average data to be displayed in the chart.
 * @returns {JSX.Element} The rendered AverageChart component.
 */
export const AverageChart = ({ average }) => (
  <LineChart
    width={600}
    height={300}
    data={average}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="_id.year" />
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="res" stroke="#8884d8" />
  </LineChart>
);
