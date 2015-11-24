/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MyApp',
    
    requires: [
        'Ext.data.Session',
        'MyApp.AppConfig',
        
        'MyApp.view.base.CJFGrid',
        'MyApp.view.base.CJFPanel',
        'MyApp.view.base.CJFTree',
        'MyApp.view.base.CJFForm',
        
        'MyApp.view.main.MenuTree',
		'MyApp.view.main.DynamicTabs',
		'MyApp.view.main.AppHeader',
		'MyApp.view.main.HeaderToolBar',
		'MyApp.view.main.HeaderInfos',
		
		'MyApp.store.Menus',
		'MyApp.view.main.MenuController',
		
		'MyApp.view.user.UserPanel',
		'MyApp.view.role.RolePanel',
		'MyApp.view.roleauth.RoleAuthPanel',
		
		'MyApp.view.menu.SysMenuPanel',
		
		'MyApp.view.test.UnityContainer',
		// 'MyApp.view.test.UnityPanel'
		
		'MyApp.view.test.FlashPanel',
		'MyApp.view.test.Component1',//Unity Component Mode
		
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    views: [
        'MyApp.view.main.Menu'
    ],
    
    //TODO; 在lunch事件里，检查userCode是否有值，没有的话就转到登录界面
    //      Ext.get('userCode').getValue()
    launch: function () {
        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var isClientLogined;

        // Check to see the current value of the localStorage key
        // isClientLogined = localStorage.getItem("isClientLogined");
        // isClientLogined = sessionStorage.getItem('isClientLogined');
        isClientLogined = true;

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.create({
            xtype: isClientLogined ? 'app-menu' : 'login'
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
