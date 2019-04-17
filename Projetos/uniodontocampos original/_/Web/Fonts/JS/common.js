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
        a = obj.getAttribute(at) + ';';
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

var nLoad = parseInt("0");
var fim = false;
var hTO = null;
var hRun = false;
var nSitesLoaded = 0;
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
        $('img').each(function () {
            $(this).attr('alt', $(this).attr('title'));
        });
    });
}
function ValidateForm() {
    var error = false;

    var f = $('.Form *[validate]');

    for (i = 0; i < f.length; i++) {
        if ($(f)[i].value == "") error = true;
    }

    if (!error) return true;

    ShowMessage(2, 'Por favor preencha todos os campos com *', 3000);
    return false;
}

function Zoom(obj) {
    $('body').append('<div class="Zoom"><div><a href="#"><img src="Images/x.png" /></a><img /></div></div>');

    $('.Zoom').click(function () {
        CloseZoom();
    }).children().click(function () {
        event.stopPropagation();
    });
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
            iW = iW * ((wH * 0.8) / iH);
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

function ESCQuit(target) {
    if (event.keyCode == 27) $(target).css('display', 'none');
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

function RoundTo(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
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
function GetUrlValue(VarSearch) {
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for (var i = 0; i < VariableArray.length; i++) {
        var KeyValuePair = VariableArray[i].split('=');
        if (KeyValuePair[0] == VarSearch) {
            return unescape(KeyValuePair[1]);
        }
    }
}