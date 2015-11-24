Ext.define('MyApp.view.user.UserPanelController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.userPanel',
	
	doInit: function() {
		console.log('^_^');
	},
	
	//trigger handel event 无法传递参数（在api中未找到）
	onSearchTrigger: function() {
		// var app = MyApp.getApplication();
		// var ct = app.getController('MyApp.view.user.UserPanelController');
		var searchPanel = this.lookupReference('refUserSearchForm');
		
		var win = Ext.create('MyApp.view.commdialog.StatusWin', {
			closable: true,
			
			/*
			bbar: ['->', {
		    	iconCls: 'fa fa-close',
		    	text: '关闭',
		    	handler: this.onStatusWinClose
		    }, {
		    	iconCls: 'fa fa-sign-in',
		    	text: '选择',
		    	handler: this.onStatusWinSelect
		    }],
		    */
		    
		    invokerEvent: this.onStatusWinSelect,
		    invokerPanel: searchPanel
		});
		win.show();
		
		return false;
	},
	
	/*
	onStatusWinClose: function(button) {
		//button.ownerCt == toolbar
		//toolbar.ownerCt = win
		button.ownerCt.ownerCt.close();
	},
	*/
	
	onStatusWinSelect: function(button, record, panel) {
		var showField = panel.getForm().getFields().get('currentStatusEx');
		showField.setValue(record.data.name);
		
		// var hiddenField = panel.getForm().getFields().get('currentStatus');
		// hiddenField.setValue(record.data.id);
		
		var hiddenField = panel.getComponent('currentStatus');
		// console.log(hiddenField);
		hiddenField.setValue(record.data.id);
	},
	
	onSearchReset: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refUserSearchForm');
		searchForm.reset();
	},
	
	onSearch: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refUserSearchForm');
		var jsonString = Ext.JSON.encode(searchForm.getValues());
		// console.log(jsonString);
		
		//TODO; 将分页信息改为第一页
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {jsonString: jsonString});
		
		store.reload();
	},
	
	onShowQueryArea: function(button, e, eOpts) {
		var searchForm = this.lookupReference('refUserSearchForm');
		// console.log(searchForm);
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
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		
		// var grid = this.getView();
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count == 0) {
			this.showMessage('请至少选择一个用户');
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
			url = '/ChimpJavaWeb/enableUsers.do';
		} else if (status == MyApp.AppConfig.DISABLE) {
			url = '/ChimpJavaWeb/disableUsers.do';
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
	
	onCopyClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		// var grid = this.getView();
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个用户。');
			return ;
		}
		
		var store = grid.getStore();
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '用户另存',
			
			items:[{
				xtype:'userForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_CREATE,
				store: store
			}]
		});	
		
		var records = sm.getSelection();
		var record = records[0].clone();
		
		record.data.id = 0;
		record.data.userCode = '';
		win.child('form').getForm().loadRecord(record);
				
		win.show();
	},
	
	onDeleteClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		// var grid = this.getView();
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个用户。');
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
		
		// console.log('doDelete');
		// console.log(record.data.id);
		// console.log(url);
		
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
                	// console.log(result.obj);
                	// console.log(record.id);
                	// var r = console.log(store.getById(record.id));
                	// console.log(r);
                	store.remove(record);
                	
                	// grid.getView().refresh();
                	
                	// console.log(grid);
                	// console.log(grid.getView());
                	
                	// API描述中有该方法，但FireBug提示没有该方法(doRefresh)
                	// var ptb = grid.getDockedItems('pagingtoolbar');
                	// ptb.doRefresh();
                	
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
    },
	
	onMultiDeleteClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		// var grid = this.getView();
		var store = grid.getStore();
		
		var sm = grid.getSelectionModel();
		var records = sm.getSelection();
		// console.log(records);
		
		//type 1
		// var jsonString = '';
		// for(var i=0;i<records.length;i++) {
			// if(i != 0) {
				// jsonString += ',';
			// }
			// jsonString += Ext.JSON.encode(records[i].data);
		// }
		// jsonString = '[' + jsonString + ']';
		// console.log(jsonString);
		
		//type 2
		// var ids = [];
		// for(var i=0;i<records.length;i++) {
			// ids.push(records[i].data.id);
		// }
		// console.log(ids);
		
		//type 3
		var idse = [];
		Ext.each(records, function(item) {
			idse.push(item.data.id);
		});
		console.log(idse);
	},
	
	onEditClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		// var grid = this.getView();
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个用户。');
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
			title: '用户信息修改',
			
			items:[{
				xtype:'userForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_EDIT,
				store: store
			}]
		});	
		
		win.child('form').getForm().loadRecord(records[0]);
		win.show();
	},
	
	onCreateClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		var store = grid.getStore();
		
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			header: true,
			title: '增加用户',
			
			items:[{
				xtype:'userForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_CREATE,
				store: store
			}]
			
		});	
		
		var model = new MyApp.model.User();
		//set default value here
		model.data.userCode = '';
		model.data.currentStatus = 0;
		win.child('form').getForm().loadRecord(model);
		win.child('form').setStore(store);
		
		win.show();
	},
	
	onViewClick: function(button, e, eOpts) {
		var userListPanel = this.lookupReference('refUserList');
		var grid = userListPanel;
		// var grid = this.getView();
		
		// console.log(grid);
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个用户。');
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
			
			// buttons:[{
				// xtype:'button',
				// text:'关闭',
				// listeners: {
					// //error
					// // click: 'onCloseInWin'
					// //success
					// click: this.onCloseInWin
				// }
			// }],
			// buttonAlign:'right',
			
			items:[{
				xtype:'userForm',
				openMode: MyApp.AppConfig.WIN_OPENMODE_VIEW
			}]
		});	
		
		// win.child('form').init();
		// win.child('form').setOpenMode(MyApp.util.Config.WIN_OPENMODE_VIEW);
		win.child('form').getForm().loadRecord(records[0]);
		
		win.show();
	},
	
	onCloseInWin: function() {
		console.log('onCloseInWin');
	},
	
	onCloseInForm: function(button) {
		// console.log('onCloseInForm');
		// console.log(button.ownerCt);//toolbar
		// console.log(button.ownerCt.ownerCt);//form
		// console.log(button.ownerCt.ownerCt.ownerCt);//window
		
		button.ownerCt.ownerCt.ownerCt.close();
	},
	
	onSaveInForm: function(button) {
		// var form = button.ownerCt.ownerCt;
		// console.log(form);
		
		//store = null
		// var store = this.getStore();
		// var store = this.getStore('');
		// var store = this.getStore('MyApp.store.User');
		// var store = this.getStore('store.user');
		// var store = this.getStore('user');
		
		//grid = null; why?
		// var grid = this.lookupReference('refUserList');
		// console.log(grid);
		
		//this.getView = button.ownerCt.ownerCt
		//即：Ext.app.ViewController.getView
		var form = this.getView();
		if(!form.isValid()) {
			return ;
		}
		
		//给UserForm添加一个自定义参数Store，并在创建时赋值
		var store = this.getView().store;
		
		// var paramsBak = store.proxy.extraParams;
		// store.proxy.extraParams = null;
		
		// console.log(jsonString);
		// console.log(store.proxy.api.create);
		// store.each(function(item){
			// console.log('userCode:%s', item.data.userCode);
			// console.log('dirty:' + item.dirty);
			// console.log('modified:' + item.modified);
			// console.log('phantom:' + item.phantom);
		// });
		//api描述通过getModifiedRecords可以得到增加和修改的记录，但实际取不到；原因未知
		//所以无法使用store.sync方法；只能使用Ext.Ajax.request
		// console.log(store.getModifiedRecords());
		
		// store.sync({
            // scope: this,
            // method: 'post',
            // params: {jsonString: jsonString},
            // success: function(batch, options) {
                // var json = batch.operations[0].response.responseText;
                // var result = Ext.JSON.decode(json, true);
                // console.log(json);
                // console.log(result);
            // },
// 
            // failure: function(batch, options) {
                // var error = batch.operations[0].error;
                // console.log(error);
            // }
        // });	
        
        var form = this.getView();
        if (form.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
        	this.doCreate(store, form);
        } else if(form.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
        	this.doUpdate(store, form);
        }
	},
	
	doUpdate: function(store, form) {
		var record = form.getForm().getValues();
		console.log('after:');
		console.log(record);
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
			            title: '系统提示1',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	// console.log(result.obj);
                	// console.log(record.id);
                	// var r = console.log(store.getById(record.id));
                	// console.log(r);
                	
                	var index = store.indexOf(record);
                	store.remove(record);
                	//remove再增加，会将增加的行放在表格的最下面
                	// store.add(result.obj);
                	store.insert(index, result.obj);
                	
                	this.ownerCt.close();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	
	doCreate: function(store, form) {
		var record = form.getForm().getValues();
		record.id = 0;
		record.password = '';
		var jsonString = Ext.encode(record);
		var url = store.proxy.api.create;
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
			            title: '系统提示1',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	// store.reload();
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
		// console.log('onAfterRender-userPanelController');
		// console.log(grid.permission);
		
		var jsonValue = {};
		
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {
			jsonString: Ext.encode(jsonValue)
		});
		store.load();		
	},
	
	onItemDoubleClick: function(grid, record, item, index, e, eOpts) {
		this.openWindow(MyApp.AppConfig.WIN_OPENMODE_VIEW, '查看用户信息-DB', record);
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
				xtype:'userForm',
				openMode: openMode,
				store: store
			}]
		});	
		
		win.child('form').getForm().loadRecord(record);
		win.show();
	}
	

});