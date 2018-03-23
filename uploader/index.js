var fs = require('fs'); 
const CID = '202716957156310';
const CSE = '32e218a471c02e8108436952c9d5be3f'
let uktn = 'EAACTn6mYk2QBANuGPiakuxjcVfoKCZCTjOA4yxs1zt6ZAXUhGVlhdPZCIDFufzQPfG7zraugL5OHzEATK2rBpdlnhOjQZB5Mne0MrbXcooavYSH4ultrZAW29m8ZBQZAymEfVVhlYdvKYXJZAYhZCd3aOPnqqn3kyM8flbZCMAXPqpRwaQ5oaxuH7yyhOheFodochlSTrp3xsrRw4oxeqgpYHH'


var requests = require('request')

var base_url = 'graph-video.facebook.com'

if(process.argv.length <= 3)
{
console.log(`usage: ${process.argv[1]} folder pageusername`);
process.exit();

}

var path_uri =  `/v2.12/${process.argv[3]}/videos?access_token=`+uktn

let videos_folder = process.argv[2];
console.log(`scanning directory for mp4 files: ${videos_folder}`);
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
