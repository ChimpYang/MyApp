Ext.define('MyApp.store.SysTypeVal',{
	extend:'Ext.data.Store',
	
    model: 'MyApp.model.SysTypeVal',
	alias: 'store.sysTypeVal',
	
	pageSize: MyApp.AppConfig.GRID_PAGE_SIZE,
	autoLoad: false,
	
	constructor : function(type){
		this.callParent();
		
		this.autoLoad = true;
		
		var jsonValue = {
        	sysTypeCode: type
        };
        var jsonString = Ext.encode(jsonValue);
		Ext.apply(this.proxy.extraParams, {
			jsonString: jsonString
		});
	},
	
	proxy: {
	    type:'ajax',
	    enablePaging: true,
	    
	    extraParams: {
	    	jsonString: Ext.encode({})
	    },
	    
	    api: {
        	read: '/ChimpJavaWeb/getListSysTypeValue.do',
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