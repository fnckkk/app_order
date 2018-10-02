// pages/order/order.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [],
    links: [
      '../user/user',
      '../user/user',
      '../user/user'
    ],
    array: ['长者菜谱', '员工菜谱'],
    index: 0,
    isShowType:true
  },
  onLoad:function(){//记得onLoad第二个单词是大写开头
    var that = this;
    wx.request({
      url: app.globalData.WxApiUrl,
      data: {
        method: 'Get_Menu',
        eatType: '*',
        userType: that.data.isShowType//用餐人类型(0员工，1长者)
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var arr = [];
        for (var i = 0; i < res.data.result.length; i++) {
          arr.push(res.data.result[i].ZK_PictureUrl_Computer);//获取图片链接
        }
        that.setData({
          imgUrls: arr//绑定图片链接到视图层
        })
      }
    })
  },
  //轮播图的切换事件
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function(e) {
    console.log(this.data.swiperCurrent);
    // wx.switchTab({
    //   url: this.data.links[this.data.swiperCurrent]
    // })
  },
  //点击切换菜谱
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      isShowType:(!this.data.isShowType)
    });
  },
  //替换默认图片
  imgErrorFunction:function(e){
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    this.data.imgUrls[errorImgIndex] = app.globalData.defaultImgUrl//用默认图片链接替换图片列表中不能正常加载的链接
    this.setData({
      imgUrls:this.data.imgUrls
    })
  }
})