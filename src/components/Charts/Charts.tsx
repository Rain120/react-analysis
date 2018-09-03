import * as React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import './Charts.scss'

interface ChartsProps {
  data?: any
}

export default class Charts extends React.PureComponent<ChartsProps> {
  constructor(props) {
    super(props)
  }

  public render () {
    const { 
      data
     } = this.props

     return (
      <div className="charts-wrapper">
        <ResponsiveContainer
          width="100%"
          height={200}>
          <ComposedChart
            data={data}
            syncId="analysis-result"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend style={{marginLeft: '2rem'}} layout="vertical" align="left" verticalAlign="middle" />
            <Area
              type="monotone"
              name="上下限"
              dataKey="limit"
              stroke="rgba(111, 111, 160, .56)"
              fill="#f0eefa"
            />
            <Line type="monotone" name="原始值" dataKey="uv" stroke="#7eb26d" />
            <Scatter type="monotone" name="异常点" dataKey="ano" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}