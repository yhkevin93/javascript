/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//上传文件
module.exports = {
	index: function(req, res) {

		res.writeHead(200, {
			'content-type': 'text/html'
		});
		res.end(
			'<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">' +
			'<input type="text" name="title"><br>' +
			'<input type="file" name="avatar" multiple="multiple"><br>' +
			'<input type="submit" value="Upload">' +
			'</form>'
		)
	},
//	upload: function(req, res) {
//		req.file('data').upload({
//				// 上传限制
//				maxBytes: 100000000
//		},
//			function(err, files) {
//				if(err){
//					return res.serverError(err);
//}
//				console.log(files.length + ' file(s) uploaded successfully!');
//				res.send(200, 'success');
//				//		return res.json({
//				//			message: files.length + ' file(s) uploaded successfully!',
//				//			files: files
//				//		});
//			});
//	}
	
	upload: function (req, res) {

  req.file('data').upload({
    // don't allow the total upload size to exceed ~100MB
    maxBytes: 100000000
  },function whenDone(err, files) {
    if (err) {
      return res.negotiate(err);
    }

    	console.log(files.length + ' file(s) uploaded successfully!');
			res.send(200, files[0].fd);

    // If no files were uploaded, respond with an error.
    if (files.length === 0){
      return res.badRequest('No file was uploaded');
    }
    
   var http = require('util').format('http://192.168.0.100:1337/user/avatar/img')
   console.log(http)

// Save the "fd" and the url where the avatar for a user can be accessed
//  User.update(req.session.me, {
//
//    // Generate a unique URL where the avatar can be downloaded.
//    avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),
//
//    // Grab the first file and use it's `fd` (file descriptor)
//    avatarFd: files[0].fd
//  })
//  .exec(function (err){
//    if (err) return res.negotiate(err);
//    return res.ok();
//  });
  });
}
	
	
};

