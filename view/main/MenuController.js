Ext.define('MyApp.view.main.MenuController', {
    extend: 'Ext.app.ViewController',
	
	alias: 'controller.menu',
	
    onTreeItemClick1: function (treePanel, record, item, index, e, eOpts ) {
    	if(!record.data.leaf) {
    		return ;
    	}
    	
    	var title = record.data.text;
    	var tabPanel = this.lookupReference('refTabs');
    	var tabs = tabPanel.items;
    	for(var i=0;i<tabs.getCount();i++){
			if(tabs.getAt(i).title == title){
				tabPanel.setActiveTab(tabs.getAt(i));
				return;
			}
		}
		
    	if(MyApp.AppConfig.MENU_CLASS == record.data.menuTypeCode) {
    		if(!record.data.menuAction || '#' == record.data.menuAction) {
    			return ;
    		}
    		
    		var tab = tabPanel.add({
	        	xtype: record.data.menuAction,
	            title: title,
	            closable: true,
	            iconCls : record.data.menuIcon,
	            permission: record.data.permission
	        });
    	} else if(MyApp.AppConfig.MENU_CONTENT == record.data.menuTypeCode) {
    		var content = record.data.menuContent;
    		var tab = tabPanel.add({
	            title: title,
	            closable: true,
	            iconCls : record.data.menuIcon, 
	            html: content
	        });
    	}
    	
    	tabPanel.setActiveTab(tab);
    }
	
});
