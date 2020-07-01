let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let favoriteSchema = new Schema({
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    usePushEach: true
})

let Favorites = mongoose.model('favorite', favoriteSchema);

module.exports = Favorites;
