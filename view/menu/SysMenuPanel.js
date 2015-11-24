Ext.define('MyApp.view.menu.SysMenuPanel',{
	extend:'MyApp.view.base.CJFPanel',
	// extend: 'Ext.panel.Panel',
	xtype: 'sysMenuPanel',
	
	requires:[
    	'MyApp.view.menu.SysMenuList',
    	'MyApp.view.menu.SysMenuPanelController',
    ],
    
    controller: 'sysMenuPanel',
    
    title:'菜单管理',
	layout:'border',

	items:[{
		region:'center',
		xtype:'sysMenulist',
		reference: 'refSysMenuList',
		needPermission: true
	}, {
		region:'north',
		xtype:'panel',
		reference: 'refSysMenuSearchForm',
		hidden: true,
		
		html: '<p>SearchForm</p>'
	}]
	
});