Ext.define('MyApp.model.Menu', {
    extend: 'Ext.data.Model',
    
    alias: 'model.menu',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'dispOrder', type: 'int'},
        'menuCode',
        'menuMemo',
        'menuTitle',
        'menuAction',
        'menuTypeCode',
        'parentMenuCode',
        'systemTypeCode',
        {name: 'currentStatus', type: 'int'},
        'menuIcon',
        'menuContent'
    ],
    
    cloneFormMenuTreeNode: function(menuTreeNode) {
    	// console.log(menuTreeNode);
    	// console.log(menuTreeNode.get('currentStatus'));//error
    	// console.log(menuTreeNode.data.get('currentStatus'));//error
    	// console.log(menuTreeNode.currentStatus);//right
    	
    	this.data.id = menuTreeNode.id;
    	this.data.menuCode = menuTreeNode.menuCode;
    	this.data.menuMemo = menuTreeNode.menuMemo;
    	this.data.menuTitle = menuTreeNode.text;
    	this.data.menuAction = menuTreeNode.menuAction;
    	this.data.menuTypeCode = menuTreeNode.menuTypeCode;
    	this.data.dispOrder = menuTreeNode.dispOrder;
    	this.data.parentMenuCode = menuTreeNode.parentMenuCode;
    	this.data.systemTypeCode = menuTreeNode.systemTypeCode;
    	this.data.currentStatus = menuTreeNode.currentStatus;
    	this.data.menuIcon = menuTreeNode.menuIcon;
    	this.data.menuContent = menuTreeNode.menuContent;
    }

});
