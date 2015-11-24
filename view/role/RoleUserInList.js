Ext.define('MyApp.view.role.RoleUserInList', {
    extend: 'MyApp.view.base.CJFGrid',
    xtype: 'roleUserInList',
    
    requires: [
        'MyApp.store.RoleUserIn'
    ],
    
    storeId: 'MyApp.store.RoleUserIn',
    
    //基类的选择方式是checkboxmodel，这里是拖拽grid，所以修改成rowmodel
    selModel: {
    	type: 'rowmodel',
    },

	title: '已包含用户',
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
            dragGroup: 'roleUserInList',
            dropGroup: 'roleUserNotInList',
            
            pluginId: 'roleUserInList-dd',
        },
        listeners: {
        	//create
            beforedrop: 'beforeDropFromNotIn'
        }
    },
    
    tools: [{
    	xtype: 'button',
    	iconCls: 'fa fa-circle',
        tooltip: '全选',
        handler: 'onUserListInSelectAll'
    }, {
    	xtype: 'button',
    	iconCls: 'fa fa-circle-o',
    	tooltip: '取消选择',
    	handler: 'onUserListInUnSelectAll'
	}],
	
});
