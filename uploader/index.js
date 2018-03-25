var fs = require('fs'); 
const CID = '202716957156310';
const CSE = '32e218a471c02e8108436952c9d5be3f'
let uktn = 'EAACEdEose0cBAGpCADVVC4qgM530SI0jua9oeCiba7aZAU8FUbvZATaZB3fcm7qxdXle4lEC1cJtb6iM0TxloDpFAVOq3IQ5fZC7ZCuwKS9dSbfIJMMZC7oxuNCZBXBezhKNiLERBrhUZB7ya6RBl1xHc7Vr9DBRuUupU55v5hGhDBE3u0OjpLiUezlGaz8WgOWkUDpJJnHGtgZDZD'


var requests = require('request')
var base_url = 'graph-video.facebook.com'
var graphUrl = 'graph.facebook.com'

let pageId, videoFolder, graphApiVersion;

if(process.argv.length <= 3)
{
    console.log(`usage: ${process.argv[1]} folder pageusername`);
    process.exit();
} else {

     pageId  =  process.argv[3];
     videoFolder = process.argv[2];
     graphApiVersion = '/v2.12/'
}

var path_uri =  `/v2.12/${pageId}/videos?access_token=`+uktn

let videos_folder = videoFolder;
console.log(`scanning directory for mp4 files: ${videos_folder}`);
let files = []
let re = /.*.mp4$/
_files = fs.readdirSync(videos_folder);
_files.forEach(file => {
    if (file.match(re))
        files.push(file);
})

var uploadVideo = (videopath, title) => {
    let formData = {
        source: fs.createReadStream(videopath)
    }
    let url = 'https://' + base_url + path_uri
    
    let res = requests.post({'url': url , 'formData': formData }, (err, res, body) => {
        if (err) {
            console.log ('error:', err)
        } else {
            
            console.log('Video upload: ', body);
            uploadMessagePost(JSON.parse(body).id, 'LOL, This is funny, ' + title);
            
            
        }
    })
}


let uploadMessagePost = (video_id, title) => {
    let postUrl = `https://${graphUrl}${graphApiVersion}${pageId}/feed?access_token=`+uktn
    console.log(postUrl)
    let genericMessage = ' | LOL, This is halarious. Its funny.'
    let postData = {
        message: title + genericMessage,
        object_id: video_id
    }
    console.log(title);
    console.log(video_id);
    console.log(postData);

    requests.post({url: postUrl, 'formData': postData}, (postErr, postRes, postBody) => {
        if (postErr) {
            console.log('Post error:', postErr);
        } else {
            console.log('Posted success:', postBody)
        }
    });
}



files.forEach((file) => {
    console.log(`uploading ${file} \n`)
    uploadVideo(videos_folder + '/' +file, file.split('.')[0]);
})

