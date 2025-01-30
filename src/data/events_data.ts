import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events/'
    );
    return response;
  } catch (err) {
    console.error(err);
   
  }
};