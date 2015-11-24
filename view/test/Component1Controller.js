Ext.define('MyApp.view.test.Component1Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.component1',
	
	first: true,

    onUnityFirstFrame: function() {
        // console.log('onUnityFirstFrame**');
        // console.log(this);//Component1.controller

        var toolbarId = this.getView().xtype + '-mainToolbar';
        var toolbar = this.getView().getComponent(toolbarId);

        if(!toolbar) {
            return ;
        }

        // console.log(toolbar.items);
        Ext.each(toolbar.items.items, function(item){
            // console.log(item);
            item.setDisabled(false);
        });
    },
	
	onResize: function(comp, width, height, oldWidth, oldHeight, eOpts ) {
		
		if(this.first) {
			this.first = false;
			return ;
		}
		
		console.log('onResize');
		var unity = this.lookupReference('refUnity');
		unity.resize(width, height);
	},
    
    //只会触发一次
    onBoxReady: function(comp, width, height, eOpts ) {
		// console.log('boxready');
		// console.log('width=' + width);
		// console.log('height=' + height);
		
		var unity = this.lookupReference('refUnity');
		unity.insertUnity(width, height);
    },

    onRed1: function(button) {
    	var unityPanel = this.lookupReference('refUnity');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube1',
    		color: 'red'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onRed2: function(button) {
    	var unityPanel = this.lookupReference('refUnity');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube2',
    		color: 'red'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onYellow1: function(button) {
    	var unityPanel = this.lookupReference('refUnity');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube1',
    		color: 'yellow'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onYellow2: function(button) {
    	var unityPanel = this.lookupReference('refUnity');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube2',
    		color: 'yellow'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
});