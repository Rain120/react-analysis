
import * as React from 'react';
import {
  Button,
} from 'antd';
import * as RCS from 'recharts';
import AnalysisHeader from "../AnalysisHeader/AnalysisHeader";
import Charts from "../Charts/Charts";
import classNames from 'classnames';
import './Analysis.scss';
import * as moment from 'moment';
import { TIME_FORMATTER } from "../../utils/config";

interface AnalysisProps {
  show?: any
}

export default class Analysis extends React.PureComponent<AnalysisProps> {
  public dataDemo = [
    {
      time: 1523803000000,
      origin: 4000,
      limit: [2400, 3000],
      ano: 4000
    },
    {
      time: 1523803180000,
      origin: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
    {
      time: 1523803184000,
      origin: 3200,
      limit: [-3800, 6398],
      ano: 3200
    },
    {
      time: 1523803188000,
      origin: 2900,
      limit: [-4500, 4398],
      ano: 2900
    },
    {
      time: 1523803189000,
      origin: 4000,
      limit: [2200, 4498],
      ano: 4000
    },
    {
      time: 1523803200000,
      origin: 5200,
      limit: [3200, 5798],
      ano: 5200
    },
    {
      time: 1523803203300,
      origin: 2000,
      limit: [5600, 9800]
    },
    {
      time: 1523803213300,
      origin: 2780,
      limit: [-2800, 1908],
      ano: 2780
    },
    {
      time: 1523803222300,
      origin: 1890,
      limit: [1200, 4800],
      ano: 1890
    },
    {
      time: 1523803233300,
      origin: 2390,
      limit: [-3500, 1800]
    },
    {
      time: 1523803234300,
      origin: 3490,
      limit: [-2800, 2300],
      ano: 3490
    },
    {
      time: 1523803235300,
      origin: 2000,
      limit: [5600, 9800]
    },
    {
      time: 1523803236300,
      origin: 2780,
      limit: [-2800, 1908],
      ano: 2780
    },
    {
      time: 1523803237300,
      origin: 1890,
      limit: [1200, 4800],
      ano: 1890
    },
    {
      time: 1523803284300,
      origin: 2390,
      limit: [-3500, 1800]
    },
  ];

  public state = {
    demo: true,
    data: this.dataDemo,
    refAreaLeft : '',
    refAreaRight : '',
    animation : true
  };

  constructor(props) {
    super(props)
  }

  public reset = () => {
    const { data } = this.state;
  	this.setState({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : ''
    });
  }

  public render () {
    const { 
      demo,
      data,
    } = this.state

    const {
      show
    } = this.props

    return (
      <div className={classNames("analysis-wrapper", show)}>
        <div className="ret-title">
          <p className="hint-title">{ demo ? '样本数据' : '分析结果' }</p>
        </div>
        <AnalysisHeader />
        <div className="charts-header">
          <div className="reset">
            <Button 
            type="primary"
            onClick={this.reset}
            >
              重置
            </Button>
          </div>
          <RCS.ResponsiveContainer
            className="brush"
            width="100%"
            height={60}
          >
            <RCS.ComposedChart
              data={data}
              syncId="analysis-result"
            >
              <RCS.Line type="monotone" dataKey="origin" name="原始值" stroke="#fff" />
              <RCS.Brush
                name="原始值"
                dataKey="time"
                tickFormatter={(time)=> moment(time).format(TIME_FORMATTER) }
              >
                <RCS.LineChart syncId="compare">
                  <RCS.CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                  <RCS.YAxis hide={true} domain={["auto", "auto"]} />
                  <RCS.Line type="monotone" dataKey="origin" name="原始值" stroke="#7eb26d" />
                </RCS.LineChart>
              </RCS.Brush>
            </RCS.ComposedChart>
          </RCS.ResponsiveContainer>
          <div style={{width: '4%'}} />
        </div>
        <Charts data={data} />
        <Charts data={data} />
      </div>
    )
  }
}