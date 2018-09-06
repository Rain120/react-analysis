/*
 * @Author: Rain120 
 * @Date: 2018-08-31 09:31:24 
 * @Last Modified by: Rain120
 * @Last Modified time: 2018-09-06 22:55:47
 */
import { 
  Checkbox,
  Icon, 
  Tooltip, 
  InputNumber, 
  Collapse, 
} from 'antd';
import * as React from 'react';
import classNames from "classnames";
import './AnalysisHeader.scss';

const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;


interface AnalysisHeaderProps {
  lists?: any,
}
export default class AnalysisHeader extends React.PureComponent<AnalysisHeaderProps> {
  public state = {
    value: 0.01,
    inputValue: 0.01,
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  }

  constructor(props) {
    super(props);
  }

  public onChangeChecked = checkedList => {
    const { lists } = this.props;
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < lists.length,
      checkAll: checkedList.length === lists.length
    });
  };

  public onCheckAllChange = e => {
    const { lists } = this.props;
    this.setState({
      checkedList: e.target.checked ? lists : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  public changeParamValue = value => {
    this.setState({
      value
    })
  }

  public onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      inputValue: value,
    });
  }

  public moreParams(params) {
    return null !== params ? "show" : "hide";
  }

  public dWidth(params) {
    return null !== params ? "large-width" : "small-width";
  }

  public render() {
    const { 
      indeterminate, 
      checkAll, 
      checkedList, 
    } = this.state;

    const { lists } = this.props;

    return (
      <div className="analysis-wrapper">
        <div className={classNames("algorithms")}>
          <div className="all-lists">
            <Checkbox
              indeterminate={indeterminate}
              onChange={this.onCheckAllChange}
              checked={checkAll}
            >
              全选
            </Checkbox>
          </div>
          <CheckboxGroup
            value={checkedList}
            onChange={this.onChangeChecked}>
          {
            lists.map((item: any) => item.name && (
              <div className="single-list" key={item.name}>
                <div className={classNames("list", this.dWidth(item.params))}>
                  <div className="algorithm-name">
                    <Checkbox value={item.name}>
                      <Tooltip placement="bottomRight" title={item.description}>
                        <span>{item.name}</span>
                      </Tooltip>
                    </Checkbox>
                  </div>
                  <div className={classNames("more-params", this.moreParams(item.params))}>
                    {
                      item.params && item.params.map((item: any) => (
                        <Collapse key={item.name}>
                          <Panel header="高级" key={item.name}>
                            <ul className="params">
                              <li className="param">
                                <Tooltip placement="leftTop" title={<span>{item.desc}</span>}>
                                  <Icon type="info-circle" />&nbsp;<span className="title">{item.name}:</span>
                                </Tooltip>
                                <InputNumber 
                                  style={{marginLeft: '.6rem', width: '5rem'}}
                                  defaultValue={0.01}
                                  step={0.01}
                                  min={0}
                                  max={0.5}
                                  onChange={this.changeParamValue}/>
                              </li>
                            </ul>
                          </Panel>
                        </Collapse>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
          </CheckboxGroup>
        </div>
      </div>
    )
  }
}