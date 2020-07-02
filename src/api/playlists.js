import axios from 'axios';


const getAllPlaylists = () => {
  return axios.get('/api/playlists')
    .then(res => res.data)
    .catch(err => {
      throw err
    });
}

const getSinglePlaylists = (id) => {
  return axios.get(`/api/playlists/${id}`).then(res => res.data);
}

export {
  getAllPlaylists,
  getSinglePlaylists
};