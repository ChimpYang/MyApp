Ext.define('MyApp.view.roleauth.RoleSearchForm', {
	extend:'Ext.form.Panel',
	xtype: 'authRoleSearchForm',
	
	requires:[
    	'MyApp.store.array.Status'
    ],
    
    header: false,
    bodyPadding: 5,
    frame: true,
	
	layout: {
        type: 'hbox'
    },
    
    fieldDefaults: {
		margin: '2 10 2 10',
        labelAlign: 'right',
        labelWidth: 60
    },
    
    items:[{
    	xtype: 'container',
    	layout: {
    		type: 'vbox'
    	},
    	items: [ {
	    	xtype: 'textfield',
	        name: 'roleCode',//for json
	        fieldLabel: '角色编码'
	    }, {
	    	xtype: 'textfield',
	        name: 'roleName',//for json
	        fieldLabel: '角色名称'
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
	    }]
    },{
    	xtype: 'container',
    	layout: {
    		type: 'vbox',
    		align: 'stretch'
    	},
    	items: [{
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
	    }]
    }]
    
});