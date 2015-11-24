Ext.define('MyApp.view.role.RoleForm', {
    extend: 'Ext.form.Panel',
    xtype: 'roleForm',
    
    requires: [
    	'MyApp.store.array.Status'
    ],
    
    header: false,
    frame:true,
    width: 600,
    bodyPadding: 10,
    
    oldRoleCode: '',//包含用户的另存时，记录原来的角色编码
    openMode: 0,//Config.WIN_OPENMODE_VIEW,
    store: null,
    
    controller: 'rolePanel',
    
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 70
    },
    
    items: [{
    	xtype: 'hiddenfield',
    	name: 'id'
	}, {
    	xtype: 'fieldset',
        title: '角色描述',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        
        items: [{
        	//使用xtype: 'fieldcontainer'会出现警告？
	        xtype: 'container',
	        layout: 'hbox',
	        margin: '0 0 10 0',
	        items: [{
	        	xtype: 'textfield',
            	fieldLabel: '角色编码', 
            	name: 'roleCode',
            	itemId: 'roleCode',
            }, { 
            	xtype: 'textfield',
            	fieldLabel: '角色名称', 
            	name: 'roleName',
            	itemId: 'roleName',
            	flex: 1
            }]
		},{
	    	xtype: 'container',
	        layout: 'hbox',
	        items: [{
          		xtype:'combobox',
	        
            	editable: false,
    			fieldLabel:'角色状态:',
    			name: 'currentStatus',
    			itemId: 'currentStatus',
    			displayField: 'name',
    			valueField: 'id',
     			store:  {
		        	type: 'states'
		    	},
    	
     			validator: function (val) {
     				return (val == MyApp.AppConfig.ENABLE_TEXT || val == MyApp.AppConfig.DISABLE_TEXT) ? true : MyApp.AppConfig.SELECT_TEXT;
			    }
			}, {
				xtype: 'textfield',
				fieldLabel: '最多人数', 
            	name: 'maxUserNumber',
            	itemId: 'maxUserNumber',
            	flex: 1
			}]
		}]
    }, {
    	xtype: 'fieldset',
        title: '角色描述',
        
        items: [{
        	anchor: '100%',
        	xtype: 'textarea',
        	name: 'roleDesc',
        	itemId: 'roleDesc',
        	height: 200,
        }
        ]
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
        
        //必须放在this.callParent函数之后，否则会提示item.each不是函数
        if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_VIEW) {
    		this.setFormReadOnly(this);
    		
    		var saveBtn = this.down('button[name=btnSave]');
    		saveBtn.hide();
    	} else if(this.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
    		// console.log('WIN_OPENMODE_CREATE');
    	} else if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
    		var f = this.down('textfield[name=roleCode]');
			f.setReadOnly(true);
    		
    		f = this.down('combobox[name=currentStatus]');
			f.setReadOnly(true);
    	}
    },
    
    setFormReadOnly: function(panel) {
		var f = this.down('textfield[name=roleCode]');
		f.setReadOnly(true);
		
		f = this.down('textfield[name=roleName]');
		f.setReadOnly(true);
		
		f = this.down('combobox[name=currentStatus]');
		f.setReadOnly(true);
		
		f = this.down('textfield[name=maxUserNumber]');
		f.setReadOnly(true);
		
		f = this.down('textarea[name=roleDesc]');
		f.setReadOnly(true);
    }
    
});