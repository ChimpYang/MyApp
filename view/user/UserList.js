Ext.define('MyApp.view.user.UserList', {
    extend: 'MyApp.view.base.CJFGrid',
    xtype: 'userlist',

    requires: [
        'MyApp.store.User'
    ],
    
    storeId: 'MyApp.store.User',

    header: false,
    
    columnLines: true,
    frame: true,
    minHeight: 200,
    
    dockedItems: [{
	    xtype: 'toolbar',
	    dock: 'top',
	    id: 'userlist-mainToolbar',
	    
	    items: [{
	    	iconCls: 'fa fa-file-text-o',
	    	tooltip: '查看选中的用户信息',
	        text: '查看',
	        actionType: MyApp.AppConfig.ActionQuery,
	        listeners: {
	        	click: 'onViewClick'
			}
	    }, '-', {
	    	iconCls: 'fa fa-file-o',
	    	text: '增加',
	    	actionType: MyApp.AppConfig.ActionCreate,
	    	listeners: {
	        	click: 'onCreateClick'
			}
	    },{
	    	iconCls: 'fa fa-edit',
	    	text: '修改',
	    	actionType: MyApp.AppConfig.ActionModify,
	    	listeners: {
	        	click: 'onEditClick'
			}
	    },{
	    	iconCls: 'fa fa-trash',
	    	text: '删除',
	    	actionType: MyApp.AppConfig.ActionRemove,
	    	listeners: {
	    		click: 'onDeleteClick'
	    	}
	    }, '-', {
	    	iconCls: 'fa fa-clone',
	    	text: '另存',
	    	tooltip: '将选择的记录另存为一个新的记录',
	    	actionType: MyApp.AppConfig.ActionCreate,
	    	listeners: {
	    		click: 'onCopyClick'
	    	}
	    }, '-', {
	    	xtype: 'button',
	       	iconCls: 'fa fa-cog',
	        text: '状态设定',
	        actionType: MyApp.AppConfig.ActionMenuMix,
	        menu: [{
	            text:'启用',
	            iconCls: 'fa fa-check',
	            tooltip: '将用户启用，只有被启用的用户才可以登录系统<br />您可以一次启用多个用户',
	            actionType: MyApp.AppConfig.ActionEnable,
	            listeners: {
		    		click: 'onEnableClick'
		    	}
	        },{
	            text:'禁用',
	            tooltip: '将用户禁用，被禁用的用户无法登录<br />您可以一次禁用多个用户',
	            actionType: MyApp.AppConfig.ActionDisable,
	            iconCls: 'fa fa-ban',
	            listeners: {
		    		click: 'onDisabledClick'
		    	}
	        }]
	    }, '-', {
	    	xtype: 'button',
	    	text: '显示查询',
	    	iconCls: 'fa fa-search',
	    	tooltip: '显示或隐藏查询界面',
	    	listeners: {
	    		click: 'onShowQueryArea'
	    	}
	    },
	    '->', {
	    	iconCls: 'fa fa-download',
	    	actionType: MyApp.AppConfig.ActionExport,
	    	text: '导出'
	    }, {
	    	iconCls: 'fa fa-upload',
	    	actionType: MyApp.AppConfig.ActionImport,
	    	text: '导入'
	    }],
	}],

    columns: [
        { text: 'id',  dataIndex: 'id' },
        { text: 'userCode', dataIndex: 'userCode', flex: 1 },
        { text: 'userName', dataIndex: 'userName', flex: 1 },
        { 
        	text: '状态', dataIndex: 'currentStatus', flex: 1, 
        	renderer: MyApp.AppConfig.statusRenderer,
        }
    ],

	listeners: {
		afterrender: 'onAfterRender',
		itemdblclick: 'onItemDoubleClick'
	}
	
});
