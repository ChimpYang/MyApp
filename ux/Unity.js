Ext.define('MyApp.ux.Unity', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.UnityComponent',
    alias: 'widget.unity',
    
    unityObject2: null,
    url: '',
    logoimage: '',
	progressbarimage: '',
	progressframeimage: '',
    
    renderTpl:
    	'<div class="content">' +
		'	<div id="unityPlayer" style="margin:auto auto;" >' +
		'		<div class="missing">' +
		'			<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!">' +
		'				<img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" />' +
		'			</a>' +
		'		</div>' +
		'		<div class="broken">' +
		'			<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now! Restart your browser after install.">' +
		'				<img alt="Unity Web Player. Install now! Restart your browser after install." src="http://webplayer.unity3d.com/installation/getunityrestart.png" width="193" height="63" />' +
		'			</a>' +
		'		</div>' +
		'	</div>' +
		'</div>',
		
    initComponent: function() {

        this.callParent();
    },
    
    beforeRender: function(){
        this.callParent();
        
        Ext.applyIf(this.renderData, this.getTemplateArgs());
    },
    
    getTemplateArgs: function() {
    	//好像没什么参数需要传递到renderTpl中
        return {
        };
	},
	
	resize: function(width, height) {
		$("#unityPlayer").height(height);
		$("#unityPlayer").width(width);
	},
	
	// var payload = {
 //        pluginStatus: pluginStatus,
 //        bestMethod: null,
 //        lastType: lastType,
 //        targetEl: cfg.targetEl,
 //        unityObj: this
 //    };
	//用到了jQuery
	observeProgress: function(progress) {
		// console.log(progress);
		
		var $missingScreen = jQuery("#unityPlayer").find(".missing");
		var $brokenScreen = jQuery("#unityPlayer").find(".broken");
		$missingScreen.hide();
		$brokenScreen.hide();
		
		switch(progress.pluginStatus) {
			case "broken":
				$brokenScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$brokenScreen.show();
			break;
			case "missing":
				$missingScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$missingScreen.show();
			break;
			case "installed":
				$missingScreen.remove();
			break;
			case "first":
			//TODO; 如果界面中有很多控件（Button、MenuItem、Selection），需要默认为禁用，在接收到first事件后，再启用
			//		或者，在各个控件的事件中判断，如果还位收到first事件，则不执行该控件的事件
				// this.fireEvent('unityFirstFrame');//failed
				// console.log(this);//index.jsp
				// console.log(progress.targetEl);
				// console.log(progress.unityObj);
				// console.log(progress.ownerCt);
				progress.ownerCt.fireEvent('unityFirstFrame');
			break;
		}
	},
	
	insertUnity: function(width, height) {
        var config = {
			params: {
				disableContextMenu: true,
				logoimage: this.logoimage,
				progressbarimage: this.progressbarimage,
				progressframeimage: this.progressframeimage
			},

			debugLevel: 1
		};
		
		// var height = this.getHeight();
		// var width = this.getWidth();
		// console.log('width=' + width);
		// console.log('height=' + height);
		
		$("#unityPlayer").height(height);
		$("#unityPlayer").width(width);
		
		var u = new UnityObject2(config);
		this.unityObject2 = u;
		u.observeProgress(this.observeProgress);
		u.setExtOwnerCt(this);
		
		u.initPlugin(jQuery("#unityPlayer")[0], this.url);
    },

});