Ext.define('MyApp.view.user.UserSearchForm',{
	extend:'Ext.form.Panel',
	xtype: 'userSearchForm',
	
	requires:[
    	'MyApp.store.array.Status',
    	'MyApp.view.commdialog.StatusWin'
    ],
    
	title:'用户查询',
	// collapsible: true,
	// titleCollapse: true,
	
	// frame:true,
    bodyPadding: 5,
	
	layout: {
        type: 'hbox'
    },
    
    fieldDefaults: {
		margin: '2 10 2 10',
        labelAlign: 'right',
        labelWidth: 60
    },
    
    items:[{
    	xtype: 'textfield',
        name: 'userCode',//for json
        fieldLabel: '用户编码'
    }, {
    	xtype: 'textfield',
        name: 'userName',//for json
        fieldLabel: '用户姓名'
    }, {
    	xtype: 'hiddenfield',
        name: 'currentStatus',//for json
        // id: 'currentStatus',
        itemId: 'currentStatus'
    }, {
    // // }, {
    	// // xtype: 'combobox',
        // // name: 'currentStatus',
        // // editable: false,
        // // fieldLabel: '启用状态',
        // // displayField: 'name',
    	// // valueField: 'id',
    	// // //store:  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[0, '请选择状态'], [1, '启用'], [2, '禁用']]})
        // // store:  {
        	// // type: 'states'
    	// // }
    // // }, {
    	xtype: 'textfield',
    	editable: false,
    	fieldLabel: '启用状态',
    	name: 'currentStatusEx',
    	id: 'currentStatusEx',
    	triggers: {
	        foo: {
	            cls: 'x-form-search-trigger',
	            handler: 'onSearchTrigger'
	        }
	    }
    }, {
    	xtype: 'button',
    	text: '清除',
    	margin: '2 0 0 10',
    	iconCls: 'fa fa-refresh',
    	listeners: {
    		click: 'onSearchReset'
    	}
    }, {
    	xtype: 'button',
    	text: '查询',
    	margin: '2 0 0 10',
    	iconCls: 'fa fa-search',
    	listeners: {
    		click: 'onSearch'
    	}
    }
    ]
 });
