//这个是菜单树维护
Ext.define('MyApp.store.Menu', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.menu',
	
	autoLoad : false,

	//TODO; 这里的各个url中把appname写死了，需要考虑动态的
	//可以将url从一个js文件中读取
	//该js又可以根据开发环境和运行环境产生不同的url
	proxy : {
		type : 'ajax',
		url : '/ChimpJavaWeb/getMenuTree.do',
		
		api: {
        	updateOrder: '/ChimpJavaWeb/updateMenuOrder.do',
        	
        	create: '/ChimpJavaWeb/createMenu.do',
        	update: '/ChimpJavaWeb/modifyMenu.do',
		}
	}
});