const routes = (handler) => [
  {
    method: 'POST',
    path: '/song',
    handler: handler.postMusicHandler
  },
  {
    method: 'GET',
    path: '/song',
    handler: handler.getAllMusicsHandler
  },
  {
    method: 'GET',
    path: '/song/{songId}',
    handler: handler.getMusicByIdHandler
  },
  {
    method: 'PUT',
    path: '/song/{songId}',
    handler: handler.putMusicByIdHandler
  },
  {
    method: 'DELETE',
    path: '/song/{songId}',
    handler: handler.deleteMusicByIdHandler
  }
]

module.exports = routes
