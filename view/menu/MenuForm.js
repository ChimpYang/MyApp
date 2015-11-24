Ext.define('MyApp.view.menu.MenuForm', {
    // extend: 'Ext.form.Panel',
    extend: 'MyApp.view.base.CJFForm',
    xtype: 'menuForm',
    
    requires: [
    	'MyApp.store.array.Status',
    	'MyApp.store.array.MenuType',
    	
    	'MyApp.store.SysTypeVal'
    ],
    
    header: false,
    frame:true,
    width: 600,
    bodyPadding: 10,
    
    openMode: 0,//Config.WIN_OPENMODE_VIEW,
    parentNode: null,
    rootNode:null,
    store: null,
    lastSelectedRecord: null,
    addType: '',
    
    controller: 'sysMenuPanel',
    
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 70,
    },
    
    items: [{
    	xtype: 'hiddenfield',
    	name: 'id'
	}, {
    	xtype: 'container',
        layout: 'hbox',
        margin: '0 0 10 0',
        items: [{
      		xtype:'textfield',
			fieldLabel: '菜单标题:',
			name: 'text',
            itemId: 'text',
			flex: 1 
		}]
	}, {
    	xtype: 'container',
    	margin: '0 0 10 0',
        layout: 'hbox',
        items: [{
      		xtype:'combobox',
      		editable: false,
			fieldLabel:'所属系统',
			name: 'systemTypeCode',
            itemId: 'systemTypeCode',
			width: 285,
			displayField: 'sysValueName',
	    	valueField: 'sysValueCode',
	    	store: {
	    		type: 'sysTypeVal'
	    	}
		}, {
			xtype: 'combobox',
			editable: false,
			fieldLabel: '菜单类型',
			name: 'menuTypeCode',
            itemId: 'menuTypeCode',
            displayField: 'name',
	    	valueField: 'id',
	        store:  {
	        	type: 'menuType'
	    	},
			flex: 1
		}]
	}, {
    	xtype: 'container',
        layout: 'hbox',
        margin: '0 0 10 0',
        items: [{
      		xtype:'textfield',
			fieldLabel: '菜单编码',
			name: 'menuCode',
            itemId: 'menuCode',
			width: 285
		}, {
			xtype: 'textfield',
			fieldLabel: '上级菜单',
			name: 'parentMenuCode',
            itemId: 'parentMenuCode',
			flex: 1 
		}]
	}, {
    	xtype: 'container',
        layout: 'hbox',
        margin: '0 0 10 0',
        items: [{
      		xtype:'textfield',
			fieldLabel: '菜单功能',
			name: 'menuAction',
            itemId: 'menuAction',
			width: 285
		}, {
			xtype: 'combobox',
			editable: false,
			fieldLabel: '菜单状态', 
			name: 'currentStatus',
            itemId: 'currentStatus',
            displayField: 'name',
	    	valueField: 'id',
	        store:  {
	        	type: 'states'
	    	},
			flex: 1 
		}]
		
	}, {
		xtype: 'container',
        layout: 'hbox',
        
        items: [{
      		xtype     : 'textareafield',
	        grow      : true,
	        fieldLabel: '网页内容',
	        name: 'menuContent',
            itemId: 'menuContent',
	        height: 150,
	       	flex: 1
		}]
	}],
    
    buttons: [
    	{
    		text: 'Save',
    		name: 'btnSave',
    		listeners: {
    			click: 'onSaveInForm'
    		}
		}, {
        	text: 'Close',
	        listeners: {
	        	click: 'onCloseInForm'
	   		}
    	}
    ],
    
    setStore: function(store) {
    	this.store = store;
    },
    
    initComponent: function() {
        this.callParent();
        
		this.setComboBoxStore();
		
		//只有为Root时，才可以设置所属系统
		if(this.parentNode) {
			var field = this.down('[name=systemTypeCode]');
	    	field.setReadOnly(true);
    	}
	},
	
	setComboBoxStore: function(){
		//type-1
		// var jsonValue = {
        	// sysTypeCode: 'system'
        // };
        // var jsonString = Ext.encode(jsonValue);
        // var store = Ext.create('MyApp.store.SysTypeVal');
        // Ext.apply(store.proxy.extraParams, {
			// jsonString: jsonString
		// });
		// store.load();
		
		//type-2
		var store = new MyApp.store.SysTypeVal('system');
		store.load();
		var cb = this.down('combobox[name=systemTypeCode]');
		cb.setStore(store);
		
		//type-3
		// var store = cb.getStore();
		// Ext.apply(store.proxy.extraParams, {
			// jsonString: Ext.encode(jsonValue)
		// });
		// store.load();	
		
	},
	
	//编辑模式时禁止编辑字段
	readOnlyFields: [
    	'systemTypeCode',
    	'menuCode',
    	'parentMenuCode'
	],
	
    //所有的字段，在查看模式时用来设置只读
    allFields: [
    	'text',
    	'systemTypeCode',
    	'menuTypeCode',
    	'menuCode',
    	'parentMenuCode',
    	'menuAction',
    	'currentStatus',
    	'menuContent'
    ],
    
});