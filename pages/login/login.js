// pages/login/login.js
var base = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        pwd: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    changephone: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    changepwd: function(e) {
        this.setData({
            pwd: e.detail.value
        });
    },
    submit: function() {
        var _this = this;
        vase.get({
            c: "User",
            m: "Login",
            phone: _this.data.phone,
            pwd: _this.data.pwd
        }, function(d) {
            var dt = d.data;
            if (dt.Status == "ok") {
                base.user.userid = dt.Tag.Uid;
                base.user.sessionid = dt.Tag.SessionId;
                base.user.jzb = dt.Tag.Money;
                base.user.exp = dt.Tag.Exp;
                base.user.phone = dt.Tag.Phone;
                base.user.levels = dt.Tag.Levels;
                base.user.headimg = dt.Tag.HeadImgPath;
                wx.switchTab({
                    url: '../user/user'
                })
            } else {
                wx.showModal({
                    showCancel: false,
                    title: '',
                    content: dt.Msg,
                })
            }
        })
    }
})