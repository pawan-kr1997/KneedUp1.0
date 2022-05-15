const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        data: {
            national: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            international: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            business: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            sports: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            speeches: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            pressReleases: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            blogs: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            },
            articles: {
                oldState: {
                    type: Array
                },
                currentState: {
                    type: Array
                }
            }

        },
        oldState: {
            type: Array
        },
        currentState: {
            type: Array
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Source', sourceSchema);