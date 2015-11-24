Ext.define('MyApp.view.test.UnityPanelController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.unityPanel',
	
	testFunc: function(message) {
		console.log(message);
	},
	
	//Why? 只有Tab下面的Panel可以接收到事件，而Panel下的Items不能接收到事件（尽管item也是panel)
	//MyApp.view.test.UnityPanel变成Tab下面的主Panel也不能接收到resize事件
	onResizeContainer: function(panel, width, height, oldWidth, oldHeight, eOpts ) {
		console.log('onResizeContainer');
		var unityPanel = this.lookupReference('refUnityDemoPanel');
		this.onResize(unityPanel, width, height, oldWidth, oldHeight, eOpts);
	},
	
	onResize: function(panel, width, height, oldWidth, oldHeight, eOpts ) {
		console.log('onResize');
		// console.log('width:' + width + ', height: ' + height);
		// console.log($('#unityPlayer'));
    	// $("#unityPlayer").height(height);
		// $("#unityPlayer").width(width);
    },
    
    //Debug:Error calling method on NPObject!
    //"When called from a web page you pass an object name, a function name and a single argument"
    //之前的函数OnAgent在Unity里，有两个参数，现在改成一个了 
    onRed1: function(button) {
    	var unityPanel = this.lookupReference('refUnityDemoPanel');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube1',
    		color: 'red'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	console.log(json);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onRed2: function(button) {
    	var unityPanel = this.lookupReference('refUnityDemoPanel');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube2',
    		color: 'red'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	console.log(json);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onYellow1: function(button) {
    	var unityPanel = this.lookupReference('refUnityDemoPanel');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube1',
    		color: 'yellow'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	console.log(json);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    onYellow2: function(button) {
    	var unityPanel = this.lookupReference('refUnityDemoPanel');
    	var unity = unityPanel.unityObject2.getUnity();
    	
    	var cc = Ext.apply({
    		cube: 'cube2',
    		color: 'yellow'
    	}, cc);
    	var json = Ext.JSON.encode(cc);
    	console.log(json);
    	
    	unity.SendMessage("WebAgent", "OnAgent", json);
    },
    
    //failed
    //ReferenceError: onExtAgent is not defined
    //必须放在index.jsp | index.html中
    // onExtAgent: function(p1, p2) {
    	// console.log('onExtAgent');
    	// console.log(p1);
    	// console.log(p2);
    // }
});