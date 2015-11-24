Ext.define('MyApp.view.roleauth.RoleAuthPanel',{
	extend:'MyApp.view.base.CJFPanel',
	xtype: 'roleAuthPanel',
	
    requires:[
    	'MyApp.model.RoleMenuAuth',
    	
    	'MyApp.view.roleauth.RoleListAndSearch',
    	'MyApp.view.roleauth.RoleList',
    	'MyApp.view.roleauth.RoleSearchForm',
    	'MyApp.view.roleauth.RoleAuthList',
    	
    	'MyApp.view.roleauth.RoleAuthPanelController'
    ],
//     
    controller: 'roleAuthPanel',
    
    title: '角色权限管理',
	layout: 'border',
	
	defaults: {
        split: true
    },
    
	items:[{
		region:'center',
		xtype:'roleAuthList',
		reference: 'refRoleAuthList',
		needPermission: true,
	}, {
		region:'west',
		//最好的名字应该时候roleList
		//但是该名字在角色管理界面中被使用了，所以需要换个名字
		xtype:'roleListAndSearch',
		reference: 'refRoleListAndSearch'
	}]
	

});