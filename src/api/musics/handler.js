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

      const songId = this._service.addMusic({ title, year, performer, genre, duration })

      console.log(songId)

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
    const musics = this._service.getMusics()
    return {
      status: 'success',
      data: {
        musics
      }
    }
  }

  async getMusicByIdHandler (request, h) {
    try {
      const { songId } = request.params
      const music = this._service.getMusicById(songId)

      return {
        status: 'success',
        data: {
          music
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
      const { songId } = request.params

      await this._service.editMusicById(songId, request.payload)

      return {
        status: 'success',
        message: 'Lagu berhasil diperbaharui'
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
      this._service.deleteMusicById(songId)

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
