const ClientError = require('../../exceptions/ClientError')

class MusicHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postMusicHandler = this.postMusicHandler.bind(this)
    this.getAllMusicsHandler = this.getAllMusicsHandler.bind(this)
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this)
    this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this)
    this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this)
  }

  async postMusicHandler (request, h) {
    try {
      this._validator.validateMusicPayload(request.payload)
      const { title = 'untitled', year, performer, genre, duration } = request.payload

      const songId = await this._service.addMusic({ title, year, performer, genre, duration })

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'error',
        message: 'maaf, terjadi kegagalan pada server kami'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async getAllMusicsHandler () {
    const music = await this._service.getMusics()
    const song = music.map(m => ({
      id: m.id,
      title: m.title,
      performer: m.performer
    }))
    return {
      status: 'success',
      data: {
        song
      }
    }
  }

  async getMusicByIdHandler (request, h) {
    try {
      const { songId } = request.params
      const song = await this._service.getMusicById(songId)

      return {
        status: 'success',
        data: {
          song
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })

        response.code(error.statusCode)
        return response
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'maaf, terjadi kegagalan pada server kami'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async putMusicByIdHandler (request, h) {
    try {
      this._validator.validateMusicPayload(request.payload)
      const { title, year, performer, genre, duration } = request.payload
      const { songId } = request.params

      await this._service.editMusicById(songId, { title, year, performer, genre, duration })

      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async deleteMusicByIdHandler (request, h) {
    try {
      const { songId } = request.params
      await this._service.deleteMusicById(songId)

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = MusicHandler
