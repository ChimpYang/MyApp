Ext.define('MyApp.view.roleauth.RoleAuthList', {
    extend: 'MyApp.view.base.CJFTree',
    xtype: 'roleAuthList',
    
    requires: [
        'MyApp.store.RoleMenuAuth'
    ],
    
    storeId: 'MyApp.store.RoleMenuAuth',
    
	minWidth: 400,
	frame: true,
	columnLines: true,
	rowLines: true,
	
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: '菜单名称',
        dataIndex: 'menuTitle',
        menuDisabled: true,
        flex: 1,
        sortable: false
    },{
        text: '增加',
        xtype: 'checkcolumn',
        dataIndex: 'canCreate',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '删除',
        xtype: 'checkcolumn',
        dataIndex: 'canRemove',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '修改',
        xtype: 'checkcolumn',
        dataIndex: 'canModify',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '查看',
        xtype: 'checkcolumn',
        dataIndex: 'canQuery',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '启用',
        xtype: 'checkcolumn',
        dataIndex: 'canEnable',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '禁用',
        xtype: 'checkcolumn',
        dataIndex: 'canDisable',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '导入',
        xtype: 'checkcolumn',
        dataIndex: 'canImport',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '导出',
        xtype: 'checkcolumn',
        dataIndex: 'canExport',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '附增',
        xtype: 'checkcolumn',
        tooltip: '附件增加',
        dataIndex: 'canAttachmentCreate',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '附删',
        xtype: 'checkcolumn',
        tooltip: '附件删除',
        dataIndex: 'canAttachmentRemove',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '特殊',
        xtype: 'checkcolumn',
        tooltip: '特殊一',
        dataIndex: 'canSpecial1',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '特殊',
        xtype: 'checkcolumn',
        tooltip: '特殊二',
        dataIndex: 'canSpecial2',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    },{
        text: '特殊',
        xtype: 'checkcolumn',
        tooltip: '特殊三',
        dataIndex: 'canSpecial3',
        menuDisabled: true,
        width: 47,
        sortable: false,
        grant: true,//自定义属性
        listeners: {
        	headerclick: 'onHeaderClick'
        }
    }],
    
    dockedItems: [{
	    xtype: 'toolbar',
	    dock: 'top',
	    id: 'roleAuthList-mainToolbar',
	    
	    items: [{
	    	iconCls: 'fa fa-save',
	        text: '保存',
	        actionType: MyApp.AppConfig.ActionModify,
	    	listeners: {
	        	click: 'onSaveRoleAuth'
	        }
	    }, '-', {
	    	iconCls: 'fa fa-circle',
	    	text: '全选',
	    	listeners: {
	        	click: 'onSelectAll'
	        }
	    },{
	    	iconCls: 'fa fa-circle-o',
	    	text: '取消全选',
	    	listeners: {
	        	click: 'onUnSelectAll'
	        }
	    }, '-', {
	    	xtype: 'button',
	    	iconCls: 'fa fa-plus',
	    	text: '授予全部',
	    	actionType: MyApp.AppConfig.ActionModify,
	    	listeners: {
	        	click: 'onGrantAll'
	        }
	    }, {
	    	xtype: 'button',
	    	iconCls: 'fa fa-trash-o',
	    	text: '移除全部',
	    	actionType: MyApp.AppConfig.ActionModify,
	    	listeners: {
	        	click: 'onGrantRemoveAll'
	        }
	    }],
	}]
    
});