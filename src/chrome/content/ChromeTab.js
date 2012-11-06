var ChromeTab = {
    init: function() {
        var keyset = document.getElementById("mainKeyset");
        var key = document.createElement("key");
        key.setAttribute("id", "ChromeTab");
        key.setAttribute("key", 'o');
        key.setAttribute("oncommand", "ChromeTab.go();");
        key.setAttribute("modifiers", "accel shift");
        keyset.appendChild(key);
        ChromeTab.chromePath();
    },

    chromePath: function() {
        var xrt = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime);
        if (xrt.OS == "Darwin") {
            return ['/usr/bin/open', '-a', 'Google Chrome'];
        } else {
            return ['google-chrome'];
        }
    },

    go: function() {
        var url = document.location.href;
        var args = ChromeTab.chromePath();
        if (url && args) {
            args.push(window.content.location.href);
            var cmd = args.shift()
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            var process = window.Components.classes['@mozilla.org/process/util;1'].createInstance(Components.interfaces.nsIProcess);
            file.initWithPath(cmd);
            process.init(file)
            process.run(false, args, args.length);
        }
    }
}

window.addEventListener("load", ChromeTab.init, false);
