var keyNavigation = true;
var shortkeys = new Object;

// Save
shortkeys.save = {
    enable: false,
    alt: true,
    ctrl: false,
    shift: false,
    key: "s",
    target: '.Save, .Submit',
    action: 'click()',
    message: 'salvando...'
};
shortkeys.novo = {
    enable: false,
    alt: true,
    ctrl: false,
    shift: false,
    key: "n",
    target: '.ActionButton.Novo',
    action: 'click()'
};
shortkeys.cancel = {
    enable: false,
    alt: true,
    ctrl: false,
    shift: false,
    key: "c",
    target: '.ActionButton.Cancel',
    action: 'click()'
};
shortkeys.reload = {
    enable: true,
    alt: true,
    ctrl: false,
    shift: false,
    key: "r",
    target: '.ReloadPage',
    action: 'click()'
};

var keys = new Object;
keys.backspace = 8;
keys.space = 32;
keys.tab = 9;
keys.enter = 13;
keys.shift = 16;
keys.ctrl = 17;
keys.alt = 18;
keys.pause = 19;
keys.capslock = 20;
keys.esc = 27;
keys.pageUp = 33;
keys.pageDown = 34;
keys.end = 35;
keys.home = 36;
keys.leftArrow = 37;
keys.upArrow = 38;
keys.rightArrow = 39;
keys.downArrow = 40;
keys.insert = 45;
keys.del = 46;
keys.num0 = 48;
keys.num1 = 49;
keys.num2 = 50;
keys.num3 = 51;
keys.num4 = 52;
keys.num5 = 53;
keys.num6 = 54;
keys.num7 = 55;
keys.num8 = 56;
keys.num9 = 57;
keys.a = 65;
keys.b = 66;
keys.c = 67;
keys.d = 68;
keys.e = 69;
keys.f = 70;
keys.g = 71;
keys.h = 72;
keys.i = 73;
keys.j = 74;
keys.k = 75;
keys.l = 76;
keys.m = 77;
keys.n = 78;
keys.o = 79;
keys.p = 80;
keys.q = 81;
keys.r = 82;
keys.s = 83;
keys.t = 84;
keys.u = 85;
keys.v = 86;
keys.w = 87;
keys.x = 88;
keys.y = 89;
keys.z = 90;
keys.leftWindowKey = 91;
keys.rightWindowKey = 92;
keys.selectKey = 93;
keys.numpad0 = 96;
keys.numpad1 = 97;
keys.numpad2 = 98;
keys.numpad3 = 99;
keys.numpad4 = 100;
keys.numpad5 = 101;
keys.numpad6 = 102;
keys.numpad7 = 103;
keys.numpad8 = 104;
keys.numpad9 = 105;
keys.multiply = 106;
keys.add = 107;
keys.subtract = 109;
keys.decimalPoint = 110;
keys.divide = 111;
keys.f1 = 112;
keys.f2 = 113;
keys.f3 = 114;
keys.f4 = 115;
keys.f5 = 116;
keys.f6 = 117;
keys.f7 = 118;
keys.f8 = 119;
keys.f9 = 120;
keys.f10 = 121;
keys.f11 = 122;
keys.f12 = 123;
keys.numLock = 144;
keys.scrollLock = 145;
keys.semiColon = 186;
keys.equalSign = 187;
keys.comma = 188;
keys.dash = 189;
keys.period = 190;
keys.forwardSlash = 191;
keys.graveAccent = 192;
keys.openBracket = 219;
keys.backSlash = 220;
keys.closeBraket = 221;
keys.singleQuote = 222;

function keyFunctions (e) {
    if (keyNavigation) {
        var lc = $('.ListContent ul');
        if (lc.children('li').length > 0) {
            var liSel = lc.children('li.Selected');

            // key Space
            if (event.keyCode == keys.space) {
                if (liSel.length > 0) {
                    try {
                        var cb = liSel.find('input:checkbox')[0];
                        cb.click();
                        e.preventDefault();
                    }
                    catch (err) { }
                }
            }

            // key Enter
            else if (event.keyCode == keys.enter) {
                if (liSel.length > 0) {
                    liSel[0].click();
                    try{
                        liSel.children('a')[0].click();
                    }
                    catch(err){}
                }
            }

            // key Home
            if (event.keyCode == keys.home) {
                lc.children('li').first().addClass(' ');
                if (lc.children('li').first().attr('class').indexOf('Selected') < 0) {
                    lc.children('li').first().addClass('Selected');

                    try{
                        liSel.removeClass('Selected');
                    }
                    catch(err){}
                }
            }

            // key End
            else if (event.keyCode == keys.end) {
                lc.children('li').last().addClass(' ');
                if (lc.children('li').last().attr('class').indexOf('Selected') < 0)
                {
                    lc.children('li').last().addClass('Selected');

                    try{
                        liSel.removeClass('Selected');
                    }
                    catch(err){}
                }
            }
            
            // key Down
            else if (event.keyCode == keys.downArrow) {
                lc.children('li').last().addClass(' ');
                if (lc.children('li').last().attr('class').indexOf('Selected') < 0) {
                    if (liSel.length > 0) {
                        if (liSel.next('li').length > 0) {
                            liSel.next().addClass('Selected');
                            liSel.removeClass('Selected');

                            inScreen(lc.children('li.Selected'));
                            e.preventDefault();
                            //return false;
                        }
                    }
                    else {
                        lc.children('li').first().addClass('Selected');
                        inScreen(lc.children('li.Selected') );

                        e.preventDefault();
                        //return false;
                    }

                    if (event.shiftKey) {
                        try {
                            var liSel = lc.children('li.Selected');
                            var cb = liSel.find('input:checkbox')[0];
                            cb.click();
                            e.preventDefault();
                        }
                        catch (err) { }
                    }
                }
            }

            // key Up
            else if (event.keyCode == keys.upArrow) {
                if (lc.children('li').first().attr('class').indexOf('Selected') < 0) {
                    if (liSel.length > 0) {
                        if (liSel.prev('li').length > 0) {
                            liSel.prev().addClass('Selected');
                            liSel.removeClass('Selected');
                            inScreen(lc.children('li.Selected') );

                            e.preventDefault();
                            //return false;
                        }
                    }
                    else {
                        lc.children('li').first().addClass('Selected');
                        inScreen(lc.children('li.Selected') );

                        e.preventDefault();
                        //return false;
                    }

                    if (event.shiftKey) {
                        try {
                            var liSel = lc.children('li.Selected');
                            var cb = liSel.find('input:checkbox')[0];
                            cb.click();
                            e.preventDefault();
                        }
                        catch (err) { }
                    }
                }
            }

            // key PageDown
            else if (event.keyCode == keys.pageDown) {
                lc.children('li').last().addClass(' ');
                if (lc.children('li').last().attr('class').indexOf('Selected') < 0) {
                    if (liSel.length > 0) {
                        var pd = liSel;
                        var stop = false;
                        max = 10;

                        while(!stop)
                        {
                            if (max > 0)
                            {
                                if (pd.next('li').length > 0)
                                {
                                    pd = pd.next('li');
                                    max--;

                                    if (event.shiftKey) {
                                        try {
                                            var cb = pd.find('input:checkbox')[0];
                                            cb.click();
                                            e.preventDefault();
                                        }
                                        catch (err) { }
                                    }
                                }
                                else
                                    stop = true;
                            }
                            else
                                stop = true;
                        }

                        pd.addClass('Selected');
                        liSel.removeClass('Selected');

                        inScreen(lc.children('li.Selected'));
                        e.preventDefault();
                        //return false;
                    }
                    else {
                        lc.children('li').first().addClass('Selected');
                        inScreen(lc.children('li.Selected') );

                        e.preventDefault();
                        //return false;
                    }
                }
            }

            // key PageUp
            else if (event.keyCode == keys.pageUp) {
                lc.children('li').first().addClass(' ');
                if (lc.children('li').first().attr('class').indexOf('Selected') < 0) {
                    if (liSel.length > 0) {
                        var pd = liSel;
                        var stop = false;
                        max = 10;

                        while(!stop)
                        {
                            if (max > 0)
                            {
                                if (pd.prev('li').length > 0) {
                                    pd = pd.prev('li');
                                    max--;

                                    if (event.shiftKey) {
                                        try {
                                            var cb = pd.find('input:checkbox')[0];
                                            cb.click();
                                            e.preventDefault();
                                        }
                                        catch (err) { }
                                    }
                                }
                                else
                                    stop = true;
                            }
                            else
                                stop = true;
                        }

                        pd.addClass('Selected');
                        liSel.removeClass('Selected');

                        inScreen(lc.children('li.Selected'));
                        e.preventDefault();
                        //return false;
                    }
                    else {
                        lc.children('li').first().addClass('Selected');
                        inScreen(lc.children('li.Selected') );

                        e.preventDefault();
                        //return false;
                    }
                }
            }
        }
    }

    for (prop in shortkeys) {
        var obj = eval('shortkeys.' + prop);
        if (obj.enable) {
            if (obj.alt == event.altKey && obj.ctrl == event.ctrlKey && obj.shift == event.shiftKey && String.fromCharCode(event.keyCode).toLowerCase() == obj.key.toLowerCase()) {
                if (obj.confirm != undefined && obj.confirm != '') {
                    if (confirm(obj.confirm))
                        try {
                            if (obj.message != undefined)
                                ShowMessage(0, obj.message, 9999);
                            eval("$('" + obj.target + ":visible')[0]." + obj.action + ";");
                        }
                        catch (err) { }
                }
                else {
                    try {
                        if (obj.message != undefined)
                            ShowMessage(0, obj.message, 9999);
                        eval("$('" + obj.target + ":visible')[0]." + obj.action + ";");
                    }
                    catch (err) { }
                }
                break;
            }
        }
    }
}