Ext.define('MyApp.view.user.UserPanel',{
	extend:'MyApp.view.base.CJFPanel',
	xtype: 'userPanel',
	
    requires:[
    	'MyApp.view.user.UserList',
    	'MyApp.view.user.UserSearchForm',
    	'MyApp.view.user.UserForm',
    	
    	'MyApp.view.user.UserPanelController'
    ],
    
    controller: 'userPanel',
    
    title:'用户管理',
	closable:true,
	layout:'border',
    
	items:[{
		region:'center',
		xtype:'userlist',
		reference: 'refUserList',
		needPermission: true,
	}, {
		region:'north',
		xtype:'userSearchForm',
		reference: 'refUserSearchForm',
		hidden: true
	}],
	
});