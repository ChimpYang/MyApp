Ext.define('MyApp.view.main.UploadHeadImageWin', {
    extend: 'Ext.window.Window',
    xtype: 'headImageWin',

    //TODO; 如果不指定controller，会自动指定为menuController；Why？
    controller: 'appHeader',
    
    width: 400,
    title: '用户头像上传',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'form',
        layout: 'anchor',
        width: 400,
        frame: true,
        bodyPadding: 10,

        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 70
        },

        items: [{
            xtype: 'container',
            layout: 'absolute',
            itemId: 'headImgBoxContainer',
            height: 64,
            x: 158,//400/2 - 10 - 64/2 = 158
            y: 0,
            items:{
                xtype: 'box',
                itemId: 'headImgBox',
                width: 64,
                height: 64,
                margin: '0 0 10 0',
                autoEl: {  
                    tag: 'img',  
                    // src: 'resources/headimg/009.jpg',
                    src: Ext.get('userHeadImg').getValue(),
                    style: {
                        width: '64px',
                        height: '64px',
                        borderRadius: '50px'
                    }
                }
            }
        }, {
            margin: '10 0 0 0',
            name: 'photo',
            allowBlank: false,
            buttonText: '选择图片',

            xtype: 'fileuploadfield',
            hideLabel: true,

            listeners: {
                change: 'onHeadImageChange'
            }
        }, {
            xtype: 'hiddenfield',
            name:'fileName',  
        }],

        buttons: [{
            text: '上传',
            handler: 'onSubmit'
        }, {
            text: '重置',
            handler: 'onReset'
        }, {
            text: '关闭',
            handler: 'onClose'
        }]
    }]
});