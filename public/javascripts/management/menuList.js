var menu={
    id:$('#menuId'),
    menuTabal:$('#menuTabal'),
    oMenuUpdate:$('#fromUpdate'),
    menuTitle:$('#menuTitle'),
    menuName:$('#menuName'),
    menuRouter:$('#menuRouter'),
    mistakeName:$('#fromUpdate .mistakeName'),
    mistakeRouter:$('#fromUpdate .mistakeRouter'),

    isPass:true,
    nameTest:function(event){
        let ev=event.srcElement||event.target;
        let val=$(ev).val();
        let _this=this;
        if(val){
            $.ajax({
                url:'/api/menuList/testName',
                type:'post',
                data:{name:val},
                success:function(res){
                    if(res.data.status){
                        _this.isPass=true
                    }else{
                        _this.isPass=false
                    }
                    _this.mistakeName.html(res.data.message);
                }
            })
        }else{
            this.isPass=false
            this.mistakeName.html('菜单名称不能为空！')
        }
    },
    submitTest:function(obj){
        if(obj.menuName&&obj.menuRouter){
            this.isPass=true;
            this.mistakeName.html('');
            this.mistakeRouter.html('')
        }else if(obj.menuName&&!obj.menuRouter){
            this.isPass=false;
            this.mistakeName.html('');
            this.mistakeRouter.html('菜单地址不能为空！')
        }else if(!obj.menuName&&obj.menuRouter){
            this.isPass=false;
            this.mistakeName.html('菜单名称不能为空！')
            this.mistakeRouter.html('')
        }else{
            this.isPass=false;
            this.mistakeName.html('菜单名称不能为空！')
            this.mistakeRouter.html('菜单地址不能为空！')
        }
    },
    init(){
        this.getTable();
    }, 
    getTable(){
        mtable.createdTable({
            el:this.menuTabal,
           url:'/api/menuList/page',
           type:'post',
           colmon:['ID','菜单名称','菜单地址','是否存在子菜单','操作'],
           data:{menuName:'hth'}
       })
    }
}
function lookChildList(event,id){
    let ev=event.srcElement||event.target;
    let str='<tr data-id="'+id+'"><td colspan="6"></td></tr>'
    let pra=$(ev).parent();
    let dataID=pra.next().attr('data-id')
    if(!dataID){
        pra.after(str)
    }
    let currentAfter=pra.next().children('td')
    mtable.createdTable({
        el:currentAfter,
       url:'/api/menuList/page',
       type:'post',
       colmon:['ID','菜单名称','菜单地址','是否存在子菜单','操作'],
       data:{parentId:id}
   })
}
function menuAdd(id){
    let menuId=id?id:'';
    menu.menuName.val(''),
    menu.menuRouter.val(''),
    menu.id.html(menuId)
    menu.menuTitle.html('新增菜单')
    menu.oMenuUpdate.attr('path','/api/menuList/add')
    menu.oMenuUpdate.show()
}
function menuDel(id){
    $.ajax({
        url:'/api/menuList/del',
        type:'get',
        data:{id:id},
        success:function(res){
            if(res.data.status){
                // history.go(0) 
                $('#'+tabs.tabId).load('/api/menuList');
            }else{
                console.log(res.data.success)
            }
        }
    })
}
function menuUpdate(obj){
    menu.menuName.val(obj.menuName),
    menu.menuRouter.val(obj.menuRouter),
    menu.id.html(obj._id)
    menu.menuTitle.html('编辑菜单');
    menu.oMenuUpdate.attr('path','/api/menuList/update')
    menu.oMenuUpdate.show()
}
function submitFrom(){
    let para={};
    let id=menu.id.html();
    let surl=menu.oMenuUpdate.attr('path')
    let parade={
        menuName:menu.menuName.val(),
        menuRouter:menu.menuRouter.val(),
    }
    menu.submitTest(parade);
    if(surl.indexOf('update')==-1){
        para=Object.assign(parade,{parentId:id})
    }else{
        para=Object.assign(parade,{id:id})
    }

    if(menu.isPass){
        $.ajax({
            url:surl,
            type:'post',
            data:para,
            success:function(res){
                if(res.data.status){
                    menu.oMenuUpdate.hide()
                    // history.go(0)
                    $('#'+tabs.tabId).load('/api/menuList');
                }
            }
        })
    }
}
menu.init();
function speckText(str){

    //var request=  new URLRequest();
    var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(str);        // baidu
    //url = "http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=19&prev=input&q=" + encodeURI(str); // google
    //request.url = encodeURI(url);
    // request.contentType = "audio/mp3"; // for baidu
    //request.contentType = "audio/mpeg"; // for google

　　var n = new Audio(url);

　　 n.src = url;

　　 n.play();
    　　
　　 // $("...").play();
　　// var sound = new Sound(request);
　　// sound.play();
}
// speckText("呵呵呵呵或或或");