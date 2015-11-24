Ext.define('MyApp.store.RoleUserIn',{
	extend:'Ext.data.Store',
	
    model: 'MyApp.model.RoleUser',
	alias: 'store.roleUserIn',
	
	pageSize: MyApp.AppConfig.GRID_PAGE_SUB_SIZE,
	autoLoad: false,
	
	proxy: {
	    type:'ajax',
	    enablePaging: true,
	    
	    extraParams: {
	    	jsonString: Ext.encode({})
	    },
	    
	    api: {
        	read: '/ChimpJavaWeb/listUsersInRole.do',
        	destroy: '/ChimpJavaWeb/removeRoleUser.do'
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