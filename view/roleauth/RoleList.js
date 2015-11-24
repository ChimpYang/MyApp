Ext.define('MyApp.view.roleauth.RoleList', {
    extend: 'MyApp.view.base.CJFGrid',
    //最好的名字应该时候roleList
	//但是该名字在角色管理界面中被使用了，所以需要换个名字
	xtype: 'authRoleList',
	
	requires: [
        'MyApp.store.Role'
    ],
    
    storeId: 'MyApp.store.Role',
    
    //基类的选择方式是checkboxmodel，这里是拖拽grid，所以修改成rowmodel
	selModel: {
    	type: 'rowmodel',
    },
    
    header: false,
    frame: true,
    columnLines: true,
    
    tbar: [{
    	xtype: 'button',
    	text: '显示查询',
    	iconCls: 'fa fa-search',
    	tooltip: '显示或隐藏查询界面',
    	listeners: {
    		click: 'onShowQueryArea'
    	}
    }],
    
	columns: [
        { text: '角色编码', dataIndex: 'roleCode', width: 110 },
        { 
        	text: '状态', dataIndex: 'currentStatus',
        	width: 60,
        	renderer: MyApp.AppConfig.statusRenderer,
        },
        { text: '角色名称', dataIndex: 'roleName', flex: 1},
    ],
    
	listeners: {
		afterrender: 'onAfterRoleListRender',
		itemclick: 'onRoleItemClick',
		
		selectionchange: 'onRoleSelectionchange'
   }
	
 });