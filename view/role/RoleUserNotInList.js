Ext.define('MyApp.view.role.RoleUserNotInList', {
    extend: 'MyApp.view.base.CJFGrid',
    xtype: 'roleUserNotInList',
    
    requires: [
        'MyApp.store.RoleUserNotIn'
    ],
    
    storeId: 'MyApp.store.RoleUserNotIn',
	
	//基类的选择方式是checkboxmodel，这里是拖拽grid，所以修改成rowmodel
	selModel: {
    	type: 'rowmodel',
    },
    
	title: '未包含用户',
    columnLines: true,
    frame: true,
    minWidth: 250,
    
    multiSelect: true,
    columns: [
        { text: '用户编码', dataIndex: 'userCode', width: 150 },
        { text: '用户名称', dataIndex: 'userName', flex: 1},
    ],
    
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            containerScroll: true,
            dragGroup: 'roleUserNotInList',
            dropGroup: 'roleUserInList',
            
            pluginId: 'roleUserNotInList-dd',
        },
        listeners: {
        	//remove
            beforedrop: 'beforeDropFromIn'
        }
    },
    
    width: 500,
    
    tools: [{
    	xtype: 'button',
    	iconCls: 'fa fa-circle',
        tooltip: '全选',
        handler: 'onUserListNotInSelectAll'
    }, {
    	xtype: 'button',
    	iconCls: 'fa fa-circle-o',
    	tooltip: '取消选择',
    	handler: 'onUserListNotInUnSelectAll'
	}],
    
});
