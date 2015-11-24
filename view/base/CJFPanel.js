Ext.define('MyApp.view.base.CJFPanel',{
	extend:'Ext.panel.Panel',
	
	permission: [],
	
	initComponent: function() {
        this.callParent();
        
        Ext.each(this.items.items, function(item) {
        	if(item.needPermission) {
        		if(item.setPermission) {
        			item.setPermission(this.permission);
        		}
        	}
        }, this);
  	}
  	
});