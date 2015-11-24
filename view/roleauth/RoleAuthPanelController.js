Ext.define('MyApp.view.roleauth.RoleAuthPanelController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.roleAuthPanel',
	
	onAfterRoleListRender: function(grid, eOpts) {
		var jsonValue = {};
		
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {
			jsonString: Ext.encode(jsonValue)
		});
		store.load();		
	},
	
	onShowQueryArea: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refAuthRoleSearchForm');
		var isHidden = searchForm.isHidden();
		if(isHidden) {
			button.setText('隐藏查询');
			button.setIconCls('fa fa-search-minus');
			searchForm.show();
		} else {
			button.setText('显示查询');
			button.setIconCls('fa fa-search');
			searchForm.hide();
		}
		
	},
	
	onSearchReset: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refAuthRoleSearchForm');
		searchForm.reset();
	},
	
	onSearch: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refAuthRoleSearchForm');
		var jsonString = Ext.JSON.encode(searchForm.getValues());
		
		//TODO; 将分页信息改为第一页
		var grid = this.lookupReference('refAuthRoleList');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {jsonString: jsonString});
		
		store.reload();
	},
	
	//不要用这个方法，重复点击同一行会重复触发该事件
	//使用onRoleSelectionchange事件
	onRoleItemClick: function( grid, record, item, index, e, eOpts ) {
		// console.log("roleClick: " + record.data.roleName);
	},
	
	onRoleSelectionchange: function(grid, selected, eOpts) {
		if(!selected[0]) {
			return ;
		}
		
		var tree = this.lookupReference('refRoleAuthList');
		var store = tree.getStore();
		
		var item = {
			roleCode: ''
		};
		item.roleCode =selected[0].data.roleCode;
		var jsonString = Ext.JSON.encode(item);
		// console.log(jsonString);
		Ext.apply(store.proxy.extraParams, {jsonString: jsonString});
		// store.load();
		store.load({
		    scope: this,
		    callback: function(records, operation, success) {
		    	if(success) {
		        	tree.expandAll();
		       	}
		    }
		});
	},
	
	onSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().selectAll();
	},
	
	onUnSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().deselectAll();
	},
	
	onGrantAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count == 0) {
			return ;
		}
		
		var records = sm.getSelection();
		Ext.each(records, function(item) {
			console.log(item.data.menuTitle);
			item.data.canCreate = 1;
			item.data.canRemove = 1;
			item.data.canModify = 1;
			item.data.canQuery = 1;
			item.data.canExport = 1;
			item.data.canImport = 1;
			item.data.canAttachmentCreate = 1;
			item.data.canAttachmentRemove = 1;
			item.data.canEnable = 1;
			item.data.canDisable = 1;
			item.data.canSpecial1 = 1;
			item.data.canSpecial2 = 1;
			item.data.canSpecial3 = 1;
		});	
		
		grid.getView().refresh();
	},
	
	onGrantRemoveAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count == 0) {
			return ;
		}
		
		var records = sm.getSelection();
		Ext.each(records, function(item) {
			console.log(item.data.menuTitle);
			item.data.canCreate = 0;
			item.data.canRemove = 0;
			item.data.canModify = 0;
			item.data.canQuery = 0;
			item.data.canExport = 0;
			item.data.canImport = 0;
			item.data.canAttachmentCreate = 0;
			item.data.canAttachmentRemove = 0;
			item.data.canEnable = 0;
			item.data.canDisable = 0;
			item.data.canSpecial1 = 0;
			item.data.canSpecial2 = 0;
			item.data.canSpecial3 = 0;
		});	
		
		grid.getView().refresh();
	},
	
	onHeaderClick: function(ct, column, e, t, eOpts ) {
		var grid = ct.ownerCt;
		
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count == 0) {
			return ;
		}
		
		var x = 0;
		if(column.grant) {
			x = 1;
		}
		column.grant = !column.grant;
		
		// console.log(column.dataIndex);
		var records = sm.getSelection();
		Ext.each(records, function(item) {
			switch(column.getIndex()) {
				case 1:
					item.data.canCreate = x;
					break;
				case 2:
					item.data.canRemove = x;
					break;
				case 3:
					item.data.canModify = x;
					break;
				case 4:
					item.data.canQuery = x;
					break;
				case 5:
					item.data.canEnable = x;
					break;
				case 6:
					item.data.canDisable = x;
					break;
				case 7:
					item.data.canImport = x;
					break;
				case 8:
					item.data.canExport = x;
					break;
				case 9:
					item.data.canAttachmentCreate = x;
					break;
				case 10:
					item.data.canAttachmentRemove = x;
					break;
				case 11:
					item.data.canSpecial1 = x;
					break;
				case 12:
					item.data.canSpecial2 = x;
					break;
				case 13:
					item.data.canSpecial3 = x;
					break;
			}
		});
		
		grid.getView().refresh();
	},
	
	//按照规则保存角色权限
	//1. 所有权限有值为1的节点
	//2. 如果叶子节点徐需要保存，该节点对应的所有父节点都要保存
	//3. 权限的判断是针对叶子节点的，所以保存的父节点所有权限值都可以为0，为1系统也不认
	onSaveRoleAuth: function(button) {
		var grid = button.ownerCt.ownerCt;
		var store = grid.getStore();
		
		if(store.data.items.length == 0) {
			console.log('no auth infos.');
			return ;
		}
		//没有选择任何权限是，该角色编码用来传递给后台，删除该角色的权限
		var roleCode = store.data.items[0].data.roleCode;
	
		var authUpToParent = function(store, item) {
			item.data.canQuery = 1;

			if(item.data.parentId != 'root') {
				authUpToParent(store, store.getById(item.data.parentId));
			}
		};
		
		//处理子节点的父节点
		Ext.each(store.data.items, function(item){
			var sum = item.data.canCreate + item.data.canModify + item.data.canRemove + item.data.canQuery 
				+ item.data.canImport + item.data.canExport
				+ item.data.canAttachmentCreate + item.data.canAttachmentRemove + item.data.canEnable + item.data.canDisable
				+ item.data.canSpecial1 + item.data.canSpecial2 + item.data.canSpecial3;
				
			if(item.data.leaf && sum>0) {
				authUpToParent(store, store.getById(item.data.parentId));
			}
		});
		grid.getView().refresh();
		
		//将所有选择了权限的行保存(未选择任何权限的行不会保存)
		var availableItems = [];
		Ext.each(store.data.items, function(item){
			var sum = item.data.canCreate + item.data.canModify + item.data.canRemove + item.data.canQuery 
				+ item.data.canImport + item.data.canExport
				+ item.data.canAttachmentCreate + item.data.canAttachmentRemove + item.data.canEnable + item.data.canDisable
				+ item.data.canSpecial1 + item.data.canSpecial2 + item.data.canSpecial3;
			
			if(sum>0) {
				var newItem = Ext.create('MyApp.model.RoleMenuAuth', {
					id: 0,
					menuCode : item.data.menuCode,
					roleCode : item.data.roleCode,
					canCreate : item.data.canCreate?1:0,
					canRemove : item.data.canRemove?1:0,
					canModify : item.data.canModify?1:0,
					canQuery : item.data.canQuery?1:0,
					canExport : item.data.canExport?1:0,
					canImport : item.data.canImport?1:0,
					canAttachmentCreate : item.data.canAttachmentCreate?1:0,
					canAttachmentRemove : item.data.canAttachmentRemove?1:0,
					canEnable : item.data.canEnable?1:0,
					canDisable : item.data.canDisable?1:0,
					canSpecial1 : item.data.canSpecial1?1:0,
					canSpecial2 : item.data.canSpecial2?1:0,
					canSpecial3 : item.data.canSpecial3?1:0
				});
				availableItems.push(newItem.data);
			}
		});
		
		if(availableItems.length == 0) {
			var newItem = Ext.create('MyApp.model.RoleMenuAuth', {
				roleCode: roleCode
			});
			availableItems.push(newItem.data);
		}
		var jsonString = Ext.JSON.encode(availableItems);
		
		var url = store.proxy.api.create;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.JSON.decode(text);
				
                if (!result.success) {
                	dropHandlers.cancelDrop();
                	console.warn(result.message);
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.OK
			        });
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
		
	},
	
	
});