Ext.define('MyApp.view.user.UserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'userForm',
    
    requires: [
    	'MyApp.store.array.Status'
    ],
    
    header: false,
    frame:true,
    width: 400,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    
    openMode: 0,//Config.WIN_OPENMODE_VIEW,
    store: null,
    
    //不加这一句，button的事件onCloseInForm不会执行，且js报错
    // controller: 'userList',
    controller: 'userPanel',
    
    // items: [{
        // fieldLabel: 'userCode',
        // name: 'userCode'
    // }, {
        // fieldLabel: 'userName',
        // name: 'userName'
    // }],
    
    items: [{
        	name:'id',
        	hidden: true   	
    }, {
        xtype: 'fieldset',
        title: 'User Info',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [
            { 
            	fieldLabel: 'userCode', 
            	name: 'userCode',
            	id: 'userCode'
            }, { 
            	fieldLabel: 'userName', 
            	name: 'userName'
            }, {
	    		xtype: 'datefield',
	    		fieldLabel: '创建时间',
	    		name: 'createDate',
	    		format: 'Y/m/d H:i:s'
	    	}
        ]
    },{
    	xtype: 'fieldset',
    	title: 'User Status',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [
            {
            	xtype:'combobox',
            	editable: false,
    			fieldLabel:'status:',
    			name: 'currentStatus',
    			id: 'currentStatus',
    			itemId: 'currentStatus',
    			displayField: 'name',
    			valueField: 'id',
     			//store:  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[0, '请选择状态'], [1, '启用'], [2, '禁用']]}),
     			store:  {
		        	type: 'states'
		    	},
    	
     			validator: function (val) {
     				return (val == MyApp.AppConfig.ENABLE_TEXT || val == MyApp.AppConfig.DISABLE_TEXT) ? true : MyApp.AppConfig.SELECT_TEXT;
			    }
     		}, {
            	fieldLabel: 'empCode', 
            	name: 'empCode'
            }
        ]
    }],
    
    buttons: [
    	{
    		text: 'Save',
    		reference: 'refUserFormSaveBtn',
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
    	// console.log(store);
    },
    // buttonAlign: 'left',//default is 'right'
    
    initComponent: function() {
        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };
        
        this.callParent();
        
        //必须放在this.callParent函数之后，否则会提示item.each不是函数
        if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_VIEW) {
    		this.setFormReadOnly(this);
    		var saveBtn = this.lookupReference('refUserFormSaveBtn');
    		saveBtn.hide();
    	} else if(this.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
    		// console.log('WIN_OPENMODE_CREATE');
    	} else if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
    		//field必须有id属性
    		var field = this.getForm().getFields().get('userCode');
    		field.setReadOnly(true);
    		
    		var field = this.getForm().getFields().get('currentStatus');
    		field.setReadOnly(true);
    	}
    },
    
    //Chimp: 函数setReadOnly与setOpenMode的scope(就是this)必须在each里写明，否则会提示找不到setReadOnly方法
    setItemsReadOnly: function(items) {
    	items.each(function(item) {
			if(item.items){
				this.setItemsReadOnly(item);
			}else if(item.readOnly == false){
				item.setReadOnly(true);
				item.setFieldStyle('color:gray');	
			}
		}, this);
    },
    
    readOnlyForm: function(openMode) {
    	// console.log('param openMode: ' + openMode);
    	
    	// console.log(this.items);
    	// console.log(this.getForm());
    	
    	this.openMode = openMode;
    	
    	this.items.each(function(item){
    		if(item.items) {
    			this.setItemsReadOnly(item.items);
    		} else {
    			item.setReadOnly(true);
				item.setFieldStyle('color:gray');
    		}
    	}, this);
    },
    
    setFormReadOnly: function() {
    	var me = this;
    	me.items.each(function(item){
    		if(item.items) {
    			me.setItemsReadOnly(item.items);
    		} else {
    			item.setReadOnly(true);
				item.setFieldStyle('color:red');
    		}
    	}, me);
    },
    
    init: function() {
    	if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_VIEW) {
    		this.setFormReadOnly();
    	} 
    }
    
});