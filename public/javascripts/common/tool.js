var tabs={
    tabsList:[],
    contentId:'',
    tabId:'',
    navClass:'',
    init(obj){
        this.contentId=obj.contentId;
        var farst=this.loadNav(tabs.tabsList);
        // this.addTo(farst)
        this.addTo({_id:"5cd52cc7f2782a4cd71af515",menuRouter:"/runingPig"})
    },
    addTo(el){
        let idName = 'tab_' + el._id;
        this.tabId=idName;
        $('#'+this.contentId).children().removeClass('active');
        $('#'+this.contentId).html('<div id="'+idName+'" class="active"></div>');
        let loadUrl='/api'+el.menuRouter;
        $('#'+idName).load(loadUrl);
    },
    loadNav(arr){
        if(arr.length){
            if(arr[0].isChild){
                this.loadNav(arr[0].child)
            }else{
                return arr[0]
            }
        }else{
            return {url:'',_id:''}
        }
    }
}

var time={
    getLocalTime:function(date,nS){    
        var o = {
            "YY" : date.getFullYear(),					//年
            "MM" : (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1),     //月份
            "DD" : date.getDate()<10?'0'+date.getDate():date.getDate(),                    //日
            "hh" : date.getHours(),                   //小时
            "mm" : date.getMinutes(),                 //分
            "ss" : date.getSeconds(),                 //秒
            "qq" : Math.floor((date.getMonth()+3)/3), //季度
            "SS" : date.getMilliseconds()             //毫秒
        };
        for(var k in o){
            if(nS.indexOf(k)!==-1)
                nS = nS.replace(k, o[k]);
        }
        return nS;
     },
}