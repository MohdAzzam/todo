export function get(name) {
    name = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var len = ca.length;
    for (var i = 0; i < len; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1);
        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return '';
}

export function set(name, value, days, sameSite = false, domain = "") {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    sameSite = sameSite ? ';SameSite=None' : '';
    domain = domain === "" ? "" : ";domain=" + domain;
    document.cookie = name + "=" + value + ";" + expires + ";path=/" + sameSite + domain;
}

export function remove(name, domain = "") {
    set(name, '', -90, false, domain);
}

export default { set, get, remove };