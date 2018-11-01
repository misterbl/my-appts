import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
// import FontIcon from 'material-ui/FontIcon';
// import { blue500 } from 'material-ui/styles/colors';
import { RaisedButton } from 'material-ui';

export class UploadScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      printcount: 10,
    };
  }

  handleClick = (e: any) => {
    // @ts-ignore
    console.log(this.state.filesToBeSent);
    console.log('event', e);
  };

  onDrop(acceptedFiles: any) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    // @ts-ignore
    const filesToBeSent = this.state.filesToBeSent;
    // @ts-ignore
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      // @ts-ignore
      const filesPreview = [];
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          this.setState({ imageSource: reader.result });
        },
        false,
      );
      reader.readAsDataURL(acceptedFiles[0]);
      // @ts-ignore
      // for (const i; i <= filesToBeSent.length; i++) {
      //   filesPreview.push(
      //     <div>
      //       {filesToBeSent[i][0].name}
      //       <MuiThemeProvider>
      //         <a href="#">
      //           <FontIcon
      //             className="material-icons customstyle"
      //             color={blue500}
      //             // @ts-ignore
      //             styles={{ top: 10 }}
      //           >
      //             clear
      //           </FontIcon>
      //         </a>
      //       </MuiThemeProvider>
      //     </div>,
      //   );
      // }
      // @ts-ignore
      this.setState({ filesToBeSent, filesPreview });
    } else {
      alert('You have reached the limit of printing files at a time');
    }
  }

  render() {
    console.log(this);

    return (
      <div className="App">
        <Dropzone onDrop={files => this.onDrop(files)}>
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
        <div>
          // @ts-ignore
          {this.state.filesPreview}
        </div>
        <MuiThemeProvider>
          <RaisedButton
            label="Print Files"
            primary={true}
            style={style}
            onClick={event => this.handleClick(event)}
          />
        </MuiThemeProvider>
        // @ts-ignore
        <img src={this.state.imageSource} />
      </div>
    );
  }
}
const style = {
  margin: 15,
};
