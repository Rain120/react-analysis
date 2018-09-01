import * as React from 'react';
import UploadFile from 'src/components/UploadFile/UploadFile';
import Platform from 'src/components/Platform/Platform';

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
