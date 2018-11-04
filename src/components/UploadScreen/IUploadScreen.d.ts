export interface IUploadScreen {
  allowedFileFormat?: string;
  printcount: number;
  submitDiv: JSX.Element;
  className?: string;
  filesToBeSent: [];
  submitFiles: () => void;
  fileRead: any;
}
export interface IUploadScreenState {
  filesPreview: [];

  imageSource: any;
}
