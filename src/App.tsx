import * as React from 'react';
import UploadFile from './components/UploadFile/UploadFile';
import Platform from './components/Platform/Platform';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <UploadFile />
        <Platform />
      </div>
    );
  }
}

export default App;
