var fs = require('fs'); 
const CID = '553626331679955';
const CSE = '8f24927beb8e10cbee7749014f875254'
let uktn = 'EAACEdEose0cBANBCn09qky7g800OOhjruzz6aFZB5mS2SXHzNytbbdXvVtPlXyncIZAhspgwZCRUk7h68tZAvZBlJrZA1lY6TwVG8eTo5mEIZCHRZC68QUbMj0ITGAPqxigpFZCvdDxxBP4CZCE6LHvtuGognB6i5olV8fUbxcomqcH8y1xDriLqvGkUhfwnfBkAfZAynFa6LrQxwZDZD'


var requests = require('request')

var base_url = 'graph-video.facebook.com'
var path_uri =  '/v2.12/webdevelopers101/videos?access_token='+uktn

let videos_folder = '/home/neo/PycharmProjects/asyncio/'
let files = []
let re = /.*.mp4$/
_files = fs.readdirSync(videos_folder);
_files.forEach(file => {
    if (file.match(re))
        files.push(file);
})

var uploadVideo = (videopath) => {
    let formData = {
        source: fs.createReadStream(videopath),
    }
    let url = 'https://' + base_url + path_uri
    
    let res = requests.post({url: url , formData, formData }, (err, res, body) => {
        if (err) {
            console.log ('error:', err)
        } else {
            console.log('post done')
            console.log(body)
        }
    })
}


files.forEach((file) => {
    console.log(`uploading ${file} \n`)
    uploadVideo(videos_folder + '/' +file);
})