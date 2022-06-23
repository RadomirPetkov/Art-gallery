const Publication = require(`../models/Publication`)

exports.createPublication = (publicationData) => Publication.create(publicationData)

exports.getAll = () => Publication.find()

exports.getOne = (publicationId) => Publication.findById(publicationId)

exports.getOneDetailed = (publicationId, model) => Publication.findById(publicationId).populate(model)
