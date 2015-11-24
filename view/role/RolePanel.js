Ext.define('MyApp.view.role.RolePanel',{
	extend:'MyApp.view.base.CJFPanel',
	xtype: 'rolePanel',
	
	//TODO; 需要制定一个规范的js引入规则
    requires:[
    	'MyApp.view.role.RoleList',
    	'MyApp.view.role.RoleSearchForm',
    	'MyApp.view.role.RoleForm',
    	
    	'MyApp.view.role.RoleUserList',
    	'MyApp.view.role.RoleUserNotInList',
    	'MyApp.view.role.RoleUserInList',
    	
    	'MyApp.view.role.RolePanelController'
    ],
    
    controller: 'rolePanel',
    
    title: '角色管理',
	layout: 'border',
	
	defaults: {
        split: true
    },
    
	items:[{
		region:'center',
		xtype:'rolelist',
		reference: 'refRoleList',
		needPermission: true,
	}, {
		region:'north',
		xtype:'roleSearchForm',
		reference: 'refRoleSearchForm',
		hidden: true,
		split: false
	}, {
		region: 'south',
		xtype: 'roleUserList',
		reference: 'refRoleUserList',
		needPermission: true,
		hidden: true,
		bodyPadding: 0
	}],
	
});