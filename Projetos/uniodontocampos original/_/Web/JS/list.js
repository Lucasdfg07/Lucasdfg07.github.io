function StartList() {
    $(document).ready(function () {
        try {
            $('.List .ListContent').height($('.all').height() + 29 - ($('.List .ListContent').offset().top) - $('.Rodape').height() - 20);
        } catch (err) {
        }

        shortkeys.novo.enable = true;

        $('.ListContent input:checkbox').each(function () {
            try {
                var id = $(this).attr('idreg');

                if ($('#ctl00_cphMaster_hSelected').val().indexOf(id + ';') >= 0) $(this)[0].checked = true;
            }
            catch (err) { }
        }).parent().click(function () {
            $(this).children('input:checkbox').trigger('click');
        });
        $('.ListTitle a[order]').each(function () {
            $(this).click(function () {
                OrderBy($(this));
            });
        });
        if ($('[filtros]').length > 0) {
            $('[filtros]').each(function () {
                $(this).after('<img class="btFiltrar">');
                $(this).parent().children('.btFiltrar').click(function () {
                    $(this).parent().children('.Filtros').fadeIn(300);
                });
            });
            $('*').not($('.Busca *, .fBusca, .Busca, .Filtros, .Filtros *')).click(function () {
                $('.Filtros').fadeOut(100);
                event.stopPropagation();
            });
            $('.Busca *').click(function () {
                event.stopPropagation();
            });
        }

        $('.Editable').dblclick(function () {
            $(this).attr('class', $(this).attr('class').replace('Editable', 'Editing'));
            $(this).parent().parent().find('.Cancel, .Save, .Salvar').css('display', 'inline-block');

            event.stopPropagation();
            return false;
        });
        $('.Editable, input.Editing').parent().parent().find('a.Cancel').click(function () {
            $(this).parent().parent().find('.Editing').each(function () {
                $(this).attr('class', $(this).attr('class').replace('Editing', 'Editable'));
            });
            $(this).parent().parent().find('.Cancel, .Save').css('display', 'none');

            event.stopPropagation();
            return false;
        });
        $('.More > a > span').click(function () {
            ShowMessage(0, 'carregando...', 5000);
        });
    });
}
function OrderBy(sender) {
    var obj = $(sender);
    var target = $('.List');
    var nColumn = obj.index(),
                list = target.find('.ListContent > ul'),
                content = [];

    for (i = 0; i < list.children().length; i++) {
        content.push([$($(list.children()[i]).children()[nColumn]).text(), list.children()[i]]);
    }

    content.sort(function (a, b) {
        if (isDate(a[0])) {
            var barA = new Array();
            var barB = new Array();
            var barStrA = a[0];
            var barStrB = b[0];

            while (barStrA.indexOf('/') >= 0) {
                barA.push(barStrA.substring(0, barStrA.indexOf('/')));
                barStrA = barStrA.substring(barStrA.indexOf('/') + 1, 99);
            }

            barA.push(barStrA);

            while (barStrB.indexOf('/') >= 0) {
                barB.push(barStrB.substring(0, barStrB.indexOf('/')));
                barStrB = barStrB.substring(barStrB.indexOf('/') + 1, 99);
            }

            barB.push(barStrB);

            dA = barA[2] + '-' + barA[1] + '-' + barA[0];
            dB = barB[2] + '-' + barB[1] + '-' + barB[0];
            return Date.parse(dA) > Date.parse(dB) ? 1 : Date.parse(dA) < Date.parse(dB) ? -1 : 0;
        }
        else if (!isNaN(parseFloat(a[0].replace('R$', '').replace('.', '').replace(',', '.').trim()))) {
            dA = a[0].replace('R$', '').replace('.', '').replace(',', '.').trim();
            dB = b[0].replace('R$', '').replace('.', '').replace(',', '.').trim();
            return parseFloat(dA) > parseFloat(dB) ? 1 : parseFloat(dA) < parseFloat(dB) ? -1 : 0;
        }
        else {
            return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        }
    });

    target.find('.ListTitle').find('a').removeAttr('class');

    if (obj.attr('desc')) {
        content.reverse();
        obj.removeAttr('desc');
        obj.attr('class', 'Desc')
    }
    else {
        obj.attr('desc', '1');
        obj.attr('class', 'Asc')
    }

    for (i = 0; i < content.length; i++) {
        list.append(content[i][1]);
    }

    HideMessage();
}

function CheckRegistroUnico(obj) {
    var lans = $('#ctl00_cphMaster_hSelected').val().split(';');
    if (lans.length > 2) $('.Quitacao_VrLiquido').css('visibility', (obj.checked ? 'visible' : 'hidden'));
}