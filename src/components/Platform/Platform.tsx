import { Tabs, Modal } from 'antd';
import * as React from 'react';
import Analysis from "src/components/Analysis/Analysis";
import Charts from "src/components/Charts/Charts";
// import moment from "moment";
import './Platform.scss';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

export default class Platform extends React.PureComponent {
  public newTabIndex = 1;

  public panes = [
    { title: `离线分析${this.newTabIndex}`, key: '1'}
  ];

  public data = [
    {
      // time: moment(1523203140000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523203,
      uv: 4000,
      limit: [2400, 3000],
      ano: 4000
    },
    {
      // time: moment(1523803180000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
    {
      // time: moment(1523803240000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803300000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803350000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
  
    {
      // time: moment(1523803400000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523803,
      uv: 3000,
      limit: [-3200, 5398],
      ano: 3000
    },
    {
      // time: moment(1523963480000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1523963,
      uv: 2000,
      limit: [5600, 9800]
    },
    {
      // time: moment(1532203500000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1532203,
      uv: 2000,
      limit: [-2800, 1908],
      ano: 2780
    },
    {
      // time: moment(1532203510000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1532203,
      uv: 1890,
      limit: [1200, 4800],
      ano: 1890
    },
    {
      // time: moment(1532203520000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1532203,
      uv: 2390,
      limit: [-3500, 1800]
    },
    {
      // time: moment(1532203522000).format("YYYY-MM-DD hh:mm:ss"),
      time: 1532203,
      uv: 3490,
      limit: [-2800, 2300],
      ano: 3490
    }
  ];
  
  public state = {
    activeKey: this.panes[0].key,
    panes: this.panes,
    demo: true,
    data: this.data,
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

  public render() {
    const { 
      activeKey, 
      panes, 
      demo, 
    } = this.state
    return (
      <div className="platform-wrapper">
        <Tabs
          style={{border: '1px solid #ccc'}}
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {
            panes.map(pane => 
              <TabPane tab={pane.title} key={pane.key}>
                <Analysis/>
                <p className="data-title">{ demo ? '样本数据' : '分析结果' }</p>
                {/* <Charts data={data}/> */}
                <Charts />
              </TabPane>)
            }
        </Tabs>
      </div>
    )
  }
}