export interface IUploadScreen {
  allowedFileFormat?: string;
  printcount: number;
  submitDiv: JSX.Element;
  className?: string;
  submitFiles: (file: any) => {};
}
export interface IUploadScreenState {
  filesPreview: [];

  imageSource: any;
}
