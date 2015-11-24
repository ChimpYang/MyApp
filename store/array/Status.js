Ext.define('MyApp.store.array.Status', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.states',
    
	fields: [
		'id', 'name'
	],
	
	data: [
		[MyApp.AppConfig.ZERO, MyApp.AppConfig.SELECT_TEXT], 
		[MyApp.AppConfig.ENABLE, MyApp.AppConfig.ENABLE_TEXT], 
		[MyApp.AppConfig.DISABLE, MyApp.AppConfig.DISABLE_TEXT]
	]
});