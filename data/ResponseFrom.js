exports.responseFromMessage= (state, message)  => {
    return {
        "state" : state,
        "message" : message
    };
};

exports.responseFromData= (state, message, data)  => {
    return {
        "state" : state,
        "message" : message,
        "data" : data
    };
};