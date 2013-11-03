var ChromeTab = {
    keys: {
        'ChromeTab': {
            'key': 'o',
            'oncommand': 'ChromeTab.go();',
            'modifiers': 'accel shift',
        },
        'ChromeTabIncognito': {
            'key': 'u',
            'oncommand': 'ChromeTab.incognito();',
            'modifiers': 'accel shift',
        },
    },

    init: function() {
        var keyset = document.getElementById("mainKeyset");
        for (var id in this.keys) {
            var obj = this.keys[id];
            var key = document.createElement("key");
            key.setAttribute("id", id);
            key.setAttribute("key", obj['key']);
            key.setAttribute("oncommand", obj['oncommand']);
            key.setAttribute("modifiers", obj['modifiers']);
            keyset.appendChild(key);
        }
    },

    chromePath: function(url, incognito) {
        var xrt = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime);
        if (xrt.OS == "Darwin") {
            args = ['/usr/bin/open', '-a', 'Google Chrome', url];
            if (incognito) {
                args = args.concat(['--args', '--incognito'])
            }
        } else {
            args = ['google-chrome', url];
            if (incognito) {
                args.push('--incognito');
            }
        }
        return args
    },

    go: function(incognito) {
        var url = gBrowser.contentDocument.location.href;
        if (url) {
            var args = ChromeTab.chromePath(url, incognito);
            var cmd = args.shift()
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            var process = window.Components.classes['@mozilla.org/process/util;1'].createInstance(Components.interfaces.nsIProcess);
            file.initWithPath(cmd);
            process.init(file)
            process.run(false, args, args.length);
        }
    },

    incognito: function() {
        ChromeTab.go(true);
    },
}

window.addEventListener("load", ChromeTab.init(), false);
