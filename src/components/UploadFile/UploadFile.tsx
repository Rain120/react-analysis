import { Icon, Upload, message, Modal } from 'antd';
import * as React from 'react';
import './UploadFile.scss';
import * as moment from 'moment';
import { TIME_FORMATTER_TOMINUTE } from "../../utils/config";
import { isEmptyObject } from "../../utils/utils";

const Dragger = Upload.Dragger;
const confirm = Modal.confirm;

interface UploadFileProps {
  fileInfo?: any
}

export default class UploadFile extends React.PureComponent<UploadFileProps> {
  public state = {
    uploadFile: {},
    fileInfo: this.props.fileInfo
  };

  constructor(props) {
    super(props);
  }
  
  public onChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      let finfo = [{}];
      info.fileList.map(item => {
        finfo.push({
          name: item.response.filename,
          fileId: item.response.fileId,
          dataCount: item.response.dataCount,
          minDate: moment(item.response.minDate * 1000).format(TIME_FORMATTER_TOMINUTE),
          maxDate: moment(item.response.maxDate * 1000).format(TIME_FORMATTER_TOMINUTE),
        })
      });
      let f = Array<any>();
      finfo.map(item => {
        if (isEmptyObject) {
          return;
        }
        f.push(item);
        console.log(123, f, item);
      });
      this.setState({
        fileInfo: finfo
      })
      console.log(info.file, info.fileList[0].response);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  public beforeUpload = file => {
    if ('text/csv' === file.type) {
      this.setState({
        uploadFile: file
      });
      return true;
    }
    message.error(`${file.name} file must be csv.`);
    return false;
  }

  public onRemove = file => {
    console.log('r', file);
    this.setState({
      uploadFile: {}
    });
  }

  public showUploadConfirm = () => {
    confirm({
      title: '是否上传文件',
      content: '继续上传将会丢失该页面的分析数据，是否继续？',
      okText: 'Comfirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        console.log('ok');
      },
      onCancel() {
        console.log('cancel');
      },
    });
  }

  public render() {
    const { fileInfo } = this.state;
    console.log(11111, fileInfo);
    
    const props = {
      name: 'file',
      action: 'http://192.168.1.204:23456/anomalyOfflineDetect/upload',
      multiple: false,
      showUploadList: false,
      onRemove: file => this.onRemove(file),
      beforeUpload: (file) => this.beforeUpload(file),
      onChange: info => this.onChange(info),
    };

    return (
      <div className="upload-file-wrapper">
        <div className="upload-file">
          <Dragger {...props}>
            <div>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">请选择或者拖动文件上传</p>
              <p className="ant-upload-hint">仅支持单文件上传</p>
            </div>
          </Dragger>
        </div>
        {/*
          fileInfo.map((item: any) => (
            <div className="file-info">
              <p className="title">文件信息</p>
              <div className="file-common file-name">
                <span>文件名: {item.response.name}</span>
              </div>
              <div className="file-common file-size">
                <span>文件大小: {item.response.dataCount}</span>
              </div>
              <div className="file-common file-date">
                <span>数据点: {item.response.dataCount}个</span>
              </div>
              <div className="file-common file-time-domain">
                <span>时间区域: {item.response.minDate} - {item.response.minDate}</span>
              </div>
            </div>
          )
        )*/}
      </div>
    );
  }
}