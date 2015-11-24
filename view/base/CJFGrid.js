Ext.define('MyApp.view.base.CJFGrid', {
    extend: 'Ext.grid.Panel',

	permission: [],

    selModel: {
    	type: 'checkboxmodel',
    },
    
    initComponent: function() {
    	if(this.storeId) {
    		this.processStore();
    	}
		
		this.callParent();
	},
	
	processStore: function() {
		var store = Ext.create(this.storeId);
		
		Ext.apply(this, {
			store: store,
			
			bbar: {
                xtype: 'pagingtoolbar',
                pageSize: MyApp.AppConfig.GRID_PAGE_SIZE,
                store: store,
                displayInfo: true
           }
		});
	},
    
	setPermission: function (pm) {
		// console.log('setPermission');
		this.permission = Ext.JSON.decode(pm);
		// console.log(pm);
		// console.log(this.permission);
		if(this.permission == null) {
			console.warn('permission = null.');
			return ;
		}
		
		if(0 == this.permission.length) {
			console.warn('permission.length = 0');
			return ;
		}
		
		
		//grid中的工具栏使用tbar方式定义，再用下面的语句取出，可以得到toolbar，但怎么也娶不到toolbar.items
		//改成dockedItems方式定义就可以了
		//不要问我为什么，我不知道，我只想静静，也不要问我静静是谁
		// var toolbar = grid.getDockedItems('toolbar[dock="top"]');
		// console.log(grid.xtype);
		this.setToolbarPermission();
		
		this.setGridDragDropPlugin();
	},
	
	setToolbarPermission: function() {
		var grid = this;
		var toolbarId = grid.xtype + '-mainToolbar';
		var toolbar = grid.getComponent(toolbarId);
		
		if(!toolbar) {
			return ;
		}
		
		Ext.each(toolbar.items.items, function(item) {
			// console.log(this.permission);
			// console.log(item.xtype);
			if(item.xtype != 'button') {
				return ;
			}
			
			this.setButtonPermission(item, this.permission);
		}, this);//记得添加scope为this，否则无法在each函数里访问外部grid的变量
	},
	
	setButtonPermission: function(button, permission) {
		// console.log(button.text + ', ' + button.actionType);
		
		if(null == button.actionType) {
			// console.warn('undefine actionType, ignore');
			return ;
		}
		
		if(button.actionType > MyApp.AppConfig.ActionMax) {
			console.warn('actionType error :' + button.actionType);
			return ;
		}
		
		if(button.actionType == MyApp.AppConfig.ActionMenuMix) {
			Ext.each(button.menu.items.items, function(item) {
				this.setButtonPermission(item, this.permission);
			}, this);
		}
		
		var pm = permission[button.actionType];
		if(pm == 0) {
			button.setDisabled(true);
		}
	},
	
	setGridDragDropPlugin: function() {
		var grid = this;
		var ddPluginId = grid.xtype + '-dd';
		var plugin = grid.getView().getPlugin(ddPluginId);
		if(!plugin) {
			return ;
		}
		
		//系统将拖拽的事务操作定义为Modify
		var pm = this.permission[MyApp.AppConfig.ActionModify];
		
		if(pm == 0) {
			plugin.enableDrag = false;
			plugin.enableDrop = false;
		}
	}
	
});
