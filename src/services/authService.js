const User = require(`../models/User`)

exports.register = async (username, password, adress) =>{
    
    const user = await User.create({username, password, adress})
}