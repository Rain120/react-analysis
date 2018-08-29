import { Checkbox, Icon, Switch, Select, Button } from 'antd';
import * as React from 'react';
import './Analysis.scss';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

export default class Analysis extends React.PureComponent {
  public lists = ["Apple", "Pear", "Orange"];
  public render() {
    return (
      <div className="analysis-wrapper">
        <div className="algorithms">
          <div className="all-lists">
            <Checkbox
            >
              全选
            </Checkbox>
          </div>
          <CheckboxGroup>
          {
            this.lists.map((item, index) => (
              <div className="singlei-list" key={index}>
                <div className="list">
                  <Checkbox value={item}>
                    <span>{item}</span>
                  </Checkbox>
                </div>
                <div className="more-params">
                  <span>
                    高级<Icon type={"right"} />
                  </span>
                </div>
                <ul className="params">
                  <li className="param">
                    <span className="title">参数1</span>
                    <Select defaultValue="jack">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </li>
                  <li className="param">
                    <span className="title">参数2</span>
                    <Switch
                      checkedChildren="开"
                      unCheckedChildren="关"
                    />
                  </li>
                </ul>
              </div>
            ))}
          </CheckboxGroup>
        </div>
        <div className="analysis">
          <Button
            className="upload-demo-start"
            type="primary">
            Analysis
          </Button>
        </div>
      </div>
    )
  }
}