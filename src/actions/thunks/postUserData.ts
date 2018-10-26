// import axios from 'axios';

// const postUserData = () => {
//   console.log('posting');

//   // const body = JSON.stringify({
//   //   title: "title 3",
//   //   author: "author 3"
//   // });
//   return (
//     axios({
//       method: 'post',
//       url: 'http://localhost:5656/api/Books/',
//       // mode: "no-cors",
//       headers: { 'Content-Type': 'application/json' },
//       // data: {
//       //   title: "title 3",
//       //   author: "author 3"
//       // }
//     })
//       // .then(res => res.json())
//       .then(data => console.log(data), err => console.log(err))
//   );
// };

// export default postUserData;

// import Axios from 'axios';

// export const postBooks = (query: any) => async (dispatch: any) => {
//   //   const resourceName = REQUEST.GET_FRP_DATA;
//   try {
//     const response = await Axios.create({
//       baseURL: 'http://localhost:4000/graphql',
//       headers: { 'Content-Type': 'application/graphql' },
//     }).post('', query);
//     if (response && response.status === 404) {
//       throw new Error("couldn't get books");
//     }
//     const json = await response;
//     dispatch(saveBooks(json));
//   } catch (error) {
//     throw new Error("couldn't get books");
//   }
// };
