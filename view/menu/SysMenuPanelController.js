Ext.define('MyApp.view.menu.SysMenuPanelController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.sysMenuPanel',
	
	onAfterSysMenuListRender: function(tree, eOpts) {
		var store = tree.getStore();
		
		store.load({
			scope: this,
			callback: function(records, options, success) {
				Ext.each(records, function(item) {
					tree.expandNode(item);
				});
			}
		});	
	},
	
	onExapndAll: function(menuItem) {
		// var tree = button.ownerCt.ownerCt;
		var tree = menuItem.ownerCt.ownerCmp.ownerCt.ownerCt;
		tree.expandAll();
	},
	
	onCollapseAll: function(menuItem) {
		// console.log(menuItem);
		// console.log(menuItem.ownerCt);//menu
		// console.log(menuItem.ownerCt.ownerCmp);//button
		// console.log(menuItem.ownerCt.ownerCmp.ownerCt.ownerCt);//tree?
		
		var tree = menuItem.ownerCt.ownerCmp.ownerCt.ownerCt;
		tree.collapseAll();
	},
	
	onExapnd: function(menuItem) {
		var tree = menuItem.ownerCt.ownerCmp.ownerCt.ownerCt;
		var sm = tree.getSelectionModel();
		var records = sm.getSelection();
		Ext.each(records, function(record) {
			tree.expandNode(record);
		});
	},
	
	onCollapse: function(menuItem) {
		var tree = menuItem.ownerCt.ownerCmp.ownerCt.ownerCt;
		var sm = tree.getSelectionModel();
		var records = sm.getSelection();
		Ext.each(records, function(record) {
			tree.collapseNode(record);
		});
	},
	
	onMoveUp: function(button) {
		this.adjustMenuOrder(button, 1);
	},
	
	onMoveDown: function(button) {
		this.adjustMenuOrder(button, -1);
	},
	
	//upOrDown =  1 -> up
	//upOrDown = -1 -> down
	adjustMenuOrder: function(button, upOrDown) {
		if(!button) {
			return ;
		}
		if(upOrDown != 1 && upOrDown != -1) {
			return ;
		}
		
		var tree = button.ownerCt.ownerCt;
		var sm = tree.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 01) {
			console.log('show message -> count must be one');
			return ;
		}
		
		var records = sm.getSelection();
		var record = records[0];
		if(!record.parentNode) {
			return ;
		}
		var parent = record.parentNode;
		
		var index = parent.indexOf(record);
		console.log('index: ' + index);
		
		var before = null;
		if(upOrDown == 1) {
			if(index == 0) {
				//top of nodes, do not need move up
				console.log('already top');
				return ;
			}
			
			before = parent.getChildAt(index-1);
		} else {
			var childrenCound = parent.childNodes.length;
			if(index == (childrenCound-1) ) {
				//bottom of nodes, do not need move up
				console.log('already bottom');
				return ;
			}
			
			before = parent.getChildAt(index+2);
		}
		
		if(before) {
			console.log(before.data.menuCode);
		} else {
			//幸好API有这么一句：
			//insertBefore( node, refNode )
			//refNode : The node to insert before (if null the node is appended)
			console.log('+2 node null, append');
		}
		
		var store = tree.getStore();
		//remove 
		parent.removeChild(record, false);
		//insert before
		var newNode = parent.insertBefore(record, before);
		//重新选择该增加的node
		sm.select(newNode);
		
		this.doAdjustOrder(newNode, store, button);
	},
	
	openWindow: function(button, openMode, title, addType) {
		var grid = this.lookupReference('refSysMenuList');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1 && addType != 'root') {
			this.showMessage('请先选择一个菜单。');
			return ;
		}
		
		var rootNode = grid.getRootNode();
		var records = sm.getSelection();
		var store = button.ownerCt.ownerCt.getStore();
		
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: false,
			resizable: false,
			
			//由于窗口的拖动是Win的功能，所以Win的Title必须保留，去掉Form的Title
			header: true,
			title: title,
			
			items:[{
				xtype:'menuForm',
				openMode: openMode,
				store: store,
				lastSelectedRecord: records[0],
				addType: addType,
				rootNode: rootNode
			}]
		});	
		
		if(openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT || openMode == MyApp.AppConfig.WIN_OPENMODE_VIEW) {
			win.child('form').getForm().loadRecord(records[0]);
		} else if(openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
			var model = new MyApp.model.Menu();
			if(addType == 'after' || addType == 'before') {
				model.data.parentMenuCode = records[0].data.parentMenuCode;
				model.data.systemTypeCode = records[0].data.systemTypeCode;
			} else if(addType == 'child') {
				model.data.parentMenuCode = records[0].data.menuCode;
				model.data.systemTypeCode = records[0].data.systemTypeCode;
			} else if(addType == 'root') {
				model.data.parentMenuCode = '';
				model.data.systemTypeCode = '';
			}
			model.data.menuAction = '#';
			model.data.currentStatus = 1;
			model.data.menuTypeCode = 'content';
			
			win.child('form').getForm().loadRecord(model);
		}
		win.show();
	},
	
	onViewClick: function(button, e, eOpts) {
		var title = '菜单信息查看';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_VIEW;
		this.openWindow(button, openMode, title, '');
	},
	
	onModifyClick: function(button, e, eOpts) {
		var title = '菜单信息编辑';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_EDIT;
		this.openWindow(button, openMode, title, '');
	},
	
	//TODO; 放入公用代码库
	showMessage: function(message) {
		Ext.MessageBox.show({
            title: 'Information',
            msg: message,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFORMATION
        });
	},
	
	onCloseInForm: function(button) {
		button.ownerCt.ownerCt.ownerCt.close();
	},
	
	//修改-Beign
	onSaveInForm: function(button) {
		var form = this.getView();
		if(!form.isValid()) {
			return ;
		}
		
		var store = this.getView().store;
		
        var form = this.getView();
        if (form.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
        	this.doCreate(store, form);
        } else if(form.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
        	this.doUpdate(store, form);
        }
	},
	
	doCreate: function(store, form) {
		var addType = form.addType;
		// console.log(addType);
		// console.log(form.rootNode);
		
		var record = form.getForm().getValues();
		record.id = 0;
		// console.log(record);
		
		var lastRecord = form.lastSelectedRecord;
		var parent = lastRecord.parentNode;
		var index = parent.indexOf(lastRecord);
		
		var menu = Ext.create('MyApp.model.Menu');
		menu.cloneFormMenuTreeNode(record);
		var jsonString = Ext.encode(menu.data);		
		// console.log(jsonString);
		
		var url = store.proxy.api.create;
		console.log(url);
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
			            title: '系统提示1',
			            msg: result.message,
			            buttons: Ext.MessageBox.OK,
			            icon: Ext.MessageBox.ERROR
			        });
                } else {
                	
                	record.id = result.obj.id;
                	record.leaf = true;//successed
                	// console.log(record);
                	
                	var newNode = null;
                	if(addType == 'child') {
                		newNode = lastRecord.insertBefore(record, null);
                	} else if(addType == 'before') {
                		newNode = parent.insertChild(index, record);
                	} else if(addType == 'after') {
                		newNode = parent.insertChild(index+1, record);
                	} else if(addType == 'root') {
                		var rootNode = form.rootNode;
                		newNode = rootNode.insertBefore(record, null);
                	}
                	
                	// this.ownerCt.close();//scope is form
                	// console.log(this);//sysMenuPanel; scope is this
                	// this.close();
                	form.ownerCt.close();
                	
                	this.doAdjustOrder(newNode, store, null);
                	// console.log(newNode);
                	
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	
	doAdjustOrder: function(newNode, store, button) {
		if(button) {
			button.setDisabled(true);
		}
		
		//调整parent下的所有node的顺序值
		var children = newNode.parentNode.childNodes;
		var index =1;
		var menus = [];
		Ext.each(children, function(item) {
			item.data.dispOrder = index++;
			
			var menu = new Object({
			    id: item.id,
			    dispOrder: item.data.dispOrder
			});
			menus.push(menu);
		});
		
		var jsonString = Ext.JSON.encode(menus);
		var url = store.proxy.api.updateOrder;
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
                }
                
                if(button) {
					button.setDisabled(false);
				}
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		         
		         if(button) {
					button.setDisabled(false);
				}
		    }

		});
	},
	
	doUpdate: function(store, form) {
		var record = form.getForm().getValues();
		console.log(record);
		
		var lastRecord = form.lastSelectedRecord;
		console.log(lastRecord);
		
		var parent = lastRecord.parentNode;
		var index = parent.indexOf(lastRecord);
		// console.log('parent-beforeInsert: ');
		// console.log(parent);
		// console.log(index);
		// var current = parent.getChildAt(index);
		// console.log(current);
		
		var menu = Ext.create('MyApp.model.Menu');
		menu.cloneFormMenuTreeNode(record);
		var jsonString = Ext.encode(menu.data);		
		// console.log(jsonString);
		
		var url = store.proxy.api.update;
		console.log(url);
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
                	//TODO; set all fields value
                	//使用删除，在增加的方式失败，节点增加不进去；并且如果节点有子节点，采用删除再增加的方式也有问题
                	lastRecord.set('text', menu.data.menuTitle);
                	lastRecord.set('currentStatus', menu.data.currentStatu);
                	
                	this.ownerCt.close();
                }
			},
			
			failure: function(response, opts) {
		         console.log('server-side failure with status code ' + response.status);
		    }

		});
	},
	//修改-End
	
	//增加-Begin
	//TODO; 增加成功后，需要调整显示顺序
	onAddChild: function(menuItem) {
		var button = menuItem.ownerCt.ownerCmp;
		var title = '菜单信息增加';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_CREATE;
		this.openWindow(button, openMode, title, 'child');
	},
	
	onAddBeforeCurrent: function(menuItem) {
		var button = menuItem.ownerCt.ownerCmp;
		var title = '菜单信息增加';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_CREATE;
		this.openWindow(button, openMode, title, 'before');
	},
	
	onAddAfterCurrent: function(menuItem) {
		var button = menuItem.ownerCt.ownerCmp;
		var title = '菜单信息增加';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_CREATE;
		this.openWindow(button, openMode, title, 'after');
	},
	
	onAddRoot: function(menuItem) {
		var button = menuItem.ownerCt.ownerCmp;
		var title = '菜单信息增加';
		var openMode = MyApp.AppConfig.WIN_OPENMODE_CREATE;
		this.openWindow(button, openMode, title, 'root');
	},
	//增加-End
	
});