import { 
  Tabs, 
  Modal,
  Select, 
  Button,
} from 'antd';
import * as React from 'react';
import classNames from 'classnames'
import Analysis from "../Analysis/Analysis";
import './Platform.scss';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;

export default class Platform extends React.PureComponent {
  public newTabIndex = 1;

  public panes = [
    { title: `离线分析${this.newTabIndex}`, key: '1'}
  ];

  public state = {
    activeKey: this.panes[0].key,
    panes: this.panes,
    demo: true,
    currentFeatures: 'analysis',
    analyzing: false,
    predicting: false,
  };

  constructor(props) {
    super(props);
  }

  public remove = (targetKey) => {
    let { activeKey, panes } = this.state
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    panes = panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  public showCloseConfirm = (targetKey) => {
    confirm({
      title: '是否关闭此页面',
      content: '关闭将会丢失该页面的分析数据，是否关闭？',
      okText: 'Comfirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.remove(targetKey),
      onCancel() {
        return;
      },
    });
  }

  public onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  public onEdit = (targetKey, action) => {
    if ('remove' === action) {
      this.showCloseConfirm(targetKey);
    } else {
      this[action](targetKey);
    }
  }

  public add = () => {
    const { panes } = this.state;
    const activeKey = `离线分析${++this.newTabIndex}`;
    panes.push({ title: activeKey, key: activeKey});
    this.setState({ panes, activeKey });
  }

  public changeOptions = value => {
    if (value === void 0 || value === '') {
      value = 'analysis'
    }
    this.setState({
      currentFeatures: value
    })
  }

  public selectFeature = option => {
    const { currentFeatures } = this.state;
    return currentFeatures === option ? 'show' : 'hide';
  }

  public render() {
    const { 
      activeKey, 
      panes,
      currentFeatures,
      analyzing,
      predicting,
    } = this.state

    return (
      <div className="platform-wrapper">
        <Tabs
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {
            panes.map(pane => 
              <TabPane tab={pane.title} key={pane.key}>
              <div className="features">
                <div className="options">
                  <Select defaultValue="analysis" onChange={this.changeOptions}>
                    <Option value="analysis">离线分析</Option>
                    <Option 
                      value="predict" 
                      disabled={true}
                      >异常预测</Option>
                  </Select>
                </div>
                <div className={classNames("analysis", this.selectFeature('analysis'))}>
                  <Button
                    type="primary"
                    loading={analyzing}
                  >
                    { analyzing ? 'Analyzing' : 'Analyze' }
                  </Button>
                </div>
                <div className={classNames("predict", this.selectFeature('predict'))}>
                  <Button
                    type="primary"
                    loading={predicting}  
                  >
                    { predicting ? 'Predicting' : 'Predict' }
                  </Button>
                </div>
              </div>
              <Analysis show={currentFeatures === 'analysis' ? 'show' : 'hide'}/>
            </TabPane>)
          }
        </Tabs>
      </div>
    )
  }
}