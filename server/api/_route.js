// only for action that need server side validation

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const initializeAllRoute = function (app, root, passport) {
  // server error in node server no need to be return to client
  // we will just log the error in intercepter

  // only custom legitemate error will be returned in form of string (not object)
  const routeResHandler = (res, response) => {
    if (typeof response !== "object") {
      res.status(400).send(response);
    } else {
      res.send(response);
    }
  };

  // Auth Route ----------------------------------------------------------------
  const {
    AuthAPI
  } = require('./auth-api');
  app.post(root + '/auth/:action', function (req, res, next) {
    var action = req.params.action;

    console.log("action",action)
    console.log("req.body",req.body)
    switch (action) {
      case 'login':
        AuthAPI.login(req.body.email, req.body.password, req).then((response) => {
          routeResHandler(res, response);
        });
        break;

        // case 'password-reset-request':
        //   AuthAPI.password_reset_request(req.body.user_email)
        //     .then((response) => {
        //       routeResHandler(res, response);
        //     });
        //   break;
        // case 'password-reset-old':
        //   AuthAPI.password_reset_old(req.body.new_password, req.body.old_password, req.body.user_id)
        //     .then((response) => {
        //       routeResHandler(res, response);
        //     });
        //   break;
        // case 'password-reset-token':
        //   AuthAPI.password_reset_token(req.body.new_password, req.body.token, req.body.user_id)
        //     .then((response) => {
        //       routeResHandler(res, response);
        //     });
        //   break;
        // case 'register':
        //   AuthAPI.register(req.body.user).then((response) => {
        //     routeResHandler(res, response);
        //   });
        //   break;
        // case 'activate-account':
        //   AuthAPI.activateAccount(req.body.key, req.body.user_id).then((response) => {
        //     routeResHandler(res, response);
        //   });
        //   break;
    }

  });


  //XLS Route ----------------------------------------------------------------
  // when login will get password without slash in local storage,
  // use that password lah.
  // const {
  //   XLSApi
  // } = require('./xls-api');
  // app.get(root + '/xls/:action/:filter/:password/:user_id', function (req, res, next) {
  //   var password = req.params.password;
  //   var user_id = req.params.user_id;
  //   var action = req.params.action;
  //   var filter = req.params.filter;

  //   AuthAPI.checkPasswordWithoutSlash(password, user_id, () => {
  //     XLSApi.export(action, filter).then((response) => {
  //       res.header("Content-Type", "application/vnd.ms-excel; charset=utf-8");
  //       res.header("Content-Disposition", `attachement; filename="${response.filename} - SeedsJobFair.xls"`);
  //       res.send(response.content);
  //     }, (err) => {
  //       res.send(err);
  //     });
  //   }, (err) => {
  //     res.send(err);
  //   });
  // });

  //upload route ----------------------------------------------------------------
  app.post(root + '/upload/:type/:name', function (req, res) {
    var type = req.params.type;
    var fileName = req.params.name;
    //console.log("upload");
    //console.log(type);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //console.log(files);
      // `type` is the name of the <input> field of type `type`
      var pwd = (process.env.PWD) ? process.env.PWD : process.env.INIT_CWD;

      console.log(pwd);
      // get year and month
      // and create if not exist
      var uploadDir = path.join(pwd, `public/upload/${type}`);
      var d = new Date();
      var y = d.getYear() + 1900;
      uploadDir += `/${y}`;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      var m = d.getMonth() + 1;
      uploadDir += `/${m}`;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      //get file ext
      var fileExt = files[type].name.split('.').pop();

      // start create path
      // temp folder
      var old_path = files[type].path;
      // upload dir
      var subpath = `${type}/${y}/${m}/${fileName}_${d.getTime()}.${fileExt}`;
      var new_path = path.join(pwd, `public/upload/`, subpath);
      // public upload url
      var url = subpath;

      //console.log(new_path);
      //console.log(url);

      fs.readFile(old_path, function (err, data) {
        fs.writeFile(new_path, data, function (err) {


          fs.unlink(old_path, function (err) {
            if (err) {
              res.status(500);
              res.json({
                'url': null
              });
            } else {
              res.status(200);
              //console.log(url);
              res.json({
                'url': url
              });
            }
          });
        });
      });


    });
  });

};

module.exports = {
  initializeAllRoute
};
