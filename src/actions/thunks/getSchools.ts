import axios from 'axios';

export const getSchools = async (school: string) => {
  // const body = JSON.stringify({
  //   title: "title 3",
  //   author: "author 3"
  // });

  const response = await axios({
    method: 'get',
    url: `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre&q=${school}`,
    // mode: "no-cors",
    headers: { 'Content-Type': 'application/json' },
    // data: {
    //   title: "title 3",
    //   author: "author 3"
    // }
  });
  // .then(res => res.json())
  const data = await response;
  console.log('schools', data);
  return data;
};

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
