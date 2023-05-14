import { toast } from 'react-toastify';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34148451-f8d7bba54357f32edde6c57ad';

export const getImages = async (value, page) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!response.ok) {
      return toast.error('Something went wrong, please try again later');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
