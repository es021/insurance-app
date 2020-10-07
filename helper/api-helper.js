const axios = require('axios');
const {
    ServerRoot,
} = require('../config/app-config');
const graphQLUrl = ServerRoot + "/graphql?";
const obj2arg = require("graphql-obj2arg");

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
        // error in query -- getAxiosGraphQLQuery

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

function graphqlQuery(table, { field, any, page, offset, order_by, is_count }) {
    // create param
    let param = {};
    if (is_count) {
        param = {
            _is_count: is_count
        };
        field = ["_count"]
    } else {
        param = {
            _page: page,
            _offset: offset,
            _order_by: order_by,
        };
    }

    // global
    param._any = any;
    
    let paramStr = obj2arg(param, { noOuterBraces: true });
    if (paramStr) {
        paramStr = `( ${paramStr} )`;
    }


    // create query
    let query = `query { ${table} 
    ${paramStr} 
    { ${field.join(" ")} }}`
    console.log(query)
    return graphql(query).then((res) => {
        let d = res.data.data[table];
        let debug = JSON.parse(JSON.stringify(d))
        if (is_count) {
            d = d[0]._count;
            debug = d;
        }
        console.log(debug);
        return d;
    });
}

function graphql(query) {
    var config = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMSIsImlhdCI6MTU4MDgwMzU0Nn0.7Xg49C_W11kxYmGRglX_6w5jJ01CBHcTvu3WkF2BNgc'
        },
        proxy: false,
    };
    return axios.post(graphQLUrl, {
        uuid: 1,
        query: query
    }, config);
}

function graphqlAttr(...dbConfigArr) {
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

function getAxios(requestUrl, params, headers) {
    // return axios.get(requestUrl, JSON.stringify(params), config);
    return axios({
        method: 'get',
        params: params,
        headers: headers,
        proxy: false,
        url: requestUrl
    })
}

function postAxios(requestUrl, params, headers) {
    var config = {
        proxy: false
    };

    if (typeof headers !== "undefined") {
        config.headers = headers;
    }

    return axios.post(requestUrl, JSON.stringify(params), config);
}

function deleteAxios(requestUrl, headers) {
    var config = {
        proxy: false
    };

    if (typeof headers !== "undefined") {
        config.headers = headers;
    }

    return axios.delete(requestUrl, config);
}



//Export functions 
module.exports = {
    // graphqlCount,
    graphqlAttr,
    graphqlQuery,
    graphql,
    deleteAxios,
    postAxios,
    getAxios
};