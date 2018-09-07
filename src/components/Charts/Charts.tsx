/*
 * @Author: Rain120 
 * @Date: 2018-08-31 10:31:24 
 * @Last Modified by: Rain120
 * @Last Modified time: 2018-09-07 10:10:57
 */

import * as React from 'react';
import * as RCS from 'recharts';
import './Charts.scss';
import * as moment from 'moment';
import { TIME_FORMATTER, TIME_FORMATTER_TOMINUTE } from "../../utils/config";
interface ChartsProps {
  data?: any,
  reset?: any,
}

export default class Charts extends React.PureComponent<ChartsProps> {
  public state = {
    left : 'dataMin',
    right : 'dataMax',
    refAreaLeft : '',
    refAreaRight : '',
    top : 'dataMax',
    bottom : 'dataMin',
    animation : true
  };

  constructor(props) {
    super(props)
  } 
  
  public componentWillReceiveProps(oldProps, newProps) {
    if (newProps.reset !== oldProps.reset) {
      this.reset()
    }
  }  

  public getAxisYDomain = (data, ref, offset = 0) => {
    console.log(213, data)
    let [ bottom, top ] = [ data[0][ref], data[0][ref] ];
    data.forEach( d => {
      if (d[ref] > top) {
        top = Math.max(d[ref], d.l[1]);
      } else {
        top = Math.max(top, d.l[1]);
      }
      if (d[ref] < bottom) {
        bottom = Math.min(d[ref], d.l[0]);
      } else {
        bottom = Math.min(bottom, d.l[0]);
      }
    });
    return [ (bottom | 0) - offset, (top | 0) + offset ]
  };

  public zoom = () => {  
  	const { 
      data
    } = this.props;

    let {
      refAreaLeft,
      refAreaRight,
    } = this.state;

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

    let realData = data.slice();
    realData.map((item, index) => {
      if (item.t === refAreaLeft) {
        realData = realData.slice(index)
        }
      if (item.t === refAreaRight) {
        realData = realData.slice(0, index)
      }
    }) 
    const [ bottom, top ] = this.getAxisYDomain( realData, 'o' );
    
    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
    	data : realData.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, 
      top,
    }));
  };

  public reset = () => {
    const { data } = this.props;
  	this.setState({
      data,
      left : 'dataMin',
      right : 'dataMax',
      refAreaLeft : '',
      refAreaRight : '',
      top : 'dataMax',
      bottom : 'dataMin',
    });
  }

  public render () {
    const { 
      data,
     } = this.props;

     const {
       top,
       right,
       bottom,
       left,
       refAreaLeft,
       refAreaRight,
     } = this.state;

     return (
      <div className="charts-wrapper">
        <RCS.ResponsiveContainer
          width="100%"
          height={300}>
          <RCS.ComposedChart
            data={data}
            syncId="analysis-result"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseDown = { 
              e => e && e.activeLabel && this.setState({refAreaLeft: e.activeLabel})
            }
            onMouseMove = { 
              e => e && e.activeLabel && this.state.refAreaLeft && this.setState({refAreaRight: e.activeLabel}) 
            }
            onMouseUp = { this.zoom }
          >
            <RCS.CartesianGrid strokeDasharray="3 3"/>
            <RCS.XAxis 
              dataKey="t"
              tickFormatter={(t)=> moment(t).format(TIME_FORMATTER) }
              ifOverflow={"extendDomain"}
              allowDataOverflow={true}
              domain={[left, right]}
              />
            <RCS.YAxis
              type="number"
              ifOverflow={"extendDomain"}
              allowDataOverflow={true}
              domain={[bottom, top]}
              yAxisId="realdata"
             />
            <RCS.Tooltip 
              labelFormatter={(t)=> moment(t).format(TIME_FORMATTER) }
            />
            <RCS.Legend style={{marginLeft: '2rem'}} />
            <RCS.Brush
              dataKey="t"
              tickFormatter={t => moment(t).format(TIME_FORMATTER_TOMINUTE)}
            />
            <RCS.Area
              type="monotone"
              name="上下限"
              dataKey="l"
              yAxisId="realdata"
              ifOverflow={"extendDomain"}
              stroke="none"
              fill="#f0eefa"
            />
            <RCS.Line 
              type="monotone" 
              name="原始值" 
              dataKey="o" 
              yAxisId="realdata" 
              ifOverflow={"extendDomain"} 
              stroke="#7eb26d" 
            />
            <RCS.Area 
              type="monotone" 
              name="异常点" 
              dataKey="a" 
              yAxisId="realdata" 
              stroke="red"
              dot={{ stroke: 'red', fill: 'red' }}
              ifOverflow={"extendDomain"} 
              fill="none" 
            />
            {
            	(refAreaLeft && refAreaRight) ? (
                <RCS.ReferenceArea
                  yAxisId="realdata" 
                  x1={refAreaLeft} 
                  x2={refAreaRight} 
                  alwaysShow={true}
                  strokeOpacity={0.3} 
                /> 
              ) : null
            }
          </RCS.ComposedChart>
        </RCS.ResponsiveContainer>
      </div>
    )
  }
}