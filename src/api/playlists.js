import axios from 'axios';


const getAllPlaylists = (page = 1) => {
  return axios.get(`/api/playlists?page=${page}`)
    .then(res => res.data)
    .catch(err => {
      throw err
    });
}

const getSinglePlaylist = (id) => {
  return axios.get(`/api/playlists/${id}`).then(res => res.data);
}

export {
  getAllPlaylists,
  getSinglePlaylist
};