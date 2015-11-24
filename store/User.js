Ext.define('MyApp.store.User',{
	extend:'Ext.data.Store',
	
	
	requires: [
		//可以不引用
        // 'MyApp.model.User'
        // 'MyApp.AppConfig'
    ],
    
    
    
    model: 'MyApp.model.User',
    //以下语句，加入都报错
    // model: 'User',
	// model:'user',
	// model: {
		// type: 'user'
	// },
	
	alias: 'store.user',
	
	pageSize: MyApp.AppConfig.GRID_PAGE_SIZE,
	autoLoad: false,
	
	proxy: {
	    type:'ajax',
	    enablePaging: true,
	    
	    extraParams: {
	    	jsonString: Ext.encode({})
	    },
	    
	    api: {
        	create: '/ChimpJavaWeb/createUser.do',
        	read: '/ChimpJavaWeb/getListUser.do',
        	update: '/ChimpJavaWeb/modifyUser.do',
        	destroy: '/ChimpJavaWeb/removeUser.do'
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