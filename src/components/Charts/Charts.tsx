import * as React from 'react';
import * as RCS from 'recharts';
import './Charts.scss';
import * as moment from 'moment';
import { TIME_FORMATTER } from "../../utils/config";
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

  public componentDidMount() {
    // const { reset } = this.props;
  }
  

  public getAxisYDomain = (data, ref, offset = 0) => {
    let [ bottom, top ] = [ data[0][ref], data[0][ref] ];
    data.forEach( d => {
      console.log('d', d[ref], d.limit[0], d.limit[1], top, bottom);
      if (d[ref] > top) {
        top = Math.max(d[ref], d.limit[1]);
      } else {
        top = Math.max(top, d.limit[1]);
      }
      if (d[ref] < bottom) {
        bottom = Math.min(d[ref], d.limit[0]);
      } else {
        bottom = Math.min(bottom, d.limit[0]);
      }
    });
    console.log('top, bottom', top, bottom);
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
      if (item.time === refAreaLeft) {
        realData = realData.slice(index)
        }
      if (item.time === refAreaRight) {
        realData = realData.slice(0, index)
        }
    }) 
    console.log(realData)
    const [ bottom, top ] = this.getAxisYDomain( realData, 'origin' );
    
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

  public render () {
    const { 
      data
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
          height={200}>
          <RCS.ComposedChart
            data={data}
            syncId="analysis-result"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseDown = { 
              e => e.activeLabel && this.setState({refAreaLeft: e.activeLabel})
            }
            onMouseMove = { 
              e => e.activeLabel && this.state.refAreaLeft && this.setState({refAreaRight: e.activeLabel}) 
            }
            onMouseUp = { this.zoom }
          >
            <RCS.CartesianGrid strokeDasharray="3 3"/>
            <RCS.XAxis 
              dataKey="time"
              type="number"
              tickFormatter={(time)=> moment(time).format(TIME_FORMATTER) }
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
              labelFormatter={(time)=> moment(time).format(TIME_FORMATTER) }
            />
            <RCS.Legend style={{marginLeft: '2rem'}} layout="vertical" align="left" verticalAlign="middle" />
            <RCS.Area
              type="monotone"
              name="上下限"
              dataKey="limit"
              yAxisId="realdata"
              ifOverflow={"extendDomain"}
              stroke="rgba(111, 111, 160, .56)"
              fill="#f0eefa"
            />
            <RCS.Line 
              type="monotone" 
              name="原始值" 
              dataKey="origin" 
              yAxisId="realdata" 
              ifOverflow={"extendDomain"} 
              stroke="#7eb26d" 
            />
            <RCS.Scatter 
              type="monotone" 
              name="异常点" 
              dataKey="ano" 
              yAxisId="realdata" 
              ifOverflow={"extendDomain"} 
              fill="red" 
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