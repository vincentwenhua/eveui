function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

if(typeof sessionStorage.getItem("openid") === "undefined" || sessionStorage.getItem("openid") == null) {
	sessionStorage.setItem("openid", findGetParameter("openid"));
}
