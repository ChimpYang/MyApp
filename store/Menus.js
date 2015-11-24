//这个是登录左侧的导航菜单树
Ext.define('MyApp.store.Menus', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.menus',
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : '/ChimpJavaWeb/getListRoleMenuPermission.do'
	}

});