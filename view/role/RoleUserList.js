Ext.define('MyApp.view.role.RoleUserList',{
	extend:'Ext.panel.Panel',
	xtype: 'roleUserList',
	
	layout: 'border',
	
	defaults: {
        split: true
    },
    
    height: 300,
    minHeight: 200,
    
	items:[{
		region:'west',
		xtype:'roleUserNotInList',
		reference: 'refRoleUserNotInList',
		needPermission: true,
	}, {
		region:'center',
		xtype:'roleUserInList',
		reference: 'refRoleUserInList',
		needPermission: true,
	}],
	
	//roleUserList是panel中的panel，需要把上层panel的setPermission任务传递下去
	setPermission: function(pm) {
		Ext.each(this.items.items, function(item) {
        	if(item.needPermission) {
        		item.setPermission(pm);
        	}
        }, this);
	}
	
});