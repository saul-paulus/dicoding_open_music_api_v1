
const { addMusicHandler, getAllMusicsHandler, getMusicByIdHandler, editMusicByIdHandler, deleteMusicByIdHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/song',
    handler: addMusicHandler
  },
  {
    method: 'GET',
    path: '/song',
    handler: getAllMusicsHandler
  },
  {
    method: 'GET',
    path: '/song/{songId}',
    handler: getMusicByIdHandler
  },
  {
    method: 'PUT',
    path: '/song/{songId}',
    handler: editMusicByIdHandler
  },
  {
    method: 'DELETE',
    path: '/song/{songId}',
    handler: deleteMusicByIdHandler
  }
]

module.exports = routes
