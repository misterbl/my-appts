import * as React from 'react';
import Dropzone from 'react-dropzone';
// import { RaisedButton } from 'material-ui';
import { IUploadScreen, IUploadScreenState } from './UploadScreen.d';
import { QUERIES } from 'src/consts';

export class UploadScreen extends React.Component<
  IUploadScreen,
  IUploadScreenState
> {
  constructor(props: IUploadScreen) {
    super(props);
    this.state = {
      filesPreview: [],

      imageSource: '',
    };
  }

  onDrop = async (acceptedFiles: any) => {
    // const { filesToBeSent, printcount } = this.props;
    // if (filesToBeSent.length < printcount) {
    // @ts-ignore
    // await filesToBeSent.push(acceptedFiles);
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (event && event.target && event.target.result) {
        this.props.submitFiles(event.target.result);
      }
    };
    reader.readAsDataURL(file);

    // const reader = new FileReader();
    // reader.addEventListener(
    //   'load',
    //   async () => {
    //     console.log(0);

    //     console.log(reader.result);

    //     this.setState({ imageSource: reader.result });
    //     console.log(1);

    //     await this.props.fileRead.push(reader);
    //     this.props.submitFiles();
    //     console.log(2);
    //   },
    //   false,
    // );
    // const url = URL.createObjectURL(acceptedFiles[0]);
    // console.log('binary', reader.readAsBinaryString(acceptedFiles[0]));

    // // reader.readAsDataURL(acceptedFiles[0]);
    // console.log('reader', reader);
    // console.log('url', url);

    // await this.props.fileRead.push(reader.result);
    // this.props.submitFiles();
    // @ts-ignore
    // for (const i; i <= filesToBeSent.length; i++) {
    //   filesPreview.push(
    //     <div>
    //       {/* {filesToBeSent[i][0].name}
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
    //       </MuiThemeProvider> */}
    //     </div>,
    //   );
    //   }
    //   // @ts-ignore
    //   this.setState({ filesToBeSent, filesPreview });
    // } else {
    //   alert('You have reached the limit of printing files at a time');
    // }
    // }
  };

  render() {
    return (
      <div className={this.props.className}>
        <Dropzone
          style={{}}
          accept={this.props.allowedFileFormat}
          onDrop={files => this.onDrop(files)}
        >
          {this.props.submitDiv}
          <img src={this.state.imageSource} />
        </Dropzone>
      </div>
    );
  }
}
