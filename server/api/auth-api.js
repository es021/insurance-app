import User from '../../model/User';

import jwt from 'jsonwebtoken';
import {
  graphqlQuery
} from '../../helper/api-helper';
import Secret from '../secret/secret';
import bcrypt from 'bcrypt-nodejs';

// const jwt = require('jsonwebtoken');
// const {
//   graphqlQuery,
// } = require('../../helper/api-helper');
// const Secret = require('../secret/secret');
// const bcrypt = require('bcrypt-nodejs');



// ###########################################################
// HELPER

const hashPass = (plainTextPass) => {
  var saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(plainTextPass, salt);
  return hash;
}
// var hash = hashPass("123");
// console.log(hash);

// ###########################################################
// EXPORT

const AuthErr = {
  USER_NOT_EXIST: "USER_NOT_EXIST",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  NOT_BYCRYPT_HASH: "NOT_BYCRYPT_HASH"
  // USER_NOT_EXIST: "User Does Not Exist",
  // INVALID: "Invalid Credentials",
  // NOT_BYCRYPT_HASH: "Stored Password Is Not A Valid Bcrypt Hash"
}

const AuthAPI = {
  login(user_email, password, request) {
    return graphqlQuery(User.Table, {
      is_server: true,
      field: [
        "ID", "email", "password", "role",
        "agent_id", "agent{ first_name last_name phone_number }",
      ],
      param: {
        email: user_email
      }
    }).then((data) => {
      let user = data[0];
      var error = null;
      if (user == null) {
        error = AuthErr.USER_NOT_EXIST
      } else {
        try {
          if (!bcrypt.compareSync(password, user.password)) {
            error = AuthErr.INVALID
          }
        } catch (err) {
          error = AuthErr.NOT_BYCRYPT_HASH
        }
      }
      if (error == null) {
        var token = jwt.sign({
          uuid: user.ID
        }, Secret.JWT_TOKEN_KEY);


        // merge user and agent table into one level
        let toRet = {
          token: token
        }
        for (var k in user) {
          if (typeof user[k] === 'object' && user[k] !== null) {
            for (var j in user[k][0]) {
              toRet[j] = user[k][0][j];
            }
          } else if (k != "password") {
            toRet[k] = user[k];
          }
        }

        console.log(toRet)
        return toRet;
      } else {
        return error;
      }
    });
  }
}

module.exports = {
  AuthErr,
  AuthAPI,
};

