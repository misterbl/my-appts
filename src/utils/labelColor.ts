const labelColor = (input?: string, visible: string = 'moon-gray', invisible: string = 'white') => {
    console.log(input === '');


    return input === '' ? invisible : visible
};
export default labelColor;
