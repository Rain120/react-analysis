import * as React from 'react';
import {
  Button,
} from 'antd';
import {
  ResponsiveContainer,
  ComposedChart,
  YAxis,
  Line,
  Brush,
  CartesianGrid,
  LineChart,
} from "recharts";
import AnalysisHeader from "../AnalysisHeader/AnalysisHeader";
import Charts from "../Charts/Charts";
import classNames from 'classnames';
import './Analysis.scss';

interface AnalysisProps {
  show?: any
}

export default class Analysis extends React.PureComponent<AnalysisProps> {
  public dataDemo = [
    {
      // time: moment(1523203140000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523203,
      uv: 4000,
      limit: [2400, 3000],
      ano: 4000
    },
    {
      // time: moment(1523803180000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523303,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
    {
      // time: moment(1523803240000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523403,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803300000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523503,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803350000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523603,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803400000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523703,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
    {
      // time: moment(1523963480000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 2000,
      limit: [5600, 9800]
    },
    {
      // time: moment(1532203500000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523903,
      uv: 2780,
      limit: [-2800, 1908],
      ano: 2780
    },
    {
      // time: moment(1532203510000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1524003,
      uv: 1890,
      limit: [1200, 4800],
      ano: 1890
    },
    {
      // time: moment(1532203520000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1524103,
      uv: 2390,
      limit: [-3500, 1800]
    },
    {
      // time: moment(1532203522000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1524203,
      uv: 3490,
      limit: [-2800, 2300],
      ano: 3490
    }
  ];

  public state = {
    demo: true,
    data: this.dataDemo,
    left : 'dataMin',
    right : 'dataMax',
    refAreaLeft : '',
    refAreaRight : '',
    top : 'dataMax+1',
    bottom : 'dataMin-1',
    animation : true
  };

  constructor(props) {
    super(props)
  }

  public getAxisYDomain = (from, to, ref, offset) => {
    const { data } = this.state;
    const dataSlice = data.slice(from - 1, to);
    let [ bottom, top ] = [ dataSlice[0][ref], dataSlice[0][ref] ];
    dataSlice.forEach( d => {
      if ( d[ref] > top ) {
        top = d[ref];
      }
      if ( d[ref] < bottom ) {
        bottom = d[ref];
      }
    });
    return [ (bottom | 0) - offset, (top | 0) + offset ]
  };

  public zoom = () => {  
  	const { 
      data
    } = this.state;
    let {
      refAreaLeft,
      refAreaRight,
    } = this.state

		if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
    	this.setState({
      	refAreaLeft : '',
        refAreaRight : '',
      })
    	return;
    }

	  if ( refAreaLeft > refAreaRight ) {
      [ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];
    }

    const [ bottom, top ] = this.getAxisYDomain( refAreaLeft, refAreaRight, 'cost', 1 );
    
    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
    	data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, 
      top,
    }));
  };

  public reset = () => {
    console.log('reset');
    const { data } = this.state;
  	this.setState( () => ({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : '',
      left : 'dataMin',
      right : 'dataMax',
      top : 'dataMax+1',
      bottom : 'dataMin',
    }) );
  }

  public render () {
    const { 
      demo,
      data
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
          <ResponsiveContainer
            className="brush"
            width="100%"
            height={60}
          >
            <ComposedChart
              data={data}
              syncId="analysis-result"
              onMouseDown = { 
                e => this.setState({refAreaLeft: e.activeLabel})
              }
              onMouseMove = { 
                e => this.state.refAreaLeft && this.setState({refAreaRight: e.activeLabel}) 
              }
              onMouseUp = { this.zoom }
            >
              <Line type="monotone" dataKey="uv" name="原始值" stroke="#fff" />
              <Brush name="原始值" dataKey="time">
                <LineChart syncId="compare">
                  <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                  <YAxis hide={true} domain={["auto", "auto"]} />
                  <Line type="monotone" dataKey="uv" name="原始值" stroke="#7eb26d" />
                </LineChart>
              </Brush>
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{width: '4%'}} />
        </div>
        <Charts data={data} />
        <Charts data={data} />
      </div>
    )
  }
}