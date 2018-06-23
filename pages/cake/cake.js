// pages/cake/cake.js
var base = getApp();
var jzData = require('../../utils/jzData.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 0,
        list: [],
        listJz: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        var _this = this;
        var _dic = base.cake.getCache();
        if (_dic) {
            this.setlist(_dic);
        } else {
            this.initData();
        }
        var _jzlist = [];
        var dic = jzData.data;
        for (var i in dic) {
            _jzlist.push({
                name: i,
                price: dic[i].CakeType[0].CurrentPrice + ".00",
                des: dic[i].Means,
                imgUrl: base.path.res + dic[i].img
            })
        }
        this.setData({
            "listJz": _jzlist
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(e) {
        if (base.cake.tab != null) {
            this.setData({
                "tab": base.cake.tab
            });
            base.cake.tab = null;
        }
    },

    initData: function() {
        var _this = this;
        vase.get({
            c: "Product",
            m: "GetAllProduct",
            City: "上海"
        }, function(d) {
            var data = d.data;
            if (data.Status == "ok") {
                base.cake.setCache(data.Tag);
                _this.setlist(data.Tag);
            }
        })
    },

    setlist: function(dic) {
        var _list = [];
        for (var i in dic) {
            _list.push({
                name: i,
                price: dic[i].CaleType[0].CurrentPrice + ".00",
                des: dic[i].Means,
                imgUrl: base.path.res + "/images-2/index-3/jdcake/w_240/" + encodeURI(i) + ".png"
            })
        }
        this.setData({
            "list": _list
        });
    },
    ing: function(e) {
        var price = e.currentTarget.dataset.price;
        base.modal({
            title: "是否需要购买优惠券？",
            showCancel: true,
            confirmText: "去购买",
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: "../buy/buy?type=1&price=" + price
                    })
                }
            }
        })
    },
    changeTab: function(e) {
        var d = e.currentTarget.dataset.pname;
        var b = e.currentTarget.dataset.brand;
        if (d) {
            wx.navigateTo({
                url: '../cakeDetail/cakeDetail?pname=' + d + "&brand=" + b
            })
        }
    }
});