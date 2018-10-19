import axios from "axios";

const postUserData = () => {
  // const body = JSON.stringify({
  //   title: "title 3",
  //   author: "author 3"
  // });
  return (
    axios({
      method: "post",
      url: "http://localhost:5656/api/Books/",
      // mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      data: {
        title: "title 3",
        author: "author 3"
      }
    })
      // .then(res => res.json())
      .then(data => console.log(data), err => console.log(err))
  );
};

export default postUserData;
