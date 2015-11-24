Ext.define('MyApp.view.roleauth.RoleListAndSearch',{
	extend:'Ext.panel.Panel',
	xtype: 'roleListAndSearch',
	
	header: false,
	layout: 'border',
	
	width: 390,
	minWidth: 200,
	maxWidth: 500,
    
	items:[{
		region:'center',
		xtype:'authRoleList',
		reference: 'refAuthRoleList',
		
		split: false
	}, {
		region:'north',
		//最好的名字应该时候roleList
		//但是该名字在角色管理界面中被使用了，所以需要换个名字
		xtype:'authRoleSearchForm',
		height: 120,
		reference: 'refAuthRoleSearchForm',
		hidden: true,
		
		split: false
	}
	]
	
});