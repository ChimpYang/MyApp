Ext.define('MyApp.store.array.MenuType', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.menuType',
    
	fields: [
		'id', 'name'
	],
	
	data: [
		['', MyApp.AppConfig.SELECT_TEXT], 
		[MyApp.AppConfig.MENU_CLASS, MyApp.AppConfig.MENU_CLASS_TEXT], 
		[MyApp.AppConfig.MENU_CONTENT, MyApp.AppConfig.MENU_CONTENT_TEXT]
	]
});