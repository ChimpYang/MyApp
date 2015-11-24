Ext.define('MyApp.view.role.RolePanelController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.rolePanel',
	
	//=== SelectAll, UnSelectAll
	onUserListNotInSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().selectAll();
	},
	
	onUserListNotInUnSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().deselectAll();
	},
	
	onUserListInSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().selectAll();
	},
	
	onUserListInUnSelectAll: function(button) {
		var grid = button.ownerCt.ownerCt;
		grid.getSelectionModel().deselectAll();
	},
	//
	
	//=== Drop
	//data参数是拖拽过来的记录集合
	//从已经存在表格拖拽到不存在表格；所以是删除
	beforeDropFromIn: function(node, data, dropRec, dropPosition, dropHandlers) {
		var items = [];
		Ext.each(data.records, function(item) {
			items.push(item.data);
		});
		var jsonString = Ext.JSON.encode(items);
		
		var url = data.view.getStore().proxy.api.destroy;
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
                	dropHandlers.processDrop();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		         dropHandlers.cancelDrop();
		    }

		});
	},
	
	//data参数是拖拽过来的记录集合
	//从不存在表格拖拽到已经存在表格；所以是增加
	beforeDropFromNotIn: function(node, data, dropRec, dropPosition, dropHandlers) {
		var items = [];
		Ext.each(data.records, function(item) {
			items.push(item.data);
		});
		var jsonString = Ext.JSON.encode(items);
		
		var url = data.view.getStore().proxy.api.create;
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
                	dropHandlers.processDrop();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		         dropHandlers.cancelDrop();
		    }

		});
	},
    //===
	
	onItemClick: function( grid, record, item, index, e, eOpts ) {
		var grid = this.lookupReference('refRoleUserInList');
		var store = grid.getStore();
		var jsonString = Ext.JSON.encode(record.data);
		Ext.apply(store.proxy.extraParams, {jsonString: jsonString});
		// store.reload();
		store.loadPage(1);
		
		var grid1 = this.lookupReference('refRoleUserNotInList');
		var store1 = grid1.getStore();
		var jsonString1 = Ext.JSON.encode(record.data);
		Ext.apply(store1.proxy.extraParams, {jsonString: jsonString1});
		// store1.reload();
		store1.loadPage(1);
	},
	
	doInit: function() {
	},
	
	onSearchReset: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refRoleSearchForm');
		searchForm.reset();
	},
	
	onSearch: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refRoleSearchForm');
		var jsonString = Ext.JSON.encode(searchForm.getValues());
		// console.log(jsonString);
		
		//TODO; 将分页信息改为第一页
		var grid = this.lookupReference('refRoleList');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {jsonString: jsonString});
		
		store.reload();
	},
	
	onShowSubs: function(button, e, eOpts) {
		var panel = this.lookupReference('refRoleUserList');
		var isHidden = panel.isHidden();
		if(isHidden) {
			panel.show();
		} else {
			panel.hide();
		}
	},
	
	onShowQueryArea: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refRoleSearchForm');
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
	
	onEnableClick: function(button, e, eOpts) {
		this.updateStatus(MyApp.AppConfig.ENABLE, button, e, eOpts);
	},
	
	onDisabledClick: function(button, e, eOpts) {
		this.updateStatus(MyApp.AppConfig.DISABLE, button, e, eOpts);
	},
	
	updateStatus: function(status, button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count == 0) {
			this.showMessage('请至少选择一个角色');
			return ;
		}
		
		var message = '';
		if(status == MyApp.AppConfig.ENABLE) {
			message = '是否确定启用?';
		} else if (status == MyApp.AppConfig.DISABLE) {
			message = '是否确定禁用?';
		}
		
		var records = sm.getSelection();
		var ids = [];
		Ext.each(records, function(item) {
			ids.push(item.data.id);
		});
		
		var jsonString = Ext.JSON.encode(ids);
		var store = grid.getStore();
		
		Ext.MessageBox.confirm(
			'Confirm', 
			message, 
			function(btn) {
				if('yes' == btn) {
					this.doUpdateStatus(status, jsonString, store, grid, records);
				}
			},
			this
		);
	},
	
	doUpdateStatus: function(status, jsonString, store, grid, records) {
		var url = '';
		if(status == MyApp.AppConfig.ENABLE) {
			url = store.proxy.api.enable;
		} else if (status == MyApp.AppConfig.DISABLE) {
			url = store.proxy.api.disable;
		}
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.JSON.decode(text);
				
                if (!result.success) {
                	console.warn(result.message);
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	Ext.each(records, function(item) {
						item.data.currentStatus = status;
					});
					
					grid.getView().refresh();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	
	onCopyExClick: function(button) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个角色。');
			return ;
		}
		
		var records = sm.getSelection();
		var record = records[0].clone();
		var oldRoleCode = record.data.roleCode;
		record.data.id = 0;
		record.data.roleCode = '';
		
		var store = grid.getStore();
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '角色另存',
			
			items:[{
				xtype:'roleForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_CREATE,
				store: store,
				oldRoleCode: oldRoleCode
			}]
		});	
		
		win.child('form').getForm().loadRecord(record);
				
		win.show();
	},
	
	onCopyClick: function(button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个角色。');
			return ;
		}
		
		var store = grid.getStore();
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '角色另存',
			
			items:[{
				xtype:'roleForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_CREATE,
				store: store
			}]
		});	
		
		var records = sm.getSelection();
		var record = records[0].clone();
		
		record.data.id = 0;
		record.data.roleCode = '';
		
		win.child('form').getForm().loadRecord(record);
				
		win.show();
	},
	
	onDeleteClick: function(button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个角色。');
			return ;
		}
		
		var records = sm.getSelection();
		var store = grid.getStore();
		Ext.MessageBox.confirm(
			'Confirm', 
			'是否确定删除该记录?', 
			function(btn) {
				if('yes' == btn) {
					this.doDelete(store, grid, records[0]);
				}
			}, 
			this
		);
	},
	
	doDelete: function(store, grid, record) {
		var url = store.proxy.api.destroy;
		var id = record.data.id;
		
		Ext.Ajax.request({
			scope: grid,
			url: url,
			params: {id: id},
			success: function(response){
				var text = response.responseText;
				var result = Ext.JSON.decode(text);
				
                if (!result.success) {
                	console.warn(result.message);
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	store.remove(record);
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
    },
	
	onEditClick: function(button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个角色。');
			return ;
		}
		
		var records = sm.getSelection();
		var store = grid.getStore();
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '角色信息修改',
			
			items:[{
				xtype:'roleForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_EDIT,
				store: store
			}]
		});	
		
		win.child('form').getForm().loadRecord(records[0]);
		win.show();
	},
	
	onCreateClick: function(button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var store = grid.getStore();
		
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '增加角色',
			
			items:[{
				xtype:'roleForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_CREATE,
				store: store
			}]
			
		});	
		
		var model = new MyApp.model.Role();
		//set default value here
		model.data.roleCode = '';
		model.data.currentStatus = 0;
		model.data.maxUserNumber = 1;
		
		win.child('form').getForm().loadRecord(model);
		win.child('form').setStore(store);
		
		win.show();
	},
	
	onViewClick: function(button, e, eOpts) {
		var grid = this.lookupReference('refRoleList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个角色。');
			return ;
		}
		
		var records = sm.getSelection();
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			//由于窗口的拖动是Win的功能，所以Win的Title必须保留，去掉Form的Title
			header: true,
			title: '用户信息查看',
			
			items:[{
				xtype:'roleForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_VIEW
			}]
		});	
		
		win.child('form').getForm().loadRecord(records[0]);
		win.show();
	},
	
	onCloseInWin: function() {
		
	},
	
	onCloseInForm: function(button) {
		button.ownerCt.ownerCt.ownerCt.close();
	},
	
	onSaveInForm: function(button) {
		var form = this.getView();
		if(!form.isValid()) {
			return ;
		}
		
		var oldRoleCode = form.oldRoleCode;
		
		var store = this.getView().store;
        var form = this.getView();
        if (form.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
        	this.doCreate(store, form, oldRoleCode);
        } else if(form.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
        	this.doUpdate(store, form);
        }
	},
	
	doUpdate: function(store, form) {
		var record = form.getForm().getValues();
		
		var jsonString = Ext.encode(record);
		var url = store.proxy.api.update;
		Ext.Ajax.request({
			scope: form,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.JSON.decode(text);
				
                if (!result.success) {
                	console.warn(result.message);
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	var index = store.indexOf(record);
                	store.remove(record);
                	store.insert(index, result.obj);
                	
                	this.ownerCt.close();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	
	doCreate: function(store, form, oldRoleCode) {
		var record = form.getForm().getValues();
		record.id = 0;
		var jsonString = Ext.encode(record);
		var url = '';
		var params = {};
		if('' == oldRoleCode) {
			url = store.proxy.api.create;
			params = {
				jsonString: jsonString
			};
		} else {
			url = store.proxy.api.saveas;
			params = {
				jsonString: jsonString,
				oldRoleCode: oldRoleCode
			};
		}
		
		Ext.Ajax.request({
			scope: form,
			url: url,
			params: params,
			success: function(response){
				var text = response.responseText;
				var result = Ext.JSON.decode(text);
				
                if (!result.success) {
                	console.warn(result.message);
                	Ext.MessageBox.show({
			            title: '系统提示',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	store.add(result.obj);
                	this.ownerCt.close();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	
	showMessage: function(message) {
		Ext.MessageBox.show({
            title: 'Information',
            msg: message,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFORMATION
        });
	},
	
	onAfterRender: function(grid, eOpts) {
		var jsonValue = {};
		
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {
			jsonString: Ext.encode(jsonValue)
		});
		store.load();		
	},
	
	onItemDoubleClick: function(grid, record, item, index, e, eOpts) {
		this.openWindow(MyApp.AppConfig.WIN_OPENMODE_VIEW, '查看角色信息', record);
	},
	
	openWindow: function(openMode, title, record, store) {
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: title,
			
			items:[{
				xtype:'roleForm',
				openMode: openMode,
				store: store
			}]
		});	
		
		win.child('form').getForm().loadRecord(record);
		win.show();
	}
	

});