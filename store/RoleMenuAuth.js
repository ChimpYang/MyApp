Ext.define('MyApp.store.RoleMenuAuth', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.roleMenuAuth',
	
	autoLoad : false,
	proxy : {
		type : 'ajax',
		url : '/ChimpJavaWeb/getListRoleMenuAuth.do',
		
		api: {
        	create: '/ChimpJavaWeb/createRoleMenuAuth.do'
		}
	}
});