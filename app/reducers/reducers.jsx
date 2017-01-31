var loginReducer = (state = false, action) => {
    switch (action.type) {
        case "LOG_IN":
            return action.payload;
        default:
            return state;
    }
};

module.exports = {
    loginReducer
};
