export default (str) => {
    str = str[0].toUpperCase() + str.slice(1);

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "-" || str[i] === " " && i !== str.length - 1) {
            str = str.slice(0, i + 1) + str[i + 1].toUpperCase() + str.slice(i + 2);
        }
    }

    return str;
}
