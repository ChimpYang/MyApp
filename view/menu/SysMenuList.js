Ext.define('MyApp.view.menu.SysMenuList', {
    extend: 'MyApp.view.base.CJFTree',
    xtype: 'sysMenulist',

    requires: [
    	'MyApp.model.Menu',
        'MyApp.store.Menu',
        
        'MyApp.view.menu.MenuForm'
    ],
    
    storeId: 'MyApp.store.Menu',
    
	minWidth: 400,
	frame: true,
	columnLines: true,
	rowLines: true,
	
    columns: [{
		text: '编号',
       	dataIndex: 'id',
       	width: 60,
       	menuDisabled: true,
		sortable: false,
    },{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: '菜单名称',
        dataIndex: 'text',
        flex: 1,
       	menuDisabled: true,
		sortable: false,
    }, {
		text: '菜单编码',
		dataIndex: 'menuCode',
		width: 120,
       	menuDisabled: true,
		sortable: false,
    }, {
		text: '菜单功能',
		dataIndex: 'menuAction',
		width: 160,
       	menuDisabled: true,
		sortable: false,
    }, {
		text: '功能类型',
		dataIndex: 'menuTypeCode',
		width: 80,
       	menuDisabled: true,
		sortable: false,
    }, {
		text: '系统',
		dataIndex: 'systemTypeCode',
		width: 130,
       	menuDisabled: true,
		sortable: false,
    }, {
		text: '状态',
		dataIndex: 'currentStatus',
		width: 50,
		renderer: MyApp.AppConfig.statusRenderer,
       	menuDisabled: true,
		sortable: false,
    }, {
    	xtype:'actioncolumn',
    	
		text: '图标',
		dataIndex: 'menuIcon',
		width: 50,
       	menuDisabled: true,
		sortable: false,
		
		//TODO; 有没有更好的办法？或者说更标准的做法
		renderer: function(val) {
			return '<div class="x-action-col-icon x-action-col-0  ' + val + '" role="button" tabindex="-1" data-tabindex-value="0" data-tabindex-counter="1"></div>';
		}
    }],
    
   dockedItems: [{
	    xtype: 'toolbar',
	    dock: 'top',
	    id: 'sysMenuList-mainToolbar',
	    
	    items: [{
	    	xtype: 'button',
	    	iconCls: 'fa fa-indent',
	    	text: '展开收缩',
	    	actionType: MyApp.AppConfig.ActionNONE,
	    	
	    	menu: [{
	            text:'展开全部',
	            listeners: {
		    		click: 'onExapndAll'
		    	}
	        }, {
	            text:'收缩全部',
	            listeners: {
		    		click: 'onCollapseAll'
		    	}
	        }, '-', {
	            text:'展开选中',
	            listeners: {
		    		click: 'onExapnd'
		    	}
	        }, {
	            text:'收缩选中',
	            listeners: {
		    		click: 'onCollapse'
		    	}
	        }]
	    }, {
	    	iconCls: 'fa fa-file-text-o',
	        text: '查看',
	        actionType: MyApp.AppConfig.ActionQuery,
	        listeners: {
	        	click: 'onViewClick'
			}
	    }, '-', {
	    	iconCls: 'fa fa-file-o',
	    	text: '增加',
	    	actionType: MyApp.AppConfig.ActionMenuMix,
	    	menu: [{
	            text:'增加子项',
	            actionType: MyApp.AppConfig.ActionCreate,
	            listeners: {
		    		click: 'onAddChild'
		    	}
	        }, {
	            text:'同级-之前',
	            actionType: MyApp.AppConfig.ActionCreate,
	            listeners: {
		    		click: 'onAddBeforeCurrent'
		    	}
	        }, {
	            text:'同级-之后',
	            actionType: MyApp.AppConfig.ActionCreate,
	            listeners: {
		    		click: 'onAddAfterCurrent'
		    	}
	        }, '-', {
	        	text: '根节点',
	        	actionType: MyApp.AppConfig.ActionCreate,
	        	listeners: {
		    		click: 'onAddRoot'
		    	}
	        }]
	    },{
	    	iconCls: 'fa fa-edit',
	    	text: '修改',
	    	actionType: MyApp.AppConfig.ActionModify,
	    	listeners: {
	        	click: 'onModifyClick'
			}
	    },{
	    	iconCls: 'fa fa-trash',
	    	text: '删除',
	    	actionType: MyApp.AppConfig.ActionRemove,
	    }, '-', {
	    	iconCls: 'fa fa-arrow-up',
	    	actionType: MyApp.AppConfig.ActionSpecial1,
	    	tooltip: '提高显示顺序，使该功能显示在前',
	    	listeners: {
	    		click: 'onMoveUp'
			}
	    }, {
	    	iconCls: 'fa fa-arrow-down',
	    	actionType: MyApp.AppConfig.ActionSpecial1,
	    	tooltip: '降低显示顺序，使该功能显示在后',
	    	listeners: {
	    		click: 'onMoveDown'
			}
	    }, '-', {
	    	xtype: 'button',
	       	iconCls: 'fa fa-cog',
	        text: '状态设定',
	        actionType: MyApp.AppConfig.ActionMenuMix,
	        menu: [{
	            text:'启用',
	            iconCls: 'fa fa-check',
	            actionType: MyApp.AppConfig.ActionEnable,
	        },{
	            text:'禁用',
	            actionType: MyApp.AppConfig.ActionDisable,
	            iconCls: 'fa fa-ban',
	        }]
	    }, '-', {
	    	xtype: 'button',
	    	text: '显示查询',
	    	iconCls: 'fa fa-search',
	    	tooltip: '显示或隐藏查询界面',
	    	listeners: {
	    	}
	    }]
	}],
	
	listeners: {
		afterrender: 'onAfterSysMenuListRender'
	}
    
});