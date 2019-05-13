var mtable={
    option:{
        url:'',
        type:'',
        el:'',
        colmon:'',
        data:{},
    },

    createdTable(obj){
        let _this=this;
        let $q=Object.assign(this.option,obj);
        let data=Object.assign($q.data,{page:1,size:10})
        $.ajax({
            url:$q.url,
            type:$q.type,
            data:data,
            success:function(res){
                // console.log(res)
                _this.createdHTML(res);
            }
        })
    },
    createdHTML(data){  
        let tab=data.tab;
        let tHearder=`<thead><tr>${this.createdHeard(this.option.colmon)}</tr></thead>`
        let tBody=`<tbody>${this.createdBody(tab)}</thead>`;
        let tabalHtml=`<div class="table-responsive"><table class="table table-bordered table-striped table-hover">${tHearder+tBody}</table></div>`
        this.option.el.html(tabalHtml)
    },
    createdHeard(heard){
        let tHeard='<th>序号</th>'
        heard.forEach(elem => {
            tHeard+='<th>'+elem+'</th>'
        });
        return tHeard
    },
    createdBody(tab){
        let tbody='';
        tab.forEach((ele,i)=>{
            tbody+=`<tr>
                ${this.format(i,ele)}
                <td>${ele._id}</td>
                <td>${ele.menuName}</td>
                <td>${ele.menuRouter}</td>
                <td>${ele.isChild?'YES':'NO'}</td>
                <td>
                    
                    ${ele.lever<3?`<button type="submit" class="btn btn-primary" onclick=menuAdd(${ele._id})><i class="glyphicon glyphicon-plus"></i><span style="margin-left:5px">新增</span></button>`:''}
                    <button type="submit" class="btn btn-success" onclick=menuUpdate(${JSON.stringify(ele)})><i class="glyphicon glyphicon-pencil"></i><span style="margin-left:5px">编辑</span></button>
                    <button type="submit" class="btn btn-danger" onclick=menuDel(${ele._id})><i class="glyphicon glyphicon-trash"></i><span style="margin-left:5px">删除</span></button> 
                </td>
            </tr>`
        })
        return tbody
    },
    format(i,el){
        let std='';
        if(el.isChild){
            std= `<td class="active" onclick=lookChildList(event,${el._id})>${i}<i class="glyphicon glyphicon-chevron-right" style="margin-left:20px"></i></td>`
        }else{
            std=`<td>${i}</td>`   
        }
        return std
    }
}

