Ext.define('MyApp.store.RoleUserNotIn',{
	extend:'Ext.data.Store',
	
    model: 'MyApp.model.RoleUser',
	alias: 'store.roleUserNotIn',
	
	pageSize: MyApp.AppConfig.GRID_PAGE_SUB_SIZE,
	autoLoad: false,
	
	proxy: {
	    type:'ajax',
	    enablePaging: true,
	    
	    extraParams: {
	    	jsonString: Ext.encode({})
	    },
	    
	    api: {
        	read: '/ChimpJavaWeb/listUsersNotInRole.do',
        	create: '/ChimpJavaWeb/createRoleUser.do'
        },	
		reader:{
			type: 'json',
			rootProperty: 'list',
			totalProperty: 'totalCount',
			
			successProperty: 'success',
			messageProperty: 'message'
		},
		writer:{
			type:'json'
		}
	}
});