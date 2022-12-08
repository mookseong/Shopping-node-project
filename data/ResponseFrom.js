exports.responseFromMessage= (message)  => {
    return {
        "message" : message
    };
};

exports.responseFromData= (message, data)  => {
    return {
        "message" : message,
        "data" : data
    };
};