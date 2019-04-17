(function ($) {
    $.fn.setbanner = function (params, callback) {
        var f = this;

        var defaults = {
            items: $(this).children(),
            animation: "slide",
            animated: true,
            wrap: true,
            direction: 'horizontal',
            show: 1,
            btfirst: false,
            btnext: false,
            btprev: false,
            btlast: false,
            selectors: false,
            selectorsclass: false,
            texts: false,
            textsclass: false,
            x: ($(this).parent().width() * -1),
            direction: 'horizontal',
            speed: 300,
            interval: 6000,
            n: 1,
            shortkeys: false,
            w: $(this).width(),
            h: $(this).height(),
            outsidescroll: false,
            scrolltype: false,
            loadonshow: false
        };

        if (defaults.direction == 'vertical') defaults.x = ($(this).parent().height() * -1);

        f.opt = {};
        $.extend(f.opt, defaults, params);
        f.opt.lt = (f.opt.n * f.opt.x) - f.opt.x;
        f.opt.to = null;

        f.opt.BannerUL = $(this);
        f.opt.BannerItems = $(f.opt.items);
        //f.opt.BannerTexts = $(f.opt.texts + ' > li');
        f.opt.nBanners = f.opt.BannerItems.length;


        if (f.opt.loadonshow) $(f.opt.BannerItems[f.opt.n - 1]).children('img[originalurl]').each(function () {
            $(this)[0].src = $(this).attr('originalurl');
        });

        f.opt.BannerUL.css('left', f.opt.lt + 'px');

        f.opt.scroller = (f.opt.direction == 'vertical' ? 'top' : 'left');

        if (f.opt.outsidescroll) {
            f.opt.outsidescroll.scroll(function () {
                var calc = $(this).scrollTop() / (f.opt.x * -1);
                calc++;
                calc = RoundTo(calc, 0);
                f.opt.n = calc;

                $(f.opt.selectors).children('a').removeAttr('class');
                $($(f.opt.selectors).children('a')[f.opt.n - 1]).attr('class', f.opt.selectorsclass);

                try {
                    callback(f);
                }
                catch (err) {
                }
            });
        }

        if (f.opt.animation == 'fade') {
            /*
            f.opt.lt = 0;
            f.opt.BannerUL.css('left', '0px');
            f.opt.BannerUL.children().css('display', 'none');
            $(f.opt.BannerUL.children()[f.opt.n - 1]).css('display', 'inline-block');
            f.opt.BannerUL.width(f.opt.BannerUL.children("li[n='" + f.opt.n + "']").width());
            f.opt.BannerUL.height(f.opt.BannerUL.children("li[n='" + f.opt.n + "']").height());
            f.opt.BannerUL.parent().parent().width(f.opt.BannerUL.width());
            */
        }

        this.clear = function () {
            clearTimeout(f.opt.to);
            clearInterval(f.opt.to);
            f.opt.to = null;
        };

        this.rotate = function (b) {
            f.opt.n = eval("parseInt(f.opt.n)" + (b ? " - " : " + ") + "parseInt(f.opt.show);");

            if ($(f.opt.BannerItems[f.opt.n]).length > 0) {
                if (f.opt.animation == 'slide') {
                    f.opt.lt = (f.opt.x * f.opt.n);

                    if (f.opt.wrap) {
                        if (f.opt.n <= 0 || f.opt.n > f.opt.nBanners) {
                            if (f.opt.interval > 0) {
                                f.opt.n = 1;
                                f.opt.lt = 0;
                            }
                            else {
                                f.opt.n = f.opt.n <= 0 ? 1 : (f.opt.n - f.opt.show);
                                return;
                            }
                        }
                        else {
                            f.opt.lt -= f.opt.x;
                            if (f.opt.nBanners - f.opt.n < f.opt.show) f.opt.lt -= (f.opt.x * (f.opt.show - (f.opt.nBanners - f.opt.n) - 1));
                        }

                    }

                    if (f.opt.scrolltype) eval('f.opt.outsidescroll.animate({ scroll' + (f.opt.direction == 'vertical' ? 'Top' : 'Left') + ': f.opt.lt * -1}, f.opt.speed, function () {f.end();});');
                    else
                        if (f.opt.animated) eval('f.opt.BannerUL.animate({' + f.opt.scroller + ': f.opt.lt + "px"}, f.opt.speed, function () {f.end();});');
                        else {
                            eval('f.opt.BannerUL.css("' + f.opt.scroller + '", f.opt.lt + "px");');
                            f.end();
                        }

                    //if (parseInt(f.opt.BannerUL.css(f.opt.scroller).replace('px','')) < (f.opt.BannerUL.height() + x))
                    //f.opt.BannerUL.css(f.opt.scroller, (f.opt.BannerUL.height() + x) + 'px');
                }
                else {
                    if (f.opt.wrap) {
                        if (f.opt.n <= 0 || f.opt.n > f.opt.BannerItems) {
                            if (f.opt.interval > 0) {
                                f.opt.n = 1;
                                f.opt.lt = 0;
                            }
                            else {
                                f.opt.n = f.opt.n <= 0 ? 1 : (f.opt.n - f.opt.show);
                                return;
                            }
                        }

                    }

                    $(f.opt.BannerItems).css('opacity', '0');
                    $(f.opt.BannerItems[f.opt.n - 1]).css('opacity', '1');

                    f.end();
                }
            }
            else {
                f.opt.n = 0;
                f.rotate();
            }
        };


        this.call = function (isclick, b) {
            try {
                clearTimeout(f.opt.to);
                clearInterval(f.opt.to);
                f.opt.to = null;
            } catch (err) { }

            if (isclick) f.rotate(b);
            else f.opt.to = setTimeout(f.rotate, f.opt.interval);
        };

        this.end = function () {
            $(f.opt.selectors).children('a').removeAttr('class');
            $($(f.opt.selectors).children('a')[f.opt.n - 1]).attr('class', f.opt.selectorsclass);

            if (f.opt.loadonshow) {
                $(f.opt.BannerItems[f.opt.n - 1]).children('img[originalurl]').each(function () {
                    $(this)[0].src = $(this).attr('originalurl');
                });
            }

            //$(f.opt.texts + ' > li').removeAttr('class');
            //$(f.opt.texts + ' > li[n="' + f.opt.n + '"]').attr('class', f.opt.textsclass);
            //f.opt.texts.html($(f.opt.BannerItems[f.opt.n - 1]).children('img').attr('title'));

            if (!f.opt.wrap) {
                if (f.opt.n == f.opt.nBanners - 1) {
                    if (f.opt.animation == "slide") f.opt.BannerUL.css('left', f.opt.x + 'px');
                    $(f.opt.selectors).children('a[n="1"]').attr('class', f.opt.selectorsclass);
                    $(f.opt.texts).children('li[n="1"]').attr('class', f.opt.textsclass);
                    f.opt.n = 1;
                }
                else if (f.opt.n < 1) {
                    var l = f.opt.nBanners - 2;
                    if (f.opt.animation == "slide") f.opt.BannerUL.css('left', (l * f.opt.x) + 'px');
                    $(f.opt.selectors).children('a[n="' + l + '"]').attr('class', f.opt.selectorsclass);
                    $(f.opt.texts).children('li[n="' + l + '"]').attr('class', f.opt.textsclass);
                    f.opt.n = l;
                }
            }

            if (f.opt.interval > 0) f.call();

            try {
                callback(f);
            }
            catch (err) {
            }
        };

        if (!f.opt.wrap) {
            var bfst = f.opt.BannerItems.first();
            var blst = f.opt.BannerItems.last();

            bfst.clone().appendTo(f.opt.BannerUL);
            blst.clone().insertBefore(f.opt.BannerItems.first());

            f.opt.BannerItems = $(this).children();
            f.opt.nBanners = f.opt.BannerItems.length;

            f.opt.BannerUL.css('left', f.opt.x);
        }

        if (f.opt.animation == 'slide') {
            f.opt.BannerItems.css('display', 'inline-block');
            //f.opt.BannerTexts.first().attr('class', 'BannerTextSelected');
        }
        else {
            $(f.opt.BannerItems[0]).css('opacity', '1');
        }

        if (f.opt.interval > 0) {
            f.opt.to = setInterval(f.rotate, f.opt.interval);
        }

        if (f.opt.selectors) {
            for (i = 0; i < f.opt.selectors.children('a').length; i++) $(f.opt.selectors.children('a')[i]).attr('n', i + 1);

            $(f.opt.selectors).children('a').click(function (e) {
                if (!f.opt.BannerUL.is(":animated")) {
                    f.opt.n = $(this).attr('n');
                    f.opt.n--;
                    f.call(true);
                }
                HideMessage(-1000);
            });
        }

        if (f.opt.interval > 0) {
            f.opt.BannerUL.mouseover(function () {
                f.clear();
            });
            f.opt.BannerUL.mouseout(function () {
                f.call();
            });
        }

        if (f.opt.btnext && f.opt.btprev) {
            if (f.opt.interval > 0) {
                f.opt.btnext.mouseover(function () {
                    f.clear();
                });
                f.opt.btprev.mouseover(function () {
                    f.clear();
                });
            }
            f.opt.btnext.dblclick(function () {
                f.clear();
                return false;
            });
            f.opt.btprev.dblclick(function () {
                f.clear();
                return false;
            });

            f.opt.btnext.click(function () {
                if (!f.opt.BannerUL.is(":animated")) {
                    f.call(true);
                }
                HideMessage(-1000);
            });
            f.opt.btprev.click(function () {
                if (!f.opt.BannerUL.is(":animated")) {
                    f.call(true, true);
                }
                HideMessage(-1000);
            });
        }

        if (f.opt.btlast && f.opt.btfirst) {
            if (f.opt.interval > 0) {
                f.opt.btlast.mouseover(function () {
                    f.clear();
                });
                f.opt.btfirst.mouseover(function () {
                    f.clear();
                });
            }
            f.opt.btlast.dblclick(function () {
                f.clear();
                return false;
            });
            f.opt.btfirst.dblclick(function () {
                f.clear();
                return false;
            });

            f.opt.btlast.click(function () {
                if (!f.opt.BannerUL.is(":animated")) {
                    f.opt.n = f.opt.BannerItems.length - 2;
                    f.call(true);
                }
                HideMessage(-1000);
            });
            f.opt.btfirst.click(function () {
                if (!f.opt.BannerUL.is(":animated")) {
                    f.opt.n = 2;
                    f.call(true, true);
                }
                HideMessage(-1000);
            });
        }

        if (f.opt.shortkeys) {
            $(document).keydown(function () {
                if (event.keyCode == 39) f.call();
                else if (event.keyCode == 37) f.call(true, true);
            });
        }
    };
})(jQuery);