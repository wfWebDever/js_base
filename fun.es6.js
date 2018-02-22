
const x=100;
const Acto=(type=x+1)=>(
    {
        type:type
    }
)


console.info(Acto());
console.info([1,2,3].map(x=>x*x));

const obj={
    id:1,
    getId:function () {
        //var that=this;
        setTimeout(() =>{
            console.info(this.id)
        },1000)
    }
};
const getId=obj.getId;
getId.call(obj);
//obj.getId();