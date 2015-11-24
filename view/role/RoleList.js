Ext.define('MyApp.view.role.RoleList', {
    extend: 'MyApp.view.base.CJFGrid',
    xtype: 'rolelist',

    requires: [
        'MyApp.store.Role'
    ],
    
    storeId: 'MyApp.store.Role',
    
	header: false,
    
    columnLines: true,
    frame: true,
    minHeight: 200,
    
	dockedItems: [{
	    xtype: 'toolbar',
	    dock: 'top',
	    id: 'rolelist-mainToolbar',
	    
	    items: [{
	    	iconCls: 'fa fa-file-text-o',
	    	tooltip: '查看选中的角色信息',
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
	    	xtype: 'button',
	    	iconCls: 'fa fa-clone',
	    	text: '另存',
	    	actionType: MyApp.AppConfig.ActionCreate,
	    	menu: [{
	            text:'仅仅复制角色',
	            iconCls: 'fa fa-user',
	            tooltip: '将选中的角色另存为一个新的角色<br/>但不会保存角色包含的用户',
	            listeners: {
	            	click: 'onCopyClick'
		    	}
	        },{
	            text:'复制角色及成员',
	            tooltip: '将选中的角色另存为一个新的角色<br/>也会保存角色包含的用户',
	            iconCls: 'fa fa-users',
	            listeners: {
	            	click: 'onCopyExClick'
		    	}
	        },{
	            text:'复制角色及权限',
	            tooltip: '将选中的角色另存为一个新的角色<br/>也会保存角色包含的权限',
	            iconCls: 'fa fa-users',
	            listeners: {
		    	}
	        },{
	            text:'复制所有',
	            tooltip: '将选中的角色另存为一个新的角色<br/>也会保存角色包含的用户和权限',
	            iconCls: 'fa fa-users',
	            listeners: {
		    	}
	        }]
	    }, '-', {
	    	xtype: 'button',
	       	iconCls: 'fa fa-cog',
	        text: '状态设定',
	        actionType: MyApp.AppConfig.ActionMenuMix,
	        menu: [{
	            text:'启用',
	            iconCls: 'fa fa-check',
	            tooltip: '将角色启用，只有被启用的角色才可以使用分配的权限<br />您可以一次启用多个角色',
	            actionType: MyApp.AppConfig.ActionEnable,
	            listeners: {
		    		click: 'onEnableClick'
		    	}
	        },{
	            text:'禁用',
	            tooltip: '将角色禁用，被禁用的角色无法使用分配的权限<br />您可以一次禁用多个角色',
	            actionType: MyApp.AppConfig.ActionDisable,
	            iconCls: 'fa fa-ban',
	            listeners: {
		    		click: 'onDisabledClick'
		    	}
	        }]
	    }, {
	    	xtype: 'button',
	    	text: '成员维护',
	    	iconCls: 'fa fa-users',
	    	tooltip: '维护角色的成员',
	    	listeners: {
	    		click: 'onShowSubs'
	    	}
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
	    }]
	}],

    columns: [
        { text: '编号',  dataIndex: 'id', align: 'right' },
        { text: '角色编码', dataIndex: 'roleCode', width: 150 },
        { 
        	text: '状态', dataIndex: 'currentStatus',
        	width: 50,
        	renderer: MyApp.AppConfig.statusRenderer,
        },
        { text: '允许的最多人数', dataIndex: 'maxUserNumber', align: 'right', width: 150},
        { text: '角色名称', dataIndex: 'roleName', flex: 1},
    ],

	listeners: {
		afterrender: 'onAfterRender',
		itemdblclick: 'onItemDoubleClick',
		itemclick: 'onItemClick'
   }
});
