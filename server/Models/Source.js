const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const sourceSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        },
        data:{
            posts:[
                {
                    postId: {
                        type: Schema.Types.ObjectId,
                        ref: 'Post',
                        required: true
                    }
                }
            ]
            
        },
        oldState:{
            type: Array,
        },
        currentState:{
            type: Array
        }

    },
    {timestamps: true}
);

module.exports= mongoose.model('Source', sourceSchema);