module.exports = {

    'facebookAuth' : {
        'clientID'      : '125720934659467', // your App ID
        'clientSecret'  : '0de63398d4ad53635e1c8f1e115d417e', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '622011282931-2fpnupp6770vcqql6e889v9mk8951bgh.apps.googleusercontent.com',
        'clientSecret'  : '9PNPEHVRYbcC8TEMQJnxpeAN',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};