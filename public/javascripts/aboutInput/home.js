(function(){
    let home={
        obj:{
            1:"元旦：1月1日至3日放假三天。",
            2:"春节：2月2日至8日放假7天。",
            3:"妇女节：3月8日妇女节，与我无关。",
            4:"清明节：4月3日至5日放假3天",
            5:"劳动节：4月30日至5月2日放假3天。",
            6:"端午节：6月4日至6日放假3天。",
            7:"小暑：7月7日小暑。不放假。",
            8:"七夕节：8月6日七夕节。不放假。",
            9:"中秋节：9月10日至12日放假3天。",
            10:"国庆节：10月1日至7日放假7天。",
            11:"立冬：11月8日立冬。不放假。",
            12:"艾滋病日:12月1日<br />废除奴隶制国际日:12月2日。"
        },
        calendarClick(){
            var _this=this;
            let defaultTime=Number(time.getLocalTime(new Date(),'MM'));
            $('#msg').find('strong').html(defaultTime);
            $('#msg').find('p').html(_this.obj[defaultTime]);
            $('#curretnTime').html(time.getLocalTime(new Date(),'YY年MM月DD日'));
            $('.calendar>li').eq(defaultTime-1).addClass('active');
            for(let el of $('.calendar>li')){
                $(el).click(function(e){
                    let month=$(this).find('strong').html();
                    $(this).addClass('active').siblings().removeClass('active');
                    $('#msg').find('strong').html(month);
                    $('#msg').find('p').html(_this.obj[month]);
                })
            }
        },
        calcClick(){
            let _this=this;
            let calcStr="";
            let sum=0;
            for(let el of $('#calc li')){
                $(el).click(function(e){
                    let current=$(this).children('a').html();
                    calcStr+=current;
                    $('#calc > .f-text').val(current);
                    $('#formula').val(calcStr);
                    if(current=='='){
                        let num=_this.countFn(calcStr.substr(0,calcStr.length-1));
                        $('#calc > .f-text').val(num);
                        $('#formula').val('');
                        calcStr='';
                    }else if(current=='c'){
                        calcStr='';
                        $('#calc > .f-text').val('0');
                        $('#formula').val('');
                    }else{
                        console.log('hehe')
                    }
                })

                $(el).hover(function(e){
                    let reg=/[\+\-\*\/\%\c]/;
                    let val=$(this).children('a').html();
                    if(reg.test(val)){
                        $(this).css({backgroundPosition:'-63px -40px'})
                    }else if(val.indexOf('=')>-1){
                        $(this).css({backgroundPosition:'-64px -165px'})
                    }else if(val=='0'){
                        $(this).css({backgroundPosition:'0px -121px'})
                    }else{
                        $(this).css({backgroundPosition:'-64px 3px'})
                    }
                },function(e){
                    let reg=/[\+\-\*\/\%\c]/;
                    let val=$(this).children('a').html();
                    if(reg.test(val)){
                        $(this).css({backgroundPosition:'0px -40px'})
                    }else if(val.indexOf('=')>-1){
                        $(this).css({backgroundPosition:'0px -165px'})
                    }else if(val=='0'){
                        $(this).css({backgroundPosition:'0px -81px'})
                    }else{
                        $(this).css({backgroundPosition:'0px 3px'})
                    }
                })
            }
        },
        // 加减乘除
        countFn(val){
            let index = val.indexOf('+');
            if(index>-1)
                return this.countFn(val.substring(0,index))+this.countFn(val.substring(index+1));
            index=val.indexOf('-');
            if(index>-1)
                return this.countFn(val.substring(0,index))-this.countFn(val.substring(index+1))
            index=val.indexOf('*');
            if(index>-1)
                return this.countFn(val.substring(0,index))*this.countFn(val.substring(index+1))
            index=val.indexOf('/');
            if(index>-1)
                return this.countFn(val.substring(0,index))/this.countFn(val.substring(index+1))
            index=val.indexOf('%');
            if(index>-1)
                return this.countFn(val.substring(0,index))%this.countFn(val.substring(index+1))
            if(val==''){
                return 0
            }else{
                return Number(val)
            }
        }
    }
    home.calendarClick();
    home.calcClick();
})(jQuery)