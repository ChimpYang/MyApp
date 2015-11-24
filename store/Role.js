Ext.define('MyApp.store.Role',{
	extend:'Ext.data.Store',
	
    model: 'MyApp.model.Role',
	alias: 'store.role',
	
	pageSize: MyApp.AppConfig.GRID_PAGE_SIZE,
	autoLoad: false,
	
	proxy: {
	    type:'ajax',
	    enablePaging: true,
	    
	    extraParams: {
	    	jsonString: Ext.encode({})
	    },
	    
	    api: {
        	create: '/ChimpJavaWeb/createRole.do',
        	read: '/ChimpJavaWeb/getListRole.do',
        	update: '/ChimpJavaWeb/modifyRole.do',
        	destroy: '/ChimpJavaWeb/removeRole.do',
        	
        	//可以增加自定义的URL
        	disable: '/ChimpJavaWeb/disableRoles.do',
        	enable: '/ChimpJavaWeb/enableRoles.do',
        	saveas: '/ChimpJavaWeb/roleSaveAs.do'
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