//index.js
//获取应用实例
var base = getApp();

Page({
	data: {
		path: base.path.res + "smallexe/index/",
		motto: '你好、贝思客1！',
		userInfo: {},
		array: ['上海', '北京', '杭州', '宁波'],
		index: 0
	},
	goCake: function (e) {
		var brand = e.currentTarget.dataset.brand;
		if (brand && brand == 1) {
			base.cake.tab = 1;
		}
		wx.switchTab({ url: '../cake/cake' });
	},
	goDetail: function (e) {
		var nm = e.currentTarget.dataset.pname;
		var b = e.currentTarget.dataset.brand;
		wx.navigateTo({
			url: '../cakeDetail/cakeDetail?pname=' + nm + "&brand=" + (b || 0)
		})
	},
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    //事件处理函数
    bindViewTap: function() {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function(res) {
                if (!res.cancel) {
                    console.log(res.tapIndex);
                }
            }
        })
    },
    onLoad: function() {
        var that = this;
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: function() {
        // return {
        //     title: 'shareCake',
        //     desc: '',
        //     path: '/pages/index/index?id=123'
        // }
    }

})