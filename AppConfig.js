Ext.define('MyApp.AppConfig' ,{
	singleton : true,
	
	//分页信息
	GRID_PAGE_SIZE: 10,
	GRID_PAGE_SUB_SIZE: 5,
	GRID_PAGE_LARGE_SIZE: 1000,
	
	//窗口打开模式
	WIN_OPENMODE_VIEW: 1,
	WIN_OPENMODE_CREATE: 2,
	WIN_OPENMODE_EDIT: 3,
	
	//？
	ZERO: 0,
	SELECT_TEXT:'请选择...',

	//后台数据常量
	ENABLE: 1,
	DISABLE: 2,
	ENABLE_TEXT:'启用',
	DISABLE_TEXT:'禁用',
	
	MENU_CLASS: 'class',
	MENU_CONTENT: 'content',
	MENU_CLASS_TEXT: '后台程序',
	MENU_CONTENT_TEXT: '静态页面',
	
	//TODO; 将使用的iconCls变成常量
	
	//按钮事务操作类型
	//定义顺序参考Java：org.cjf.entity.RoleMenuPermission.getStringPermission();
	ActionMax:12,//权限种类0~12
	ActionNone: -1,
	ActionMenuMix: -2,
	
	ActionCreate: 0,
	ActionRemove: 1,
	ActionModify: 2,
	ActionQuery: 3,
	ActionImport: 4,
	ActionExport: 5,
	ActionAttachmentUpload: 6,
	ActionAttachmentRemove: 7,
	ActionEnable: 8,
	ActionDisable: 9,
	ActionSpecial1: 10,
	ActionSpecial2: 11,
	ActionSpecial3: 12,
	

	//DONE; 测试
	statusRenderer: function(val) {
		if(val == MyApp.AppConfig.ENABLE) {
			return '<span style="color:green;">' + MyApp.AppConfig.ENABLE_TEXT + '</span>';
		} else if(val == MyApp.AppConfig.DISABLE) {
			return '<span style="color:red;">' + MyApp.AppConfig.DISABLE_TEXT + '</span>';
		} else {
			return '<span style="color:red;">错误</span>';
		}
	},
	
});