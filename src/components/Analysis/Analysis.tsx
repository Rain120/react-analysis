import { 
  Checkbox,
  Icon, 
  Select, 
  Button, 
  Tooltip, 
  InputNumber, 
  Collapse, 
  Slider, 
  Row, 
  Col 
} from 'antd';
import * as React from 'react';
import classNames from "classnames";
import './Analysis.scss';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;

export default class Analysis extends React.PureComponent {
  public lists = ["CDFC", "isolation_forest", "3Sigma"];
  public state = {
    value: 0.01,
    inputValue: 0.01,
    checkedList: [],
    indeterminate: false,
    checkAll: false,
    currentFeatures: 'analysis'
  }

  constructor(props) {
    super(props);
  }

  public onChangeChecked = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < this.lists.length,
      checkAll: checkedList.length === this.lists.length
    });
  };

  public onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? this.lists : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  public changeOptions = value => {
    if (value === void 0 || value === '') {
      value = 'analysis'
    }
    console.log(value);
    this.setState({
      currentFeatures: value
    })
  }

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

  public selectFeature = option => {
    const { currentFeatures } = this.state;
    return currentFeatures === option ? 'show' : 'hide';
  }

  public render() {
    const { 
      indeterminate, 
      checkAll, 
      checkedList, 
      inputValue,
    } = this.state;

    return (
      <div className="analysis-wrapper">
        <div className="features">
          <div className="options">
            <Select defaultValue="analysis" onChange={this.changeOptions}>
              <Option value="analysis">离线分析</Option>
              <Option value="predict" disabled={true}>异常预测</Option>
            </Select>
          </div>
          <div className={classNames("analysis", this.selectFeature('analysis'))}>
            <Button
              className="upload-demo-start"
              type="primary">
              Analysis
            </Button>
          </div>
          <div className={classNames("predict", this.selectFeature('predict'))}>
            <Button
              className="upload-demo-start"
              type="primary">
              Predict
            </Button>
          </div>
        </div>
        <div className={classNames("algorithms", this.selectFeature('analysis'))}>
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
            this.lists.map((item, index) => (
              <div className="single-list" key={index}>
                <div className="list">
                  <div className="algorithm-name">
                    <Checkbox value={item}>
                      <span>{item}</span>
                    </Checkbox>
                  </div>
                  <div className="more-params">
                    <Collapse>
                      <Panel header="高级" key={index.toString()}>
                        <ul className="params">
                          <li className="param">
                            <Tooltip placement="leftTop" title={<span>范围：(0, 0.5)，步长：0.01</span>}>
                              <Icon type="info-circle" />&nbsp;<span className="title">K:</span>
                            </Tooltip>
                            <InputNumber 
                              style={{marginLeft: '.6rem', width: '5rem'}}
                              defaultValue={0.01}
                              step={0.01}
                              min={0}
                              max={0.5}
                              onChange={this.changeParamValue}/>
                          </li>
                          <li className="param">
                            <Tooltip placement="leftTop" title={<span>范围：(0, 0.5)，步长：0.01</span>}>
                              <Icon type="info-circle" />&nbsp;<span className="title">M:</span>
                            </Tooltip>
                            <Row className="slider-param">
                                <Col span={18}>
                                  <Slider
                                    min={0}
                                    max={.5}
                                    onChange={this.onChange}
                                    value={inputValue}
                                    step={0.01}
                                  />
                                </Col>
                                <Col span={1}>
                                  <InputNumber
                                    style={{marginLeft: '.4rem'}}
                                    min={0}
                                    max={0.5}
                                    step={0.01}
                                    value={inputValue}
                                    onChange={this.onChange}
                                  />
                                </Col>
                            </Row>
                          </li>
                          <li className="param">
                            <Tooltip placement="leftTop" title={<span>范围：(0, 0.5)，步长：0.01</span>}>
                              <Icon type="info-circle" />&nbsp;<span className="title">I:</span>
                            </Tooltip>
                            <Select
                              style={{marginLeft: '.7rem'}}
                              defaultValue="test">
                              <Option value="test">离线分析</Option>
                              <Option value="tmp">异常预测</Option>
                            </Select>
                          </li>
                        </ul>
                      </Panel>
                    </Collapse>
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