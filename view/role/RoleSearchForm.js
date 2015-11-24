Ext.define('MyApp.view.role.RoleSearchForm',{
	extend:'Ext.form.Panel',
	xtype: 'roleSearchForm',
	
	requires:[
    	'MyApp.store.array.Status'
    ],
    
	title:'角色查询',
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
        name: 'roleCode',//for json
        fieldLabel: '角色编码'
    }, {
    	xtype: 'textfield',
        name: 'roleName',//for json
        fieldLabel: '角色名称'
    }, {
    	xtype: 'textfield',
        name: 'roleDesc',
        fieldLabel: '角色描述'
    }, {
    	xtype: 'combobox',
        name: 'currentStatus',
        editable: false,
        fieldLabel: '启用状态',
        displayField: 'name',
    	valueField: 'id',
        store:  {
        	type: 'states'
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
