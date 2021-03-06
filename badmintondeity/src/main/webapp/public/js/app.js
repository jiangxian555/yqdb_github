var document_title = document.title;

$(document).ready(function ()
{
    // Modify by wecenter
    // 判断是否未retina屏幕
    if (window.devicePixelRatio == 2)
    {
        $.each($('img'), function (i, e)
        {
            if ($(this).attr('src-retina'))
            {
                $(this).attr('src', $(this).attr('src-retina'));
            }
        });
    }

    // 导航下拉效果
    $('.top-menu .aw-top-nav .nav li > span').hover(function ()
    {
        $(this).addClass('active');
    }, function ()
    {
        $(this).removeClass('active');
    });

    $('.top-menu .aw-top-nav .nav li .aw-dropdown').hover(function ()
    {
        $(this).parents('li').find('span').addClass('active');
    }, function ()
    {
        $(this).parents('li').find('span').removeClass('active');
    });

    if ($(window).width() <= 640)
    {
        $('.top-menu .nav li span').click(function ()
        {
            $(this).parents('li').find('.aw-dropdown').toggle();
        });
    }

    // fix form bug...
    $("form[action='']").attr('action', window.location.href);

    // 验证码
    $('img#captcha').attr('src', G_BASE_URL + '/account/captcha/');

    // 输入框自动增高
    if ($('.autosize').length)
    {
        $('.autosize').autosize();
    }

    //响应式导航条效果
    $('.aw-top-nav .navbar-toggle').click(function()
    {
        if ($(this).parents('.aw-top-nav').find('.navbar-collapse').hasClass('active'))
        {
            $(this).parents('.aw-top-nav').find('.navbar-collapse').removeClass('active');
        }
        else
        {
            $(this).parents('.aw-top-nav').find('.navbar-collapse').addClass('active');
        }
    });

    // 报告侧边滚动条
    if ($('.side-category').length && $('.my-report-list').length)
    {
        if ($(window).width() <= 1024)
        {
            $('.side-category').css('left', 1160);
        }
        else
        {
            $('.side-category').css('left', parseInt($('.my-report-list').position().left) + parseInt($('.my-report-list').innerWidth()) + 20);
        }
    }

    //检测通知
    if (typeof (G_NOTIFICATION_INTERVAL) != 'undefined')
    {
        AWS.Message.check_notifications();
        AWS.G.notification_timer = setInterval('AWS.Message.check_notifications()', G_NOTIFICATION_INTERVAL);
    }

    //文章列表样式调整
    $.each($('.aw-common-list .aw-item.article'), function (i, e)
    {
        if ($(this).find('img').length > 1)
        {
            if ($.trim($(this).find('.markitup-box').text()) == '')
            {
                $(this).find('.aw-upload-img-list, .markitup-box img').css({
                    'right': 'auto',
                    'left': 0,
                    'top': 10
                });
            }
            $(this).find('.aw-upload-img-list').next().detach();
            $(this).find('.markitup-box img').eq(0).css({'z-index':'999'});
        }
        else
        {
            $(this).find('.img.pull-right').hide();
        }
    });

    if ($('a[rel=lightbox]').length)
    {
        $('a[rel=lightbox]').fancybox(
        {
            openEffect: 'none',
            closeEffect: 'none',
            prevEffect: 'none',
            nextEffect: 'none',
            centerOnScroll : true,
            closeBtn: false,
            helpers:
            {
                buttons:
                {
                    position: 'bottom'
                }
            },
            afterLoad: function ()
            {
                this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');
            }
        });
    }

    if (window.location.hash.indexOf('#!') != -1)
    {
        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
        {
            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
        }
    }

    /*用户头像提示box*/
    AWS.show_card_box('.aw-user-name, .aw-user-img', 'user');

    AWS.show_card_box('.topic-tag, .aw-topic-name, .aw-topic-img', 'topic');

    //文章页添加评论, 话题添加 绑定事件
    AWS.Init.init_article_comment_box('.aw-article-content .aw-article-comment');

    AWS.Init.init_topic_edit_box('.aw-edit-topic');

    //话题编辑下拉菜单click事件
    $(document).on('click', '.aw-edit-topic-box .aw-dropdown-list li', function ()
    {
        $(this).parents('.aw-edit-topic-box').find('#aw_edit_topic_title').val($(this).text());
        $(this).parents('.aw-edit-topic-box').find('.add').click();
        $(this).parents('.aw-edit-topic-box').find('.aw-dropdown').hide();
    });

    //话题删除按钮
    $(document).on('click', '.topic-tag .close',  function()
    {
        var data_type = $(this).parents('.aw-topic-bar').attr('data-type'),
            data_id = $(this).parents('.aw-topic-bar').attr('data-id');
        switch (data_type)
        {
            case 'question':
                $.post(G_BASE_URL + '/topic/ajax/remove_topic_relation/', 'type=question&item_id=' + data_id + '&topic_id=' + $(this).parents('.topic-tag').attr('data-id'),function(){
                    $('#aw-ajax-box').empty();
                });
                break;

            case 'topic':
                $.get(G_BASE_URL + '/topic/ajax/remove_related_topic/related_id-' + $(this).parents('.topic-tag').attr('data-id') + '__topic_id-' + data_id);
                break;

            case 'favorite':
                $.post(G_BASE_URL + '/favorite/ajax/remove_favorite_tag/', 'item_id=' + data_id + '&item_type=' + data_type + '&tags=' + $.trim($(this).parents('.topic-tag').text()));
                break;

            case 'article':
                $.post(G_BASE_URL + '/topic/ajax/remove_topic_relation/', 'type=article&item_id=' + data_id + '&topic_id=' + $(this).parents('.topic-tag').attr('data-id'),function(){
                    $('#aw-ajax-box').empty();
                });
                break;

        }

        $(this).parents('.topic-tag').remove();

        return false;
    });

    //小卡片mouseover
    $(document).on('mouseover', '#aw-card-tips', function ()
    {
        clearTimeout(AWS.G.card_box_hide_timer);

        $(this).show();
    });

    //小卡片mouseout
    $(document).on('mouseout', '#aw-card-tips', function ()
    {
        $(this).hide();
    });

    //用户小卡片关注更新缓存
    $(document).on('click', '.aw-card-tips-user .follow', function ()
    {
        var uid = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

        $.each(AWS.G.cashUserData, function (i, a)
        {
            if (a.match('data-id="' + uid + '"'))
            {
                if (AWS.G.cashUserData.length == 1)
                {
                    AWS.G.cashUserData = [];
                }
                else
                {
                    AWS.G.cashUserData[i] = '';
                }
            }
        });
    });

    //话题小卡片关注更新缓存
    $(document).on('click', '.aw-card-tips-topic .follow', function ()
    {
        var topic_id = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

        $.each(AWS.G.cashTopicData, function (i, a)
        {
            if (a.match('data-id="' + topic_id + '"'))
            {
                if (AWS.G.cashTopicData.length == 1)
                {
                    AWS.G.cashTopicData = [];
                }
                else
                {
                    AWS.G.cashTopicData[i] = '';
                }
            }
        });
    });

    // Modify by wecenter
    /*icon tooltips提示*/
    $(document).on('mouseover', '.icon-good, .icon-bad, .follow, .voter, .aw-icon-thank-tips, .invite-list-user', function ()
    {
        $(this).tooltip('show');
    });

    // Modify by wecenter
    // 搜索分类下拉
    $('#global_search_form .search-dropdown span').click(function ()
    {
        var ul = $(this).parents('.search-dropdown').find('ul');
        if (ul.is(':visible'))
        {
            ul.hide();
        }
        else
        {
            ul.show();
        }
    });

    // Modify by wecenter
    $('#global_search_form .search-dropdown ul li a').click(function ()
    {
        $('#global_search_form .search-dropdown span').html($(this).text() + ' <i class="icon icon-down"></i>');

        $('#aw-search-query').attr('placeholder', $(this).data('placeholder'));

        if ($(this).data('search'))
        {
            $('#global_search_form').attr('action', G_BASE_URL + '/search/' + $(this).data('search') + '/');
        }
        else
        {
            $('#global_search_form').attr('action', G_BASE_URL + '/search/');
        }

        $('#global_search_form .search-dropdown ul').hide();

        $(this).parents('li').hide().siblings().show();
    });

    //搜索下拉
    AWS.Dropdown.bind_dropdown_list('#aw-search-query', 'search');

    //编辑器@人
    AWS.at_user_lists('#wmd-input, .aw-article-replay-box #comment_editor', 5);

    //ie浏览器下input,textarea兼容
    if (document.all)
    {
        AWS.check_placeholder($('input, textarea'));

        // 每隔1s轮询检测placeholder
        setInterval(function()
        {
            AWS.check_placeholder($('input[data-placeholder!="true"], textarea[data-placeholder!="true"]'));
        }, 1000);
    }
});

$(window).on('hashchange', function() {
    if (window.location.hash.indexOf('#!') != -1)
    {
        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
        {
            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
        }
    }
});

// Modify by wecenter
if ($('.aw-back-top').length)
{
    $(window).scroll(function ()
    {
        if ($(window).scrollTop() > ($(window).height() / 2))
        {
            $('.aw-back-top').fadeIn();
        }
        else
        {
            $('.aw-back-top').fadeOut();
        }
    });
}

