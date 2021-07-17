const { nanoid } = require('nanoid')
const musics = require('./musics')

const addMusicHandler = (request, h) => {
  const { title = 'untitled', year, performer, genre, duration } = request.payload

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newMusic = {
    id, title, year, performer, genre, duration, insertedAt, updatedAt
  }

  musics.push(newMusic)

  const isSuccess = musics.filter(music => music.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Lagu gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllMusicsHandler = () => ({
  status: 'success',
  data: {
    musics
  }
})

const getMusicByIdHandler = (request, h) => {
  const { songId } = request.params

  const music = musics.filter(music => music.id === songId)[0]

  if (music !== undefined) {
    return {
      status: 'success',
      data: {
        music
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'lagu gagal ditemukan'
  })
  response.code(404)
  return response
}

const editMusicByIdHandler = (request, h) => {
  const { songId } = request.params
  const { title, year, performer, genre, duration } = request.payload
  const updatedAt = new Date().toISOString()

  const index = musics.findIndex(music => music.id === songId)

  if (index !== -1) {
    musics[index] = {
      ...musics[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil diperbaharui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui lagu, Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteMusicByIdHandler = (request, h) => {
  const { songId } = request.params

  const index = musics.findIndex(music => music.id === songId)

  if (index !== -1) {
    musics.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Lagu gagal dihapus, Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addMusicHandler,
  getAllMusicsHandler,
  getMusicByIdHandler,
  editMusicByIdHandler,
  deleteMusicByIdHandler
}
