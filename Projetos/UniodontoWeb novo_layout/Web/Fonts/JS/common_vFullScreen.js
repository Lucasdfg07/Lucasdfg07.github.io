var t = null;
var tc = null;
var nav = new Object;
var moTimeout = null;

nav.msie = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
nav.version = parseFloat(navigator.appVersion.split(';')[1].replace('MSIE', '').trim());

function ShowMessage(type, message, delay, action) {
    $('*').remove('.Message');
    t = null;

    $('body').append('<div class="Message"><div>' + message + '</div></div>');
    HideMessage(delay, action);
}
function HideMessage(delay, action) {
    t = setTimeout("$('*').remove('.Message'); t = null;" + action, delay + 500);
}

function cbCheck(sender, target) {
    $(target + " input[type=checkbox]").each(function (e) {
        $(this)[0].checked = sender.checked;
    });
}

function GetSelected(at, obj, target) {
    var a;
    at = at.toLowerCase();

    if (obj.checked == undefined) {
        obj.each(function (e) {
            a = $(this).attr(at);
            SetSelected(a, $(this)[0].checked, target);
        });
    }
    else {
        a = obj.getAttribute(at) + ';'
        SetSelected(a, obj.checked, target);
    }
}
function SetSelected(at, b, target) {
    var s = $('#' + target).val();

    while (s.indexOf(at) >= 0) s = s.replace(at + ';', '');

    if (b) $('#' + target).val(s + at + ';');
    else $('#' + target).val(s.replace(at + ';', ''));
}

function SortInt(a, b) {
    return a - b;
}

function ShowLoginOpt() {
    lv = $('.LoggedView');
    eval("lv.fade" + (lv.css('display') == 'none' ? 'In' : 'Out') + "(500);");

    event.stopPropagation();
}

var fbTimeout = null;
var fbLastPost = null;

function fbListener() {
    fbItems = $($('#fbXML')[0].contentDocument.body).children('form').children('#fbXML').children('rss').children('channel').children('item');
    lastPub = new Date($(fbItems[0]).children('pubdate')[0].textContent);
    if (fbLastPost && lastPub > fbLastPost || !fbLastPost) {
        fbTarget = $('#Facebook .Feed');
        agora = new Date();

        for (i = fbItems.length - 1; i >= 0; i--) {

            var dt, title, link;

            title = $(fbItems[i]).children('title')[0].textContent;

            if (title != '') {
                dt = new Date($(fbItems[i]).children('pubdate')[0].textContent);
                dt = (agora - dt) / 1000 / 60;
                med = dt < 60 ? 'minuto' : dt < 1440 ? 'hora' : dt < 10080 ? 'dia' : dt < 302400 ? 'semana' : 'algum tempo';
                dt = dt / (med == 'minuto' ? 1 : med == 'hora' ? 60 : med == 'dia' ? 1440 : med == 'semana' ? 10080 : 1);
                dt = parseInt(dt);

                dt = 'há ' + (med == 'algum tempo' ? med : dt + " " + med + (dt > 1 ? 's' : ''));

                link = $(fbItems[i]).children('link')[0].nextSibling.textContent;

                $("<li style='display: none'><h2>" + dt + "</h2><a href='" + link + "' target='_blank'>" + title + "</a></li>").insertBefore(fbTarget.children().first());
                fbTarget.children().first().fadeIn(1000);

                fbLastPost = lastPub;
            }
        }
    }

    fbTimeout = setTimeout("fbListener()", 30000);
}

var nLoad = parseInt("0");
var fim = false;
function StartLoad() {
    $(document).ready(function () {
        //$('*').remove('.Message');
        t = null;
        wH = window.screen.availWidth;
        HideMessage();
        var nLoad = parseInt("0");

        $('input[mask]').each(function (e) {
            if ($(this).attr('mask') == '@') {
                $(this).blur(function () {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if (!filter.test($(this).val()) && $(this).val() != '') {
                        $(this).val('');
                        $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                        $(this).attr('class', $(this).attr('class') + ' Validated');
                        $(this).focus();
                    }
                    else $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                });
            }
            else if ($(this).attr('mask') == 'cpf') {
                $(this).attr('onkeydown', 'return MaskField("999.999.999-99", this);');
                $(this).blur(function () {
                    if (!CpfValidation(this) && $(this).val() != '') {
                        this.value = '';
                        $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                        $(this).attr('class', $(this).attr('class') + ' Validated');
                        $(this).focus();
                    }
                    else $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                });
            }
            else if ($(this).attr('mask') == 'date') {
                $(this).attr('onkeydown', 'return MaskField("99/99/9999", this);');
                $(this).blur(function () {
                    if (!DateValidation(this) && $(this).val() != '') {
                        this.value = '';
                        $(this).attr('class', $(this).attr('class') + ' Validated');
                        $(this).focus();
                    }
                    else $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                });
            }
            else {
                $(this).attr('onkeydown', 'return MaskField("' + $(this).attr('mask') + '", this);');
                if ($(this).attr('mask') == '$') {
                    $(this).css('text-align', 'right');
                    $(this).attr('onkeyup', 'MaskMoney(this);');
                }
            }
        });
        $('a, button, input[type="submit"], input[type="button"]').not($('.btSession')).click(function (e) {
            if ($(this).attr('target') != '_blank' && $(this).attr('onclick') == '') ShowMessage(0, 'carregando...', 999999);
        });

        $('body').css('zoom', (wH >= 1400 ? '100' : wH >= 1200 ? '80' : '70') + '%');
        $('.Menu > a').mouseover(function () {
            $(this).children('div').css('right', '0');
        }).mouseout(function () {
            $(this).children('div').css('right', '100%');
        }).click(function () {
            Link(this);
        });
        $('.Rodape_Menu > a').click(function () {
            Link(this);
        });
        $('.Icones > a').click(function () {
            Link(this);
        });
        $('.Institucional .Next').mouseover(function () {
            $(this).css("opacity", "1");
        }).mouseout(function () {
            $(this).css("opacity", "0.1");
        }).click(function () {
            $(this).css('display', 'none');
            $('.Institucional .Prev').css('display', 'block');
            $('.Institucional .Texto').fadeOut(500, function () {
                $('.Institucional .Foto').fadeIn(500);
            });
        });
        $('.Institucional .Prev').mouseover(function () {
            $(this).css("opacity", "1");
        }).mouseout(function () {
            $(this).css("opacity", "0.1");
        }).click(function () {
            $(this).css('display', 'none');
            $('.Institucional .Next').css('display', 'block');
            $('.Institucional .Foto').fadeOut(500, function () {
                $('.Institucional .Texto').fadeIn(500);
            });
        });
        $('.Cases .Ramos .Up').click(function () {
            document.getElementById('hTagsScroll').value = 0;
            $('.Cases .Ramos > ul').animate(
                {
                    'scrollTop': '-=136px'
                });
            $(this).css('display', 'none');
            $('.Cases .Ramos .Down').css('display', 'block');
        });
        $('.Cases .Ramos .Down').click(function () {
            document.getElementById('hTagsScroll').value = 136;
            $('.Cases .Ramos > ul').animate(
                {
                    'scrollTop': '+=136px'
                });
            $(this).css('display', 'none');
            $('.Cases .Ramos .Up').css('display', 'block');
        });
        $('.Cases .Ramos > ul').scrollTop(document.getElementById('hTagsScroll').value);
        if (document.getElementById('hTagsScroll').value >= 136) {
            $('.Cases .Ramos .Up').css('display', 'block');
            $('.Cases .Ramos .Down').css('display', 'none');
        }
        else {
            $('.Cases .Ramos .Up').css('display', 'none');
            $('.Cases .Ramos .Down').css('display', 'block');
        }
        $('.Cases .List > ul > li > div').mouseover(function () {
            $(this).children('img').removeAttr('grayscale');
            $('.Cases .List > h2').html($(this).children('img').attr('title'));
        }).mouseout(function () {
            $(this).children('img').attr('grayscale', '');
            $('.Cases .List > h2').html('');
        });
        $('.Cases .List > ul').setbanner({
            interval: 0,
            speed: 750,
            btprev: $('.Cases .Prev'),
            btnext: $('.Cases .Next')
        });
        $('.Produtos .Area1 > a, .Produtos .Details a[link="Voltar"]').click(function () {
            ProductDetail($(this).attr('link'), $(this).attr('flag'));
        });
        $('.Produtos .Sites .SitesSamples > div > ul').setbanner({
            interval: 0,
            speed: 500,
            btprev: $('.Produtos .Sites .SitesSamples > div > .Prev'),
            btnext: $('.Produtos .Sites .SitesSamples > div > .Next'),
            wrap: true
        });
        $('.Produtos .ComVisual li > img').load(function () {
            if (!fim) {
                var imgs = $('.Produtos .ComVisual li > img');
                nLoad = parseInt(nLoad) + parseInt("1");
                loaded = nLoad / imgs.length * 100 / 2;
                loaded = RoundTo(loaded, 0);

                var loader = $('.Produtos .ComVisual .Loader');
                loader.children('div').css('width', loaded + '%');
                loader.children('span').html(loaded);


                if (nLoad == imgs.length) {
                    fim = true;
                    var divOffset = $('.Produtos .ComVisual > div').offset().left * -1;
                    $('.Produtos .ComVisual > div').css('left', divOffset + 'px').css('width', (window.screen.availWidth - 10) + 'px');
                    imgs.parent().parent().parent().css('overflow-y', 'auto');

                    var imgW = window.screen.availWidth / 200;
                    imgW = parseInt(imgW < 10 ? imgW.toString().substring(0, 1) : imgW.toString().substring(0, 2));
                    var nCols = window.screen.availWidth / imgW;
                    nCols = parseInt(nCols);

                    $('.Produtos .ComVisual li').each(function () {
                        //$($(this).width($($(this).children()[0]).width()).children()[0]).css('width', '100%');
                        $(this).width(nCols);
                    }).promise().done(function () {

                        var w = 0;
                        var x = 0;
                        var y = 0;

                        /*
                        w += $($(imgs[3]).parent().prev().prev().prev().children()[0]).width();
                        w += $($(imgs[3]).parent().prev().prev().children()[0]).width();
                        w += $($(imgs[3]).parent().prev().children()[0]).width();
                        w = $(imgs[3]).parent().parent().width() - w;
                        $(imgs[3]).width(w);
                        $(imgs[3]).parent().width(w);
                        w = 0;

                        for (i = 4; i < imgs.length; i++) {
                        x = $(imgs[i - 4]).offset().left - $(imgs[i]).offset().left;
                        y = $(imgs[i - 4]).offset().top - $(imgs[i]).offset().top + $(imgs[i - 4]).height();
                        w = $(imgs[i - 4]).width();

                        $(imgs[i]).css({
                        position: 'absolute',
                        top: y + 'px',
                        left: x + 'px',
                        width: w + 'px'
                        });
                        }

                        $(imgs[0]).animate(
                        {
                        'display': 'block'
                        }, 500, function () {
                        var y = 0;

                        for (i = imgs.length / 3 * 2; i < imgs.length; i++) {
                        y = $(imgs[i - 4]).height() + parseInt($(imgs[i - 4]).css('top').replace('px'));

                        $(imgs[i]).css({
                        top: y + 'px'
                        });
                        }

                        loader.children('div').animate(
                        {
                        width: '100%'
                        }, {
                        step: function () {
                        loader.children('span').html(RoundTo(loader.children('div').width() / loader.width() * 100 - 1, 0));
                        },
                        complete: function () {
                        loader.css('display', 'none');
                        imgs.css('opacity', '1');
                        $('.Produtos .ComVisual > div > input')[0].focus();
                        }
                        });
                        });
                        */
                        /*******************************************************************/

                        for (i = 1; i < imgW; i++) {
                            var prevs = "";
                            for (j = 0; j < i; j++) prevs += ".prev()";

                            eval("w += $($(imgs[imgW - 1]).parent()" + prevs + ".children()[0]).width();");
                        }

                        w = $(imgs[imgW - 1]).parent().parent().width() - w;
                        //w -= 10;
                        $(imgs[imgW - 1]).width(w);
                        $(imgs[imgW - 1]).parent().width(w);
                        w = 0;

                        for (i = imgW; i < imgs.length; i++) {
                            x = $(imgs[i - imgW]).offset().left - $(imgs[i]).offset().left;
                            y = $(imgs[i - imgW]).offset().top - $(imgs[i]).offset().top + $(imgs[i - imgW]).height();
                            w = $(imgs[i - imgW]).width();

                            $(imgs[i]).css({
                                position: 'absolute',
                                top: y + 'px',
                                left: x + 'px',
                                width: w + 'px'
                            });
                        }

                        $(imgs[0]).animate(
                        {
                            'display': 'block'
                        }, 500, function () {
                            var y = 0;

                            loader.children('div').animate(
                            {
                                width: '100%'
                            }, {
                                step: function () {
                                    loader.children('span').html(RoundTo(loader.children('div').width() / loader.width() * 100 - 1, 0));
                                },
                                complete: function () {
                                    loader.css('display', 'none');
                                    imgs.css('opacity', '1');
                                    $('.Produtos .ComVisual > div > input')[0].focus();
                                }
                            });
                        });
                    });
                }
            }
        });
        $('.Produtos .ComVisual > div > ul > li > img').click(function () {
            Zoom(this);
        });
        $(window).keydown(function () {
            if ($('.Zoom').css('display') == 'block') {
                if (event.keyCode == '27') CloseZoom();
            }
        });
        $('.Produtos .Area1 > a').mouseover(function () {
            $(this).parent().children('span').html($(this).attr('title'));
        }).mouseout(function () {
            $(this).parent().children('span').html('');
        });
    });
}

function Zoom(obj) {
    $('body').append('<div class="Zoom"><div><a href="#"><img src="Images/x.png" /></a><img /></div></div>');

    $('.Zoom').click(function () {
        CloseZoom();
    }).children().click(function () {
        event.stopPropagation();
    })
    $('.Zoom a').click(function () {
        CloseZoom();
    });

    var url = $(obj).attr('originalurl');
    var el = $(obj).clone();
    el.attr('class', 'ZoomImage');
    el.width($(obj).width());
    el.height($(obj).height());
    el.attr('src', url);

    $(obj).parent().append(el);

    el.load(function () {
        var x = Sys.UI.DomElement.getLocation(obj).x;
        var y = Sys.UI.DomElement.getLocation(obj).y - $(window).scrollTop();
        var wW = window.screen.availWidth;
        var wH = window.screen.availHeight;

        el.css('position', 'fixed');
        el.css('left', x + 'px');
        el.css('top', y + 'px');
        el.css('z-index', '20');

        el.width($(obj).width());
        el.height($(obj).height());

        var iW = el[0].naturalWidth;
        var iH = el[0].naturalHeight;

        if (iH > (wH * 0.9)) {
            iW = iW * ((wH * 0.8) / iH)
            iH = wH * 0.8;
        }

        var posX = (wW - iW) / 2 - 20;
        var posY = (wH - iH) / 2 - 50;

        el.animate(
        {
            width: iW + 'px',
            height: iH + 'px',
            left: posX + 'px',
            top: posY + 'px'
        }, 500, function () {
            $('.Zoom').css('display', 'block');
            $('.Zoom > div').width(el.width()).height(el.height()).css('left', el.css('left')).css('top', el.css('top'));
            $('.Zoom > div > img').attr('src', el.attr('src'));
            $('.Zoom > div > img').load(function () {
                $('.Zoom').css('display', 'none').css('opacity', '1');
                $('.Zoom').fadeIn(500);
            });
        });

        return;
    });
}
function CloseZoom() {
    $('.ZoomImage').remove();
    $('.Zoom').fadeOut(500, function () {
        $('.Zoom').remove();
    });
}
function EndLoad() {
    document.getElementById('PageLoading').style.display = 'none';
    //$('#divContent').css('visibility', 'visible');
}

function ChangePageParam(type, val) {
    document.getElementById('hParamType').value = type;
    document.getElementById('hParamValue').value = val;
}

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

//var at = httpGet('https://www.facebook.com/dialog/oauth?client_id=263217017124901&redirect_uri=https://www.facebook.com/connect/login_success.html&response_type=token');
//var at = httpGet('https://graph.facebook.com/oauth/access_token?client_id=263217017124901&client_secret=af54c3e394607c34b315062ab996b291&grant_type=client_credentials');


function ESCQuit(target) {
    if (event.keyCode == 27) $(target).css('display', 'none');
}

function CheckAll(obj, target) {
    target = document.getElementById(target);
    var f = target.getElementsByTagName('input');

    for (i = 0; i < f.length; i++) {
        var c = f[i];
        if (c.type == "checkbox" && c.id != obj.id) {
            if (!c.checked) {
                c.checked = true;
            }
            else {
                c.checked = false;
            }
        }
    }
}
function Link(url, b) {
    if (b) {
        window.open(url);
    }
    else {
        location = url;
    }
}
/*
function ValidateForm(target) {
    var sErros = "Atenção! Os campos abaixo devem ser preenchidos:\n";
    var iErros = 0;
    for (i = 0; i < arguments.length; i++) {
        var f = document.getElementById(arguments[i])
        if (!f) {
            iErros++;
            sErros += "\n" + arguments[i];
        }
        else if (f.value == "") {
            iErros++;
            sErros += "\n" + f.getAttribute('DBDescription');
            f.className = "FormValidated";
            if (!i) f.focus();
        }
        else if (f.getAttribute("Email") && !checkMail(f)) {
            iErros++;
            sErros += "\nInforme um e-mail válido";
            f.className = "FormValidated";
            if (!i) f.focus();
        }
    }
    if (iErros) {
        alert(sErros);
        return false;
    }
    return true;
}
*/
function GetFocus(target) {
    target = document.getElementById(target);
    if (target != null) target.focus();
}
function ForceSubmit(target) {
    target = document.getElementById(target);
    if (target != null && event.keyCode == 13) {
        target.focus();
        target.click();
    }
}
function PreventSubmit() {
    if (event.keyCode == 13) return false;
    return true;
}
function ShowLoad() {
    target = document.getElementById('UCMessage_pMessage');
    if (target != null) {
        if (target.style.display != 'none') {
            target.style.display = '';
        }
        else {
            target.style.display = 'none';
        }
    }
}
function CheckCPF(obj, img) {
    if (CpfValidation(obj)) $(img).attr('src', 'Images/Icons/Check.png');
    else $(img).attr('src', 'Images/Icons/x.png');
}
function CpfValidation(target) {

    var numcpf = target.value;
    var Ns = numcpf.split('');
    numcpf = '';

    for (i = 0; i < Ns.length; i++) {
        if (!isNaN(Ns[i])) numcpf += Ns[i];
    }

    var Ok = 0;

    if (numcpf != "") {

        if (numcpf == "00000000000" || numcpf == "11111111111") 
        {
            target.value = '';
            return false;
        }

        x = 0;
        soma = 0;
        dig1 = 0;
        dig2 = 0;
        texto = "";
        numcpf1 = "";
        len = numcpf.length; x = len - 1;
        // var numcpf = "12345678909";
        for (var i = 0; i <= len - 3; i++) {
            y = numcpf.substring(i, i + 1);
            soma = soma + (y * x);
            x = x - 1;
            texto = texto + y;
        }
        dig1 = 11 - (soma % 11);
        if (dig1 == 10) dig1 = 0;
        if (dig1 == 11) dig1 = 0;
        numcpf1 = numcpf.substring(0, len - 2) + dig1;
        x = 11; soma = 0;
        for (var i = 0; i <= len - 2; i++) {
            soma = soma + (numcpf1.substring(i, i + 1) * x);
            x = x - 1;
        }
        dig2 = 11 - (soma % 11);
        if (dig2 == 10) dig2 = 0;
        if (dig2 == 11) dig2 = 0;
        //alert ("Digito Verificador : " + dig1 + "" + dig2);
        if ((dig1 + "" + dig2) == numcpf.substring(len, len - 2)) return true;

        target.value = '';
        return false;
    }
    else return true;
}
function AltText(target, text) {
    target.alt = text;
    target.title = text;
    window.status = text;
    if (parent.document) parent.window.status = text;
}
function NoAltText() {
    window.status = "";
}
function MaskField(mask, target) {
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 46) return true;

    if (mask == '9' || mask == '$') {
        if (event.keyCode == 38) {
            target.value = (mask == '9' ? parseInt(target.value) : parseFloat(target.value.replace(',', '.'))) + 1;
            target.value = target.value.replace('.', ',');
            if (parseFloat(target.value) < 0) target.value = 0;
            return false;
        }
        else if (event.keyCode == 40) {
            target.value = (mask == '9' ? parseInt(target.value) : parseFloat(target.value.replace(',', '.'))) - 1;
            target.value = target.value.replace('.', ',');
            if (parseFloat(target.value) < 0) target.value = 0;
            return false;
        }
        else if (event.keyCode == 33) {
            target.value = (mask == '9' ? parseInt(target.value) : parseFloat(target.value.replace(',', '.'))) + 10;
            target.value = target.value.replace('.', ',');
            if (parseFloat(target.value) < 0) target.value = 0;
            return false;
        }
        else if (event.keyCode == 34) {
            target.value = (mask == '9' ? parseInt(target.value) : parseFloat(target.value.replace(',', '.'))) - 10;
            target.value = target.value.replace('.', ',');
            if (parseFloat(target.value) < 0) target.value = 0;
            return false;
        }
    }

    if (event.keyCode == 37 || event.keyCode == 39) return true;

    //Return for Int
    if (mask == '9') {
        if (!isNaN(String.fromCharCode(event.keyCode))) return true;
    }

    //Return for Money
    if (mask == "$") {
        if (!isNaN(String.fromCharCode(event.keyCode))) {
            if (target.value == '') target.value = '0,00';
            target.value = target.value.replace(',', '');
            target.value = parseInt(target.value);

            var l = target.value.length;
            if (l < 2) for (i = 0; i < (2 - l); i++) target.value = '0' + target.value;
            l = target.value.length;
         
            target.value = target.value.substring(0, target.value.length - 1) + ',' + target.value.substring(target.value.length - 1);
         
            return true;
        }
        
        /*
        return true;
        else if (event.keyCode == 188) if (target.value.indexOf(',') < 0) {
            if (target.value.length < 1) target.value = '0';
            return true;
        }
        */
        return false;
    }

    mask = mask.toUpperCase().split('');
    var n = target.value.length;

    //Return for others
    if (target.value.length < mask.length) {
        for (i = n; i < mask.length; i += 0) {
            if (mask[i] != "A" && mask[i] != "L" && mask[i] != "9") {
                target.value += mask[i];
                i++;
                n++;
            }
            else {
                i = mask.length;
            }
        }
        if (mask[n] == "9" && (!isNaN(String.fromCharCode(event.keyCode)))) return true;
        if (mask[n] == "9" && event.keyCode >= 96 && event.keyCode <= 105) return true;
        if (mask[n] == "L" && (IsLetter(String.fromCharCode(event.keyCode).toLowerCase()))) return true;
        if (mask[n] == "A") return true;
    }
    return false;
}
function MaskMoney(target) {
    if (target.value == '') target.value = '0,00';
    target.value = target.value.replace(',', '');
    target.value = parseInt(target.value);

    var l = target.value.length;
    if (l < 3) for (i = 0; i < (3 - l); i++) target.value = '0' + target.value;
    l = target.value.length;

    target.value = target.value.substring(0, target.value.length - 2) + ',' + target.value.substring(target.value.length - 2);
}
function IsLetter(str) {
    var l = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z");
    for (i = 0; i < l.length; i++) {
        if (str == l[i]) return true;
    }
    return false;
}
function CheckByLabel(target, n) {
    target = document.getElementById(target);
    if (n) {
        target.options[n].selected = true;
    }
    else {
        target.checked = true;
    }
}
function CleanForm(target, msg, msgTarget) {
    if (event.keyCode != 9) {
        target = document.getElementById(target);
        target.value = '';

        if (msg) {
            msg = document.getElementById(msg);
            msg.innerText = msgTarget;
            msg.style.display = '';
        }
    }
}
function EditGridRow(DataKey, id) {
    location = 'edit.aspx?' + DataKey + '=' + id;
}
function RoundTo(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
function MoveLeftElement(obj, target, dif) {
    if (obj) {
        var m = Sys.UI.DomElement.getLocation(obj);
        target.style.left = (m.x + dif) + 'px';
    }
    else {
        target.style.left = dif + "px";
    }
}
function MoveTopElement(obj, target, dif) {
    if (obj) {
        var m = Sys.UI.DomElement.getLocation(m);
        target.style.top = (m.y + dif) + 'px';
    }
    else {
        target.style.top = dif + "px";
    }
}
function ChangeTextColor(target, c) {
    target.style.color = c;
}
function ChangeStyleAtt(target, att, value) {
    eval(target.id + ".style." + att + " = '" + value + "'");
}
function GetScrollLeft(target) {
    try {
        target = document.getElementById(target);
        return target.scrollLeft;
    }
    catch (err) {
        return 0;
    }
}
function GetScrollTop(target) {
    try {
        target = document.getElementById(target);
        return target.scrollTop;
    }
    catch (err) {
        return 0;
    }
}
function ScrollTo(target, x, y) {
    try {
        target = document.getElementById(target);
        target.scrollLeft = x;
        target.scrollTop = y;
    }
    catch (err) { }
}
function SetAttribute(target, att, value) {
    try {
        target = document.getElementById(target);
        target.setAttribute(att, value);
    }
    catch (err) { }
}
function FadeIn(target, s, c, t) {
    if (!(typeof target == "object")) target = document.getElementById(target);
    target.style.display = 'block';
    var o = 100 / (s * 1000);

    if (!c) c = 0
    o += c;
    c = o;

    if (o > 99) o = 100;

    target.style.opacity = c / (window.navigator.userAgent.indexOf("Chrome") >= 0 ? 10 : 50);
    target.style.filter = "Alpha(Opacity=" + c + ")";

    if (o == 100) {
        clearTimeout(t);
        return false;
    }

    t = setTimeout("FadeIn('" + target.id + "', " + s + ", " + c + ", " + t + ")", 1);
}
function FadeOut(target, s, c, t) {
    if (!(typeof target == "object")) target = document.getElementById(target);
    var o = 100 / (s * 1000);

    if (!c) c = 100
    c -= o;


    target.style.opacity = c / (window.navigator.userAgent.indexOf("Chrome") >= 0 ? 10 : 50);
    target.style.filter = "Alpha(Opacity=" + c + ")";

    if (c < 1) c = 0;

    if (c == 0) {
        clearTimeout(t);
        target.style.display = 'none';
        return false;
    }

    if (!t) t = setTimeout("FadeOut('" + target.id + "', " + s + ", " + c + ", " + t + ")", 1);
}
function checkMail(mail) {
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (typeof (mail) == "string") {
        if (er.test(mail)) { return true; }
    } else if (typeof (mail) == "object") {
        if (er.test(mail.value)) {
            return true;
        }
    } else {
        return false;
    }
}
function disableSelection(target) {
    if (typeof target.onselectstart != "undefined") //IE route
        target.onselectstart = function () { return false }
    else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
        target.style.MozUserSelect = "none"
    else //All other route (ie: Opera)
        target.onmousedown = function () { return false }
}
function EmptySelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}
function ConfirmAction(msg) {
    if (confirm(msg)) return;

    HideMessage(-1000);
    return false;
}
function CheckCEP(obj, img, rua, bairro, cidade, estado) {
    c = getCEP(obj.value.replace('-', ''));

    if (!c) {
        $(img).attr('src', 'Images/Icons/x.png');
        obj.value = '';
    }
    else {
        $(img).attr('src', 'Images/Icons/Check.png');

        if (rua) $(rua).val(c.logradouro);
        if (bairro) $(bairro).val(c.bairro);
        if (cidade) $(cidade).val(c.localidade);
        if (estado) $(estado).val(c.uf);
    }
}
function getCEP(cep) {
    xmlHttp = null;

    if (window.XMLHttpRequest) xmlHttp = new XMLHttpRequest();
    else xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    var url = "http://cep.correiocontrol.com.br/" + cep + ".json";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    var xmlDocCEP;

    try {
        xmlDocCEP = eval('(' + xmlHttp.responseText + ')');
    }
    catch (err) {
        return false;
    }

    return xmlDocCEP;
}
function LoginAction(a) {
    eval("$('.Form').fade" + (a ? "In" : "Out") + "(500);");
    event.stopPropagation();
    HideMessage();
}
function cancelBubble(e) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
}
function FormValidate(target) {
    error = false;
    $(target + ' *[validate]').each(function () {
        if ($(this).val() == '') {
            $(this).css('background', '#ffefef');   
            if (!error) $(this).focus();
            error = true;
        }
    });

    if (!error) {
        ShowMessage(0, 'carregando...', 9999999);
        return true;
    }
    ShowMessage(2, 'Por favor preencha todos os dados obrigatórios', 3000);
    return false;
}
function DateValidation(target) {
    var d = target.value.split('/');

    var t = Date.parse(d[2] + '-' + d[1] + '-' + d[0]);

    return !isNaN(t);
}