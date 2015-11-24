Ext.define('MyApp.view.main.LogoutForm', {
    extend: 'Ext.form.Panel',
    xtype: 'logoutForm',

    controller: 'appHeader',
    
    width: 300,
    bodyPadding: 10,

    items: [{
        margin: '0 0 20 0',
        xtype: 'component',
        html: [
            '您确定注销并退出系统吗？'
        ]
    }],

    buttons: [
        { 
            text:'注销',
            handler: 'onLogoutInForm',
        }, { 
            text:'取消',
            handler: 'onClose' 
        }
    ]
});