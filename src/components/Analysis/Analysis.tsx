/*
 * @Author: Rain120 
 * @Date: 2018-09-04 18:33:26 
 * @Last Modified by: Rain120
 * @Last Modified time: 2018-09-07 11:44:43
 */

import * as React from 'react';
import {
  Button,
  Select,
} from 'antd';
import AnalysisHeader from "../AnalysisHeader/AnalysisHeader";
import Charts from "../Charts/Charts";
import classNames from 'classnames';
import './Analysis.scss';
import * as API from '../../api/data';
import { ERR_OK, TIME_FORMATTER_TOMINUTE } from "../../utils/config";
import { isEmptyObject } from "../../utils/utils";
import * as moment from 'moment';
import * as RCS from 'recharts';

interface AnalysisProps {
  show?: any,
  analysisData?: any
}

const Option = Select.Option;

export default class Analysis extends React.PureComponent<AnalysisProps> {
  


  public state = {
    demo: true,
    data: [],
    refAreaLeft : '',
    refAreaRight : '',
    animation : true,
    resetData: 0,
    lists: [],
    brushData: [],
  };

  constructor(props) {
    super(props)
  }
  public componentWillReceiveProps(data) {
    this.setState({
      data: data.analysisData,
      brushData: data.analysisData.brushData
    })
  }
  
  public componentDidMount() {
    let lists = Array<any>();
    API.getLists().then(res => {
      if (ERR_OK === res.status) {
        res.data.map(algorithm => {
          lists.push({
            name: algorithm.name,
            description: algorithm.description,
            params: algorithm.params
          })
        })
      }
      if (!isEmptyObject(lists)) {
        lists = lists;
      }
      this.setState({
          lists  
      });
    });
  }

  public reset = () => {
    const { data } = this.state;
    let { resetData } = this.state;
  	this.setState({
      data : data.map((item:any) => item.data && item.data.slice()),
      refAreaLeft : '',
      refAreaRight : '',
      resetData: resetData++,
    });
  }
  public handleChange = (value) => {
    console.log(value);
  }

  public render () {
    const { 
      demo,
      data,
      resetData,
      lists,
      brushData,
    } = this.state;

    const {
      show
    } = this.props;

    return (
      <div className={classNames("analysis-wrapper", show)}>
        <div className="ret-title">
          <p className={classNames("hint-title", { "show": demo }, { "hide": !demo })}>{ demo ? '样本数据' : '分析结果' }</p>
          <div className="file">
            <Select defaultValue="periodic" style={{ width: 180, float: "left" }} onChange={this.handleChange}>
              <Option value="periodic">periodicDemo.csv</Option>
              <Option value="aperiodic">aperiodicDemo.csv</Option>
            </Select>
          </div>
        </div>
        <AnalysisHeader 
          lists={lists}
          // fileInfo={}
        />
        <div className="charts-header">
          <div className="reset">
            <Button 
            type="primary"
            onClick={this.reset}
            >
              恢复时间选择
            </Button>
          </div>
          <RCS.ResponsiveContainer
            className="brush"
            width="100%"
            height={60}
          >
            <RCS.ComposedChart
              data={brushData}
              syncId="analysis-result"
            >
              <RCS.Line
                type="monotone" 
                dataKey="o" 
                name="原始值" 
                stroke="red" />
              <RCS.Brush
                dataKey="t"
                tickFormatter={t => moment(t).format(TIME_FORMATTER_TOMINUTE)}
              />
            </RCS.ComposedChart>
          </RCS.ResponsiveContainer>
          <div style={{width: '4%'}} />
        </div>
        {
          data.map((item:any) => item.algorithm && (
            <div className="chart-list" key={item.algorithm}>
              <p className="algo-title">{item.algorithm}算法分析结果</p>
              <Charts data={item.data} reset={resetData}/>
            </div>
          ))
        }
      </div>
    )
  }
}