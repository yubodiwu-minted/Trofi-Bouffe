export var login = (user_id) => {
    return {
        type: "LOG_IN",
        payload: user_id
    };
}
