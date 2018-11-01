import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import { RaisedButton } from 'material-ui';
import { IUploadScreen, IUploadScreenState } from './IUploadScreen';

// https://medium.com/technoetics/handling-file-upload-in-reactjs-b9b95068f6b
export class UploadScreen extends React.Component<
  IUploadScreen,
  IUploadScreenState
> {
  constructor(props: IUploadScreen) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      printcount: 10,
      imageSource: '',
    };
  }

  handleClick = (e: any) => {
    console.log(this.state.filesToBeSent);
    console.log('event', e);
  };

  onDrop(acceptedFiles: any) {
    const filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      // @ts-ignore
      filesToBeSent.push(acceptedFiles);

      const filesPreview: any = [];
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
      for (const i; i <= filesToBeSent.length; i++) {
        filesPreview.push(
          <div>
            {/* {filesToBeSent[i][0].name}
            <MuiThemeProvider>
              <a href="#">
                <FontIcon
                  className="material-icons customstyle"
                  color={blue500}
                  // @ts-ignore
                  styles={{ top: 10 }}
                >
                  clear
                </FontIcon>
              </a>
            </MuiThemeProvider> */}
          </div>,
        );
      }
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
        <Dropzone
          accept="image/jpeg,image/png"
          className="b--red ba"
          onDrop={files => this.onDrop(files)}
        >
          <img src={this.state.imageSource} />
        </Dropzone>
        <div>{this.state.filesPreview}</div>
        <MuiThemeProvider>
          <RaisedButton
            label="Print Files"
            primary={true}
            style={style}
            onClick={event => this.handleClick(event)}
          />
        </MuiThemeProvider>
        {this.state.filesPreview.map(image => image)}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
