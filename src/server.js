require('dotenv').config()

const Hapi = require('@hapi/hapi')
const musics = require('./api/musics')
const MusicsService = require('./services/inMemory/MusicsServices')
const MusicValidator = require('./validator/music')

const init = async () => {
  const musicsService = new MusicsService()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      validator: MusicValidator
    }
  })

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
