import AuthHelper from './auth-helper';

const axios = require('axios');
const {
    ServerRoot,
} = require('../config/app-config');
const graphQLUrl = ServerRoot + "/graphql?";
const obj2arg = require("graphql-obj2arg");
const Secret = require('../server/secret/secret');

const getGraphQlErrorMes = (rawMes) => {
    let mes = "";
    let customMes = null

    if (rawMes.indexOf("ER_DUP_ENTRY") >= 0) {
        customMes = "Record Already Exist";
    }

    if (customMes != null) {
        mes += `${customMes}\n\n${rawMes}`;
    } else {
        mes = rawMes;
    }

    return "[Request Failed]\n" + mes;
}

// add errMes in responseObj.response.data
const rejectPromiseError = function (responseObj, errMes) {
    if (errMes !== null) {
        if (typeof responseObj["response"] === "undefined") {
            responseObj["response"] = {};
        }
        responseObj.response["data"] = errMes;

        //maybe log this error in db?
        if (typeof alert !== "undefined") {
            //in browser
            alert(errMes);
        } else {
            // in node server
            console.error(errMes);
        }

        return Promise.reject(responseObj);
    }

    return false;
};

// Add a response interceptor
axios.interceptors.response.use(response => {
    //graphql can return error in response as well
    var retErr = null;
    if (response.config.url == graphQLUrl && response.data.errors) {
        //console.log("error from axios graphQLUrl");
        console.log("Intercept GraphQL Error 1", response)
        retErr = getGraphQlErrorMes(response.data.errors[0].message);
    }

    if (retErr !== null) {
        return rejectPromiseError(response, retErr);
    }

    return response;

}, error => {
    var retErr = null;
    try {
        // error in query -- getRequestGraphQLQuery
        if (error.response.config.url == graphQLUrl) {
            //error.response["data"] = `[GraphQL Error] ${error.response.data.errors[0].message}`;
            let q = null;
            try { q = error.response.config.params.query } catch (err) { }
            console.log("[Intercept GraphQL Error 2]", q);
            retErr = getGraphQlErrorMes(error.response.data.errors[0].message);
        }

    } catch (e) {
        // no connection -- getPHPApiAxios
        //console.log("error from axios catch");
        if (error.code === undefined) {
            retErr = error.message; //network error
        } else {
            // ECONNREFUSED
            retErr = `${error.code} ${error.address}:${error.port}`;
        }

        retErr = `[Server Error] ${retErr}`;
    }

    if (retErr !== null) {
        return rejectPromiseError(error, retErr);
    }

    //console.log("error from axios finish");
    return Promise.reject(error);
});

export function graphqlInsert(table, mainParam) {
    return graphqlMutation(table, "insert", mainParam)
}

export function graphqlUpdate(table, mainParam) {
    return graphqlMutation(table, "update", mainParam)
}

export function graphqlDelete(table, mainParam) {
    return graphqlMutation(table, "delete", mainParam)
}

export function graphqlMutation(table, action, { param, field, is_server } /* <= this is mainParam */) {
    // create param
    let paramObj = {};
    if (param) {
        paramObj = { ...param }
    }

    let paramStr = obj2arg(paramObj, { noOuterBraces: true });
    if (paramStr) {
        paramStr = `( ${paramStr} )`;
    }

    // create query
    let entity = `${action}_${table}`
    let query = `mutation { ${entity} ${paramStr} 
    { ${field.join(" ")} } }`

    return graphql(query, is_server).then((res) => {
        let d = res.data.data[entity];
        let debug = JSON.parse(JSON.stringify(d))
        console.log(debug);
        return d;
    });
}

export function graphqlQuery(table, { is_server, param, field, any, page, offset, order_by, is_count }) {
    // create param
    let paramObj = {};
    if (is_count) {
        paramObj = {
            _is_count: is_count
        };
        field = ["_count"]
    } else {
        paramObj = {
            _page: page,
            _offset: offset,
            _order_by: order_by,
        };
    }

    if (param) {
        paramObj = { ...param }
    }

    // global
    paramObj._any = any;

    let paramStr = obj2arg(paramObj, { noOuterBraces: true });
    if (paramStr) {
        paramStr = `( ${paramStr} )`;
    }


    // create query
    let query = `query { ${table} 
    ${paramStr} 
    { ${field.join(" ")} }}`
    console.log(query)
    return graphql(query, is_server).then((res) => {
        let d = res.data.data[table];
        let debug = JSON.parse(JSON.stringify(d))
        if (is_count) {
            try {
                d = d[0]._count;
            } catch (err) {
                d = 0;
            }
            debug = d;
        }
        console.log(query, debug);
        return d;
    });
}

export function graphql(query, is_server) {
    var config, param, token, uuid;

    if (is_server) {
        token = Secret.SERVER_REQUEST_TOKEN;
        uuid = Secret.SERVER_REQUEST_UUID;
    } else {
        token = AuthHelper.token();
        uuid = AuthHelper.ID();
    }

    config = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        },
        proxy: false,
    };
    param = {
        uuid: uuid,
        query: query
    }
    return axios.post(graphQLUrl, param, config);
}

export function graphqlAttr(...dbConfigArr) {
    let r = "";
    for (var conf of dbConfigArr) {
        for (var k in conf) {
            if (k == "TABLE") {
                continue;
            }

            r += ` ${conf[k]} `
        }
    }

    return r;
}

export function getRequest({ root = ServerRoot, url, param, header }) {
    // return axios.get(requestUrl, JSON.stringify(params), config);

    return axios({
        method: 'get',
        params: param,
        headers: header,
        proxy: false,
        url: root + url
    })
}

export function postRequest({ root = ServerRoot, url, param, header }) {
    var config = {
        proxy: false
    };
    if (typeof header !== "undefined") {
        config.headers = header;
    }
    return axios.post(root + url, param, config);
}
