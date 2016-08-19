Melown.isEqual = function(value_, value2_, delta_) {    return (Math.abs(value_ - value2_) < delta_);};Melown.clamp = function(value_, min_, max_) {    if (value_ < min_) value_ = min_;    else if (value_ > max_) value_ = max_;    return value_;};Melown.radians = function(degrees_) {    return degrees_ * Math.PI / 180;};Melown.degrees = function(radians_) {    return (radians_ / Math.PI) * 180;};Melown.mix = function(a, b, c) {    return a + (b - a) * c;};Melown.validateBool = function(value_, defaultValue_) {    if (typeof value_ === "boolean") {        return value_;    } else {        return defaultValue_;    }};Melown.validateNumber = function(value_, minValue, maxValue, defaultValue_) {    if (typeof value_ === "number") {        return Melown.clamp(value_, minValue, maxValue);    } else {        return defaultValue_;    }};Melown.validateString = function(value_, defaultValue_) {    if (typeof value_ === "string") {        return value_;    } else {        return defaultValue_;    }};Melown.padNumber = function(n, width_) {  var z = '0';  if (n < 0) {      n = (-n) + '';      width_--;     //7      return n.length >= width_ ? ("-" + n) : "-" + (new Array(width_ - n.length + 1).join(z) + n);  } else {      n = n + '';      return n.length >= width_ ? n : new Array(width_ - n.length + 1).join(z) + n;  }};Melown.decodeFloat16 = function(binary) {    var exponent = (binary & 0x7C00) >> 10;        fraction = binary & 0x03FF;    return (binary >> 15 ? -1 : 1) * (        exponent ?        (            exponent === 0x1F ?            fraction ? NaN : Infinity :            Math.pow(2, exponent - 15) * (1 + fraction / 0x400)        ) :        6.103515625e-5 * (fraction / 0x400)    );};Melown.simpleFmtObj = (function obj(str, obj) {    return str.replace(/\{([_$a-zA-Z0-9][_$a-zA-Z0-9]*)\}/g, function(s, match) {        return (match in obj ? obj[match] : s);    });});Melown.simpleWikiLinks = (function obj(str_) {    var str2_ = Melown.simpleFmtObj(str_, {"copy":"&copy;", "Y": (new Date().getFullYear())});         return str2_.replace(/\[([^\]]*)\]/g, function(s, match_) {        match_  = match_.trim();        urls_ = match_.split(" ");//, 1);                if (urls_[0].indexOf("//") != -1) {            if (urls_.length > 1) {                return "<a href=" + urls_[0] + ">" + match_.substring(urls_[0].length)+"</a>";            } else {                return "<a href=" + urls_[0] + ">" + urls_[0]+"</a>";            }        }                return match_;    });});Melown.simpleFmtObjOrCall = (function obj(str, obj, call) {    return str.replace(/\{([_$a-zA-Z(-9][_$a-zA-Z(-9]*)\}/g, function(s, match) {        return (match in obj ? obj[match] : call(match));    });});Melown.getABGRFromHexaCode = (function(code_) {    var result_ = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(code_);    return result_ ?        [ parseInt(result_[4], 16),          parseInt(result_[3], 16),          parseInt(result_[2], 16),          parseInt(result_[1], 16)]    : [0,0,0,255];});Melown.stringifyFunction = (function(function_) {    // Stringify the code    return '(' + function_ + ').call(self);';});Melown.loadJSON = function(path_, onLoaded_, onError_, skipParse_, withCredentials_) {    var xhr_ = new XMLHttpRequest();    xhr_.onload  = (function() {        var data_ = xhr_.response;        try {            //var parsedData_ = skipParse_ ? data_ : eval("("+data_+")");            var parsedData_ = skipParse_ ? data_ : JSON.parse(data_);        } catch(e) {            console.log("JSON Parse Error ("+path_+"): " + (e["message"] ? e["message"] : ""));                        if (onError_ != null) {                onError_();            }            return;        }        if (onLoaded_ != null) {            onLoaded_(parsedData_);        }    }).bind(this);    xhr_.onerror  = (function() {        if (onError_ != null) {            onError_();        }    }).bind(this);    xhr_.open('GET',  path_, true);    xhr_.withCredentials = withCredentials_;    xhr_.send("");};Melown.loadBinary = function(path_, onLoaded_, onError_, withCredentials_) {    var xhr_ = new XMLHttpRequest();    xhr_.onreadystatechange = (function (){        switch (xhr_.readyState)        {        case 0 : // UNINITIALIZED        case 1 : // LOADING        case 2 : // LOADED        case 3 : // INTERACTIVE        break;        case 4 : // COMPLETED                if (xhr_.status == 404)                {                    if (onError_ != null) {                        onError_();                    }                    break;                }                var abuffer_ = xhr_.response;                var data_ = new DataView(abuffer_);                if (onLoaded_ != null) {                    onLoaded_(data_);                }          break;          default:            if (onError_ != null) {                onError_();            }            break;          }       }).bind(this);    xhr_.onerror  = (function() {        if (onError_ != null) {            onError_();        }    }).bind(this);    xhr_.open('GET', path_, true);    xhr_.responseType = "arraybuffer";    xhr_.withCredentials = withCredentials_;    xhr_.send("");};window.performance = window.performance || {};performance.now = (function() {  return performance.now       ||         performance.mozNow    ||         performance.msNow     ||         performance.oNow      ||         performance.webkitNow ||         function() { return new Date().getTime(); };})();//Provides requestAnimationFrame in a cross browser way.window.requestAnimFrame = (function() {  return window.requestAnimationFrame ||         window.webkitRequestAnimationFrame ||         window.mozRequestAnimationFrame ||         window.oRequestAnimationFrame ||         window.msRequestAnimationFrame ||         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {           window.setTimeout(callback, 1000/60);         };})();// only implement if no native implementation is availableif (typeof Array.isArray === 'undefined') {  Array.isArray = (function(obj) {    return Object.prototype.toString.call(obj) === '[object Array]';  });}Melown["isEqual"] = Melown.isEqual;Melown["clamp"] = Melown.clamp;Melown["mix"] = Melown.mix;Melown["radians"] = Melown.radians;Melown["degrees"] = Melown.degrees;Melown["loadJSON"] = Melown.loadJSON;Melown["loadBinary"] = Melown.loadBinary;