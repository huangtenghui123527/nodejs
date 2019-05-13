
var select={
    tipStatus:true,
    areaCode:{},
    searchAreaCode:[],
    proID:'100000',
    cityID:'',
    townID:'',
    tipShow:function(){
        if(this.tipStatus){
            $('#select-tip').css({display:'block'})
        }else{
            $('#select-tip').css({display:'none'})
        }
    },
    // 数据初始化
    areaInit:function(){
        let code_province=this.getAreaCode('100000');
        let code_city=this.getInArea(code_province);
        let code_town=this.getInArea(code_city);
        this.areaCode=Object.assign(code_province,code_city,code_town);
        this.creatAreaSelect('province',false);
        this.showAreaTip('province');
        this.showAreaTip('city');
        this.showAreaTip('town');
    },
    // 根据父ID读取相应的数据,组成区域码键值对
    getAreaCode:function(parentId){
        let ObjArea={},ObjCode={};
        for(let item of area){
            if(item.ParentId==parentId){
                ObjArea[item.ID]=item
            }
        }
        ObjCode[parentId]=ObjArea;
        return ObjCode;
    },
    // 以当前区域码为父级,获取其子集区域码
    getInArea:function(objCode){
        let obj={};
        for(let x in objCode){
            for(let y in objCode[x]){
                obj=Object.assign(obj,this.getAreaCode(objCode[x][y].ID));
            }
        }
        return obj;
    },
    /**
     * @showAreaTip:下拉框显示控制
     * @level:省市区等级,string类型
     * */ 
    showAreaTip:function(level){
        $('#label-btn-'+level).click(function(e){
            let areaTipAll=$('.select-tip');
            e.stopPropagation();
            for(let i=0;i<areaTipAll.length;i++){
                areaTipAll.eq(i).css({display:'none'})
            }
            $('#area-tip-'+level).css({display:'block'})
        })
    },
    /**
     * @creatAreaSelect:创建下拉选择
     * @level:省市区等级,string类型
     * @status:范查询状态,Boolean类型
     * 范查询时数据状态和创建时的数据状态不一样,故用status字段区分
     * */ 
    creatAreaSelect(level,status){
        let areaId=level=='province'?this.proID:level=='city'?this.cityID:this.townID;
        let objArea=status?this.searchAreaCode:this.areaCode[areaId];
        let ele='';
        for(let key in objArea){
            ele+="<li><div class='li-text' codeId='"+objArea[key].ID+"'>"+objArea[key].Name+"</div></li>";
        };
        $("#area-tip-"+level+" .selectUl").html(ele);
        this.codeAreaChange(level)
    },
    /**
     * @codeAreaChange:下拉选中执行事件
     * @level:省市区等级,string类型
     * */ 
    codeAreaChange(level){
        let _this=this;
        $('#select-area-'+level).on('click','li',function (e) {
            e.stopPropagation();
            let ev=e.target||e.srcElement;
            let value=$(ev).css({color:'#2D7BC7','fontWeight':'900'}).html();
            if(level=="province"){
                _this.clearSelectTip('city','请选择市');
                _this.clearSelectTip('town','请选择县(区)');
                _this.cityID=$(ev).attr('codeId');
                _this.creatAreaSelect('city',false);
            }else if(level=="city"){
                _this.clearSelectTip('town','请选择县(区)');
                _this.townID=$(ev).attr('codeId');
                _this.creatAreaSelect('town',false);
            }
            $('#area-tip-'+level).css({display:'none'})
            $(ev).parent().siblings().children('.li-text').css({color:'#000','fontWeight':'100'})
            $('#select-name-'+level).html(value);
        })
    },
    /**
     * @clearSelectTip:清除缓存
     * @eleId:特指省市区等级,string类型
     * @text:选择默认显示内容,string类型
     * 
     * */ 
    clearSelectTip(eleId,text){
        $('#select-name-'+eleId).html(text);
        $('#select-area-'+eleId).html('<li><div class="li-text">'+text+'</div></li>');

    },
};
select.areaInit();

// 下拉显示隐藏
$('#seachBtn').click(function(e){
    e.stopPropagation();
    $('.ipt-text-warrper').click();
});

$('body').click(function () {
    if(select.tipStatus){
        select.tipStatus=false;
    }
    $('.ipt-text-warrper').click();
    let areaTipAll=$('.select-tip');
    for(let i=0;i<areaTipAll.length;i++){
        areaTipAll.eq(i).css({display:'none'})
    }
});
$('.ipt-text-warrper').click(function (e) {
    e.stopPropagation();
    select.tipShow();
    select.tipStatus=!select.tipStatus;
});

$('.close').click(function(e){
    e.stopPropagation();
    $('#iptText').val('');
    $(this).css({display:'none'})
});

$('#iptText').on('input',function(){
    let val=$('#iptText').val();
    if(val){
        $('.close').css({display:'block'})
    }else{
        $('.close').css({display:'none'})
    }
})
$('#input-select').on('click','li',function (e) {
    e.stopPropagation();
    let ev=e.target||e.srcElement;
    let value=$(ev).css({color:'#2D7BC7','fontWeight':'900'}).html();
    $(ev).parent().siblings().children('.li-text').css({color:'#000','fontWeight':'100'})
    $('#iptText').val(value);
    $('.close').css({display:'block'})
    select.tipShow();
    select.tipStatus=!select.tipStatus;
})

// $.ajax({
//     type:'post',
//     url:'api/home/add',
//     data:{'name':'first'},
//     success:function(res){
//         // console.log(res)
//     }
// })
// 范查询阻止事件冒泡
function clickSearch(e){
    e.stopPropagation();
};
// 键盘快捷搜索
function keyupSearch(e){
    let ev=e.srcElement||e.target;
    let val=$(ev).val();
    let level=$(ev).attr('lever')
    let reg=new RegExp(val);
    let areaKey=level==1?select.proID:level==2?select.cityID:select.townID;
    let objAreaCode=select.areaCode[areaKey];
    select.searchAreaCode=[];
    for(let key in objAreaCode){
        if(reg.test(objAreaCode[key].Name)){
            select.searchAreaCode.push(objAreaCode[key]);
        }
    }
    if(level==1){
        select.creatAreaSelect('province',true)
    }else if(level==2){
        select.creatAreaSelect('city',true)
    }else{
        select.creatAreaSelect('town',true)
    }
};