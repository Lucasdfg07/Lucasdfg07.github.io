var t = null;
var tc = null;
var nav = new Object;
var moTimeout = null;
var tComplet = null;

nav.msie = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
nav.version = parseFloat(navigator.appVersion.split(';')[1].replace('MSIE', '').trim());
var _ServerUrlAddress = "http://uniodontocampos.com.br/";

var formEditing;
var nonEditingKeyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 46]

function IsNonEditingKey(e) {
    if (isNaN(e)) e = e.keyCode;
    return nonEditingKeyCodes.indexOf(e) >= 0;
}
function ShowMessage(type, message, delay, action) {
    return;
    EndMessage();

    $('body').append('<div class="Message"><div>' + message + '</div></div>');
    HideMessage(delay, action);
}
function HideMessage(delay, action) {
    if (!delay) delay = 0;
    if (delay > 5000) delay = 5000;
    if (!action) action = '';

    t = setTimeout("EndMessage(); " + action, delay);
}
function EndMessage() {
    t = setTimeout('', 1);
    window.clearTimeout(t);
    window.clearInterval(t);
    t = null;
    $('*').remove('.Message');
}

function cbCheck(sender, target, attr, dest) {
    $(target).find("input[type=checkbox]").not($(sender)).each(function (e) {
        $(this)[0].checked = !$(this)[0].checked
        if (attr) SetSelected($(this).attr(attr), $(this)[0].checked, dest);
    });
}
function cbCheckDirect(target, attr, dest, action) {
    $(target).find("input[type=checkbox]").each(function (e) {
        $(this)[0].checked = action;
        //if (attr) SetSelected($(this).attr(attr), action, dest);
        $(this).trigger('change');
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
function SetSelected(at, b, target, noSum) {
    at = at + ';';
    var s = $('#' + target).val().split(';');
    var list = new Array();

    for (i = 0; i < s.length; i++)
        if (s[i])
            list.push(s[i] + ';');

    if (b) {
        if (list.indexOf(at) < 0)
            list.push(at);
    }
    else {
        if (list.indexOf(at) >= 0)
            list.splice(list.indexOf(at), 1);
    }

    $('#' + target).val('');
    for (i = 0; i < list.length; i++)
        $('#' + target).val($('#' + target).val() + list[i]);

    if (!noSum) {
        try {
            var c = $('#' + target).val().split(';').length - 1;

            $('.SelectedCount').html(!c ? '' : 'Registros selecionados: ' + c);

            SumList(c);
        }
        catch (err) { }
    }
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
        //HideMessage();
        //$('*').remove('.Message');
        //t = null;
        wH = window.screen.availWidth
        var nLoad = parseInt("0");

        $('input[mask]').each(function (e) {
            if ($(this).attr('mask') == '@') {
                $(this).blur(function () {
                    if (this.value != '') {
                        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                        if (!filter.test($(this).val()) && $(this).val() != '') {
                            $(this).val('');
                            if ($(this).attr('icon') != '') $(this).next().attr('src', _ServerUrlAddress + 'Images/icons/circleerror.png');
                        }
                        else if ($(this).attr('icon') != '') $(this).next().attr('src', _ServerUrlAddress + 'Images/icons/circlecheck.png');
                    }
                });
            }
            else if ($(this).attr('mask') == 'cpf') {
                Watermark($(this), '999.999.999-99');
                $(this).attr('onkeydown', 'return MaskField("999.999.999-99", this);');
                $(this).blur(function () {
                    if (this.value != '') {
                        if (CpfValidation(this) && $(this).val() != '') {
                            if ($(this).attr('icon') != '') $(this).next().attr('src', _ServerUrlAddress + 'Images/icons/circlecheck.png');
                        }
                        else {
                            this.value = '';
                            $(this).attr('watermark', '1');
                            if ($(this).attr('icon') != '') $(this).next().attr('src', _ServerUrlAddress + 'Images/icons/circleerror.png');
                        }
                    }
                });
                $(this).keyup(function () {
                    if (!IsNonEditingKey(event))
                        if (this.value.length >= 14) {
                            try {
                                $(this).nextAll(':input')[0].focus();
                            }
                            catch (err) {
                                $(this).parent().nextAll(':input')[0].focus();
                            }
                            finally { }
                        }
                });
            }
            else if ($(this).attr('mask') == 'date') {
                Watermark($(this), '99/99/9999');
                $(this).attr('onkeydown', 'return MaskField("99/99/9999", this);');
                $(this).blur(function () {
                    if (this.value != '') {
                        if (!DateValidation(this) && $(this).val() != '') {
                            this.value = '';
                            $(this).attr('watermark', '1');
                            $(this).attr('class', $(this).attr('class') + ' Validated');
                            //$(this).focus();
                        }
                        else $(this).attr('class', ($(this).attr('class').replace('Validated', '')).trim());
                    }
                });
                $(this).keyup(function () {
                    if (!IsNonEditingKey(event)) {
                        if (this.value.length >= 10) {
                            try {
                                $(this).nextAll(':input')[0].focus();
                            }
                            catch (err) {
                                $(this).parent().nextAll(':input')[0].focus();
                            }
                            finally { }
                        }
                    }
                });
            }
            else {
                $(this).attr('onkeydown', 'return MaskField("' + $(this).attr('mask') + '", this);');
                if ($(this).attr('mask') == '$') {
                    $(this).css('text-align', 'right');
                    $(this).attr('onkeyup', 'MaskMoney(this);');
                }
                else if ($(this).attr('mask') == 'decimal') {
                    $(this).css('text-align', 'right');
                    $(this).attr('onkeyup', 'MaskDecimal(this);');
                }
                else {
                    Watermark($(this), $(this).attr('mask'));
                    $(this).keyup(function () {
                        if (!IsNonEditingKey(event))
                            if (this.value.length >= $(this).attr('mask').length) {
                                try {
                                    $(this).nextAll(':input')[0].focus();
                                }
                                catch (err) {
                                    $(this).parent().nextAll(':input')[0].focus();
                                }
                                finally { }
                            }
                    });
                }
            }
        });
        $('img').each(function () {
            $(this).attr('alt', $(this).attr('title'));
        });
    });
    $(window).load(function () {
        HideMessage();
    });
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
    else return false;
}

function MaskField(mask, target) {
    if (IsNonEditingKey(event)) return true;

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
        if (!isNaN(String.fromCharCode(event.keyCode)) || (event.keyCode >= 96 && event.keyCode <= 105)) return true;
    }

    //Return for Money
    if (mask == "$") {
        if (!isNaN(String.fromCharCode(event.keyCode)) || (event.keyCode >= 96 && event.keyCode <= 105)) {
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
    else if (mask == "decimal") {
        if (!isNaN(String.fromCharCode(event.keyCode)) || ( event.keyCode >= 96 && event.keyCode <= 105 )) {
            if (target.value == '') target.value = '0,0000';
            target.value = target.value.replace(',', '');
            target.value = parseInt(target.value);

            var l = target.value.length;
            if (l < 4) for (i = 0; i < (4 - l); i++) target.value = '0' + target.value;
            l = target.value.length;

            target.value = target.value.substring(0, target.value.length - 3) + ',' + target.value.substring(target.value.length - 3);

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
    if (IsNonEditingKey(event)) return;

    if (target.value == '') target.value = '0,00';
    target.value = target.value.replace(',', '');
    target.value = parseInt(target.value);

    var l = target.value.length;
    if (l < 3) for (i = 0; i < (3 - l); i++) target.value = '0' + target.value;
    l = target.value.length;

    target.value = target.value.substring(0, target.value.length - 2) + ',' + target.value.substring(target.value.length - 2);
}
function MaskDecimal(target) {
    if (target.value == '') target.value = '0,0000';
    target.value = target.value.replace(',', '');
    target.value = parseInt(target.value);

    var l = target.value.length;
    if (l < 5) for (i = 0; i < (5 - l); i++) target.value = '0' + target.value;
    l = target.value.length;

    target.value = target.value.substring(0, target.value.length - 4) + ',' + target.value.substring(target.value.length - 4);
}
function IsLetter(str) {
    var l = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z");
    for (i = 0; i < l.length; i++) {
        if (str == l[i]) return true;
    }
    return false;
}

function RoundTo(num, dec) {
    num = parseFloat(num.toString().replace(',', '.'));

    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function ForceDecimals(num, dec) {
    var n = num.toString();
    n = n.replace('.', ',');

    if (n.indexOf(',') < 0) n += ',';

    var l = n.substring(n.indexOf(',') + 1).length;

    while (l < dec) {
        n += "0";
        l++;
    }

    return n;
}

function ConfirmAction(msg) {
    if (confirm(msg)) return;

    HideMessage(-1000);
    return false;
}
function CheckCEP(obj, img, rua, bairro, cidade, estado, bt) {
    if (obj.value != '') {
        c = getCEP(obj.value.replace('-', ''));

        if (!c) {
            $(img).attr('src', _ServerUrlAddress + 'Images/Icons/circleerror.png');
            obj.value = '';
        }
        else {
            $(img).attr('src', _ServerUrlAddress + 'Images/Icons/circlecheck.png');

            if (rua) $(rua).val(c.logradouro);
            if (bairro) $(bairro).val(c.bairro);
            if (cidade) $(cidade).val(c.localidade);
            if (estado) $(estado).val(c.uf);
            if (bt) bt[0].click();
        }
    }
}
function getCEP(cep) {
    ShowMessage(0, 'buscando endereço...', 9999);

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
        HideMessage();
        return false;
    }

    HideMessage();
    return xmlDocCEP;
}
function getData(src, idreg, loader) {
    if (loader) {
        $(loader).attr('originalurl', $(loader)[0].src);
        $(loader)[0].src = _ServerUrlAddress + 'Images/circleloading.gif';
    }
    
    xmlHttp = null;

    if (window.XMLHttpRequest) xmlHttp = new XMLHttpRequest();
    else xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (idreg == undefined)
        idreg = '';

    while (idreg.indexOf(' ') >= 0)
        idreg = idreg.replace(' ', '%20');

    var url = _ServerUrlAddress + "Restrito/json/" + src + idreg;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    var xmlDocData;

    try {
        xmlDocData = eval('(' + xmlHttp.responseText + ')');
    }
    catch (err) {
        HideMessage();
        return false;
    }

    if (loader) {
        $(loader)[0].src = $(loader).attr('originalurl');
        $(loader).removeAttr('originalurl');
    }

    return xmlDocData;
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

    return false;
}
function ValidadeForm(obj) {
    var error = false;
    var target = $(obj).closest('.Form').find('*[validate]');

    for (i = 0; i < target.length; i++) {
        try {
            if ($(target[i]).attr('class').indexOf('DropDown') >= 0) {
                if ($(target[i]).prev().val().length < 1) {
                    error = true;
                    $(target[i]).attr('class', $(target[i]).attr('class') + ' Validated');
                }
            }
        }
        catch (err) { }
        
        if (target[i].value == '') {
            if ($(target[i]).attr('validategroup') != undefined) {
                var c = false;
                var g = $(obj).closest('.Form').find('*[validategroup="' + $(target[i]).attr('validategroup') + '"]');
                for (j = 0; j < g.length; j++) {
                    if (c) {
                        while ($(g[j]).attr('class').indexOf('Validated') >= 0) $(g[j]).attr('class', $(g[j]).attr('class').replace('Validated', ''));
                        continue;
                    }
                    if (g[j].value != '') {
                        j = -1;
                        c = true;
                    }
                }
                if (c) continue;
            }

            if (!error) target[i].focus();
            error = true;
            $(target[i]).attr('class', $(target[i]).attr('class') + ' Validated');
        }
        else {
            try {
                while ($(target[i]).attr('class').indexOf('Validated') >= 0) $(target[i]).attr('class', $(target[i]).attr('class').replace('Validated', ''));
            }
            catch (err)
            { }
        }
    }

    if (error) {
        if ($(obj).children('img').length > 0) {
            $($(obj).children('img')[0]).attr('src', $($(obj).children('img')[0]).attr('originalurl'));
        }
        ShowMessage(0, 'Por favor verifique os campos destacados.', 3000);
        return false;
    }
}
function ConfirmPassword(obj, target) {
    if (obj[0].value != '') {
        if (obj[0].value == target[0].value) {
            obj.next().attr('src', _ServerUrlAddress + 'Images/Icons/circlecheck.png');
            return;
        }
    }
    obj[0].value = '';
    target[0].value = '';
    obj.next().attr('src', _ServerUrlAddress + 'Images/Icons/circleerror.png');
}
function FileName(obj) {
    return obj.val().substring(obj.val().lastIndexOf('\\') + 1, 100);
}
function ChangeContent(obj) {
    $(document).ready(function () {
        var c = obj.attr('content')

        $('h3').attr('class', '').children('img').remove();
        obj.attr('class', 'Ativo').html($('h3.Ativo').html() + '<img>');
    });
}
function ForceSubmit(target) {
    if (event.keyCode == 13) {
        target[0].click();
    }
}
function DDLGroups(target) {
    var groups = new Array();
    var groupsLabels = new Array();

    for (i = 0; i < target.children('option').length; i++) {
        var o = $(target.children('option')[i]);
        var gr = o.attr('group');
        var grLabel = o.attr('groupLabel');
        if (groups.indexOf(gr) >= 0) continue;

        if (gr != undefined && gr != "") {
            groups.push(gr);
            groupsLabels.push(grLabel);
            lastGroup = gr;
        }
    }

    for (i = 0; i < groups.length; i++) {
        target.find('option[group^="' + groups[i] + '"], option[group="' + groups[i] + '"]').wrapAll("<optgroup label='" + groups[i] + " - " + groupsLabels[i] + "'>");
    }

    target.find('option[analitico="0"], option[analitico="false"], option[analitico="False"]').remove();

    $('select option').css('font-size', '6px');
}

function isDate(dateStr) {

    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var matchArray = dateStr.match(datePat); // is the format ok?

    if (matchArray == null)  return false;

    day = matchArray[1];
    month = matchArray[3]; // p@rse date into variables
    year = matchArray[5];

    if (month < 1 || month > 12) { // check month range
        alert("Month must be between 1 and 12.");
        return false;
    }

    if (day < 1 || day > 31) {
        alert("Day must be between 1 and 31.");
        return false;
    }

    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        alert("Month " + month + " doesn`t have 31 days!")
        return false;
    }

    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            alert("February " + year + " doesn`t have " + day + " days!");
            return false;
        }
    }
    return true; // date is valid
}
function isFunctionKey() {
    if ((57 >= event.keyCode && event.keyCode >= 48)
        || (105 >= event.keyCode && event.keyCode >= 96)
        || (90 >= event.keyCode && event.keyCode >= 65)
        || (40 >= event.keyCode && event.keyCode >= 37)
        || (event.keyCode == 8) || (event.keyCode == 46)
        || (event.keyCode == 13) || (event.keyCode == 32)) {
        return false;
    }
    return true;
}
function DisableControls(target) {
    try {
        $(target).find('a, input, textarea, select, button').not($('li *, .List *, .ListContent *, .Busca *, *[keep]')).attr('disabled', 'disabled');
        $(target).find('a, button').not($('li *, .List *, .ListContent *, .Busca *, *[keep]')).remove();
    }
    catch (err)
    { }
}
function AutoComplet(obj, target, k) {
    obj = $(obj);
    if (!k) k = event.keyCode;

    if (!IsNonEditingKey(k) || k == keys.del || k == keys.backspace) {
        if (obj.val().length >= 3) {
            var list;

            eval("list = getData(erp." + target + ", obj.val())." + target);

            $('.AutoComplet').remove();

            if (list.length > 0) {
                var h = "<div class='AutoComplet'><ul>";

                for (i = 0; i < list.length; i++) {
                    h += "<li>" + list[i] + "</li>";
                }

                h += "</ul></div>";

                obj.after(h);

                $('.AutoComplet').css({
                    top: obj.position().top + obj.height() + 1,
                    left: obj.position().left,
                    width: obj.width()
                });

                $('.AutoComplet li').each(function () {
                    $(this).click(function () {
                        obj.val($(this).html());
                        $('.AutoComplet').remove();
                        obj.focus();
                    });
                });
            }
        }
    }

    try {
        obj.unbind('keydown');
        obj.keydown(function (e) {
            ac = $('.AutoComplet');
            if (event.keyCode == keys.downArrow) {
                liSelected = ac.find('li.Selected');

                ac.find('li').removeAttr('class');

                if (liSelected.length < 1)
                    ac.find('li:first-child').attr('class', 'Selected');
                else
                    liSelected.next().attr('class', 'Selected');

                obj.focus();

                e.preventDefault();
            }
            else if (event.keyCode == keys.upArrow) {
                liSelected = ac.find('li.Selected');

                ac.find('li').removeAttr('class');

                if (liSelected.length < 1)
                    ac.find('li:first-child').attr('class', 'Selected');
                else
                    liSelected.prev().attr('class', 'Selected');

                obj.focus();

                e.preventDefault();
            }
            else if (event.keyCode == keys.tab) {
                if ($('.AutoComplet').length < 1) {
                    obj.blur()
                    return;
                }

                liSelected = ac.find('li.Selected');
                if (liSelected.length > 0)
                    obj.val(liSelected.html());
                $('.AutoComplet').remove();

                obj.unbind('keydown');
                obj.focus();
                e.preventDefault();
            }
        });

        $('.MasterMain *').not(obj).not($('.AutoComplet')).click(function () {
            try {
                $('.AutoComplet').remove();
            }
            catch (err) { }
        });

        if (e == keys.esc) {
            try {
                $('.AutoComplet').remove();
            }
            catch (err) { }
        }
    }
    catch (err) { }
}
function DisableToLoad(target) {
    target.attr('disabled', 'disabled');
    target.load(function () {
        $(this).removeAttr('disabled');
    });
}
function DateValidation(target) {
    var d = target.value.split('/');

    var t = Date.parse(d[2] + '-' + d[1] + '-' + d[0]);

    return !isNaN(t);
}
function Watermark(obj, text) {
    /*
    var mask = text;

    while (mask.indexOf('9') >= 0) mask = mask.replace('9', '_');
    while (mask.indexOf('A') >= 0) mask = mask.replace('A', '_');
    while (mask.indexOf('L') >= 0) mask = mask.replace('L', '_');

    obj.before('<div class="InputContainer" id="' + obj.attr('id') + '_Container"></div>');
    obj.appendTo('#' + obj.attr('id') + '_Container');
    obj.after('<div class="Watermark" id="' + obj.attr('id') + '_Watermark">' + mask + '</div>');

    var target = $('#' + obj.attr('id') + '_Watermark');

    target.ready(function (e) {
        if (obj.val() == '')
            target.css('display', 'block');
        else
            target.css('display', 'none');
    }).focus(function (e) {
        obj[0].focus();
    }).click(function (e) {
        obj[0].focus();
    });

    obj.focus(function (e) {
        target.css('display', 'none');
    }).blur(function (e) {
        if (obj.val() == '')
            target.css('display', 'block');
        else
            target.css('display', 'none');
    });
    */
}
$.UrlExists = function (url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }
    catch (err) {
        return false;
    }

    return false;
}
function IconPath(ext) {
    ext = ext.replace(".", "");

    switch (ext) {
        case "avi":
        case "wmv":
        case "mp4":
        case "flv":
        case "mkv":
            return "avi";

        case "dll":
        case "exe":
        case "msi":
            return "dll";

        case "doc":
        case "docx":
        case "docm":
            return "doc";

        case "htm":
        case "html":
            return "html";

        case "jpg":
        case "png":
        case "jpeg":
        case "gif":
        case "bmp":
        case "ico":
            return "jpg";

        case "mp3":
        case "wav":
            return "mp3";

        case "mpp":
        case "mpt":
        case "mpd":
            return "mpp";

        case "pdf": return "pdf";

        case "ppt":
        case "pptx":
        case "pps":
        case "ppsx":
            return "ppt";

        case "psd": return "psd";

        case "txt":
        case "log":
        case "ret":
        case "rtf":
        case "csv":
            return "txt";

        case "vcard": return "vcard";

        case "vsd": return "vsd";

        case "xls":
        case "xlsx":
        case "xlsm":
            return "xls";

        case "xml": return "xml";

        default: return "unknown";
    }
}
function Sleep(i) {
    var now = new Date;
    var dif = new Date;

    while ((dif.getTime() - now.getTime()) / 1000 < i)
        dif = new Date;
}
function playSound(name) {
    $('#Player').children().remove();
    $('#Player').append('<source src="' + _ServerUrlAddress + 'Sounds/' + name + '" type="audio/mpeg">');
    $('#Player')[0].play();
}
(function ($) {
    $.fn.addClass = function (str) {
        var target = $(this)[0];
        var c = target.getAttribute('class');

        if (c == undefined)
            c = '';

        c += ' ' + str;

        target.setAttribute('class', c);
    }
    $.fn.removeClass = function (str) {
        var target = $(this)[0];
        var c = target.getAttribute('class');

        if (c == undefined)
            c = '';

        c = c.replace(str, '').trim();

        target.setAttribute('class', c);
    }
})(jQuery);
function inScreen(obj, dir) {
    var h = obj.outerHeight();
    var t = obj.offset().top;
    var w = $(window).height() + $(window).scrollTop() - $('.Identificacao').outerHeight();
    var n = 2;
    var vis = (t - h * n) > $(window).scrollTop() && (t + h * n) < w;
    var d = 0;

    if (event.keyCode == keys.downArrow || event.keyCode == keys.pageDown || event.keyCode == keys.end)
        d = t - $(window).height() - $('.Identificacao').outerHeight() + h * (n + 1);
    if (event.keyCode == keys.upArrow || event.keyCode == keys.pageUp || event.keyCode == keys.home)
        d = t - h * n;

    if (!vis)
        $(window).scrollTop(d);
}
function ContextMenu(obj) {
    /*
    $('.ContextMenu').remove();
    $(obj).after('<div class="ContextMenu"></div>');

    var cm = $('.ContextMenu');

    $('.MasterMain').children().not($('.ContextMenu')).not($('.ContextMenu *')).click(function () {
        $('.ContextMenu').fadeOut(300);
        event.stopPropagation();
    });

    cm.css({
        top: event.clientY,
        left: event.clientX
    });

    var campos = getData(erp.campos, tableName).campos;

    cm.css('background-image', 'none');

    cm.append('<span recortar>Recortar</span><span copiar>Copiar</span><span colar>Colar</span>');

    // Recortar
    cm.children('span[recortar]').click(function () {
        getData('CopyToClipboard.aspx?', obj.val());
        $(obj).val('');
        ShowMessage(0, 'texto copiado...', 2000);
    });

    // Copiar
    cm.children('span[copiar]').click(function () {
        getData('CopyToClipboard.aspx?', obj.val());
        ShowMessage(0, 'texto copiado...', 2000);
    });

    // Colar
    cm.children('span[colar]').click(function () {
        $(obj).val(getData(erp.clipboard).clipboard[0].text);
    });

    if (campos != undefined) {
        for (i = 0; i < campos.length; i++) {
            if (campos[i].coluna == $(obj).attr('dbname')) {
                cm.append('<span><b>Campo</b>: ' + campos[i].coluna + '</span>');
                cm.append('<span><b>Nome</b>: ' + campos[i].nome + '</span>');
                cm.append('<span><b>Descrição</b>: ' + campos[i].descricao + '</span>');
            }
        }
    }

    return false;
    */
}